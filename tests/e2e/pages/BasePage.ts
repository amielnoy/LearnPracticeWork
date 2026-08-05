import type { Page } from '@playwright/test';

/**
 * Shared ground for every page object: it holds the Playwright `page` and knows
 * the concrete page's own `path`, so opening a page is uniform across the suite.
 *
 * Concrete pages extend this; reusable fragments *within* a page (the nav, the
 * hero) are modelled as component objects under `../components`.
 */
export abstract class BasePage {
  /** The route this page lives at, relative to the configured baseURL. */
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async open(): Promise<this> {
    await this.page.goto(this.path);
    return this;
  }
}
