import type { Page, Locator } from '@playwright/test';

/**
 * The coding-challenges section: levels of ChallengeCards. Like a question card,
 * each challenge is its own control — one click reveals a hint, the next the
 * solution (a `<pre>` code block), the next collapses.
 */
export class ChallengesComponent {
  readonly section: Locator;

  constructor(page: Page) {
    this.section = page.locator('#coding-challenges');
  }

  /** The nth challenge card in document order (0-based). */
  card(index = 0): Locator {
    return this.section.locator('.agent-box').nth(index);
  }

  /** The card's disclosure button — the question/title the reader clicks. */
  button(index = 0): Locator {
    return this.card(index).locator('button');
  }

  /** The solution code block, only present once the card is fully revealed. */
  solution(index = 0): Locator {
    return this.card(index).locator('pre');
  }
}
