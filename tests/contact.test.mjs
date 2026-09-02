import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

function responseMock() {
  return {
    statusCode: 200,
    body: null,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function request(body, method = 'POST') {
  return { method, body, headers: { 'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200) + 1}` }, socket: {} };
}

test('rejects methods other than POST', async () => {
  const response = responseMock();
  await handler(request(null, 'GET'), response);
  assert.equal(response.statusCode, 405);
  assert.equal(response.body.success, false);
});

test('rejects honeypot submissions', async () => {
  const response = responseMock();
  await handler(request({ website: 'spam.example' }), response);
  assert.equal(response.statusCode, 400);
});

test('validates email addresses server-side', async () => {
  const response = responseMock();
  await handler(request({
    fullName: 'Test Visitor', email: 'invalid', company: '', inquiryType: 'Automation',
    message: 'A sufficiently detailed inquiry.', clientSubmissionId: 'test-valid-id-12345678', website: '',
  }), response);
  assert.equal(response.statusCode, 400);
  assert.match(response.body.message, /valid email/i);
});

test('reports missing backend configuration without exposing secrets', async () => {
  const previous = {
    supabaseUrl: process.env.SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    appsUrl: process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL,
    contactSecret: process.env.CONTACT_FORM_SECRET,
  };
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL;
  delete process.env.CONTACT_FORM_SECRET;

  const response = responseMock();
  await handler(request({
    fullName: 'Test Visitor', email: 'visitor@example.com', company: '', inquiryType: 'Process Improvement',
    message: 'I would like to discuss a workflow.', clientSubmissionId: 'test-valid-id-12345678', website: '',
  }), response);
  assert.equal(response.statusCode, 500);
  assert.equal(response.body.success, false);
  assert.doesNotMatch(JSON.stringify(response.body), /service_role|secret/i);

  if (previous.supabaseUrl) process.env.SUPABASE_URL = previous.supabaseUrl;
  if (previous.serviceKey) process.env.SUPABASE_SERVICE_ROLE_KEY = previous.serviceKey;
  if (previous.appsUrl) process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL = previous.appsUrl;
  if (previous.contactSecret) process.env.CONTACT_FORM_SECRET = previous.contactSecret;
});
