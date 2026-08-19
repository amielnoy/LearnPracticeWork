import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { createSign, generateKeyPairSync, type KeyObject } from 'node:crypto';
import { stubFetch, jsonResponse, type FetchStub } from '../support/fetchStub';
import {
  resetGoogleKeyCache,
  verifyGoogleIdToken,
  type VerifiedGoogleUser,
} from '@api-server/lib/googleAuth';

/**
 * Server-side verification of a Google ID token.
 *
 * The API suite proves this refuses things. That is only half a test: a
 * verifier that returned `null` unconditionally would pass every one of those
 * cases, and the site would sign nobody in while looking perfectly secure. So
 * this file signs tokens for real — a keypair generated in the test process, a
 * key set served in place of Google's — and the first assertion is that a
 * correct token is *accepted*. Everything after it is one property changed away
 * from that token, so each rejection is attributable to exactly one rule.
 */

const CLIENT_ID = '000000000000-test.apps.googleusercontent.com';
const KID = 'test-key-1';

const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const other = generateKeyPairSync('rsa', { modulusLength: 2048 });

function base64url(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

/** Google's key set, as the real endpoint publishes it. */
function keySet(key: KeyObject = publicKey, kid = KID): Response {
  const jwk = key.export({ format: 'jwk' });
  return jsonResponse({ keys: [{ ...jwk, kid, alg: 'RS256', use: 'sig' }] });
}

interface TokenOptions {
  claims?: Record<string, unknown>;
  header?: Record<string, unknown>;
  signWith?: KeyObject;
  /** Skips signing entirely, for the `alg: none` case. */
  unsigned?: boolean;
}

/** The claims a real Google ID token carries, for this site, right now. */
function validClaims(): Record<string, unknown> {
  const now = Math.floor(Date.now() / 1000);
  return {
    iss: 'https://accounts.google.com',
    aud: CLIENT_ID,
    sub: '112233445566778899000',
    email: 'Reader@Example.com',
    email_verified: true,
    name: 'שרה כהן',
    iat: now - 10,
    exp: now + 3600,
  };
}

function token(options: TokenOptions = {}): string {
  const header = base64url({ alg: 'RS256', kid: KID, ...options.header });
  const payload = base64url({ ...validClaims(), ...options.claims });
  if (options.unsigned) return `${header}.${payload}.${Buffer.from('x').toString('base64url')}`;

  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${payload}`);
  return `${header}.${payload}.${signer.sign(options.signWith ?? privateKey, 'base64url')}`;
}

let fetchStub: FetchStub;
let savedClientId: string | undefined;

test.beforeEach(async () => {
  await allure.layer('unit');
  await allure.feature('Google token verification');

  savedClientId = process.env.GOOGLE_CLIENT_ID;
  process.env.GOOGLE_CLIENT_ID = CLIENT_ID;
  // Each test starts from an empty cache, so a key set fetched by one cannot
  // decide the outcome of another.
  resetGoogleKeyCache();
  fetchStub = stubFetch(() => keySet());
});

test.afterEach(() => {
  fetchStub.restore();
  resetGoogleKeyCache();
  if (savedClientId === undefined) delete process.env.GOOGLE_CLIENT_ID;
  else process.env.GOOGLE_CLIENT_ID = savedClientId;
});

test.describe('a correctly signed token', () => {
  test('is accepted, and yields the account it names', async () => {
    const user = (await verifyGoogleIdToken(token())) as VerifiedGoogleUser;

    expect(user).not.toBeNull();
    expect(user.subject).toBe('112233445566778899000');
    // Lowercased on the way in, because a purchase is matched on it later and
    // Stripe and Google disagree about casing.
    expect(user.email).toBe('reader@example.com');
    expect(user.name).toBe('שרה כהן');
  });

  test('is fetched from Google’s published key set', async () => {
    await verifyGoogleIdToken(token());

    expect(fetchStub.only().url).toBe('https://www.googleapis.com/oauth2/v3/certs');
  });

  test('reuses the cached key set on the next token', async () => {
    await verifyGoogleIdToken(token());
    await verifyGoogleIdToken(token());

    // Once, not twice: the cache honours Google's cache-control, and a per-call
    // fetch would put a network round trip in front of every request.
    expect(fetchStub.calls).toHaveLength(1);
  });
});

test.describe('one property away from valid', () => {
  test('a different signing key is refused', async () => {
    expect(await verifyGoogleIdToken(token({ signWith: other.privateKey }))).toBeNull();
  });

  test('an unsigned token is refused', async () => {
    expect(
      await verifyGoogleIdToken(token({ header: { alg: 'none' }, unsigned: true })),
    ).toBeNull();
  });

  test('a token for another audience is refused', async () => {
    // A token minted for a different OAuth client is a real, Google-signed
    // token. It is simply not for this site.
    expect(
      await verifyGoogleIdToken(
        token({ claims: { aud: 'someone-else.apps.googleusercontent.com' } }),
      ),
    ).toBeNull();
  });

  test('a token from another issuer is refused', async () => {
    expect(
      await verifyGoogleIdToken(token({ claims: { iss: 'https://evil.example' } })),
    ).toBeNull();
  });

  test('an expired token is refused', async () => {
    const past = Math.floor(Date.now() / 1000) - 7200;
    expect(await verifyGoogleIdToken(token({ claims: { exp: past } }))).toBeNull();
  });

  test('a token issued in the future is refused', async () => {
    const ahead = Math.floor(Date.now() / 1000) + 7200;
    expect(await verifyGoogleIdToken(token({ claims: { iat: ahead } }))).toBeNull();
  });

  test('an unverified email is refused', async () => {
    // Google will happily attest an address the account holder never proved
    // they own. A purchase cannot be matched against one.
    expect(await verifyGoogleIdToken(token({ claims: { email_verified: false } }))).toBeNull();
  });

  test('a token with no email is refused', async () => {
    expect(await verifyGoogleIdToken(token({ claims: { email: undefined } }))).toBeNull();
  });
});

test.describe('key rotation', () => {
  test('refetches once when the key id is unknown', async () => {
    // Google rotates keys, so a `kid` that misses the cache is a reason to look
    // again rather than to reject.
    let served = 0;
    fetchStub.restore();
    fetchStub = stubFetch(() => {
      served += 1;
      // The first fetch answers with the old key; the second has the new one.
      return served === 1 ? keySet(other.publicKey, 'old-key') : keySet();
    });

    const user = await verifyGoogleIdToken(token());

    expect(user).not.toBeNull();
    expect(served).toBe(2);
  });

  test('gives up after one refetch rather than fetching per attempt', async () => {
    fetchStub.restore();
    fetchStub = stubFetch(() => keySet(other.publicKey, 'never-matches'));

    expect(await verifyGoogleIdToken(token())).toBeNull();
    expect(fetchStub.calls).toHaveLength(2);
  });
});

test.describe('when no OAuth client is configured', () => {
  test('nothing is accepted, and Google is never contacted', async () => {
    delete process.env.GOOGLE_CLIENT_ID;

    expect(await verifyGoogleIdToken(token())).toBeNull();
    expect(fetchStub.calls).toHaveLength(0);
  });
});
