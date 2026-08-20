/**
 * Google sign-in, reduced to the part that has no React in it.
 *
 * This loads Google's hosted button and describes its callback. The credential
 * is handed directly to the Python API; only the API's verified user response
 * is rendered, and the credential is never persisted by client code.
 */

/** The profile fields the header shows after the API verifies the credential. */
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
    /**
     * Let the browser mediate the sign-in dialog instead of opening a popup to
     * accounts.google.com. Where FedCM is unavailable, Google falls back to the
     * popup flow on its own, so this is safe to ask for unconditionally.
     */
    use_fedcm_for_button?: boolean;
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

/**
 * The configured OAuth client, or '' when the site is built without one.
 *
 * Read on call rather than at module scope, and defensively: under the plain
 * Node-based tooling has no `import.meta.env`, so the read stays defensive.
 */
export function googleClientId(): string {
  return import.meta.env?.VITE_GOOGLE_CLIENT_ID ?? '';
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
