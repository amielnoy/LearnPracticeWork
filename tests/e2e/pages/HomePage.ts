import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavComponent } from '../components/NavComponent';
import { HeroComponent } from '../components/HeroComponent';

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

  constructor(page: Page) {
    super(page);
    this.nav = new NavComponent(page);
    this.hero = new HeroComponent(page);
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

  /** The theme the app persisted to localStorage, or null if it never has. */
  async storedTheme(): Promise<string | null> {
    return this.page.evaluate(key => localStorage.getItem(key), THEME_KEY);
  }
}
