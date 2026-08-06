import { test, expect } from './fixtures';
import { en } from '@academy/lib/locales';
import { PROVIDERS } from '@academy/lib/providers';

/**
 * Connection Setup is the one screen where a visitor's own API key is handled,
 * so these tests care about two things: which key mode the UI lands in, and
 * that a typed key is session-only unless persistence is explicit. The `mountSetup` fixture intercepts
 * `/api/ai/config` and mounts the component, so each test just picks the server
 * config it wants to exercise.
 */
const t = en.setup;

const WITH_SERVER_KEY = { gemini: { available: true, defaultModel: 'gemini-2.5-pro' } };
const WITHOUT_SERVER_KEY = { gemini: { available: false } };

test.describe('when the server has a default key', () => {
  test('offers the choice between the server key and your own', async ({ mountSetup }) => {
    const component = await mountSetup(WITH_SERVER_KEY);

    await expect(component.getByLabel(t.useOwnKeyLabel)).toBeVisible();
    await expect(component.getByLabel(t.useOwnKeyLabel)).not.toBeChecked();
  });

  test('locks the key field while the server key is in use', async ({ mountSetup }) => {
    const component = await mountSetup(WITH_SERVER_KEY);

    const keyField = component.locator('#apiKey');
    await expect(keyField).toBeDisabled();
    await expect(keyField).toHaveAttribute('placeholder', en.s.placeholderEnvKey);
  });

  test('adopts the model the server says it defaults to', async ({ mountSetup }) => {
    const component = await mountSetup(WITH_SERVER_KEY);

    await expect(component.locator('#modelSel')).toHaveValue('gemini-2.5-pro');
  });

  test('unlocks the key field once you opt into your own key', async ({ mountSetup }) => {
    const component = await mountSetup(WITH_SERVER_KEY);

    await component.getByLabel(t.useOwnKeyLabel).check();

    await expect(component.locator('#apiKey')).toBeEnabled();
    await expect(component.locator('#apiKey')).toHaveAttribute(
      'placeholder',
      PROVIDERS.gemini!.placeholder,
    );
  });
});

test.describe('when the server has no default key', () => {
  test('drops the toggle, because your own key is the only option', async ({ mountSetup }) => {
    const component = await mountSetup(WITHOUT_SERVER_KEY);

    await expect(component.locator('#apiKey')).toBeEnabled();
    await expect(component.getByText(t.useOwnKeyLabel)).toBeHidden();
  });

  test('keeps a typed key in sessionStorage by default and out of the DOM', async ({ mountSetup, page }) => {
    const component = await mountSetup(WITHOUT_SERVER_KEY);

    await component.locator('#apiKey').fill('AIzaMyOwnKey');

    await expect
      .poll(() => page.evaluate(() => window.sessionStorage.getItem('ata_session_key_gemini')))
      .toBe('AIzaMyOwnKey');
    expect(await page.evaluate(() => window.localStorage.getItem('ata_key_gemini'))).toBeNull();
    // Rendered as a password field so the key is never shown in plain text.
    await expect(component.locator('#apiKey')).toHaveAttribute('type', 'password');
  });

  test('persists a key only after explicit opt-in and displays a warning', async ({ mountSetup, page }) => {
    const component = await mountSetup(WITHOUT_SERVER_KEY);
    await component.locator('#apiKey').fill('AIzaRememberMe');

    await component.getByLabel(t.rememberKeyLabel).check();

    await expect(component.getByText(t.rememberKeyWarning)).toBeVisible();
    expect(await page.evaluate(() => window.localStorage.getItem('ata_key_gemini')))
      .toBe('AIzaRememberMe');
    expect(await page.evaluate(() => window.sessionStorage.getItem('ata_session_key_gemini')))
      .toBeNull();
  });
});

test.describe('provider switching', () => {
  test('replaces the model list with the newly chosen vendor models', async ({ mountSetup }) => {
    const component = await mountSetup(WITH_SERVER_KEY);

    await component.locator('#providerSel').selectOption('anthropic');

    const models = await component.locator('#modelSel option').allTextContents();
    expect(models).toEqual(PROVIDERS.anthropic!.models);
  });

  test('offers exactly the providers the locale advertises', async ({ mountSetup }) => {
    const component = await mountSetup(WITH_SERVER_KEY);

    const values = await component.locator('#providerSel option').evaluateAll(options =>
      options.map(option => (option as HTMLOptionElement).value),
    );
    expect(values).toEqual(t.providers.map(p => p.value));
    // Every advertised provider must actually be implemented.
    for (const value of values) {
      expect(Object.keys(PROVIDERS)).toContain(value);
    }
  });
});
