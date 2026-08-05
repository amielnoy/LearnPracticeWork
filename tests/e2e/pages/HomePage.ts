import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavComponent } from '../components/NavComponent';
import { HeroComponent } from '../components/HeroComponent';
import { QuestionsComponent } from '../components/QuestionsComponent';
import { ChallengesComponent } from '../components/ChallengesComponent';

/** The six in-page sections the nav and hero jump to, in document order. */
export const SECTION_IDS = [
  'setup',
  'resume',
  'lecture-series',
  'interview-talk',
  'interview-questions',
  'coding-challenges',
] as const;

const THEME_KEY = 'ata_theme';

/**
 * The academy landing page — a single-page app, so its "sub-pages" are the
 * on-page sections and the nav/hero fragments rather than separate routes.
 */
export class HomePage extends BasePage {
  protected readonly path = '/';

  readonly nav: NavComponent;
  readonly hero: HeroComponent;
  readonly questions: QuestionsComponent;
  readonly challenges: ChallengesComponent;

  constructor(page: Page) {
    super(page);
    this.nav = new NavComponent(page);
    this.hero = new HeroComponent(page);
    this.questions = new QuestionsComponent(page);
    this.challenges = new ChallengesComponent(page);
  }

  /** A main section by id, e.g. `setup` or `coding-challenges`. */
  section(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  get main(): Locator {
    return this.page.locator('main#main-content');
  }

  get skipLink(): Locator {
    return this.page.getByRole('link', { name: 'Skip to main content' });
  }

  get footer(): Locator {
    return this.page.locator('footer#site-footer');
  }

  /** The floating "back to top" button; gains the `show` class once scrolled. */
  get backToTop(): Locator {
    return this.page.locator('button.to-top');
  }

  /** The `<html>` root — theme (`data-theme`) and locale (`lang`/`dir`) land here. */
  get html(): Locator {
    return this.page.locator('html');
  }

  /** The theme the app persisted to localStorage, or null if it never has. */
  async storedTheme(): Promise<string | null> {
    return this.page.evaluate(key => localStorage.getItem(key), THEME_KEY);
  }
}
