import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import type { NavComponent } from './components/NavComponent';
import type { HeroComponent } from './components/HeroComponent';
import type { QuestionsComponent } from './components/QuestionsComponent';

/**
 * E2E fixtures. `home` hands every test an already-open HomePage — no
 * `beforeEach`, no shared mutable `let home` — so a spec just declares the
 * fixtures it needs (`{ home }`, `{ hero }`, …) and starts asserting. The
 * component fixtures are conveniences that hang off the same page object, so
 * `hero` and `home.hero` are the one instance.
 */
type AcademyFixtures = {
  home: HomePage;
  nav: NavComponent;
  hero: HeroComponent;
  questions: QuestionsComponent;
};

export const test = base.extend<AcademyFixtures>({
  home: async ({ page }, use) => {
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
});

export { expect };
