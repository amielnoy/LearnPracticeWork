import { test, expect, labelApiSuite } from '../support/apiFixtures';
import { ADMIN_TOKEN, KEYED_URL } from '../support/servers';

/**
 * The gate in front of `POST /api/stripe/seed`.
 *
 * The route creates a product and a $50 price in a live Stripe account. Until
 * recently the only thing standing in front of it was a comment calling it a
 * "one-time admin endpoint", which is a description, not a control. These tests
 * are what makes it a control.
 *
 * Nothing here can create anything: neither server has Stripe credentials, so
 * the furthest an authorised call gets is the error from trying to fetch them —
 * which is exactly the assertion that proves the gate opened.
 */

test.beforeEach(async () => {
  await labelApiSuite('Admin authentication');
});

const SEED = '/api/stripe/seed';

test.describe('with no admin token configured', () => {
  test('the route is not there at all', async ({ api }) => {
    // 404 rather than 401: a deployment that never set ADMIN_API_TOKEN should
    // not advertise that an admin surface exists, and forgetting to set it must
    // fail closed rather than open.
    const response = await api.post(SEED);

    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({ error: 'Not found' });
  });

  test('a token does not conjure it into existence', async ({ api }) => {
    const response = await api.post(SEED, {
      headers: { authorization: `Bearer ${ADMIN_TOKEN}` },
    });

    expect(response.status()).toBe(404);
  });
});

test.describe('with an admin token configured', () => {
  test('an unauthenticated call is refused', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}${SEED}`);

    expect(response.status()).toBe(401);
    expect(await response.json()).toEqual({ error: 'Unauthorized' });
  });

  test('a wrong token is refused', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}${SEED}`, {
      headers: { authorization: 'Bearer not-the-admin-token' },
    });

    expect(response.status()).toBe(401);
  });

  test('a token in the wrong scheme is refused', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}${SEED}`, {
      headers: { authorization: ADMIN_TOKEN },
    });

    expect(response.status()).toBe(401);
  });

  test('a prefix of the token is refused', async ({ api }) => {
    // The comparison hashes both sides before comparing, so a shorter value can
    // never take a different path through it than a wrong-but-equal-length one.
    const response = await api.post(`${KEYED_URL}${SEED}`, {
      headers: { authorization: `Bearer ${ADMIN_TOKEN.slice(0, -1)}` },
    });

    expect(response.status()).toBe(401);
  });

  test('the right token gets through to Stripe, which is what then fails', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}${SEED}`, {
      headers: { authorization: `Bearer ${ADMIN_TOKEN}` },
    });

    // Past the gate. Without a connected integration the handler cannot fetch
    // credentials, so this is the 500 the other Stripe routes give — not a 401,
    // and not a created product.
    expect(response.status()).toBe(500);
    expect(typeof (await response.json()).error).toBe('string');
  });

  test('refusals disclose nothing about the expected token', async ({ api }) => {
    const response = await api.post(`${KEYED_URL}${SEED}`, {
      headers: { authorization: 'Bearer wrong' },
    });

    const body = await response.text();
    expect(body).not.toContain(ADMIN_TOKEN);
    expect(body).not.toMatch(/length|expected|ADMIN_API_TOKEN/i);
  });
});
