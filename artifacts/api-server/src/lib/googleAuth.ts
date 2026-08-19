import { createPublicKey, verify as verifySignature, type KeyObject } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { logger } from './logger';

/**
 * Server-side verification of a Google ID token.
 *
 * The browser reads the same token to draw a name and an avatar, and is right
 * not to verify it — it has no way to. Nothing on the client side changes here.
 * What changes is that a token now also travels to this server when it is being
 * used to decide something, and here it is checked properly: signature against
 * Google's published keys, issuer, audience, expiry, and a verified email.
 * Anything less and "signed in as" is a claim the caller makes about itself.
 *
 * No library: RS256 is a signature this runtime already verifies, and Google's
 * key set is one well-known JSON document. What that buys is that the rules
 * below are readable in one place rather than configured somewhere.
 */

const JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const VALID_ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);

/** Tolerance for a client clock that disagrees with Google's, in seconds. */
const CLOCK_SKEW_SECONDS = 60;

/** Floor on how long a fetched key set is reused, when Google says nothing. */
const DEFAULT_JWKS_TTL_MS = 60 * 60 * 1000;

export interface VerifiedGoogleUser {
  /** The `sub` claim: stable per account, and what records should key on. */
  subject: string;
  email: string;
  name: string;
  /** Epoch milliseconds at which the token stops being acceptable. */
  expiresAt: number;
}

interface JsonWebKey {
  kid?: string;
  kty?: string;
  alg?: string;
  use?: string;
  n?: string;
  e?: string;
}

interface CachedKeys {
  keys: Map<string, KeyObject>;
  expiresAt: number;
}

let cache: CachedKeys | undefined;
let inFlight: Promise<CachedKeys> | undefined;

export function googleClientId(): string | undefined {
  const id = process.env.GOOGLE_CLIENT_ID?.trim();
  return id ? id : undefined;
}

/** Whether sign-in-backed routes can work at all on this deployment. */
export function isGoogleAuthConfigured(): boolean {
  return googleClientId() !== undefined;
}

function maxAgeMs(cacheControl: string | null): number {
  const match = cacheControl && /max-age=(\d+)/i.exec(cacheControl);
  const seconds = match ? Number(match[1]) : NaN;
  return Number.isSafeInteger(seconds) && seconds > 0 ? seconds * 1000 : DEFAULT_JWKS_TTL_MS;
}

async function fetchKeys(): Promise<CachedKeys> {
  const response = await fetch(JWKS_URL, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Could not fetch Google signing keys: ${response.status}`);
  }

  const body = (await response.json()) as { keys?: JsonWebKey[] };
  const keys = new Map<string, KeyObject>();

  for (const jwk of body.keys ?? []) {
    // Only RSA signing keys are usable here, and a key with no id cannot be
    // selected by a token's header. Skipping rather than failing keeps one odd
    // entry in the set from taking down every sign-in.
    if (!jwk.kid || jwk.kty !== 'RSA' || (jwk.alg && jwk.alg !== 'RS256')) continue;
    try {
      keys.set(jwk.kid, createPublicKey({ key: jwk as never, format: 'jwk' }));
    } catch (err) {
      logger.warn({ err, kid: jwk.kid }, 'Skipped an unreadable Google signing key');
    }
  }

  if (keys.size === 0) {
    throw new Error('Google signing key set contained no usable RSA keys');
  }

  return { keys, expiresAt: Date.now() + maxAgeMs(response.headers.get('cache-control')) };
}

/**
 * The current key set, fetched at most once at a time.
 *
 * Google rotates these, so a `kid` that misses is a reason to refetch rather
 * than to reject — but only once per call, or an invalid token becomes a way to
 * make this server hammer Google.
 */
async function keySet(forceRefresh = false): Promise<CachedKeys> {
  if (!forceRefresh && cache && cache.expiresAt > Date.now()) return cache;
  if (!forceRefresh && inFlight) return inFlight;

  inFlight = fetchKeys()
    .then(fetched => {
      cache = fetched;
      return fetched;
    })
    .finally(() => {
      inFlight = undefined;
    });

  return inFlight;
}

function decodeSegment(segment: string): unknown {
  return JSON.parse(Buffer.from(segment, 'base64url').toString('utf8')) as unknown;
}

interface IdTokenClaims {
  iss?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean | string;
  name?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
}

/**
 * Verifies a Google ID token, or returns null.
 *
 * Every rejection returns the same thing for the same reason the client-side
 * decoder does: the caller's response to "this token is not good" does not vary
 * with why, and a response that varies is a response that teaches an attacker
 * something. The reason is logged, not returned.
 */
export async function verifyGoogleIdToken(
  token: string,
  now = Date.now(),
): Promise<VerifiedGoogleUser | null> {
  const audience = googleClientId();
  if (!audience) return null;

  const segments = token.split('.');
  if (segments.length !== 3) return null;

  let header: { alg?: string; kid?: string };
  let claims: IdTokenClaims;
  try {
    header = decodeSegment(segments[0]) as { alg?: string; kid?: string };
    claims = decodeSegment(segments[1]) as IdTokenClaims;
  } catch {
    return null;
  }

  // Pinned, not read from the token: accepting whatever `alg` the token names
  // is how "none" and key-confusion attacks get in.
  if (header.alg !== 'RS256' || !header.kid) return null;

  const signingInput = Buffer.from(`${segments[0]}.${segments[1]}`, 'utf8');
  const signature = Buffer.from(segments[2], 'base64url');

  let keys = await keySet();
  let key = keys.keys.get(header.kid);
  if (!key) {
    // Unknown key id: Google may have rotated since the set was cached.
    keys = await keySet(true);
    key = keys.keys.get(header.kid);
  }
  if (!key) return null;

  if (!verifySignature('sha256', signingInput, key, signature)) return null;

  // Only past this line do the claims mean anything.
  if (!claims.iss || !VALID_ISSUERS.has(claims.iss)) return null;
  if (claims.aud !== audience) return null;
  if (typeof claims.exp !== 'number') return null;

  const nowSeconds = now / 1000;
  if (claims.exp + CLOCK_SKEW_SECONDS <= nowSeconds) return null;
  if (typeof claims.iat === 'number' && claims.iat - CLOCK_SKEW_SECONDS > nowSeconds) return null;
  if (typeof claims.nbf === 'number' && claims.nbf - CLOCK_SKEW_SECONDS > nowSeconds) return null;

  // An unverified address is one the account holder never proved they own, so
  // it cannot be what a purchase is matched against.
  const emailVerified = claims.email_verified === true || claims.email_verified === 'true';
  if (!claims.sub || !claims.email || !emailVerified) return null;

  return {
    subject: claims.sub,
    email: claims.email.trim().toLowerCase(),
    name: claims.name ?? claims.email,
    expiresAt: claims.exp * 1000,
  };
}

function bearerToken(req: Request): string {
  const match = /^Bearer[ ]+(.+)$/i.exec((req.get('authorization') ?? '').trim());
  return match ? match[1].trim() : '';
}

/**
 * The verified caller, or null when there is no usable token.
 *
 * For routes that behave differently for a signed-in visitor but still work
 * without one — checkout being the case that matters, since buying the course
 * must not require an account.
 */
export async function verifiedGoogleUser(req: Request): Promise<VerifiedGoogleUser | null> {
  const token = bearerToken(req);
  if (!token) return null;
  try {
    return await verifyGoogleIdToken(token);
  } catch (err) {
    // A network failure reaching Google is not the caller's fault, but it is
    // also not proof of identity: treat it as signed out and say so in the log.
    logger.warn({ err, requestId: req.id }, 'Could not verify a Google ID token');
    return null;
  }
}

/** Express typing for a request that has been through `requireGoogleUser`. */
export interface AuthenticatedRequest extends Request {
  googleUser: VerifiedGoogleUser;
}

/** Rejects the request unless it carries a verified Google ID token. */
export async function requireGoogleUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!isGoogleAuthConfigured()) {
    res.status(503).json({ error: 'Sign-in is not configured on this server.' });
    return;
  }

  const user = await verifiedGoogleUser(req);
  if (!user) {
    res.status(401).json({ error: 'A valid Google ID token is required.' });
    return;
  }

  (req as AuthenticatedRequest).googleUser = user;
  next();
}
