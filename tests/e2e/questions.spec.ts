import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

/**
 * The interview questions render as buttons: each question reveals a hint on the
 * first click, the full answer on the second, and collapses on the third. This
 * drives that cycle through the real app on both the desktop and mobile project.
 */
let home: HomePage;

const QUESTION = 'What is the Page Object Model';

test.beforeEach(async ({ page }) => {
  home = await new HomePage(page).open();
  await home.questions.openStage('Stage 2 — Test Automation Knowledge');
});

test('a question button starts collapsed', async () => {
  const q = home.questions.question(QUESTION);
  await expect(q).toBeVisible();
  await expect(q).toHaveAttribute('aria-expanded', 'false');
  await expect(home.questions.hintOf(QUESTION)).toHaveCount(0);
});

test('reveals the hint, then the answer, then collapses', async () => {
  const q = home.questions.question(QUESTION);

  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'true');
  await expect(home.questions.hintOf(QUESTION)).toBeVisible();
  await expect(home.questions.answerOf(QUESTION)).toHaveCount(0);

  await q.click();
  await expect(home.questions.answerOf(QUESTION)).toBeVisible();
  // The hint stays put — the answer builds on it rather than replacing it.
  await expect(home.questions.hintOf(QUESTION)).toBeVisible();

  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'false');
  await expect(home.questions.hintOf(QUESTION)).toHaveCount(0);
  await expect(home.questions.answerOf(QUESTION)).toHaveCount(0);
});
