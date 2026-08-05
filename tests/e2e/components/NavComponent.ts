import type { Page, Locator } from '@playwright/test';

/**
 * The primary navigation — a sub-page fragment shared across flows. It is a
 * fixed sidebar on desktop and an off-canvas drawer on phones; `reveal()` hides
 * that difference so a test can just ask for a link or a toggle and get one on
 * either viewport.
 */
export class NavComponent {
  /** The nav container itself. */
  readonly root: Locator;
  /** The floating hamburger that opens the drawer — mobile layout only. */
  readonly toggle: Locator;
  readonly themeToggle: Locator;
  readonly langToggle: Locator;

  constructor(private readonly page: Page) {
    this.root = page.locator('nav#nav');
    this.toggle = page.locator('#navToggle');
    this.themeToggle = page.locator('#themeToggle');
    this.langToggle = page.locator('#langToggle');
  }

  /** Open the drawer if we're on the mobile layout; a no-op on desktop. */
  async reveal(): Promise<void> {
    if (await this.toggle.isVisible()) {
      if (!(await this.isDrawerOpen())) {
        await this.toggle.click();
      }
    }
  }

  /** A nav link by its visible label, e.g. `🐍 Python Coding Challenges`. */
  link(label: string): Locator {
    return this.root.getByRole('link', { name: label });
  }

  async isDrawerOpen(): Promise<boolean> {
    return (await this.toggle.getAttribute('aria-expanded')) === 'true';
  }
}
