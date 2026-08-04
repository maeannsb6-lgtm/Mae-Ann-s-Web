/**
 * =============================================================
 * MAE ANN PORTFOLIO CONTACT BACKEND
 * Google Apps Script Web App
 * =============================================================
 *
 * IMPORTANT:
 * Create and deploy this project while signed in as:
 * maeannbodiongan.ie@gmail.com
 *
 * Deploy as:
 * - Execute as: Me
 * - Who has access: Anyone
 */

const CONFIG = Object.freeze({
  RECIPIENT_EMAIL: 'maeannbodiongan.ie@gmail.com',
  SENDER_NAME: 'Mae Ann Bodiongan',
  SUBJECT_PREFIX: 'Portfolio Inquiry',
  SEND_CONFIRMATION_EMAIL: true,
  RATE_LIMIT_SECONDS: 90,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 5000,
});

/**
 * Health-check endpoint.
 */
function doGet() {
  return jsonResponse_({
    success: true,
    service: 'Mae Ann Portfolio Contact Backend',
    status: 'ready',
  });
}

/**
 * Receives validated contact-form submissions from the Vercel bridge.
 */
function doPost(e) {
  try {
    verifyDeploymentOwner_();

    const payload = parsePayload_(e);
    verifySecret_(payload.secret);

    // Honeypot field: bots often fill this hidden input.
    if (cleanText_(payload.website, 200)) {
      return jsonResponse_({
        success: true,
        message: 'Your message was received.',
        confirmationSent: false,
      });
    }

    const submission = validateSubmission_(payload);
    enforceRateLimit_(submission.email);

    const requiredRecipients = CONFIG.SEND_CONFIRMATION_EMAIL ? 2 : 1;
    if (MailApp.getRemainingDailyQuota() < requiredRecipients) {
      throw publicError_('The contact email limit has been reached for today. Please email Mae Ann directly.', 503);
    }

    sendOwnerNotification_(submission);

    let confirmationSent = false;
    if (CONFIG.SEND_CONFIRMATION_EMAIL) {
      try {
        sendVisitorConfirmation_(submission);
        confirmationSent = true;
      } catch (confirmationError) {
        console.error('Owner notification sent, but confirmation failed:', confirmationError);
      }
    }

    return jsonResponse_({
      success: true,
      message: confirmationSent
        ? 'Your message was sent successfully. Please check your email for confirmation.'
        : 'Your message was sent successfully.',
      confirmationSent: confirmationSent,
    });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);

    return jsonResponse_({
      success: false,
      error: error && error.publicMessage
        ? error.publicMessage
        : 'Your message could not be sent right now. Please try again shortly.',
      statusCode: error && error.statusCode ? error.statusCode : 500,
    });
  }
}

/**
 * Run this function ONCE from the Apps Script editor.
 * It creates a secure shared secret, sends a test email, and prints the
 * CONTACT_FORM_SECRET value in the execution log for use in Vercel.
 */
function setupContactBackend() {
  verifyDeploymentOwner_();

  const properties = PropertiesService.getScriptProperties();
  let secret = properties.getProperty('CONTACT_FORM_SECRET');

  if (!secret) {
    secret = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    properties.setProperty('CONTACT_FORM_SECRET', secret);
  }

  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: 'Mae Ann Portfolio Contact Backend — Test Successful',
    body: 'Your Google Apps Script contact backend is authorized and ready for deployment.',
    htmlBody: [
      '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#241c24">',
      '<h2 style="color:#d92f86">Contact backend is ready</h2>',
      '<p>Your Google Apps Script project is authorized to send portfolio contact emails.</p>',
      '<p>Next: deploy it as a Web App using <strong>Execute as Me</strong> and <strong>Anyone</strong>.</p>',
      '</div>',
    ].join(''),
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.RECIPIENT_EMAIL,
  });

  console.log('COPY THIS EXACT VALUE INTO VERCEL:');
  console.log('CONTACT_FORM_SECRET=' + secret);
  console.log('Sender/deployment account: ' + Session.getEffectiveUser().getEmail());

  return 'Setup complete. Copy CONTACT_FORM_SECRET from the execution log.';
}

function sendOwnerNotification_(submission) {
  const subject = CONFIG.SUBJECT_PREFIX + ': ' + submission.projectType + ' — ' + submission.name;
  const receivedAt = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Manila', 'MMMM d, yyyy h:mm a z');

  const plainBody = [
    'New portfolio inquiry',
    '',
    'Name: ' + submission.name,
    'Email: ' + submission.email,
    'Company/Organization: ' + (submission.company || 'Not provided'),
    'Inquiry Type: ' + submission.projectType,
    'Received: ' + receivedAt,
    '',
    'Message:',
    submission.message,
    '',
    'Reply directly to this email to respond to ' + submission.name + '.',
  ].join('\n');

  const htmlBody = [
    '<div style="margin:0;padding:32px 16px;background:#0c0b10;font-family:Arial,sans-serif;color:#f8f5f8">',
    '<div style="max-width:640px;margin:0 auto;background:#17131c;border:1px solid #332536;border-radius:22px;overflow:hidden">',
    '<div style="padding:28px 32px;background:linear-gradient(135deg,#241522,#17131c);border-bottom:1px solid #3f2740">',
    '<div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#e8449a;color:white;font-size:12px;font-weight:700;letter-spacing:.08em">NEW PORTFOLIO INQUIRY</div>',
    '<h1 style="margin:18px 0 4px;font-size:26px;color:#ffffff">' + escapeHtml_(submission.projectType) + '</h1>',
    '<p style="margin:0;color:#b9aebe">Received ' + escapeHtml_(receivedAt) + '</p>',
    '</div>',
    '<div style="padding:30px 32px">',
    detailRow_('Full Name', submission.name),
    detailRow_('Email Address', submission.email),
    detailRow_('Company / Organization', submission.company || 'Not provided'),
    detailRow_('Inquiry Type', submission.projectType),
    '<div style="margin-top:24px;padding:22px;border-radius:16px;background:#0d0b10;border:1px solid #302431">',
    '<div style="margin-bottom:10px;color:#ec65ad;font-size:12px;font-weight:700;letter-spacing:.08em">MESSAGE</div>',
    '<div style="white-space:pre-wrap;color:#f4eef4;line-height:1.7">' + escapeHtml_(submission.message) + '</div>',
    '</div>',
    '<p style="margin:24px 0 0;color:#9e91a3;font-size:13px">Reply to this email to respond directly to ' + escapeHtml_(submission.name) + '.</p>',
    '</div>',
    '</div>',
    '</div>',
  ].join('');

  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME,
    replyTo: submission.email,
  });
}

function sendVisitorConfirmation_(submission) {
  const subject = 'Thank you for contacting Mae Ann Bodiongan';

  const plainBody = [
    'Hi ' + submission.name + ',',
    '',
    'Thank you for reaching out. Your ' + submission.projectType + ' inquiry has been received successfully.',
    '',
    'Mae Ann will review your message and respond using the email address you provided.',
    '',
    'Copy of your message:',
    submission.message,
    '',
    'Regards,',
    'Mae Ann Bodiongan',
    CONFIG.RECIPIENT_EMAIL,
  ].join('\n');

  const htmlBody = [
    '<div style="margin:0;padding:32px 16px;background:#f6f1f5;font-family:Arial,sans-serif;color:#2a2029">',
    '<div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #eadde7;border-radius:22px;overflow:hidden;box-shadow:0 14px 40px rgba(74,30,61,.10)">',
    '<div style="padding:30px 34px;background:linear-gradient(135deg,#2a1725,#151117);color:white">',
    '<div style="font-size:12px;font-weight:700;letter-spacing:.10em;color:#ff72b9">MESSAGE RECEIVED</div>',
    '<h1 style="margin:14px 0 6px;font-size:28px">Thank you for reaching out.</h1>',
    '<p style="margin:0;color:#d5c7d2">Your inquiry has been delivered successfully.</p>',
    '</div>',
    '<div style="padding:32px 34px">',
    '<p style="font-size:16px;line-height:1.7">Hi <strong>' + escapeHtml_(submission.name) + '</strong>,</p>',
    '<p style="font-size:15px;line-height:1.7;color:#5d4d59">Thank you for contacting me regarding <strong>' + escapeHtml_(submission.projectType) + '</strong>. I will review your message and respond through the email address you provided.</p>',
    '<div style="margin:24px 0;padding:20px;border-radius:15px;background:#faf6f9;border-left:4px solid #e8449a">',
    '<div style="margin-bottom:9px;color:#c72e7b;font-size:12px;font-weight:700;letter-spacing:.08em">YOUR MESSAGE</div>',
    '<div style="white-space:pre-wrap;color:#4f414c;line-height:1.7">' + escapeHtml_(submission.message) + '</div>',
    '</div>',
    '<p style="margin:24px 0 0;line-height:1.7">Regards,<br><strong>Mae Ann Bodiongan</strong><br><a href="mailto:' + CONFIG.RECIPIENT_EMAIL + '" style="color:#d92f86;text-decoration:none">' + CONFIG.RECIPIENT_EMAIL + '</a></p>',
    '</div>',
    '</div>',
    '</div>',
  ].join('');

  MailApp.sendEmail({
    to: submission.email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.RECIPIENT_EMAIL,
  });
}

function validateSubmission_(payload) {
  const name = cleanText_(payload.name, 100);
  const email = cleanText_(payload.email, 254).toLowerCase();
  const company = cleanText_(payload.company, 150);
  const projectType = cleanText_(payload.projectType, 100) || 'Professional Inquiry';
  const message = cleanMultilineText_(payload.message, CONFIG.MAX_MESSAGE_LENGTH);

  if (name.length < 2) {
    throw publicError_('Please enter your full name.', 400);
  }

  if (!isValidEmail_(email)) {
    throw publicError_('Please enter a valid email address.', 400);
  }

  if (message.length < CONFIG.MIN_MESSAGE_LENGTH) {
    throw publicError_('Please enter a message with at least ' + CONFIG.MIN_MESSAGE_LENGTH + ' characters.', 400);
  }

  return {
    name: name,
    email: email,
    company: company,
    projectType: projectType,
    message: message,
  };
}

function enforceRateLimit_(email) {
  const cache = CacheService.getScriptCache();
  const key = 'contact_' + sha256_(email);
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(5000)) {
    throw publicError_('The contact service is busy. Please try again in a moment.', 429);
  }

  try {
    if (cache.get(key)) {
      throw publicError_('Please wait a short while before sending another message.', 429);
    }
    cache.put(key, '1', CONFIG.RATE_LIMIT_SECONDS);
  } finally {
    lock.releaseLock();
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw publicError_('No contact form data was received.', 400);
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw publicError_('Invalid contact form data.', 400);
  }
}

function verifySecret_(receivedSecret) {
  const expectedSecret = PropertiesService.getScriptProperties().getProperty('CONTACT_FORM_SECRET');

  if (!expectedSecret) {
    throw new Error('CONTACT_FORM_SECRET is missing. Run setupContactBackend() first.');
  }

  if (!receivedSecret || String(receivedSecret) !== expectedSecret) {
    throw publicError_('Unauthorized contact form request.', 401);
  }
}

function verifyDeploymentOwner_() {
  const effectiveEmail = String(Session.getEffectiveUser().getEmail() || '').toLowerCase();
  const requiredEmail = CONFIG.RECIPIENT_EMAIL.toLowerCase();

  if (effectiveEmail && effectiveEmail !== requiredEmail) {
    throw new Error(
      'This Apps Script must be created and deployed by ' + CONFIG.RECIPIENT_EMAIL +
      '. Current effective account: ' + effectiveEmail
    );
  }
}

function cleanText_(value, maxLength) {
  return String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function cleanMultilineText_(value, maxLength) {
  return String(value || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function sha256_(value) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    value,
    Utilities.Charset.UTF_8
  );

  return digest.map(function(byte) {
    const normalized = byte < 0 ? byte + 256 : byte;
    return ('0' + normalized.toString(16)).slice(-2);
  }).join('');
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function detailRow_(label, value) {
  return [
    '<div style="display:grid;grid-template-columns:170px 1fr;gap:14px;padding:13px 0;border-bottom:1px solid #2f2530">',
    '<div style="color:#a99baa;font-size:13px">' + escapeHtml_(label) + '</div>',
    '<div style="color:#ffffff;font-size:14px;font-weight:600;word-break:break-word">' + escapeHtml_(value) + '</div>',
    '</div>',
  ].join('');
}

function publicError_(message, statusCode) {
  const error = new Error(message);
  error.publicMessage = message;
  error.statusCode = statusCode;
  return error;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
