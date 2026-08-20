import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import type { NavComponent } from './components/NavComponent';
import type { HeroComponent } from './components/HeroComponent';
import type { QuestionsComponent } from './components/QuestionsComponent';
import type { ChallengesComponent } from './components/ChallengesComponent';
import type { FooterComponent } from './components/FooterComponent';
import {
  meaningfulReporting,
  type MeaningfulReportingFixture,
} from '../support/meaningfulReporting';

type AcademyApiFixture = {
  /** Content requests observed by the fixture, useful when a test exercises fallback behaviour. */
  contentRequests: string[];
};

type BrowserStorageFixture = {
  get: (key: string, area?: 'local' | 'session') => Promise<string | null>;
  set: (key: string, value: unknown, area?: 'local' | 'session') => Promise<void>;
  /** Seeds localStorage before the application's first script executes. */
  seedBeforeNavigation: (key: string, value: unknown) => Promise<void>;
};

/**
 * E2E fixtures. `home` hands every test an already-open HomePage — no
 * `beforeEach`, no shared mutable `let home` — so a spec just declares the
 * fixtures it needs (`{ home }`, `{ hero }`, …) and starts asserting. The
 * component fixtures are conveniences that hang off the same page object, so
 * `hero` and `home.hero` are the one instance.
 */
type AcademyFixtures = MeaningfulReportingFixture & {
  academyApi: AcademyApiFixture;
  storage: BrowserStorageFixture;
  home: HomePage;
  nav: NavComponent;
  hero: HeroComponent;
  questions: QuestionsComponent;
  challenges: ChallengesComponent;
  footer: FooterComponent;
};

export const test = base.extend<AcademyFixtures>({
  _meaningfulReporting: [meaningfulReporting, { auto: true }],
  // Auto fixture: keep backend-dependent state deterministic before navigation.
  // The academy deliberately falls back to bundled content when the content API
  // is unavailable. Without this route, a late remote response can replace a
  // challenge after it is clicked and reset that card's disclosure state.
  academyApi: [
    async ({ page }, use) => {
      const contentRequests: string[] = [];
      await page.route('**/api/ai/config', route =>
        route.fulfill({ json: { groq: { available: false }, gemini: { available: false } } }),
      );
      await page.route('**/api/content/**', route => {
        contentRequests.push(route.request().url());
        return route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Content API unavailable in E2E' }),
        });
      });
      await use({ contentRequests });
    },
    { auto: true },
  ],

  storage: async ({ page }, use) => {
    const serialise = (value: unknown) =>
      typeof value === 'string' ? value : JSON.stringify(value);
    await use({
      get: (key, area = 'local') =>
        page.evaluate(
          ([storageArea, storageKey]) =>
            (storageArea === 'local' ? localStorage : sessionStorage).getItem(storageKey),
          [area, key] as const,
        ),
      set: (key, value, area = 'local') =>
        page.evaluate(
          ([storageArea, storageKey, storageValue]) =>
            (storageArea === 'local' ? localStorage : sessionStorage).setItem(
              storageKey,
              storageValue,
            ),
          [area, key, serialise(value)] as const,
        ),
      seedBeforeNavigation: async (key, value) => {
        await page.addInitScript(
          ([storageKey, storageValue]) => localStorage.setItem(storageKey, storageValue),
          [key, serialise(value)] as const,
        );
      },
    });
  },

  // Depends on academyApi so routes are installed before HomePage navigates.
  home: async ({ page, academyApi: _academyApi }, use) => {
    await use(await new HomePage(page).open());
  },

  nav: async ({ home }, use) => {
    await use(home.nav);
  },
  hero: async ({ home }, use) => {
    await use(home.hero);
  },
  questions: async ({ home }, use) => {
    await use(home.questions);
  },
  challenges: async ({ home }, use) => {
    await use(home.challenges);
  },
  footer: async ({ home }, use) => {
    await use(home.footer);
  },
});

export { expect };
