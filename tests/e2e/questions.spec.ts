import { test, expect } from './fixtures';

/**
 * The interview questions render as buttons: each question reveals a hint on the
 * first click, the full answer on the second, and collapses on the third. This
 * drives that cycle through the real app on both the desktop and mobile project.
 */
const QUESTION = 'What is the Page Object Model';

test.beforeEach(async ({ questions }) => {
  await questions.openStage('Stage 2 — Test Automation Knowledge');
});

test('a question button starts collapsed', async ({ questions }) => {
  const q = questions.question(QUESTION);
  await expect(q).toBeVisible();
  await expect(q).toHaveAttribute('aria-expanded', 'false');
  await expect(questions.hintOf(QUESTION)).toHaveCount(0);
});

test('reveals the hint, then the answer, then collapses', async ({ questions }) => {
  const q = questions.question(QUESTION);

  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'true');
  await expect(questions.hintOf(QUESTION)).toBeVisible();
  await expect(questions.answerOf(QUESTION)).toHaveCount(0);

  await q.click();
  await expect(questions.answerOf(QUESTION)).toBeVisible();
  // The hint stays put — the answer builds on it rather than replacing it.
  await expect(questions.hintOf(QUESTION)).toBeVisible();

  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'false');
  await expect(questions.hintOf(QUESTION)).toHaveCount(0);
  await expect(questions.answerOf(QUESTION)).toHaveCount(0);
});
