import { test as base, expect } from '@playwright/experimental-ct-react';
import type { Locator } from '@playwright/test';
import type { ReactNode } from 'react';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { ConnectionSetup } from '@academy/components/agents/ConnectionSetup';
import { QuestionBank } from '@academy/components/practice/QuestionBank';
import { ResumeAgent } from '@academy/components/agents/ResumeAgent';
import { GoogleSignIn } from '@academy/components/account/GoogleSignIn';
import { AuthProvider } from '@academy/context/AuthContext';

/**
 * Component fixtures. The provider context probes `/api/ai/config` on mount, so
 * a component can never be mounted without that route being served first — the
 * fixtures fold "serve the config, then mount in the providers" into one step so
 * a spec declares what it wants (`{ questionBank }`, `{ mountSetup }`) instead of
 * repeating the arrangement.
 */
const NO_SERVER_KEY = { groq: { available: false }, gemini: { available: false } };

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

/** What the stubbed Google client recorded, and the credential it will hand back. */
interface GoogleStubWindow extends Window {
  __gsi?: {
    clientId?: string;
    locales: string[];
    autoSelectDisabled: boolean;
  };
  __credential?: string;
}

/** How the sign-in control is mounted, and what a test can do to it afterwards. */
type GoogleSignInHarness = {
  /** Mounts the control. An empty `clientId` stands for a build without one. */
  mount: (options?: { clientId?: string; lang?: 'en' | 'he' }) => Promise<Locator>;
  /** Seeds the API session and a legacy browser credential before mounting. */
  seedCredential: (credential: string) => Promise<void>;
  /** Clicks Google's button, which hands `credential` back through its callback. */
  signInWith: (credential: string) => Promise<void>;
  /** Starts sign-in and holds the API response until the returned function runs. */
  beginSignInWith: (credential: string) => Promise<() => Promise<void>>;
  /** What the stubbed Google client was told and asked to do. */
  stub: () => Promise<{ clientId?: string; locales: string[]; autoSelectDisabled: boolean }>;
};

/**
 * Stands in for Google's hosted sign-in client.
 *
 * Serving this in place of the real script is what makes the flow testable at
 * all: the genuine one renders into a cross-origin iframe, needs a client ID
 * registered to the page's origin, and would put a live Google request in the
 * middle of the suite. The component's own loading path still runs — it asks
 * for the script, waits for it, and calls the same three methods.
 */
const GOOGLE_STUB = `
  window.__gsi = { locales: [], autoSelectDisabled: false };
  window.google = {
    accounts: {
      id: {
        initialize(config) {
          window.__gsi.clientId = config.client_id;
          window.__gsi.callback = config.callback;
        },
        renderButton(parent, options) {
          window.__gsi.locales.push(options.locale);
          const button = document.createElement('button');
          button.type = 'button';
          button.id = 'fakeGoogleButton';
          button.textContent = 'Sign in with Google';
          button.addEventListener('click', () => {
            window.__gsi.callback({ credential: window.__credential });
          });
          parent.appendChild(button);
        },
        disableAutoSelect() {
          window.__gsi.autoSelectDisabled = true;
        },
      },
    },
  };
`;

type ComponentFixtures = {
  /** Mount ConnectionSetup against a chosen server config, wrapped in its providers. */
  mountSetup: (config: unknown) => Promise<Locator>;
  /** QuestionBank mounted with no server key (its stages start collapsed). */
  questionBank: QuestionBankHarness;
  /** ResumeAgent mounted with no server key, ready to be handed a file. */
  resumeAgent: ResumeAgentHarness;
  /** Sign in with Google, against a stubbed Google client. */
  googleSignIn: GoogleSignInHarness;
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

  googleSignIn: async ({ mount, page }, use) => {
    type SessionUser = { name: string; email: string; picture: string; expiresAt: number };
    let sessionUser: SessionUser | null = null;
    let pauseNextLogin = false;
    let releaseLogin: (() => void) | undefined;

    const verifiedUser = (credential: string): SessionUser | null => {
      try {
        const claims = JSON.parse(
          Buffer.from(credential.split('.')[1] ?? '', 'base64url').toString('utf8'),
        ) as { name?: string; email?: string; picture?: string; exp?: number };
        if (!claims.name || !claims.email || !claims.exp || claims.exp * 1000 <= Date.now()) {
          return null;
        }
        return {
          name: claims.name,
          email: claims.email,
          picture: claims.picture ?? '',
          expiresAt: claims.exp * 1000,
        };
      } catch {
        return null;
      }
    };

    await page.route('https://accounts.google.com/gsi/client', route =>
      route.fulfill({ contentType: 'text/javascript', body: GOOGLE_STUB }),
    );
    await page.route('**/api/auth/session', route =>
      route.fulfill(
        sessionUser
          ? { status: 200, json: { user: sessionUser } }
          : { status: 401, json: { error: 'Not signed in' } },
      ),
    );
    await page.route('**/api/auth/google', async route => {
      const body = route.request().postDataJSON() as { credential?: string };
      sessionUser = body.credential ? verifiedUser(body.credential) : null;
      if (pauseNextLogin) {
        pauseNextLogin = false;
        await new Promise<void>(resolve => {
          releaseLogin = resolve;
        });
      }
      await route.fulfill(
        sessionUser
          ? { status: 200, json: { user: sessionUser } }
          : { status: 401, json: { error: 'Google sign-in could not be verified.' } },
      );
    });
    await page.route('**/api/auth/logout', async route => {
      sessionUser = null;
      await route.fulfill({ status: 200, json: { ok: true } });
    });

    // Nothing here navigates, so state written before `mount` is still there
    // when the component reads it — which is how a returning visit and a
    // Hebrew visit are set up without a hook in the component itself.
    const setBeforeMount = (key: string, value: string) =>
      page.evaluate(([k, v]) => localStorage.setItem(k, v), [key, value] as const);

    await use({
      mount: async ({
        clientId = 'test-client-id.apps.googleusercontent.com',
        lang = 'en',
      } = {}) => {
        await setBeforeMount('ata_lang', lang);
        return mount(
          <LocaleProvider>
            <AuthProvider clientId={clientId}>
              <GoogleSignIn />
            </AuthProvider>
          </LocaleProvider>,
        );
      },
      seedCredential: async credential => {
        sessionUser = verifiedUser(credential);
        await setBeforeMount('ata_google_credential', credential);
      },
      signInWith: async credential => {
        await page.evaluate(value => {
          (window as GoogleStubWindow).__credential = value;
        }, credential);
        await page.locator('#fakeGoogleButton').click();
      },
      beginSignInWith: async credential => {
        pauseNextLogin = true;
        await page.evaluate(value => {
          (window as GoogleStubWindow).__credential = value;
        }, credential);
        const requestStarted = page.waitForRequest('**/api/auth/google');
        const clickFinished = page.locator('#fakeGoogleButton').click();
        await requestStarted;
        return async () => {
          releaseLogin?.();
          await clickFinished;
        };
      },
      stub: async () =>
        page.evaluate(
          () => (window as GoogleStubWindow).__gsi ?? { locales: [], autoSelectDisabled: false },
        ),
    });
  },
});

export { expect };
