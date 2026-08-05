import type { Page, Locator } from '@playwright/test';

/**
 * The interview-questions section: collapsible stage panels, each holding a list
 * of question cards. A card's question is itself the button — one click reveals
 * a hint, the next the full answer, the next collapses it.
 */
export class QuestionsComponent {
  readonly section: Locator;

  constructor(page: Page) {
    this.section = page.locator('#interview-questions');
  }

  /** Open a stage panel by (a substring of) its heading, if it isn't already. */
  async openStage(title: string): Promise<void> {
    const panel = this.section.locator('details.agent-box').filter({ hasText: title });
    const isOpen = await panel.evaluate(el => (el as HTMLDetailsElement).open);
    if (!isOpen) await panel.locator('summary').click();
  }

  /** The `<li>` card whose question contains `text`. */
  card(text: string): Locator {
    return this.section.locator('.q-item', { hasText: text });
  }

  /** The question button — the control the reader clicks. */
  question(text: string): Locator {
    return this.card(text).locator('.q-btn');
  }

  hintOf(text: string): Locator {
    return this.card(text).locator('.q-hint');
  }

  answerOf(text: string): Locator {
    return this.card(text).locator('.q-answer');
  }
}
