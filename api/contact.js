/**
 * Vercel serverless bridge for the Mae Ann portfolio contact form.
 *
 * Required Vercel environment variables (server-side only):
 * - GOOGLE_APPS_SCRIPT_CONTACT_URL
 * - CONTACT_FORM_SECRET
 *
 * Browser -> /api/contact -> Google Apps Script Web App -> Google Sheets + Email
 */
export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({
      success: false,
      message: 'Method not allowed.',
    });
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL;
  const contactSecret = process.env.CONTACT_FORM_SECRET;

  if (!appsScriptUrl || !contactSecret) {
    console.error('[contact] Missing GOOGLE_APPS_SCRIPT_CONTACT_URL or CONTACT_FORM_SECRET.');
    return response.status(500).json({
      success: false,
      message: 'The contact service is not configured yet.',
    });
  }

  if (!isValidAppsScriptExecUrl(appsScriptUrl)) {
    console.error('[contact] GOOGLE_APPS_SCRIPT_CONTACT_URL is not a valid Apps Script /exec URL.');
    return response.status(500).json({
      success: false,
      message: 'The contact service is not configured correctly.',
    });
  }

  try {
    const body = parseRequestBody(request.body);

    if (!body || typeof body !== 'object') {
      return response.status(400).json({
        success: false,
        message: 'Invalid contact form request.',
      });
    }

    const validationError = validateRequestBody(body);
    if (validationError) {
      return response.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const payload = {
      secret: contactSecret,
      fullName: stringValue(body.fullName || body.name),
      email: stringValue(body.email),
      company: stringValue(body.company),
      inquiryType: stringValue(body.inquiryType || body.projectType),
      message: stringValue(body.message),
      website: stringValue(body.website),
      clientSubmissionId: stringValue(body.clientSubmissionId),
      source: 'Mae Ann Portfolio Website',
    };

    const payloadSize = Buffer.byteLength(JSON.stringify(payload), 'utf8');
    if (payloadSize > 12_000) {
      return response.status(413).json({
        success: false,
        message: 'The submitted message is too large.',
      });
    }

    console.info('[contact] Forwarding validated inquiry to Apps Script.');

    const appsScriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        // Simple text request avoids unnecessary CORS/preflight behavior on Apps Script.
        // This call is server-to-server from Vercel, not directly from the browser.
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await appsScriptResponse.text();
    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      const looksLikeHtml = /^\s*</.test(responseText);
      console.error(
        '[contact] Apps Script returned a non-JSON response.',
        looksLikeHtml ? 'Likely deployment/access/URL issue.' : '',
        responseText.slice(0, 500),
      );
      return response.status(502).json({
        success: false,
        message: 'The contact backend is not responding correctly. Please try again shortly.',
      });
    }

    if (!appsScriptResponse.ok || !result.success) {
      console.error('[contact] Apps Script rejected the inquiry:', {
        status: appsScriptResponse.status,
        statusCode: result.statusCode,
        message: result.message || result.error,
      });

      return response.status(normalizeStatusCode(result.statusCode, 502)).json({
        success: false,
        message: result.message || result.error || 'Unable to process your inquiry.',
      });
    }

    console.info('[contact] Inquiry recorded successfully:', result.referenceId || '(no reference returned)');

    return response.status(200).json({
      success: true,
      referenceId: stringValue(result.referenceId),
      message: result.message || 'Your message has been received successfully.',
      confirmationSent: Boolean(result.confirmationSent),
      adminNotificationSent: Boolean(result.adminNotificationSent),
      duplicate: Boolean(result.duplicate),
    });
  } catch (error) {
    console.error('[contact] Contact API error:', error);
    return response.status(500).json({
      success: false,
      message: 'Your message could not be sent right now. Please try again shortly.',
    });
  }
}

function parseRequestBody(body) {
  if (!body) return null;
  if (typeof body === 'object' && !Buffer.isBuffer(body)) return body;

  const text = Buffer.isBuffer(body) ? body.toString('utf8') : String(body);
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function validateRequestBody(body) {
  const fullName = stringValue(body.fullName || body.name).trim();
  const email = stringValue(body.email).trim();
  const inquiryType = stringValue(body.inquiryType || body.projectType).trim();
  const message = stringValue(body.message).trim();

  if (stringValue(body.website).trim()) {
    return 'Unable to process this submission.';
  }

  if (fullName.length < 2 || fullName.length > 150) {
    return 'Please enter your full name.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  if (!inquiryType || inquiryType.length > 100) {
    return 'Please select an inquiry type.';
  }

  if (message.length < 10 || message.length > 5000) {
    return 'Please enter a message between 10 and 5,000 characters.';
  }

  if (stringValue(body.company).trim().length > 200) {
    return 'Company / Organization is too long.';
  }

  return '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function isValidAppsScriptExecUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:'
      && url.hostname === 'script.google.com'
      && /^\/macros\/s\/[^/]+\/exec$/.test(url.pathname);
  } catch {
    return false;
  }
}

function normalizeStatusCode(value, fallback) {
  const status = Number(value);
  return Number.isInteger(status) && status >= 400 && status <= 599 ? status : fallback;
}

function stringValue(value) {
  return typeof value === 'string' ? value : '';
}
