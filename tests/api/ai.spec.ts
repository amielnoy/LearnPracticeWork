import { test, expect, allure, labelApiSuite } from '../support/apiFixtures';
import { KEYED_URL, LIMITED_URL, DUMMY_GEMINI_KEY } from '../support/servers';

/**
 * The AI proxy, tested against both server configurations.
 *
 * The default `baseURL` is the instance with no Gemini key. The keyed instance
 * is addressed absolutely and is only ever sent invalid requests, so nothing
 * here can reach Gemini.
 *
 * Calls go through the `api` fixture rather than Playwright's `request`, so the
 * report carries the request and the response for every one of them.
 */

test.beforeEach(async () => {
  await labelApiSuite('AI proxy');
});

test.describe('no server-side key configured', () => {
  test('tells the client no default key exists', async ({ api }) => {
    const response = await api.get('/api/ai/config');

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({
      gemini: {
        available: false,
        defaultModel: 'gemini-2.5-flash',
        anonymousDailyQuota: 1000,
      },
    });
  });

  test('refuses to generate, with a status that says "not configured"', async ({ api }) => {
    const response = await api.post('/api/ai/generate', {
      data: { messages: [{ role: 'user', content: 'hi' }] },
    });

    expect(response.status()).toBe(503);
    expect(await response.json()).toHaveProperty('error');
  });

  test('rejects before reading the body, so no upstream call is attempted', async ({ api }) => {
    const response = await api.post('/api/ai/generate', { data: {} });
    expect(response.status()).toBe(503);
  });
});

test.describe('server-side key configured', () => {
  test('advertises the default key without revealing it', async ({ api }) => {
    const response = await api.get(`${KEYED_URL}/api/ai/config`);
    const body = await response.json();

    expect(body).toEqual({
      gemini: {
        available: true,
        defaultModel: 'gemini-2.5-flash',
        anonymousDailyQuota: 1000,
      },
    });
    expect(JSON.stringify(body)).not.toContain(DUMMY_GEMINI_KEY);
  });

  test('requires a messages array', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}/api/ai/generate`, { data: {} });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Invalid request body');
    expect(body.issues[0].path).toContain('messages');
  });

  test('rejects an empty conversation', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { messages: [] },
    });

    expect(response.status()).toBe(400);
  });

  test('rejects a messages field that is not an array', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { messages: 'hello' },
    });

    expect(response.status()).toBe(400);
  });

  test('never echoes the server key in an error', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { model: 'gemini-2.5-pro' },
    });

    expect(await response.text()).not.toContain(DUMMY_GEMINI_KEY);
  });

  test('strictly validates roles, token bounds, and unknown fields', async ({ api }) => {
    // Named cases rather than a bare loop: in the report each one is its own
    // step, so a failure says which rule stopped being enforced instead of
    // pointing at an index.
    const cases = [
      { rule: 'the system role is not accepted', data: { messages: [{ role: 'system', content: 'not allowed' }] } },
      { rule: 'maxTokens above the ceiling', data: { messages: [{ role: 'user', content: 'hello' }], maxTokens: 4_001 } },
      { rule: 'unknown top-level fields', data: { messages: [{ role: 'user', content: 'hello' }], unexpected: true } },
    ];

    for (const { rule, data } of cases) {
      await allure.step(`rejects ${rule}`, async () => {
        const response = await api.post(`${KEYED_URL}/api/ai/generate`, { data });
        expect(response.status()).toBe(400);
        expect((await response.json()).error).toBe('Invalid request body');
      });
    }
  });

  test('rejects request bodies above the configured parser limit', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { messages: [{ role: 'user', content: 'x'.repeat(100_000) }] },
    });

    expect(response.status()).toBe(413);
    expect(await response.json()).toEqual({ error: 'Request body is too large' });
  });

  test('only returns CORS permission for an allowlisted production origin', async ({ api }) => {
    // The call itself is already a named step, so the origin under test is
    // spelled out in the step name rather than wrapped in another layer.
    const allowed = await api.get(`${KEYED_URL}/api/ai/config`, {
      headers: { Origin: 'https://academy.example' },
    });
    const rejected = await api.get(`${KEYED_URL}/api/ai/config`, {
      headers: { Origin: 'https://attacker.example' },
    });

    expect(allowed.headers()['access-control-allow-origin']).toBe('https://academy.example');
    expect(rejected.headers()['access-control-allow-origin']).toBeUndefined();
  });
});

test.describe('per-IP quota', () => {
  test('returns 429 after the configured daily allowance', async ({ api }) => {
    await allure.step('spend the daily allowance', async () => {
      for (let attempt = 0; attempt < 2; attempt++) {
        const response = await api.post(`${LIMITED_URL}/api/ai/generate`, { data: {} });
        expect(response.status()).toBe(400);
      }
    });

    await allure.step('the next call is refused', async () => {
      const blocked = await api.post(`${LIMITED_URL}/api/ai/generate`, { data: {} });
      expect(blocked.status()).toBe(429);
      expect((await blocked.json()).error).toContain('Daily');
    });
  });
});
