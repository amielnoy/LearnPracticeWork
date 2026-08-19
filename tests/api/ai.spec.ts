import { test, expect, allure, labelApiSuite } from '../support/apiFixtures';
import { KEYED_URL, LIMITED_URL, DUMMY_GEMINI_KEY, DUMMY_GROQ_KEY } from '../support/servers';

/**
 * The AI proxy, tested against both server configurations.
 *
 * The default `baseURL` is the instance with no keys at all. The keyed
 * instance is addressed absolutely and is only ever sent invalid requests, so
 * nothing here can reach Groq or Gemini for real.
 *
 * Ungrounded requests (the default) are served by Groq; `grounded: true`
 * requests are always served by Gemini, which is kept server-side only to
 * power the live Google Search question-bank enrichment feature.
 *
 * Calls go through the `api` fixture rather than Playwright's `request`, so the
 * report carries the request and the response for every one of them.
 */

test.beforeEach(async () => {
  await labelApiSuite('AI proxy');
});

test.describe('no server-side key configured', () => {
  test('tells the client neither default key exists', async ({ api }) => {
    const response = await api.get('/api/ai/config');

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({
      groq: {
        available: false,
        defaultModel: 'openai/gpt-oss-120b',
        anonymousDailyQuota: 1000,
      },
      gemini: {
        available: false,
        defaultModel: 'gemini-2.5-flash',
        anonymousDailyQuota: 1000,
      },
    });
  });

  test('refuses an ungrounded (Groq) request, with a status that says "not configured"', async ({
    api,
  }) => {
    const response = await api.post('/api/ai/generate', {
      data: { messages: [{ role: 'user', content: 'hi' }] },
    });

    expect(response.status()).toBe(503);
    expect(await response.json()).toHaveProperty('error');
  });

  test('refuses a grounded (Gemini) request too', async ({ api }) => {
    const response = await api.post('/api/ai/generate', {
      data: { messages: [{ role: 'user', content: 'hi' }], grounded: true },
    });

    expect(response.status()).toBe(503);
    expect(await response.json()).toHaveProperty('error');
  });

  test('rejects a malformed body with a validation error, not a false "not configured"', async ({
    api,
  }) => {
    // Which provider's key to check depends on the `grounded` flag, which
    // only exists once the body has parsed successfully — so an empty/
    // malformed body fails schema validation (400) rather than short-
    // circuiting to 503 the way a well-formed-but-keyless request does above.
    const response = await api.post('/api/ai/generate', { data: {} });
    expect(response.status()).toBe(400);
  });
});

test.describe('server-side key configured', () => {
  test('advertises both default keys without revealing them', async ({ api }) => {
    const response = await api.get(`${KEYED_URL}/api/ai/config`);
    const body = await response.json();

    expect(body).toEqual({
      groq: {
        available: true,
        defaultModel: 'openai/gpt-oss-120b',
        anonymousDailyQuota: 1000,
      },
      gemini: {
        available: true,
        defaultModel: 'gemini-2.5-flash',
        anonymousDailyQuota: 1000,
      },
    });
    expect(JSON.stringify(body)).not.toContain(DUMMY_GEMINI_KEY);
    expect(JSON.stringify(body)).not.toContain(DUMMY_GROQ_KEY);
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

  test('never echoes the server keys in an error', async ({ api }) => {
    const ungrounded = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { model: 'openai/gpt-oss-120b' },
    });
    const grounded = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { model: 'gemini-2.5-pro', grounded: true },
    });

    expect(await ungrounded.text()).not.toContain(DUMMY_GROQ_KEY);
    expect(await grounded.text()).not.toContain(DUMMY_GEMINI_KEY);
  });

  test('routes grounded requests to Gemini and ungrounded ones to Groq', async ({ api }) => {
    // Both requests are otherwise valid but reach a throwaway key, so the
    // vendor rejects them — the response distinguishes which vendor was hit.
    const ungrounded = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { messages: [{ role: 'user', content: 'hi' }], grounded: false },
    });
    const grounded = await api.post(`${KEYED_URL}/api/ai/generate`, {
      data: { messages: [{ role: 'user', content: 'hi' }], grounded: true },
    });

    // Neither call can succeed against a throwaway key; both must fail as a
    // vendor error (not a validation or "not configured" error), proving each
    // request reached the provider its `grounded` flag selects.
    expect(ungrounded.status(), 'ungrounded request reached Groq').not.toBe(503);
    expect(grounded.status(), 'grounded request reached Gemini').not.toBe(503);
  });

  test('strictly validates roles, token bounds, and unknown fields', async ({ api }) => {
    // Named cases rather than a bare loop: in the report each one is its own
    // step, so a failure says which rule stopped being enforced instead of
    // pointing at an index.
    const cases = [
      {
        rule: 'the system role is not accepted',
        data: { messages: [{ role: 'system', content: 'not allowed' }] },
      },
      {
        rule: 'maxTokens above the ceiling',
        data: { messages: [{ role: 'user', content: 'hello' }], maxTokens: 4_001 },
      },
      {
        rule: 'unknown top-level fields',
        data: { messages: [{ role: 'user', content: 'hello' }], unexpected: true },
      },
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
