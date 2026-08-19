import { test, expect, labelApiSuite } from '../support/apiFixtures';
import { KEYED_URL } from '../support/servers';

/**
 * `GET /api/entitlements/course` — the route that makes signing in mean
 * something.
 *
 * The browser decodes a Google ID token without verifying it, which is fine for
 * drawing a name in the corner and useless for deciding what someone may see.
 * This route verifies: signature against Google's published keys, then issuer,
 * audience, expiry and a verified email. So the tests worth having are the ones
 * that hand it tokens which are *shaped* right and prove none of them work.
 *
 * Every rejection below is decided before any key is fetched — a wrong segment
 * count, an algorithm that is not RS256, a missing key id — so the suite never
 * contacts Google and stays deterministic offline.
 */

test.beforeEach(async () => {
  await labelApiSuite('Entitlements');
});

const ROUTE = '/api/entitlements/course';

/** A syntactically valid JWT with the header and claims asked for, unsigned. */
function unsignedToken(header: object, claims: object = {}): string {
  const segment = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${segment(header)}.${segment(claims)}.${Buffer.from('not-a-signature').toString('base64url')}`;
}

test.describe('on a server with no OAuth client configured', () => {
  test('says so rather than answering', async ({ api }) => {
    // 503, not 401 and not `hasAccess: false`. "I cannot check" and "you have
    // not paid" are different answers and only one of them is true here.
    const response = await api.get(ROUTE);

    expect(response.status()).toBe(503);
    expect(await response.json()).toHaveProperty('error');
  });
});

test.describe('on a server with an OAuth client configured', () => {
  const url = `${KEYED_URL}${ROUTE}`;

  test('refuses a request with no token', async ({ api }) => {
    const response = await api.get(url);

    expect(response.status()).toBe(401);
    expect(await response.json()).toEqual({ error: 'A valid Google ID token is required.' });
  });

  test('refuses a token that is not a JWT', async ({ api }) => {
    const response = await api.get(url, { headers: { authorization: 'Bearer nonsense' } });

    expect(response.status()).toBe(401);
  });

  test('refuses an unsigned token', async ({ api }) => {
    // `alg: none` is the classic one. The verifier pins RS256 rather than
    // reading the algorithm out of the token, so this never reaches a key.
    const response = await api.get(url, {
      headers: {
        authorization: `Bearer ${unsignedToken(
          { alg: 'none' },
          { iss: 'https://accounts.google.com', sub: '1', email: 'a@example.com' },
        )}`,
      },
    });

    expect(response.status()).toBe(401);
  });

  test('refuses an RS256 token with no key id', async ({ api }) => {
    const response = await api.get(url, {
      headers: {
        authorization: `Bearer ${unsignedToken(
          { alg: 'RS256' },
          {
            iss: 'https://accounts.google.com',
            aud: '000000000000-test.apps.googleusercontent.com',
            sub: '1',
            email: 'a@example.com',
            email_verified: true,
            exp: Math.floor(Date.now() / 1000) + 3600,
          },
        )}`,
      },
    });

    // Every claim in that token is exactly what a real one carries. None of it
    // counts, because the signature is what makes claims mean anything.
    expect(response.status()).toBe(401);
  });

  test('a refusal says nothing about why', async ({ api }) => {
    const response = await api.get(url, { headers: { authorization: 'Bearer nonsense' } });
    const body = await response.text();

    expect(body).not.toMatch(/signature|audience|issuer|expired|kid/i);
  });
});
