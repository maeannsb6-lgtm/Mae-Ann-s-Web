import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/mae.js';
import { recall } from '../api/_mae-brain.js';

function responseMock() {
  return {
    statusCode: 200, body: null, headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}
const request = (body, method = 'POST') => ({
  method, body, headers: { 'x-forwarded-for': `203.0.113.${Math.floor(Math.random() * 200) + 1}` }, socket: {},
});

test('recall finds the solar project and pulls in linked facts', () => {
  const labels = recall('Tell me about her solar proposal app').map((n) => n.label);
  assert.equal(labels[0], 'Solar Proposal System');
  assert.ok(labels.includes('SUWECO Tablas Energy'));
});

test('recall falls back to the profile for vague questions', () => {
  assert.ok(recall('hello?').length > 0);
});

test('rejects non-POST and empty questions', async () => {
  let res = responseMock();
  await handler(request(null, 'GET'), res);
  assert.equal(res.statusCode, 405);
  res = responseMock();
  await handler(request({ message: '  ' }), res);
  assert.equal(res.statusCode, 400);
});

test('reports unconfigured Gemini key and calls Gemini when set', async () => {
  const saved = process.env.GEMINI_API_KEY;
  const realFetch = globalThis.fetch;
  try {
    delete process.env.GEMINI_API_KEY;
    let res = responseMock();
    await handler(request({ message: 'hi' }), res);
    assert.equal(res.statusCode, 503);

    process.env.GEMINI_API_KEY = 'test-key';
    let sent;
    globalThis.fetch = async (url, init) => {
      sent = { url, init };
      return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: 'Hello from Mae' }] } }] }) };
    };
    res = responseMock();
    await handler(request({ message: 'What is her solar project?' }), res);
    assert.equal(res.body.reply, 'Hello from Mae');
    assert.match(sent.url, /generativelanguage\.googleapis\.com/);
    assert.match(sent.init.body, /Solar Proposal System/);
    assert.equal(sent.init.headers['x-goog-api-key'], 'test-key');
  } finally {
    globalThis.fetch = realFetch;
    if (saved === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = saved;
  }
});
