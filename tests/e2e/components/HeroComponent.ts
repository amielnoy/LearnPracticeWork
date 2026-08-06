import type { Page, Locator } from '@playwright/test';

/**
 * The hero header sub-page: the headline, the feature badges, and the two
 * call-to-action links that jump into the page. All of it sits in the normal
 * document flow, so it needs no drawer wrangling on mobile.
 */
export class HeroComponent {
  readonly root: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.root = page.locator('header#hero');
    this.heading = this.root.getByRole('heading', { level: 1 });
  }

  badge(text: string): Locator {
    return this.root.getByText(text);
  }

  /** A hero CTA by its label, e.g. `Try a sample interview →` or `Watch Lectures`. */
  cta(label: string): Locator {
    return this.root.getByRole('link', { name: label });
  }
}
