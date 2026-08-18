import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import type { NavComponent } from './components/NavComponent';
import type { HeroComponent } from './components/HeroComponent';
import type { QuestionsComponent } from './components/QuestionsComponent';
import type { ChallengesComponent } from './components/ChallengesComponent';
import type { FooterComponent } from './components/FooterComponent';

/**
 * E2E fixtures. `home` hands every test an already-open HomePage — no
 * `beforeEach`, no shared mutable `let home` — so a spec just declares the
 * fixtures it needs (`{ home }`, `{ hero }`, …) and starts asserting. The
 * component fixtures are conveniences that hang off the same page object, so
 * `hero` and `home.hero` are the one instance.
 */
type AcademyFixtures = {
  stubApi: void;
  home: HomePage;
  nav: NavComponent;
  hero: HeroComponent;
  questions: QuestionsComponent;
  challenges: ChallengesComponent;
  footer: FooterComponent;
};

export const test = base.extend<AcademyFixtures>({
  // Auto fixture: intercept the config probe the app fires on every load, so it
  // never reaches the /api proxy that has nothing behind it in e2e. This stops
  // the ECONNREFUSED noise from the dev server and gives a deterministic
  // "no server key" state (which is the BYOK flow these tests exercise) instead
  // of depending on a failed fetch.
  stubApi: [
    async ({ page }, use) => {
      await page.route('**/api/ai/config', route =>
        route.fulfill({ json: { groq: { available: false }, gemini: { available: false } } }),
      );
      await use();
    },
    { auto: true },
  ],

  // Depends on stubApi so the route is installed before HomePage navigates.
  home: async ({ page, stubApi: _stubApi }, use) => {
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
