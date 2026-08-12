import { test, expect } from '@playwright/test';
import { decodeCredential } from '@academy/lib/googleIdentity';

/**
 * Reading the profile out of a Google ID token.
 *
 * The token is read, never verified — see the note at the top of the module for
 * why that is acceptable for a name in the header and would not be for anything
 * else. What matters here is that reading it is total: every malformed,
 * expired, or unexpected token has to come back as "nobody is signed in",
 * because this runs on page load and a throw would take the site down before
 * anything rendered.
 */

const HOUR_MS = 60 * 60 * 1000;
const NOW = Date.UTC(2026, 0, 1, 12, 0, 0);

/** A credential shaped like Google's: three base64url segments, unsigned. */
function credential(claims: Record<string, unknown>): string {
  const encode = (value: unknown) =>
    Buffer.from(JSON.stringify(value), 'utf8')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  // The signature is never checked, so its content is irrelevant — but its
  // presence is not: a two-segment token is not an ID token.
  return `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode(claims)}.signature`;
}

const validClaims = (overrides: Record<string, unknown> = {}) => ({
  name: 'Amiel Peled',
  email: 'amiel@organuz.ai',
  picture: 'https://lh3.googleusercontent.com/a/portrait',
  exp: Math.floor((NOW + HOUR_MS) / 1000),
  ...overrides,
});

test.describe('decodeCredential', () => {
  test('reads the profile the header shows', () => {
    const user = decodeCredential(credential(validClaims()), NOW);

    expect(user).toEqual({
      name: 'Amiel Peled',
      email: 'amiel@organuz.ai',
      picture: 'https://lh3.googleusercontent.com/a/portrait',
      expiresAt: NOW + HOUR_MS,
    });
  });

  test('carries a Hebrew name through as Hebrew', () => {
    // The reason the payload is decoded as UTF-8 rather than through `atob`
    // alone: half this site's audience has a name outside ASCII, and byte-wise
    // decoding turns "אמיאל" into mojibake in the corner of every page.
    const user = decodeCredential(credential(validClaims({ name: 'אמיאל פלד' })), NOW);

    expect(user?.name).toBe('אמיאל פלד');
  });

  test('falls back to the address when Google sends no name', () => {
    const user = decodeCredential(credential(validClaims({ name: undefined })), NOW);

    expect(user?.name).toBe('amiel@organuz.ai');
  });

  test('treats an expired credential as signed out', () => {
    const expired = credential(validClaims({ exp: Math.floor((NOW - 1000) / 1000) }));

    expect(decodeCredential(expired, NOW)).toBeNull();
  });

  test('refuses a credential that never expires rather than trusting it forever', () => {
    expect(decodeCredential(credential(validClaims({ exp: undefined })), NOW)).toBeNull();
  });

  test('returns nothing for a token that identifies no one', () => {
    const anonymous = credential({ exp: Math.floor((NOW + HOUR_MS) / 1000) });

    expect(decodeCredential(anonymous, NOW)).toBeNull();
  });

  test.describe('malformed input is an answer, not an exception', () => {
    // Reached on page load with whatever is in storage, which is anything a
    // previous version wrote, a different site wrote, or a person typed.
    const rubbish = {
      empty: '',
      'not a token': 'hello',
      'too few segments': 'header.payload',
      'payload that is not base64': 'header.!!!!.signature',
      'payload that is not JSON': `header.${Buffer.from('nonsense').toString('base64url')}.sig`,
      'payload that is JSON but not an object': `header.${Buffer.from('42').toString('base64url')}.sig`,
    };

    for (const [description, value] of Object.entries(rubbish)) {
      test(description, () => {
        expect(() => decodeCredential(value, NOW)).not.toThrow();
        expect(decodeCredential(value, NOW)).toBeNull();
      });
    }
  });
});
