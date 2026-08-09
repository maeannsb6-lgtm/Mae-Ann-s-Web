/**
 * =============================================================
 * MAE ANN PORTFOLIO CONTACT BACKEND
 * Google Apps Script Web App
 * =============================================================
 *
 * Required owner/deployment account:
 * maeannbodiongan.ie@gmail.com
 *
 * Required deployment:
 * - Type: Web app
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Data flow:
 * Vercel /api/contact -> this Web App -> Google Sheets + email
 */

const CONFIG = Object.freeze({
  SPREADSHEET_ID: '1hFcVvnHDi1pW9b1i1q1sEOOz5dtEtuxBAy5JxMTdu0Y',
  INQUIRIES_SHEET: 'Inquiries',
  EMAIL_LOGS_SHEET: 'Email Logs',
  ADMIN_EMAIL: 'maeannbodiongan.ie@gmail.com',
  SENDER_NAME: 'Mae Ann S. Bodiongan',
  TIMEZONE: 'Asia/Manila',
  RATE_LIMIT_SECONDS: 90,
  DUPLICATE_CACHE_SECONDS: 600,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 5000,
  MAX_NAME_LENGTH: 150,
  MAX_EMAIL_LENGTH: 254,
  MAX_COMPANY_LENGTH: 200,
  MAX_INQUIRY_TYPE_LENGTH: 100,
  INQUIRY_HEADERS: [
    'Reference ID',
    'Date & Time',
    'Full Name',
    'Email Address',
    'Company / Organization',
    'Inquiry Type',
    'Message',
    'Status',
    'Confirmation Sent',
    'Remarks',
  ],
  EMAIL_LOG_HEADERS: [
    'Timestamp',
    'Reference ID',
    'Full Name',
    'Recipient Email',
    'Email Type',
    'Subject',
    'Status',
    'Error Message',
  ],
});

/**
 * Public health-check endpoint.
 * It intentionally exposes no secrets or spreadsheet data.
 */
function doGet() {
  return jsonResponse_({
    success: true,
    service: 'Mae Ann Portfolio Contact Backend',
    status: 'ready',
  });
}

/**
 * Receives contact submissions from the Vercel serverless bridge.
 */
function doPost(e) {
  let rateLimitKey = '';

  try {
    verifyDeploymentOwner_();

    const payload = parsePayload_(e);
    verifySecret_(payload.secret);

    // Honeypot: real visitors never fill this field.
    if (cleanText_(payload.website, 200)) {
      throw publicError_('Unable to process this submission.', 400);
    }

    const submission = validateSubmission_(payload);
    const duplicateKey = buildDuplicateKey_(submission, payload.clientSubmissionId);
    const duplicate = getCachedDuplicate_(duplicateKey);

    if (duplicate) {
      console.log('[contact] Duplicate retry recognized: ' + duplicate.referenceId);
      return jsonResponse_({
        success: true,
        duplicate: true,
        referenceId: duplicate.referenceId,
        confirmationSent: duplicate.confirmationSent === true,
        adminNotificationSent: duplicate.adminNotificationSent === true,
        message: 'Your message has already been received successfully.',
      });
    }

    rateLimitKey = enforceRateLimit_(submission.email);

    // Highest priority: save the inquiry before attempting email delivery.
    const saved = appendInquiry_(submission);
    safeCacheDuplicate_(duplicateKey, {
      referenceId: saved.referenceId,
      confirmationSent: false,
      adminNotificationSent: false,
    });

    console.log('[contact] Inquiry recorded: ' + saved.referenceId);

    // Email failure must never remove or invalidate an already-saved inquiry.
    const visitorResult = sendVisitorConfirmation_(submission, saved.referenceId);
    const adminResult = sendAdminNotification_(submission, saved.referenceId, saved.timestamp);

    updateInquiryEmailStatus_(
      saved.rowNumber,
      saved.referenceId,
      visitorResult,
      adminResult
    );

    safeCacheDuplicate_(duplicateKey, {
      referenceId: saved.referenceId,
      confirmationSent: visitorResult.sent,
      adminNotificationSent: adminResult.sent,
    });

    console.log(
      '[contact] Completed ' + saved.referenceId +
      ' | visitor=' + visitorResult.status +
      ' | admin=' + adminResult.status
    );

    return jsonResponse_({
      success: true,
      referenceId: saved.referenceId,
      confirmationSent: visitorResult.sent,
      adminNotificationSent: adminResult.sent,
      message: visitorResult.sent
        ? 'Thank you! Your message has been received successfully. A confirmation email has been sent.'
        : 'Your message has been received successfully.',
    });
  } catch (error) {
    if (rateLimitKey && isSheetWriteFailure_(error)) {
      safeClearRateLimit_(rateLimitKey);
    }

    console.error('[contact] ' + sanitizeError_(error));

    return jsonResponse_({
      success: false,
      message: error && error.publicMessage
        ? error.publicMessage
        : 'Unable to process your inquiry right now. Please try again shortly.',
      statusCode: error && error.statusCode ? error.statusCode : 500,
    });
  }
}

/**
 * Run ONCE after pasting the backend code, while signed in as
 * maeannbodiongan.ie@gmail.com.
 *
 * This function:
 * 1. verifies the exact spreadsheet and Inquiries headers,
 * 2. creates Email Logs if missing,
 * 3. creates/preserves the private CONTACT_FORM_SECRET,
 * 4. sends a sender-account test email,
 * 5. prints the secret for the Vercel environment variable.
 */
function setupContactBackend() {
  verifyDeploymentOwner_();

  const spreadsheet = getSpreadsheet_();
  const inquiriesSheet = getInquiriesSheet_(spreadsheet);
  validateInquiriesHeaders_(inquiriesSheet);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    ensureEmailLogsSheet_(spreadsheet);
  } finally {
    lock.releaseLock();
  }

  const properties = PropertiesService.getScriptProperties();
  let secret = properties.getProperty('CONTACT_FORM_SECRET');

  if (!secret) {
    secret = generateSecret_();
    properties.setProperty('CONTACT_FORM_SECRET', secret);
  }

  MailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: 'Mae Ann Portfolio Contact Backend — Setup Successful',
    body: [
      'Your portfolio contact backend is authorized and connected.',
      '',
      'Spreadsheet: Mae Ann Portfolio Contact Inquiries',
      'Spreadsheet ID: ' + CONFIG.SPREADSHEET_ID,
      'Inquiries tab: ' + CONFIG.INQUIRIES_SHEET,
      'Email Logs tab: ' + CONFIG.EMAIL_LOGS_SHEET,
      'Timezone: ' + CONFIG.TIMEZONE,
      '',
      'Deploy this Apps Script as a Web App using Execute as Me.',
    ].join('\n'),
    htmlBody: [
      '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#241c24">',
      '<h2>Portfolio contact backend is ready</h2>',
      '<p>The backend is authorized to use the required Google Sheet and send email.</p>',
      '<p><strong>Spreadsheet:</strong> Mae Ann Portfolio Contact Inquiries<br>',
      '<strong>Inquiries:</strong> verified<br>',
      '<strong>Email Logs:</strong> ready<br>',
      '<strong>Timezone:</strong> Asia/Manila</p>',
      '<p>Next: deploy as a Web App using <strong>Execute as Me</strong>.</p>',
      '</div>',
    ].join(''),
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.ADMIN_EMAIL,
  });

  console.log('SETUP SUCCESSFUL');
  console.log('Spreadsheet ID=' + CONFIG.SPREADSHEET_ID);
  console.log('Deployment account=' + Session.getEffectiveUser().getEmail());
  console.log('COPY THIS EXACT VALUE INTO VERCEL:');
  console.log('CONTACT_FORM_SECRET=' + secret);

  return 'Setup complete. Copy CONTACT_FORM_SECRET from the execution log.';
}

/**
 * Optional maintenance helper. Run only when you intentionally want a new
 * Vercel/App Script shared secret. Update Vercel immediately after running it.
 */
function rotateContactFormSecret() {
  verifyDeploymentOwner_();
  const secret = generateSecret_();
  PropertiesService.getScriptProperties().setProperty('CONTACT_FORM_SECRET', secret);
  console.log('NEW CONTACT_FORM_SECRET=' + secret);
  return 'Secret rotated. Update CONTACT_FORM_SECRET in Vercel before testing.';
}

function appendInquiry_(submission) {
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(10000)) {
    throw publicError_('The contact service is busy. Please try again in a moment.', 503);
  }

  try {
    const spreadsheet = getSpreadsheet_();
    const sheet = getInquiriesSheet_(spreadsheet);
    validateInquiriesHeaders_(sheet);

    const referenceId = generateUniqueReferenceId_(sheet);
    const timestamp = formatInquiryTimestamp_(new Date());
    const rowNumber = sheet.getLastRow() + 1;

    sheet.getRange(rowNumber, 1, 1, CONFIG.INQUIRY_HEADERS.length).setValues([[
      referenceId,
      timestamp,
      submission.fullName,
      submission.email,
      submission.company,
      submission.inquiryType,
      submission.message,
      'New',
      'Not Sent',
      'Inquiry recorded; email delivery pending.',
    ]]);

    SpreadsheetApp.flush();

    return {
      referenceId: referenceId,
      timestamp: timestamp,
      rowNumber: rowNumber,
    };
  } catch (error) {
    const wrapped = new Error('Google Sheets write failed: ' + sanitizeError_(error));
    wrapped.isSheetWriteFailure = true;
    wrapped.publicMessage = 'Your inquiry could not be recorded right now. Please try again shortly.';
    wrapped.statusCode = 500;
    throw wrapped;
  } finally {
    lock.releaseLock();
  }
}

function updateInquiryEmailStatus_(rowNumber, referenceId, visitorResult, adminResult) {
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(10000)) {
    console.error('[contact] Could not acquire lock to update email status for ' + referenceId);
    return;
  }

  try {
    const spreadsheet = getSpreadsheet_();
    const sheet = getInquiriesSheet_(spreadsheet);

    const storedReferenceId = String(sheet.getRange(rowNumber, 1).getDisplayValue() || '').trim();
    if (storedReferenceId !== referenceId) {
      throw new Error('Reference ID mismatch while updating inquiry row.');
    }

    const confirmationStatus = visitorResult.sent ? 'Sent' : 'Failed';
    const remarks = buildRemarks_(visitorResult, adminResult);

    // I = Confirmation Sent, J = Remarks. Status (H) intentionally remains New.
    sheet.getRange(rowNumber, 9, 1, 2).setValues([[
      confirmationStatus,
      remarks,
    ]]);

    SpreadsheetApp.flush();
  } catch (error) {
    console.error(
      '[contact] Inquiry was saved, but email status update failed for ' +
      referenceId + ': ' + sanitizeError_(error)
    );
  } finally {
    lock.releaseLock();
  }
}

function sendVisitorConfirmation_(submission, referenceId) {
  const firstName = getFirstName_(submission.fullName);
  const subject = 'Thank you for reaching out — Mae Ann S. Bodiongan';

  const plainBody = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for reaching out.',
    '',
    "I've received your message and will get back to you as soon as possible.",
    '',
    'Reference ID: ' + referenceId,
    'Inquiry Type: ' + submission.inquiryType,
    '',
    'Best regards,',
    'Mae Ann S. Bodiongan',
    CONFIG.ADMIN_EMAIL,
  ].join('\n');

  const htmlBody = [
    '<div style="margin:0;padding:32px 16px;background:#f6f1f5;font-family:Arial,sans-serif;color:#2a2029">',
    '<div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #eadde7;border-radius:20px;overflow:hidden">',
    '<div style="padding:28px 32px;background:#211720;color:#ffffff">',
    '<div style="font-size:12px;font-weight:700;letter-spacing:.09em;color:#f277b7">MESSAGE RECEIVED</div>',
    '<h1 style="margin:12px 0 0;font-size:26px">Thank you for reaching out.</h1>',
    '</div>',
    '<div style="padding:30px 32px">',
    '<p style="font-size:16px;line-height:1.7">Hi <strong>' + escapeHtml_(firstName) + '</strong>,</p>',
    '<p style="font-size:15px;line-height:1.7;color:#5d4d59">Thank you for reaching out. I’ve received your message and will get back to you as soon as possible.</p>',
    '<div style="margin:22px 0;padding:18px;border-radius:14px;background:#faf6f9;border:1px solid #eadde7">',
    '<div style="margin-bottom:8px;color:#8f657d;font-size:12px;font-weight:700">REFERENCE ID</div>',
    '<div style="font-size:18px;font-weight:700;color:#241c24">' + escapeHtml_(referenceId) + '</div>',
    '<div style="margin-top:14px;color:#8f657d;font-size:12px;font-weight:700">INQUIRY TYPE</div>',
    '<div style="margin-top:4px;color:#473641">' + escapeHtml_(submission.inquiryType) + '</div>',
    '</div>',
    '<p style="margin:24px 0 0;line-height:1.7">Best regards,<br><strong>Mae Ann S. Bodiongan</strong><br>',
    '<a href="mailto:' + CONFIG.ADMIN_EMAIL + '" style="color:#c9337f;text-decoration:none">' + CONFIG.ADMIN_EMAIL + '</a></p>',
    '</div>',
    '</div>',
    '</div>',
  ].join('');

  return sendEmailWithLog_({
    referenceId: referenceId,
    fullName: submission.fullName,
    recipient: submission.email,
    emailType: 'Visitor Confirmation',
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: CONFIG.ADMIN_EMAIL,
  });
}

function sendAdminNotification_(submission, referenceId, timestamp) {
  const subject = 'New Portfolio Inquiry — ' + submission.fullName + ' — ' + referenceId;

  const plainBody = [
    'New portfolio inquiry',
    '',
    'Reference ID: ' + referenceId,
    'Date & Time: ' + timestamp,
    'Full Name: ' + submission.fullName,
    'Email Address: ' + submission.email,
    'Company / Organization: ' + (submission.company || 'Not provided'),
    'Inquiry Type: ' + submission.inquiryType,
    '',
    'Message:',
    submission.message,
    '',
    'Reply to this email to respond directly to ' + submission.fullName + '.',
  ].join('\n');

  const htmlBody = [
    '<div style="margin:0;padding:32px 16px;background:#0c0b10;font-family:Arial,sans-serif;color:#f8f5f8">',
    '<div style="max-width:660px;margin:0 auto;background:#17131c;border:1px solid #332536;border-radius:20px;overflow:hidden">',
    '<div style="padding:28px 32px;border-bottom:1px solid #3f2740">',
    '<div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#e8449a;color:#fff;font-size:12px;font-weight:700;letter-spacing:.08em">NEW PORTFOLIO INQUIRY</div>',
    '<h1 style="margin:18px 0 4px;font-size:25px;color:#fff">' + escapeHtml_(submission.fullName) + '</h1>',
    '<p style="margin:0;color:#b9aebe">' + escapeHtml_(referenceId) + '</p>',
    '</div>',
    '<div style="padding:30px 32px">',
    detailRow_('Reference ID', referenceId),
    detailRow_('Date & Time', timestamp),
    detailRow_('Full Name', submission.fullName),
    detailRow_('Email Address', submission.email),
    detailRow_('Company / Organization', submission.company || 'Not provided'),
    detailRow_('Inquiry Type', submission.inquiryType),
    '<div style="margin-top:24px;padding:20px;border-radius:14px;background:#0d0b10;border:1px solid #302431">',
    '<div style="margin-bottom:10px;color:#ec65ad;font-size:12px;font-weight:700;letter-spacing:.08em">MESSAGE</div>',
    '<div style="white-space:pre-wrap;color:#f4eef4;line-height:1.7">' + escapeHtml_(submission.message) + '</div>',
    '</div>',
    '<p style="margin:24px 0 0;color:#9e91a3;font-size:13px">Reply to this email to respond directly to ' + escapeHtml_(submission.fullName) + '.</p>',
    '</div>',
    '</div>',
    '</div>',
  ].join('');

  return sendEmailWithLog_({
    referenceId: referenceId,
    fullName: submission.fullName,
    recipient: CONFIG.ADMIN_EMAIL,
    emailType: 'Admin Notification',
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: submission.email,
  });
}

function sendEmailWithLog_(mail) {
  let sent = false;
  let emailError = '';

  try {
    MailApp.sendEmail({
      to: mail.recipient,
      subject: mail.subject,
      body: mail.body,
      htmlBody: mail.htmlBody,
      name: CONFIG.SENDER_NAME,
      replyTo: mail.replyTo,
    });
    sent = true;
  } catch (error) {
    emailError = sanitizeError_(error);
    console.error(
      '[contact] ' + mail.emailType + ' failed for ' +
      mail.referenceId + ': ' + emailError
    );
  }

  let logError = '';
  try {
    writeEmailLog_({
      referenceId: mail.referenceId,
      fullName: mail.fullName,
      recipient: mail.recipient,
      emailType: mail.emailType,
      subject: mail.subject,
      status: sent ? 'Sent' : 'Failed',
      errorMessage: emailError,
    });
  } catch (error) {
    logError = sanitizeError_(error);
    console.error(
      '[contact] Email log write failed for ' +
      mail.referenceId + ': ' + logError
    );
  }

  return {
    sent: sent,
    status: sent ? 'Sent' : 'Failed',
    error: emailError,
    logError: logError,
  };
}

function writeEmailLog_(entry) {
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(10000)) {
    throw new Error('Could not acquire a lock for Email Logs.');
  }

  try {
    const spreadsheet = getSpreadsheet_();
    const sheet = ensureEmailLogsSheet_(spreadsheet);
    const rowNumber = sheet.getLastRow() + 1;

    sheet.getRange(rowNumber, 1, 1, CONFIG.EMAIL_LOG_HEADERS.length).setValues([[
      formatLogTimestamp_(new Date()),
      entry.referenceId,
      entry.fullName,
      entry.recipient,
      entry.emailType,
      entry.subject,
      entry.status,
      entry.errorMessage || '',
    ]]);

    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function ensureEmailLogsSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.EMAIL_LOGS_SHEET);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.EMAIL_LOGS_SHEET);
    sheet.getRange(1, 1, 1, CONFIG.EMAIL_LOG_HEADERS.length).setValues([
      CONFIG.EMAIL_LOG_HEADERS,
    ]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, CONFIG.EMAIL_LOG_HEADERS.length);
    return sheet;
  }

  const currentHeaders = sheet
    .getRange(1, 1, 1, CONFIG.EMAIL_LOG_HEADERS.length)
    .getDisplayValues()[0]
    .map(function(value) { return String(value || '').trim(); });

  const isCompletelyBlank = currentHeaders.every(function(value) { return !value; });

  if (isCompletelyBlank) {
    sheet.getRange(1, 1, 1, CONFIG.EMAIL_LOG_HEADERS.length).setValues([
      CONFIG.EMAIL_LOG_HEADERS,
    ]);
    sheet.setFrozenRows(1);
    return sheet;
  }

  for (let i = 0; i < CONFIG.EMAIL_LOG_HEADERS.length; i += 1) {
    if (currentHeaders[i] !== CONFIG.EMAIL_LOG_HEADERS[i]) {
      throw new Error(
        'Email Logs header mismatch at column ' + (i + 1) +
        '. Expected "' + CONFIG.EMAIL_LOG_HEADERS[i] + '" but found "' + currentHeaders[i] + '".'
      );
    }
  }

  return sheet;
}

function getSpreadsheet_() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  if (!spreadsheet) {
    throw new Error('Unable to open the configured Google Spreadsheet.');
  }

  return spreadsheet;
}

function getInquiriesSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(CONFIG.INQUIRIES_SHEET);

  if (!sheet) {
    throw new Error('Required worksheet "' + CONFIG.INQUIRIES_SHEET + '" was not found.');
  }

  return sheet;
}

function validateInquiriesHeaders_(sheet) {
  const headers = sheet
    .getRange(1, 1, 1, CONFIG.INQUIRY_HEADERS.length)
    .getDisplayValues()[0]
    .map(function(value) { return String(value || '').trim(); });

  for (let i = 0; i < CONFIG.INQUIRY_HEADERS.length; i += 1) {
    if (headers[i] !== CONFIG.INQUIRY_HEADERS[i]) {
      throw new Error(
        'Inquiries header mismatch at column ' + (i + 1) +
        '. Expected "' + CONFIG.INQUIRY_HEADERS[i] + '" but found "' + headers[i] + '".'
      );
    }
  }
}

function generateUniqueReferenceId_(sheet) {
  const datePart = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyyMMdd');

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const suffix = generateRandomCode_(6);
    const referenceId = 'MAE-' + datePart + '-' + suffix;

    const existing = sheet
      .getRange('A:A')
      .createTextFinder(referenceId)
      .matchEntireCell(true)
      .findNext();

    if (!existing) {
      return referenceId;
    }
  }

  throw new Error('Could not generate a unique Reference ID.');
}

function generateRandomCode_(length) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seed = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    Utilities.getUuid() + ':' + new Date().getTime() + ':' + Math.random(),
    Utilities.Charset.UTF_8
  );

  let result = '';
  for (let i = 0; i < length; i += 1) {
    const byte = seed[i] < 0 ? seed[i] + 256 : seed[i];
    result += alphabet.charAt(byte % alphabet.length);
  }
  return result;
}

function buildDuplicateKey_(submission, clientSubmissionId) {
  const clientId = cleanText_(clientSubmissionId, 120);
  const canonical = [
    clientId,
    submission.fullName.toLowerCase(),
    submission.email.toLowerCase(),
    submission.company.toLowerCase(),
    submission.inquiryType.toLowerCase(),
    submission.message,
  ].join('|');

  return 'duplicate_' + sha256_(canonical);
}


function safeCacheDuplicate_(key, data) {
  try {
    cacheDuplicate_(key, data);
  } catch (error) {
    // Duplicate protection is secondary. Never turn a successfully saved
    // inquiry into a failure just because CacheService is temporarily unavailable.
    console.error('[contact] Duplicate cache update failed: ' + sanitizeError_(error));
  }
}

function cacheDuplicate_(key, data) {
  CacheService.getScriptCache().put(
    key,
    JSON.stringify(data),
    CONFIG.DUPLICATE_CACHE_SECONDS
  );
}

function getCachedDuplicate_(key) {
  const value = CacheService.getScriptCache().get(key);
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);
    if (!parsed || !parsed.referenceId) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function enforceRateLimit_(email) {
  const key = 'rate_' + sha256_(email.toLowerCase());
  const cache = CacheService.getScriptCache();
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

  return key;
}


function safeClearRateLimit_(key) {
  try {
    clearRateLimit_(key);
  } catch (error) {
    console.error('[contact] Rate-limit cleanup failed: ' + sanitizeError_(error));
  }
}

function clearRateLimit_(key) {
  if (key) {
    CacheService.getScriptCache().remove(key);
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

function validateSubmission_(payload) {
  const fullName = cleanText_(payload.fullName || payload.name, CONFIG.MAX_NAME_LENGTH);
  const email = cleanText_(payload.email, CONFIG.MAX_EMAIL_LENGTH).toLowerCase();
  const company = cleanText_(payload.company, CONFIG.MAX_COMPANY_LENGTH);
  const inquiryType = cleanText_(
    payload.inquiryType || payload.projectType,
    CONFIG.MAX_INQUIRY_TYPE_LENGTH
  );
  const message = cleanMultilineText_(payload.message, CONFIG.MAX_MESSAGE_LENGTH);

  if (fullName.length < 2) {
    throw publicError_('Please enter your full name.', 400);
  }

  if (!isValidEmail_(email)) {
    throw publicError_('Please enter a valid email address.', 400);
  }

  if (!inquiryType) {
    throw publicError_('Please select an inquiry type.', 400);
  }

  if (message.length < CONFIG.MIN_MESSAGE_LENGTH) {
    throw publicError_(
      'Please enter a message with at least ' + CONFIG.MIN_MESSAGE_LENGTH + ' characters.',
      400
    );
  }

  return {
    fullName: fullName,
    email: email,
    company: company,
    inquiryType: inquiryType,
    message: message,
  };
}

function verifySecret_(receivedSecret) {
  const expectedSecret = PropertiesService
    .getScriptProperties()
    .getProperty('CONTACT_FORM_SECRET');

  if (!expectedSecret) {
    throw new Error('CONTACT_FORM_SECRET is missing. Run setupContactBackend() first.');
  }

  if (!receivedSecret || String(receivedSecret) !== expectedSecret) {
    throw publicError_('Unauthorized contact form request.', 401);
  }
}

function verifyDeploymentOwner_() {
  const effectiveEmail = String(Session.getEffectiveUser().getEmail() || '').toLowerCase();
  const requiredEmail = CONFIG.ADMIN_EMAIL.toLowerCase();

  if (effectiveEmail && effectiveEmail !== requiredEmail) {
    throw new Error(
      'This Apps Script must be owned/deployed by ' + CONFIG.ADMIN_EMAIL +
      '. Current effective account: ' + effectiveEmail
    );
  }
}

function buildRemarks_(visitorResult, adminResult) {
  const parts = [];

  if (visitorResult.sent && adminResult.sent) {
    parts.push('Confirmation and admin notification sent successfully.');
  } else {
    if (visitorResult.sent) {
      parts.push('Visitor confirmation sent successfully.');
    } else {
      parts.push('Inquiry recorded but visitor confirmation failed: ' + (visitorResult.error || 'Unknown email error') + '.');
    }

    if (adminResult.sent) {
      parts.push('Admin notification sent successfully.');
    } else {
      parts.push('Admin notification failed: ' + (adminResult.error || 'Unknown email error') + '.');
    }
  }

  const logErrors = [];
  if (visitorResult.logError) logErrors.push(visitorResult.logError);
  if (adminResult.logError) logErrors.push(adminResult.logError);
  if (logErrors.length) {
    parts.push('Email logging issue: ' + logErrors.join(' | '));
  }

  return cleanText_(parts.join(' '), 1500);
}

function formatInquiryTimestamp_(date) {
  return Utilities.formatDate(date, CONFIG.TIMEZONE, 'MMMM d, yyyy hh:mm a');
}

function formatLogTimestamp_(date) {
  return Utilities.formatDate(date, CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function getFirstName_(fullName) {
  const cleaned = cleanText_(fullName, CONFIG.MAX_NAME_LENGTH);
  return cleaned ? cleaned.split(' ')[0] : 'there';
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
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= CONFIG.MAX_EMAIL_LENGTH;
}

function generateSecret_() {
  return sha256_(
    Utilities.getUuid() + ':' +
    Utilities.getUuid() + ':' +
    new Date().getTime() + ':' +
    Math.random()
  ) + sha256_(Utilities.getUuid() + ':' + Math.random());
}

function sha256_(value) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value || ''),
    Utilities.Charset.UTF_8
  );

  return digest.map(function(byte) {
    const normalized = byte < 0 ? byte + 256 : byte;
    return ('0' + normalized.toString(16)).slice(-2);
  }).join('');
}

function sanitizeError_(error) {
  let message = '';

  if (error && error.message) {
    message = String(error.message);
  } else {
    message = String(error || 'Unknown error');
  }

  // Remove common secret/token-like strings from anything persisted to Sheets.
  return message
    .replace(/Bearer\s+[A-Za-z0-9._~+\/-]+=*/gi, 'Bearer [REDACTED]')
    .replace(/AIza[A-Za-z0-9_-]{20,}/g, '[REDACTED_API_KEY]')
    .replace(/[A-Fa-f0-9]{64,}/g, '[REDACTED_TOKEN]')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

function isSheetWriteFailure_(error) {
  return Boolean(error && error.isSheetWriteFailure);
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
