import type { Page, Locator } from '@playwright/test';

/**
 * The coding-challenges section: levels of ChallengeCards. Like a question card,
 * each challenge is its own control — one click reveals a hint, the next the
 * solution (a `<pre>` code block), the next collapses.
 *
 * The levels themselves are `<details>` and ship closed, so a card is not
 * reachable until its level is opened. `openLevel` is here rather than in a
 * spec because that is where every other selector in this suite lives.
 */
export class ChallengesComponent {
  readonly section: Locator;

  constructor(page: Page) {
    this.section = page.locator('#coding-challenges');
  }

  /** The nth level, closed by default (0-based). */
  level(index = 0): Locator {
    return this.section.locator('details.challenge-level').nth(index);
  }

  /** Opens a level so the cards inside it can be reached. Safe to call twice. */
  async openLevel(index = 0): Promise<void> {
    const level = this.level(index);
    if (!(await level.evaluate(node => (node as HTMLDetailsElement).open))) {
      await level.locator('summary').click();
    }
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
