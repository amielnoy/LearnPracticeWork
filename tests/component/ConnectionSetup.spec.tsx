import { test, expect } from '@playwright/experimental-ct-react';
import type { Page } from '@playwright/test';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { ConnectionSetup } from '@academy/components/ConnectionSetup';
import { en } from '@academy/lib/locales';
import { PROVIDERS } from '@academy/lib/providers';

/**
 * Connection Setup is the one screen where a visitor's own API key is handled,
 * so these tests care about two things: which key mode the UI lands in, and
 * that a typed key stays in localStorage.
 *
 * `/api/ai/config` is intercepted, so the component sees a server with or
 * without a default key without either one having to exist.
 */

const t = en.setup;

const WITH_SERVER_KEY = { gemini: { available: true, defaultModel: 'gemini-2.5-pro' } };
const WITHOUT_SERVER_KEY = { gemini: { available: false } };

/** Answers the config probe the provider context fires on mount. */
const serveConfig = (page: Page, config: unknown) =>
  page.route('**/api/ai/config', route => route.fulfill({ json: config }));

const Subject = (
  <LocaleProvider>
    <ProviderContextProvider>
      <ConnectionSetup />
    </ProviderContextProvider>
  </LocaleProvider>
);

test.describe('when the server has a default key', () => {
  test('offers the choice between the server key and your own', async ({ mount, page }) => {
    await serveConfig(page, WITH_SERVER_KEY);
    const component = await mount(Subject);

    await expect(component.getByLabel(t.useOwnKeyLabel)).toBeVisible();
    await expect(component.getByLabel(t.useOwnKeyLabel)).not.toBeChecked();
  });

  test('locks the key field while the server key is in use', async ({ mount, page }) => {
    await serveConfig(page, WITH_SERVER_KEY);
    const component = await mount(Subject);

    const keyField = component.locator('#apiKey');
    await expect(keyField).toBeDisabled();
    await expect(keyField).toHaveAttribute('placeholder', en.s.placeholderEnvKey);
  });

  test('adopts the model the server says it defaults to', async ({ mount, page }) => {
    await serveConfig(page, WITH_SERVER_KEY);
    const component = await mount(Subject);

    await expect(component.locator('#modelSel')).toHaveValue('gemini-2.5-pro');
  });

  test('unlocks the key field once you opt into your own key', async ({ mount, page }) => {
    await serveConfig(page, WITH_SERVER_KEY);
    const component = await mount(Subject);

    await component.getByLabel(t.useOwnKeyLabel).check();

    await expect(component.locator('#apiKey')).toBeEnabled();
    await expect(component.locator('#apiKey')).toHaveAttribute(
      'placeholder',
      PROVIDERS.gemini!.placeholder,
    );
  });
});

test.describe('when the server has no default key', () => {
  test('drops the toggle, because your own key is the only option', async ({ mount, page }) => {
    await serveConfig(page, WITHOUT_SERVER_KEY);
    const component = await mount(Subject);

    await expect(component.locator('#apiKey')).toBeEnabled();
    await expect(component.getByText(t.useOwnKeyLabel)).toBeHidden();
  });

  test('keeps a typed key in localStorage and out of the DOM', async ({ mount, page }) => {
    await serveConfig(page, WITHOUT_SERVER_KEY);
    const component = await mount(Subject);

    await component.locator('#apiKey').fill('AIzaMyOwnKey');

    await expect
      .poll(() => page.evaluate(() => window.localStorage.getItem('ata_key_gemini')))
      .toBe('AIzaMyOwnKey');
    // Rendered as a password field so the key is never shown in plain text.
    await expect(component.locator('#apiKey')).toHaveAttribute('type', 'password');
  });
});

test.describe('provider switching', () => {
  test('replaces the model list with the newly chosen vendor models', async ({ mount, page }) => {
    await serveConfig(page, WITH_SERVER_KEY);
    const component = await mount(Subject);

    await component.locator('#providerSel').selectOption('anthropic');

    const models = await component.locator('#modelSel option').allTextContents();
    expect(models).toEqual(PROVIDERS.anthropic!.models);
  });

  test('offers exactly the providers the locale advertises', async ({ mount, page }) => {
    await serveConfig(page, WITH_SERVER_KEY);
    const component = await mount(Subject);

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
