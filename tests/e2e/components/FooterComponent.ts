import type { Page, Locator } from '@playwright/test';

/**
 * The site footer. Small, but it goes through the whole locale chain and holds
 * the one external link on the page, so it owns that link rather than leaking a
 * `getByRole` into the specs.
 */
export class FooterComponent {
  readonly root: Locator;
  /** The author credit — the page's single external link. */
  readonly authorLink: Locator;

  constructor(page: Page) {
    this.root = page.locator('footer#site-footer');
    this.authorLink = this.root.getByRole('link');
  }
}
