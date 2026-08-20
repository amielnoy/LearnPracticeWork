import { useEffect, useRef } from 'react';
import { useAuth, type AuthFailure } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';

/**
 * Sign in with Google, for the navigation drawer.
 *
 * Renders nothing at all when the site was built without a client ID, which is
 * how a deployment that has not been given one stays whole rather than showing
 * a button that cannot work.
 *
 * Signed in, this shows the account the Python API verified and offers the way
 * out. The session itself is an HttpOnly cookie and cannot be read by scripts.
 */
export function GoogleSignIn() {
  const { configured, user, authenticating, authError, signOut, renderButton } = useAuth();
  const { lang, S } = useLocale();
  const buttonHost = useRef<HTMLDivElement>(null);
  const errorText: Record<AuthFailure, string> = {
    busy: S.signInBusy,
    unavailable: S.signInUnavailable,
    failed: S.signInError,
  };

  useEffect(() => {
    const host = buttonHost.current;
    if (!host || user || authenticating) return;
    let cancelled = false;
    // Google draws into the container, so anything from a previous language is
    // cleared first — otherwise switching language stacks a second button.
    host.replaceChildren();
    void renderButton(host, lang).catch(() => {
      // Nothing is shown if Google cannot be reached. The site's own tools do
      // not depend on sign-in, so a missing button is not worth an error line
      // in front of someone who never asked to sign in.
      if (!cancelled) host.replaceChildren();
    });
    return () => {
      cancelled = true;
    };
  }, [renderButton, lang, user, authenticating]);

  if (!configured) return null;

  if (user) {
    return (
      // Keyed apart from the signed-out container below. Both branches render a
      // div in the same position, so without distinct keys React reuses the one
      // DOM node — and Google's button is not React's to remove, being appended
      // by their script. It would survive into the signed-in state and sit
      // beside the account it had already signed in.
      <div key="account" className="nav-account" id="googleAccount">
        {user.picture && (
          <img
            className="nav-account-avatar"
            src={user.picture}
            alt=""
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        )}
        <span className="nav-account-name" title={user.email}>
          {user.name}
        </span>
        <button
          type="button"
          className="theme-toggle"
          id="googleSignOut"
          onClick={() => void signOut()}
        >
          {S.signOutBtn}
        </button>
      </div>
    );
  }

  if (authenticating) {
    return (
      <div className="nav-account nav-account-status" role="status">
        {S.signingInStatus}
      </div>
    );
  }

  return (
    <div className="nav-account-wrap">
      <div
        key="signin"
        className="nav-account"
        id="googleSignIn"
        ref={buttonHost}
        aria-label={S.signInAria}
      />
      {authError && (
        <p className="nav-account-error" role="alert">
          {errorText[authError]}
        </p>
      )}
    </div>
  );
}
