import { test, expect } from './fixtures';
import { en, he } from '@academy/lib/locales';
import { credentialWith, oneHourFrom, validCredential } from '../support/googleCredentials';

/**
 * Sign in with Google, in both languages.
 *
 * Google's real client is stubbed — see `GOOGLE_STUB` in the fixtures for why —
 * so what is under test is this site's half of the arrangement: that the button
 * appears only on a build configured for it, that the language reaches Google
 * (which renders the button's own label), that the verified server session
 * becomes a name in the header, and that signing out actually lets go. The
 * Python fixture suite independently exercises cryptographic verification.
 */

const signedIn = { name: 'Amiel Peled', email: 'amiel@organuz.ai' };

test.describe('a build with no client ID', () => {
  test('shows no sign-in at all, rather than a button that cannot work', async ({
    googleSignIn,
  }) => {
    // The state every deployment is in until someone registers an OAuth client.
    const component = await googleSignIn.mount({ clientId: '' });

    await expect(component.locator('#googleSignIn')).toHaveCount(0);
    await expect(component.locator('#googleAccount')).toHaveCount(0);
  });

  test('never asks Google for anything', async ({ googleSignIn }) => {
    await googleSignIn.mount({ clientId: '' });

    // No script fetched, so nothing initialised: a site built without sign-in
    // does not contact Google merely because someone opened it.
    expect((await googleSignIn.stub()).clientId).toBeUndefined();
  });
});

test.describe('signing in', () => {
  test('offers Google’s button, initialised with the configured client', async ({
    googleSignIn,
  }) => {
    const component = await googleSignIn.mount({
      clientId: 'client-42.apps.googleusercontent.com',
    });

    await expect(component.locator('#fakeGoogleButton')).toBeVisible();
    expect((await googleSignIn.stub()).clientId).toBe('client-42.apps.googleusercontent.com');
  });

  test('puts the name and picture in the header once Google answers', async ({ googleSignIn }) => {
    const component = await googleSignIn.mount();

    await googleSignIn.signInWith(validCredential());

    await expect(component.locator('.nav-account-name')).toHaveText(signedIn.name);
    await expect(component.locator('.nav-account-avatar')).toHaveAttribute(
      'src',
      'https://lh3.googleusercontent.com/a/portrait',
    );
    await expect(component.locator('#fakeGoogleButton')).toHaveCount(0);
  });

  test('shows progress while the server verifies Google’s answer', async ({
    googleSignIn,
    page,
  }) => {
    const component = await googleSignIn.mount();

    const finishSignIn = await googleSignIn.beginSignInWith(validCredential());

    await expect(page.getByRole('status')).toHaveText(en.s.signingInStatus);
    await finishSignIn();
    await expect(component.locator('.nav-account-name')).toHaveText(signedIn.name);
  });

  test('keeps the address for the tooltip rather than crowding the drawer', async ({
    googleSignIn,
  }) => {
    const component = await googleSignIn.mount();

    await googleSignIn.signInWith(validCredential());

    await expect(component.locator('.nav-account-name')).toHaveAttribute('title', signedIn.email);
  });

  test('stays signed out when Google’s answer cannot be read', async ({ googleSignIn }) => {
    const component = await googleSignIn.mount();

    await googleSignIn.signInWith('not-a-token');

    await expect(component.locator('#fakeGoogleButton')).toBeVisible();
    await expect(component.locator('.nav-account-name')).toHaveCount(0);
    await expect(component.getByRole('alert')).toHaveText(en.s.signInError);
  });

  test('stays signed out for a credential that has already expired', async ({ googleSignIn }) => {
    const component = await googleSignIn.mount();

    await googleSignIn.signInWith(
      credentialWith({ name: 'Amiel Peled', exp: Math.floor(Date.now() / 1000) - 60 }),
    );

    await expect(component.locator('#fakeGoogleButton')).toBeVisible();
  });
});

test.describe('coming back later', () => {
  test('is still signed in, without touching Google again', async ({ googleSignIn }) => {
    await googleSignIn.seedCredential(validCredential());

    const component = await googleSignIn.mount();

    await expect(component.locator('.nav-account-name')).toHaveText(signedIn.name);
  });

  test('is signed out again once the credential has lapsed', async ({ googleSignIn }) => {
    // Tokens last about an hour. A stale one in storage must not leave a name
    // in the header implying a session that ended long ago.
    await googleSignIn.seedCredential(
      credentialWith({ name: 'Amiel Peled', exp: Math.floor(Date.now() / 1000) - 1 }),
    );

    const component = await googleSignIn.mount();

    await expect(component.locator('#fakeGoogleButton')).toBeVisible();
    await expect(component.locator('.nav-account-name')).toHaveCount(0);
  });

  test('discards an unreadable credential instead of failing on every load', async ({
    googleSignIn,
  }) => {
    await googleSignIn.seedCredential('{"not":"a token"}');

    const component = await googleSignIn.mount();

    await expect(component.locator('#fakeGoogleButton')).toBeVisible();
    expect(
      await component.page().evaluate(() => localStorage.getItem('ata_google_credential')),
    ).toBeNull();
  });
});

test.describe('signing out', () => {
  test('returns to the button', async ({ googleSignIn }) => {
    const component = await googleSignIn.mount();
    await googleSignIn.signInWith(validCredential());
    await expect(component.locator('.nav-account-name')).toBeVisible();

    await component.locator('#googleSignOut').click();

    await expect(component.locator('#fakeGoogleButton')).toBeVisible();
    await expect(component.locator('.nav-account-name')).toHaveCount(0);
  });

  test('forgets the credential, so a reload does not sign you back in', async ({
    googleSignIn,
  }) => {
    const component = await googleSignIn.mount();
    await googleSignIn.signInWith(validCredential());

    await component.locator('#googleSignOut').click();

    expect(
      await component.page().evaluate(() => localStorage.getItem('ata_google_credential')),
    ).toBeNull();
  });

  test('tells Google not to pick the same account unasked', async ({ googleSignIn }) => {
    // Without this the next visit is silently signed back in, which is not what
    // anyone who just signed out meant.
    const component = await googleSignIn.mount();
    await googleSignIn.signInWith(validCredential());

    await component.locator('#googleSignOut').click();

    expect((await googleSignIn.stub()).autoSelectDisabled).toBe(true);
  });
});

test.describe('both languages', () => {
  test('English: the sign-out label and Google’s own button are in English', async ({
    googleSignIn,
  }) => {
    const component = await googleSignIn.mount({ lang: 'en' });
    await expect(component.locator('#fakeGoogleButton')).toBeVisible();

    expect((await googleSignIn.stub()).locales).toContain('en');
    await googleSignIn.signInWith(validCredential());
    await expect(component.locator('#googleSignOut')).toHaveText(en.s.signOutBtn);
  });

  test('Hebrew: the sign-out label and Google’s own button are in Hebrew', async ({
    googleSignIn,
  }) => {
    // The button's label is drawn by Google, not by this site, so the only way
    // it comes out in Hebrew is if the locale is handed over — which is the
    // half of the translation that a strings file cannot cover.
    const component = await googleSignIn.mount({ lang: 'he' });
    await expect(component.locator('#fakeGoogleButton')).toBeVisible();

    expect((await googleSignIn.stub()).locales).toContain('he');
    await googleSignIn.signInWith(validCredential());
    await expect(component.locator('#googleSignOut')).toHaveText(he.s.signOutBtn);
  });

  test('Hebrew: a Hebrew name survives the round trip intact', async ({ googleSignIn }) => {
    const component = await googleSignIn.mount({ lang: 'he' });

    await googleSignIn.signInWith(validCredential({ name: 'אמיאל פלד' }));

    await expect(component.locator('.nav-account-name')).toHaveText('אמיאל פלד');
  });

  test('the two languages agree on what sign-in is called', async () => {
    // Not the same string, but both present: a missing key renders as blank.
    expect(en.s.signOutBtn.trim()).not.toBe('');
    expect(he.s.signOutBtn.trim()).not.toBe('');
    expect(he.s.signOutBtn).not.toBe(en.s.signOutBtn);
  });
});

test.describe('the credential’s lifetime', () => {
  test('signs out by itself when the token lapses mid-visit', async ({ googleSignIn }) => {
    // Two seconds, so the timer the provider sets is the thing being observed
    // rather than the test's own patience.
    const component = await googleSignIn.mount();

    await googleSignIn.signInWith(validCredential({ exp: Math.floor((Date.now() + 2000) / 1000) }));
    await expect(component.locator('.nav-account-name')).toBeVisible();

    await expect(component.locator('#fakeGoogleButton')).toBeVisible({ timeout: 10_000 });
  });

  test('does not sign out early on a credential with an hour left', async ({ googleSignIn }) => {
    const component = await googleSignIn.mount();

    await googleSignIn.signInWith(validCredential({ exp: oneHourFrom(Date.now()) }));

    await expect(component.locator('.nav-account-name')).toBeVisible();
    await component.page().waitForTimeout(1000);
    await expect(component.locator('.nav-account-name')).toBeVisible();
  });
});
