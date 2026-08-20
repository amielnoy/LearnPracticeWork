import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  googleClientId,
  loadGoogleIdentity,
  type GoogleButtonOptions,
  type GoogleUser,
} from '../lib/googleIdentity';

interface AuthContextValue {
  /** False when the site was built without a client ID; sign-in stays hidden. */
  configured: boolean;
  user: GoogleUser | null;
  authenticating: boolean;
  authError: boolean;
  signOut: () => void;
  /**
   * Renders Google's own button into `parent`. Google draws it itself — the
   * markup is theirs, in an iframe — so the caller supplies a container and
   * this hands it over.
   */
  renderButton: (parent: HTMLElement, locale: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

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
  const configured = clientId !== '';
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(false);

  const handleCredential = useCallback(async (credential: string) => {
    setAuthenticating(true);
    setAuthError(false);
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      if (!response.ok) throw new Error('The server did not accept the Google credential');
      const body = (await response.json()) as { user?: GoogleUser };
      if (!body.user) throw new Error('The server returned no signed-in user');
      setUser(body.user);
    } catch {
      setAuthError(true);
    } finally {
      setAuthenticating(false);
    }
  }, []);

  // Signing out drops the credential and tells Google not to re-select the same
  // account without being asked, so the next click is a real choice.
  const signOut = useCallback(() => {
    void fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    window.google?.accounts.id.disableAutoSelect();
    setUser(null);
    setAuthError(false);
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
        client_id: clientId,
        callback: response => {
          if (response.credential) void handleCredential(response.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      api.renderButton(parent, { ...BUTTON_OPTIONS, locale });
    },
    [clientId, configured, handleCredential],
  );

  // A credential is only good until it expires. Rather than let a stale name sit
  // in the header indefinitely, sign out on the tick it lapses.
  useEffect(() => {
    if (!user) return;
    const remaining = user.expiresAt - Date.now();
    if (remaining <= 0) {
      signOut();
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
