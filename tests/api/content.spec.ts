import { test, expect, labelApiSuite } from '../support/apiFixtures';

/**
 * `/api/content/*` serves the question bank, coding challenges, and lecture
 * series from Supabase instead of the bundled TS files. The keyless instance
 * runs with SUPABASE_URL/SUPABASE_ANON_KEY unset (see `support/servers.ts`),
 * so every route here takes the "content temporarily unavailable" branch —
 * the same branch a real outage or a not-yet-configured deployment hits. The
 * important behaviour is that a missing/unreachable Supabase project degrades
 * to a clean JSON error rather than a crash or an HTML stack trace, which is
 * what lets the frontend's fallback-to-bundled-content logic actually work.
 */

test.beforeEach(async () => {
  await labelApiSuite('Content');
});

for (const path of [
  '/api/content/question-bank',
  '/api/content/coding-challenges',
  '/api/content/lecture-series',
]) {
  test(`GET ${path} degrades to a clean JSON error when Supabase is not configured`, async ({
    api,
  }) => {
    const response = await api.get(path);

    expect(response.status()).toBe(503);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(typeof body.error).toBe('string');
    expect(body.error.length).toBeGreaterThan(0);
  });

  test(`GET ${path} accepts a lang query param without erroring differently`, async ({ api }) => {
    const response = await api.get(`${path}?lang=he`);
    expect(response.status()).toBe(503);
  });
}

test('an unsupported lang value falls back to English instead of 400ing', async ({ api }) => {
  // isLang() in routes/content.ts rejects anything but 'en'/'he' and defaults
  // to 'en' rather than reflecting the bad value back as a validation error.
  const response = await api.get('/api/content/question-bank?lang=fr');
  expect(response.status()).toBe(503);
});
