/**
 * Google sign-in, reduced to the part that has no React in it.
 *
 * What this does and does not claim is the important thing. The ID token is
 * read here, not verified — verifying a signature needs Google's public keys
 * and a server that can be trusted to check them, and this site has neither on
 * the deployment it runs from. So the profile below is good for one thing:
 * showing people which account they picked. Anyone can hand the page a
 * hand-written token and appear signed in as anybody.
 *
 * That is fine for a name and an avatar in the corner. It is not fine for
 * deciding what someone is allowed to do, so nothing here is wired to a
 * permission, a quota, or a stored record. If any of that arrives later, the
 * token has to go to the API and come back verified first.
 */

/** The profile fields the header shows, once a credential has been read. */
export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  /** Epoch milliseconds. Past this, the credential is treated as gone. */
  expiresAt: number;
}

/** The response Google hands to the callback registered with `initialize`. */
export interface GoogleCredentialResponse {
  credential?: string;
}

export interface GoogleButtonOptions {
  type: 'standard';
  theme: 'outline' | 'filled_blue' | 'filled_black';
  size: 'small' | 'medium' | 'large';
  shape: 'rectangular' | 'pill';
  text: 'signin_with' | 'signup_with' | 'continue_with';
  /** Google renders its own button label, so this is what translates it. */
  locale: string;
}

/** The slice of `google.accounts.id` this site uses. */
export interface GoogleIdentityApi {
  initialize(config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }): void;
  renderButton(parent: HTMLElement, options: GoogleButtonOptions): void;
  disableAutoSelect(): void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdentityApi } };
  }
}

const GSI_SRC = 'https://accounts.google.com/gsi/client';

/** Where the last credential is kept, so a reload does not sign the reader out. */
export const CREDENTIAL_STORAGE_KEY = 'ata_google_credential';

/**
 * The configured OAuth client, or '' when the site is built without one.
 *
 * Read on call rather than at module scope, and defensively: under the plain
 * Node of the unit suite there is no `import.meta.env` at all, and this module
 * has to be importable there for the token decoding below to be testable.
 */
export function googleClientId(): string {
  return import.meta.env?.VITE_GOOGLE_CLIENT_ID ?? '';
}

/**
 * Decodes one base64url segment as UTF-8.
 *
 * `atob` alone yields one byte per character, which mangles every name that is
 * not ASCII — the Hebrew half of this site's audience included.
 */
function decodeSegment(segment: string): string {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

interface IdTokenClaims {
  name?: string;
  email?: string;
  picture?: string;
  exp?: number;
}

/**
 * Reads the profile out of an ID token, or returns null if it cannot.
 *
 * Every failure is the same answer — a malformed token, a token for something
 * other than a person, an expired one — because the caller does the same thing
 * in each case: stay signed out. Nothing here throws, so a bad value in storage
 * cannot take the page down on load.
 */
export function decodeCredential(credential: string, now = Date.now()): GoogleUser | null {
  const segments = credential.split('.');
  if (segments.length !== 3) return null;

  let claims: IdTokenClaims;
  try {
    claims = JSON.parse(decodeSegment(segments[1])) as IdTokenClaims;
  } catch {
    return null;
  }

  // `exp` is in seconds, and a token without one cannot be aged out, so it is
  // treated as already gone rather than as valid forever.
  if (typeof claims.exp !== 'number') return null;
  const expiresAt = claims.exp * 1000;
  if (expiresAt <= now) return null;

  const name = claims.name ?? claims.email;
  if (!name) return null;

  return {
    name,
    email: claims.email ?? '',
    picture: claims.picture ?? '',
    expiresAt,
  };
}

let pending: Promise<GoogleIdentityApi> | undefined;

/**
 * Resolves once `google.accounts.id` is usable, fetching Google's script the
 * first time and reusing it after.
 *
 * The script is Google's and is loaded from Google. There is no packaged
 * equivalent — the credential flow only exists inside the hosted client — so
 * this is the one piece of runtime code on the site that does not ship with it.
 * It is requested only when a client ID is configured and only on the page that
 * shows the button, so a build without sign-in never contacts Google at all.
 */
export function loadGoogleIdentity(): Promise<GoogleIdentityApi> {
  const existing = window.google?.accounts.id;
  if (existing) return Promise.resolve(existing);
  if (pending) return pending;

  pending = new Promise<GoogleIdentityApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GSI_SRC;
    script.async = true;
    script.onload = () => {
      const api = window.google?.accounts.id;
      if (api) resolve(api);
      else reject(new Error('Google Identity Services loaded without an accounts.id API'));
    };
    script.onerror = () => reject(new Error('Could not load Google Identity Services'));
    document.head.appendChild(script);
  });

  // A failed load must not be cached, or a reader who was offline for a moment
  // can never sign in without reloading the page.
  pending.catch(() => {
    pending = undefined;
  });
  return pending;
}
