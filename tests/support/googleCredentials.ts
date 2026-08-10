/**
 * Google ID tokens for tests.
 *
 * These are unsigned, and deliberately so: the site reads the token without
 * verifying it — see `lib/googleIdentity.ts` for why that is the limit of what
 * sign-in claims here — so a real signature would prove nothing that a fake one
 * does not. What the shape has to be right about is everything the reader does
 * look at: three segments, a base64url payload, and an `exp`.
 */

const base64url = (value: unknown): string =>
  Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');

export interface CredentialClaims {
  name?: string;
  email?: string;
  picture?: string;
  /** Seconds since the epoch, as Google sends it. */
  exp?: number;
}

/** One hour ahead of `from`, which is how long Google's tokens tend to last. */
export const oneHourFrom = (from: number): number => Math.floor((from + 60 * 60 * 1000) / 1000);

/**
 * A credential carrying exactly the claims given. Nothing is filled in, so a
 * test asking for a token with no `exp` gets one with no `exp`.
 */
export function credentialWith(claims: CredentialClaims): string {
  return `${base64url({ alg: 'RS256', typ: 'JWT' })}.${base64url(claims)}.signature`;
}

/** A credential for a signed-in person, valid for an hour from now. */
export function validCredential(overrides: CredentialClaims = {}): string {
  return credentialWith({
    name: 'Amiel Peled',
    email: 'amiel@organuz.ai',
    picture: 'https://lh3.googleusercontent.com/a/portrait',
    exp: oneHourFrom(Date.now()),
    ...overrides,
  });
}
