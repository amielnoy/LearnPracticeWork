import { test as base, expect } from '@playwright/experimental-ct-react';
import type { Locator } from '@playwright/test';
import type { ReactNode } from 'react';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { ConnectionSetup } from '@academy/components/ConnectionSetup';
import { QuestionBank } from '@academy/components/QuestionBank';
import { ResumeAgent } from '@academy/components/ResumeAgent';

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

/**
 * ResumeAgent, already mounted, plus the three places it answers from: the
 * upload zone's own label, the error line, and the editor the extracted text
 * lands in. `upload` hands over bytes built in the test process, so a fixture
 * PDF never has to exist on disk.
 */
type ResumeAgentHarness = {
  component: Locator;
  upload: (name: string, bytes: Buffer) => Promise<void>;
  uploadLabel: Locator;
  error: Locator;
  resumeText: Locator;
  /** The hidden picker itself, for asserting on what it still holds. */
  fileInput: Locator;
  /** `files.length` of the picker, which no locator assertion exposes. */
  selectedFileCount: () => Promise<number>;
  /**
   * Starts recording every label the upload zone passes through, and returns
   * the reader for them. Reading a file is fast enough that the intermediate
   * states are gone before any assertion could catch them, so they are captured
   * as they happen rather than sampled afterwards.
   */
  recordUploadLabels: () => Promise<() => Promise<string[]>>;
};

/** The window property the label recorder collects into. */
interface RecordingWindow extends Window {
  __uploadLabels?: string[];
}

type ComponentFixtures = {
  /** Mount ConnectionSetup against a chosen server config, wrapped in its providers. */
  mountSetup: (config: unknown) => Promise<Locator>;
  /** QuestionBank mounted with no server key (its stages start collapsed). */
  questionBank: QuestionBankHarness;
  /** ResumeAgent mounted with no server key, ready to be handed a file. */
  resumeAgent: ResumeAgentHarness;
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

  resumeAgent: async ({ mount, page }, use) => {
    await page.route('**/api/ai/config', route => route.fulfill({ json: NO_SERVER_KEY }));
    const component = await mount(withProviders(<ResumeAgent />));
    const fileInput = component.locator('#resumeFile');
    await use({
      component,
      fileInput,
      selectedFileCount: () =>
        fileInput.evaluate(input => (input as HTMLInputElement).files?.length ?? 0),
      // The input is hidden behind the drop zone, which is why the file is set
      // on it directly rather than by clicking: a real picker cannot be driven
      // from a test, and the component's own handler is what is under test.
      upload: (name, bytes) =>
        fileInput.setInputFiles({ name, mimeType: 'application/pdf', buffer: bytes }),
      uploadLabel: component.locator('#uploadLabel'),
      recordUploadLabels: async () => {
        await page.evaluate(() => {
          const label = document.getElementById('uploadLabel');
          if (!label) throw new Error('the upload zone has no #uploadLabel to record');
          const target = window as RecordingWindow;
          target.__uploadLabels = [label.textContent ?? ''];
          new MutationObserver(() => {
            target.__uploadLabels?.push(label.textContent ?? '');
          }).observe(label, { childList: true, characterData: true, subtree: true });
        });
        return () => page.evaluate(() => (window as RecordingWindow).__uploadLabels ?? []);
      },
      error: component.locator('#resumeErr'),
      resumeText: component.locator('#resumeText'),
    });
  },
});

export { expect };
