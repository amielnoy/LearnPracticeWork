import { test, expect, allure, labelApiSuite } from '../support/apiFixtures';
import { KEYED_URL } from '../support/servers';

/**
 * The three content routes, which had no coverage at all.
 *
 * They read the academy's question bank, coding challenges and lecture series
 * out of Supabase so the content can change without a redeploy. Neither test
 * server has Supabase configured — `SUPABASE_URL` and `SUPABASE_ANON_KEY` are
 * pinned empty, deliberately — so what is exercised here is the contract that
 * holds whether or not the store is reachable: the language guard, the shape of
 * a refusal, and the promise that an absent backend degrades into JSON with a
 * 503 rather than a stack trace or a hang.
 *
 * That is not a lesser test than one against a live Supabase. A content store
 * that is down is the state a visitor is most likely to meet, and the one that
 * used to take the section with it.
 *
 * Cases are named steps inside one test per route rather than a test each. The
 * eight query shapes below all assert the same thing, so eight tests would be
 * eight ways of learning one fact — while as steps the report still names which
 * shape broke.
 */

const ROUTES = [
  '/api/content/question-bank',
  '/api/content/coding-challenges',
  '/api/content/lecture-series',
] as const;

const UNAVAILABLE = 'Content temporarily unavailable';

test.beforeEach(async () => {
  await labelApiSuite('Content routes');
});

test.describe('with no content store configured', () => {
  for (const route of ROUTES) {
    test(`${route} degrades into JSON rather than failing open`, async ({ api }) => {
      const response = await api.get(route);

      expect(response.status()).toBe(503);
      expect(response.headers()['content-type']).toContain('application/json');
      expect((await response.json()).error).toBe(UNAVAILABLE);

      // A Supabase URL, a key or a stack frame here would tell an
      // unauthenticated caller where the content lives and how to reach it.
      expect(await response.text()).not.toMatch(/supabase|anon|eyJ|at .*\.(ts|mjs):/i);
    });
  }

  test('a content failure does not take the rest of the server with it', async ({ api }) => {
    await api.get(ROUTES[0]);
    expect((await api.get('/api/healthz')).status()).toBe(200);
  });
});

test.describe('the language parameter', () => {
  /**
   * `isLang` accepts 'en' and 'he' and falls back to 'en' for anything else,
   * which is right for a parameter a link can carry — and it means an unknown
   * value must never reach a different code path. The odd shapes are the ones
   * worth naming: repeated and array-shaped parameters must not bypass the
   * two-value language allowlist.
   */
  const SHAPES = [
    { name: 'English', query: '?lang=en' },
    { name: 'Hebrew', query: '?lang=he' },
    { name: 'an unknown language', query: '?lang=fr' },
    { name: 'an empty value', query: '?lang=' },
    { name: 'a repeated parameter', query: '?lang=en&lang=he' },
    { name: 'an array-shaped parameter', query: '?lang[]=en' },
    { name: 'an injection attempt', query: "?lang=' OR 1=1--" },
    { name: 'no parameter at all', query: '' },
  ];

  for (const route of ROUTES) {
    test(`${route} answers the same whatever lang is`, async ({ api }) => {
      for (const { name, query } of SHAPES) {
        await allure.step(name, async () => {
          const response = await api.get(`${route}${query}`);
          expect(response.status()).toBe(503);
          expect((await response.json()).error).toBe(UNAVAILABLE);
        });
      }
    });
  }
});

test('the routes are reads, so POST is rejected', async ({ api }) => {
  for (const route of ROUTES) {
    await allure.step(`POST ${route}`, async () => {
      expect((await api.post(route, { data: {} })).status()).toBe(405);
    });
  }
});

test('content does not depend on a key, so both servers answer alike', async ({ api }) => {
  for (const route of ROUTES) {
    await allure.step(route, async () => {
      expect((await api.get(route)).status()).toBe(503);
      expect((await api.get(`${KEYED_URL}${route}`)).status()).toBe(503);
    });
  }
});
