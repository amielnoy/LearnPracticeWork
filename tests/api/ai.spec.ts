import { test, expect } from '@playwright/test';
import { KEYED_URL, DUMMY_GEMINI_KEY } from '../support/servers';

/**
 * The AI proxy, tested against both server configurations.
 *
 * The default `baseURL` is the instance with no Gemini key. The keyed instance
 * is addressed absolutely and is only ever sent invalid requests, so nothing
 * here can reach Gemini.
 */

test.describe('no server-side key configured', () => {
  test('tells the client no default key exists', async ({ request }) => {
    const response = await request.get('/api/ai/config');

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({
      gemini: { available: false, defaultModel: 'gemini-2.5-flash' },
    });
  });

  test('refuses to generate, with a status that says "not configured"', async ({ request }) => {
    const response = await request.post('/api/ai/generate', {
      data: { messages: [{ role: 'user', content: 'hi' }] },
    });

    expect(response.status()).toBe(503);
    expect(await response.json()).toHaveProperty('error');
  });

  test('rejects before reading the body, so no upstream call is attempted', async ({
    request,
  }) => {
    const response = await request.post('/api/ai/generate', { data: {} });
    expect(response.status()).toBe(503);
  });
});

test.describe('server-side key configured', () => {
  test('advertises the default key without revealing it', async ({ request }) => {
    const response = await request.get(`${KEYED_URL}/api/ai/config`);
    const body = await response.json();

    expect(body).toEqual({
      gemini: { available: true, defaultModel: 'gemini-2.5-flash' },
    });
    expect(JSON.stringify(body)).not.toContain(DUMMY_GEMINI_KEY);
  });

  test('requires a messages array', async ({ request }) => {
    const response = await request.post(`${KEYED_URL}/api/ai/generate`, { data: {} });

    expect(response.status()).toBe(400);
    expect((await response.json()).error).toContain('messages');
  });

  test('rejects an empty conversation', async ({ request }) => {
    const response = await request.post(`${KEYED_URL}/api/ai/generate`, {
      data: { messages: [] },
    });

    expect(response.status()).toBe(400);
  });

  test('rejects a messages field that is not an array', async ({ request }) => {
    const response = await request.post(`${KEYED_URL}/api/ai/generate`, {
      data: { messages: 'hello' },
    });

    expect(response.status()).toBe(400);
  });

  test('never echoes the server key in an error', async ({ request }) => {
    const response = await request.post(`${KEYED_URL}/api/ai/generate`, {
      data: { model: 'gemini-2.5-pro' },
    });

    expect(await response.text()).not.toContain(DUMMY_GEMINI_KEY);
  });
});
