import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  googleClientId,
  loadGoogleIdentity,
  type GoogleButtonOptions,
  type GoogleUser,
} from '../lib/googleIdentity';

/**
 * Why a sign-in did not complete.
 *
 * The three are not interchangeable to the person reading them: `busy` will
 * pass on its own and is worth waiting out, `unavailable` is the server's
 * problem and no amount of retrying helps, and `failed` is everything else.
 * Collapsing them into one line is how a server-side outage looked to a
 * visitor like their own sign-in going wrong.
 */
export type AuthFailure = 'busy' | 'unavailable' | 'failed';

interface AuthContextValue {
  /** False when the site was built without a client ID; sign-in stays hidden. */
  configured: boolean;
  user: GoogleUser | null;
  authenticating: boolean;
  authError: AuthFailure | null;
  signOut: () => Promise<void>;
  /**
   * Renders Google's own button into `parent`. Google draws it itself — the
   * markup is theirs, in an iframe — so the caller supplies a container and
   * this hands it over.
   */
  renderButton: (parent: HTMLElement, locale: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * What the server's status code means for the person who just clicked.
 *
 * 429 is the one that matters: the API refuses sign-in when its rate limiter
 * cannot count, which is a server misconfiguration that presents as a quota.
 * Telling the visitor to simply try again sends them round a loop that cannot
 * succeed; telling them it is busy at least matches what they are seeing.
 */
function failureFor(status: number): AuthFailure {
  if (status === 429) return 'busy';
  if (status >= 500) return 'unavailable';
  return 'failed';
}

const BUTTON_OPTIONS: Omit<GoogleButtonOptions, 'locale'> = {
  type: 'standard',
  theme: 'outline',
  size: 'medium',
  shape: 'pill',
  text: 'signin_with',
};

interface AuthProviderProps {
  children: React.ReactNode;
  /**
   * The OAuth client to sign in against. Defaults to the one the site was built
   * with, which is what the application uses; passing it explicitly is how a
   * test covers both deployments — one configured, one not — without depending
   * on what happened to be in the environment when the bundle was built.
   */
  clientId?: string;
}

export function AuthProvider({ children, clientId = googleClientId() }: AuthProviderProps) {
  const [resolvedClientId, setResolvedClientId] = useState(clientId);
  const configured = resolvedClientId !== '';
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<AuthFailure | null>(null);

  // A build-time client ID remains supported for local/offline builds. When it
  // is absent, ask the same-origin API for the public ID at runtime so static
  // Replit deployments do not need any authentication configuration of their own.
  useEffect(() => {
    if (clientId) return;
    let active = true;
    void fetch('/api/auth/config', { cache: 'no-store' })
      .then(async response =>
        response.ok ? ((await response.json()) as { clientId?: string }) : {},
      )
      .then(body => {
        if (active && body.clientId) setResolvedClientId(body.clientId);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [clientId]);

  const handleCredential = useCallback(async (credential: string) => {
    setAuthenticating(true);
    setAuthError(null);
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      if (!response.ok) {
        setAuthError(failureFor(response.status));
        return;
      }
      const body = (await response.json()) as { user?: GoogleUser };
      if (!body.user) throw new Error('The server returned no signed-in user');
      setUser(body.user);
    } catch {
      setAuthError('failed');
    } finally {
      setAuthenticating(false);
    }
  }, []);

  // Signing out drops the credential and tells Google not to re-select the same
  // account without being asked, so the next click is a real choice.
  const signOut = useCallback(async () => {
    setAuthenticating(true);
    setAuthError(null);
    // Stop Google's automatic account selection immediately. The verified
    // local session remains visible until our server confirms deletion below.
    window.google?.accounts.id.disableAutoSelect();
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('The server did not end the session');
      setUser(null);
    } catch {
      setAuthError('failed');
    } finally {
      setAuthenticating(false);
    }
  }, []);

  // Versions before server sessions stored Google's raw credential here.
  // Remove it once, even on deployments where sign-in is currently disabled.
  useEffect(() => {
    try {
      localStorage.removeItem('ata_google_credential');
    } catch {
      // Storage may be unavailable; the application does not depend on it.
    }
  }, []);

  useEffect(() => {
    if (!configured) return;
    let active = true;
    void fetch('/api/auth/session', { credentials: 'include', cache: 'no-store' })
      .then(async response =>
        response.ok ? ((await response.json()) as { user?: GoogleUser }) : {},
      )
      .then(body => {
        if (active && body.user) setUser(body.user);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [configured]);

  const renderButton = useCallback(
    async (parent: HTMLElement, locale: string) => {
      if (!configured) return;
      const api = await loadGoogleIdentity();
      api.initialize({
        client_id: resolvedClientId,
        callback: response => {
          if (response.credential) void handleCredential(response.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      api.renderButton(parent, { ...BUTTON_OPTIONS, locale });
    },
    [configured, handleCredential, resolvedClientId],
  );

  // A credential is only good until it expires. Rather than let a stale name sit
  // in the header indefinitely, sign out on the tick it lapses.
  useEffect(() => {
    if (!user) return;
    const remaining = user.expiresAt - Date.now();
    if (remaining <= 0) {
      void signOut();
      return;
    }
    const timer = window.setTimeout(signOut, remaining);
    return () => window.clearTimeout(timer);
  }, [user, signOut]);

  const value = useMemo<AuthContextValue>(
    () => ({ configured, user, authenticating, authError, signOut, renderButton }),
    [configured, user, authenticating, authError, signOut, renderButton],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
