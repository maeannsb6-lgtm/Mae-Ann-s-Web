/**
 * Vercel serverless contact endpoint.
 *
 * At least one storage/delivery backend must be configured:
 * - Supabase: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 * - Existing Apps Script flow: GOOGLE_APPS_SCRIPT_CONTACT_URL + CONTACT_FORM_SECRET
 *
 * Optional automation:
 * - N8N_CONTACT_WEBHOOK_URL + N8N_CONTACT_WEBHOOK_SECRET
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const rateBuckets = globalThis.__portfolioContactRateBuckets || new Map();
globalThis.__portfolioContactRateBuckets = rateBuckets;

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  if (isRateLimited(clientIp(request))) {
    return response.status(429).json({ success: false, message: 'Too many attempts. Please wait a few minutes and try again.' });
  }

  const body = parseRequestBody(request.body);
  if (!body || typeof body !== 'object') {
    return response.status(400).json({ success: false, message: 'Invalid contact form request.' });
  }

  const validationError = validateRequestBody(body);
  if (validationError) return response.status(400).json({ success: false, message: validationError });

  const inquiry = normalizeInquiry(body);
  if (Buffer.byteLength(JSON.stringify(inquiry), 'utf8') > 12_000) {
    return response.status(413).json({ success: false, message: 'The submitted message is too large.' });
  }

  const supabaseConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const appsScriptConfigured = Boolean(process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL && process.env.CONTACT_FORM_SECRET);

  if (!supabaseConfigured && !appsScriptConfigured) {
    console.error('[contact] No contact backend is configured.');
    return response.status(500).json({ success: false, message: 'The contact service is not configured yet.' });
  }

  const jobs = [];
  if (supabaseConfigured) jobs.push(storeInSupabase(inquiry));
  if (appsScriptConfigured) jobs.push(sendToAppsScript(inquiry));

  const results = await Promise.allSettled(jobs);
  const successes = results.filter((result) => result.status === 'fulfilled' && result.value.ok).map((result) => result.value);

  if (successes.length === 0) {
    results.forEach((result) => {
      if (result.status === 'rejected') console.error('[contact] Backend request failed:', safeError(result.reason));
      else if (!result.value.ok) console.error('[contact] Backend rejected inquiry:', result.value.backend, result.value.message);
    });
    return response.status(502).json({ success: false, message: 'Your inquiry could not be recorded right now. Please try again shortly.' });
  }

  const appsResult = successes.find((result) => result.backend === 'apps-script');
  const referenceId = appsResult?.referenceId || inquiry.clientSubmissionId;

  await notifyN8n(inquiry, referenceId).catch((error) => {
    console.error('[contact] Optional n8n notification failed:', safeError(error));
  });

  return response.status(200).json({
    success: true,
    referenceId,
    message: appsResult?.message || 'Your inquiry has been received. I’ll respond as soon as possible.',
    stored: successes.some((result) => result.backend === 'supabase'),
    confirmationSent: Boolean(appsResult?.confirmationSent),
    duplicate: successes.some((result) => result.duplicate),
  });
}

function normalizeInquiry(body) {
  return {
    fullName: stringValue(body.fullName || body.name).trim(),
    email: stringValue(body.email).trim().toLowerCase(),
    company: stringValue(body.company).trim(),
    inquiryType: stringValue(body.inquiryType || body.projectType).trim(),
    message: stringValue(body.message).trim(),
    clientSubmissionId: stringValue(body.clientSubmissionId).trim(),
    source: 'Mae Ann Portfolio Website',
  };
}

async function storeInSupabase(inquiry) {
  const baseUrl = validateHttpsUrl(process.env.SUPABASE_URL, 'SUPABASE_URL');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const endpoint = new URL('/rest/v1/portfolio_inquiries', `${baseUrl}/`);
  endpoint.searchParams.set('on_conflict', 'client_submission_id');

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=ignore-duplicates,return=minimal',
    },
    body: JSON.stringify({
      client_submission_id: inquiry.clientSubmissionId,
      name: inquiry.fullName,
      email: inquiry.email,
      company: inquiry.company || null,
      inquiry_type: inquiry.inquiryType,
      message: inquiry.message,
      source: inquiry.source,
      status: 'new',
    }),
  });

  if (!result.ok) {
    const message = (await result.text()).slice(0, 400);
    return { ok: false, backend: 'supabase', message };
  }
  return { ok: true, backend: 'supabase', duplicate: result.status === 200 };
}

async function sendToAppsScript(inquiry) {
  const url = process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL;
  if (!isValidAppsScriptExecUrl(url)) return { ok: false, backend: 'apps-script', message: 'Invalid Apps Script URL.' };

  const result = await fetch(url, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...inquiry, secret: process.env.CONTACT_FORM_SECRET, website: '' }),
  });
  const text = await result.text();
  let data;
  try { data = JSON.parse(text); } catch { return { ok: false, backend: 'apps-script', message: 'Non-JSON response.' }; }
  if (!result.ok || !data.success) return { ok: false, backend: 'apps-script', message: stringValue(data.message || data.error) };
  return {
    ok: true,
    backend: 'apps-script',
    referenceId: stringValue(data.referenceId),
    message: stringValue(data.message),
    confirmationSent: Boolean(data.confirmationSent),
    duplicate: Boolean(data.duplicate),
  };
}

async function notifyN8n(inquiry, referenceId) {
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return;
  const url = validateHttpsUrl(webhookUrl, 'N8N_CONTACT_WEBHOOK_URL');
  const headers = { 'Content-Type': 'application/json' };
  if (process.env.N8N_CONTACT_WEBHOOK_SECRET) headers['X-Portfolio-Webhook-Secret'] = process.env.N8N_CONTACT_WEBHOOK_SECRET;
  const result = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ ...inquiry, referenceId }) });
  if (!result.ok) throw new Error(`n8n returned ${result.status}`);
}

function parseRequestBody(body) {
  if (!body) return null;
  if (typeof body === 'object' && !Buffer.isBuffer(body)) return body;
  try { return JSON.parse(Buffer.isBuffer(body) ? body.toString('utf8') : String(body)); } catch { return null; }
}

function validateRequestBody(body) {
  if (stringValue(body.website).trim()) return 'Unable to process this submission.';
  const name = stringValue(body.fullName || body.name).trim();
  const email = stringValue(body.email).trim();
  const company = stringValue(body.company).trim();
  const type = stringValue(body.inquiryType || body.projectType).trim();
  const message = stringValue(body.message).trim();
  const id = stringValue(body.clientSubmissionId).trim();
  const allowedTypes = ['Process Improvement', 'Automation', 'Client Workflow', 'AI Integration', 'Website/System', 'Other'];
  if (name.length < 2 || name.length > 150) return 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) return 'Please enter a valid email address.';
  if (company.length > 200) return 'Company or organization is too long.';
  if (!allowedTypes.includes(type)) return 'Please select a valid inquiry type.';
  if (message.length < 10 || message.length > 5000) return 'Please enter a message between 10 and 5,000 characters.';
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(id)) return 'Please refresh the page and try again.';
  return '';
}

function clientIp(request) {
  return stringValue(request.headers['x-forwarded-for']).split(',')[0].trim() || stringValue(request.socket?.remoteAddress) || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (rateBuckets.get(ip) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  rateBuckets.set(ip, recent);
  if (rateBuckets.size > 1000) {
    for (const [key, timestamps] of rateBuckets) if (!timestamps.some((timestamp) => now - timestamp < RATE_WINDOW_MS)) rateBuckets.delete(key);
  }
  return recent.length > RATE_LIMIT;
}

function validateHttpsUrl(value, name) {
  const url = new URL(value);
  if (url.protocol !== 'https:') throw new Error(`${name} must use HTTPS.`);
  return url.toString().replace(/\/$/, '');
}

function isValidAppsScriptExecUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && url.hostname === 'script.google.com' && /^\/macros\/s\/[^/]+\/exec$/.test(url.pathname); } catch { return false; }
}

function safeError(error) { return error instanceof Error ? error.message : 'Unknown error'; }
function stringValue(value) { return typeof value === 'string' ? value : ''; }
