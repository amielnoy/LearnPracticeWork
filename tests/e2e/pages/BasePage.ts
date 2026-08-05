import type { Page, Locator } from '@playwright/test';

/**
 * Shared ground for every page object. Holds the Playwright `page`, knows the
 * concrete page's own `path`, and exposes the handful of document-level things
 * (the `<html>` element, the current hash) that most pages need to assert on.
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

  /** The `<html>` root — theme (`data-theme`) and locale (`lang`/`dir`) land here. */
  get html(): Locator {
    return this.page.locator('html');
  }

  /** The in-page section currently targeted by the URL, without the `#`. */
  async currentSection(): Promise<string> {
    return this.page.evaluate(() => window.location.hash.replace(/^#/, ''));
  }
}
