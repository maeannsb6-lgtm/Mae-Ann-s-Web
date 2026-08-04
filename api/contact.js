/**
 * Vercel serverless bridge for the portfolio contact form.
 *
 * Required Vercel environment variables:
 * - GOOGLE_APPS_SCRIPT_CONTACT_URL
 * - CONTACT_FORM_SECRET
 */
export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({
      success: false,
      error: 'Method not allowed.',
    });
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL;
  const contactSecret = process.env.CONTACT_FORM_SECRET;

  if (!appsScriptUrl || !contactSecret) {
    console.error('Missing GOOGLE_APPS_SCRIPT_CONTACT_URL or CONTACT_FORM_SECRET.');
    return response.status(500).json({
      success: false,
      error: 'The contact service is not configured yet.',
    });
  }

  try {
    const body = parseRequestBody(request.body);

    if (!body || typeof body !== 'object') {
      return response.status(400).json({
        success: false,
        error: 'Invalid contact form request.',
      });
    }

    const payload = {
      secret: contactSecret,
      name: stringValue(body.name),
      email: stringValue(body.email),
      company: stringValue(body.company),
      projectType: stringValue(body.projectType),
      message: stringValue(body.message),
      website: stringValue(body.website),
      source: 'Mae Ann Portfolio Website',
    };

    const payloadSize = Buffer.byteLength(JSON.stringify(payload), 'utf8');
    if (payloadSize > 12_000) {
      return response.status(413).json({
        success: false,
        error: 'The submitted message is too large.',
      });
    }

    const appsScriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await appsScriptResponse.text();
    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      console.error('Unexpected Apps Script response:', responseText.slice(0, 500));
      return response.status(502).json({
        success: false,
        error: 'The email service returned an unexpected response.',
      });
    }

    if (!appsScriptResponse.ok || !result.success) {
      console.error('Apps Script contact error:', result);
      return response.status(Number(result.statusCode) || 502).json({
        success: false,
        error: result.error || 'The email service could not send your message.',
      });
    }

    return response.status(200).json({
      success: true,
      message: result.message || 'Your message was sent successfully.',
      confirmationSent: Boolean(result.confirmationSent),
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return response.status(500).json({
      success: false,
      error: 'Your message could not be sent right now. Please try again shortly.',
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

function stringValue(value) {
  return typeof value === 'string' ? value : '';
}
