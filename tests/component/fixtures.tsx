import { test as base, expect } from '@playwright/experimental-ct-react';
import type { Locator } from '@playwright/test';
import type { ReactNode } from 'react';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { ConnectionSetup } from '@academy/components/ConnectionSetup';
import { QuestionBank } from '@academy/components/QuestionBank';

/**
 * Component fixtures. The provider context probes `/api/ai/config` on mount, so
 * a component can never be mounted without that route being served first — the
 * fixtures fold "serve the config, then mount in the providers" into one step so
 * a spec declares what it wants (`{ questionBank }`, `{ mountSetup }`) instead of
 * repeating the arrangement.
 */
const NO_SERVER_KEY = { gemini: { available: false } };

/** QuestionBank, already mounted, plus a helper to expand its collapsed stages. */
type QuestionBankHarness = {
  component: Locator;
  openAllStages: () => Promise<void>;
};

type ComponentFixtures = {
  /** Mount ConnectionSetup against a chosen server config, wrapped in its providers. */
  mountSetup: (config: unknown) => Promise<Locator>;
  /** QuestionBank mounted with no server key (its stages start collapsed). */
  questionBank: QuestionBankHarness;
};

const withProviders = (node: ReactNode) => (
  <LocaleProvider>
    <ProgressProvider>
      <ProviderContextProvider>{node}</ProviderContextProvider>
    </ProgressProvider>
  </LocaleProvider>
);

export const test = base.extend<ComponentFixtures>({
  mountSetup: async ({ mount, page }, use) => {
    await use(async (config: unknown) => {
      await page.route('**/api/ai/config', route => route.fulfill({ json: config }));
      return mount(withProviders(<ConnectionSetup />));
    });
  },

  questionBank: async ({ mount, page }, use) => {
    await page.route('**/api/ai/config', route => route.fulfill({ json: NO_SERVER_KEY }));
    const component = await mount(withProviders(<QuestionBank />));
    const openAllStages = async () => {
      const stages = component
        .locator('details.agent-box')
        .filter({ has: page.locator('.q-list') });
      const count = await stages.count();
      for (let i = 0; i < count; i++) await stages.nth(i).locator('summary').click();
    };
    await use({ component, openAllStages });
  },
});

export { expect };
