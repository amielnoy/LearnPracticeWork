import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CREDENTIAL_STORAGE_KEY,
  decodeCredential,
  googleClientId,
  loadGoogleIdentity,
  type GoogleButtonOptions,
  type GoogleUser,
} from '../lib/googleIdentity';

interface AuthContextValue {
  /** False when the site was built without a client ID; sign-in stays hidden. */
  configured: boolean;
  user: GoogleUser | null;
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

/** The credential kept from a previous visit, if it is still worth anything. */
function restoreUser(): GoogleUser | null {
  let stored: string | null;
  try {
    stored = localStorage.getItem(CREDENTIAL_STORAGE_KEY);
  } catch {
    // Storage can be denied outright; that is a signed-out visit, not an error.
    return null;
  }
  if (!stored) return null;

  const user = decodeCredential(stored);
  // An expired or unreadable credential is cleared rather than left to fail the
  // same way on every future load.
  if (!user) {
    try {
      localStorage.removeItem(CREDENTIAL_STORAGE_KEY);
    } catch {
      // Nothing further to do: the value is already treated as absent.
    }
  }
  return user;
}

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
  const [user, setUser] = useState<GoogleUser | null>(() => (configured ? restoreUser() : null));

  const handleCredential = useCallback((credential: string) => {
    const next = decodeCredential(credential);
    if (!next) return;
    try {
      localStorage.setItem(CREDENTIAL_STORAGE_KEY, credential);
    } catch {
      // Signing in still works for this visit; it just will not outlive it.
    }
    setUser(next);
  }, []);

  // Signing out drops the credential and tells Google not to re-select the same
  // account without being asked, so the next click is a real choice.
  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(CREDENTIAL_STORAGE_KEY);
    } catch {
      // The in-memory state below is what the page renders from either way.
    }
    window.google?.accounts.id.disableAutoSelect();
    setUser(null);
  }, []);

  const renderButton = useCallback(
    async (parent: HTMLElement, locale: string) => {
      if (!configured) return;
      const api = await loadGoogleIdentity();
      api.initialize({
        client_id: clientId,
        callback: response => {
          if (response.credential) handleCredential(response.credential);
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
    () => ({ configured, user, signOut, renderButton }),
    [configured, user, signOut, renderButton],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
