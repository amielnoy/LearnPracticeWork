import { test, expect } from './fixtures';
import { EN_BANK } from '@academy/lib/questionBank';

/**
 * The section that wires the content to the cards. These tests assert the
 * relationship between the bank and the DOM rather than any single question,
 * so adding a question to the catalog must not require editing a test. The
 * `questionBank` fixture serves the config probe, mounts the component, and
 * exposes `openAllStages()`.
 */
const totalQuestions = EN_BANK.stages.reduce((sum, stage) => sum + stage.items.length, 0);

test('renders one collapsible panel per interview stage', async ({ questionBank }) => {
  const { component } = questionBank;

  await expect(component.locator('.q-list')).toHaveCount(EN_BANK.stages.length);

  for (const stage of EN_BANK.stages) {
    await expect(component.getByRole('heading', { name: stage.title })).toBeVisible();
  }
});

test('renders one button per question across every stage', async ({ questionBank }) => {
  const { component, openAllStages } = questionBank;
  await openAllStages();

  await expect(component.locator('.q-btn')).toHaveCount(totalQuestions);
  expect(totalQuestions).toBeGreaterThan(0);
});

test('hides every hint and answer until asked', async ({ questionBank }) => {
  const { component, openAllStages } = questionBank;
  await openAllStages();

  await expect(component.locator('.q-hint')).toHaveCount(0);
  await expect(component.locator('.q-answer')).toHaveCount(0);
});

test('reveals one question at a time, leaving its neighbours collapsed', async ({ questionBank }) => {
  const { component, openAllStages } = questionBank;
  await openAllStages();

  await component.locator('.q-btn').first().click();

  await expect(component.locator('.q-hint')).toHaveCount(1);
  await expect(component.locator('.q-answer')).toHaveCount(0);

  await component.locator('.q-btn').first().click();
  await expect(component.locator('.q-answer')).toHaveCount(1);
  // Neighbours untouched — each card owns its own stage.
  await expect(component.locator('.q-hint')).toHaveCount(1);
});

test('gives every question a unique text, so the cards keep stable keys', async ({ questionBank }) => {
  const questions = EN_BANK.stages.flatMap(stage => stage.items.map(item => item.q));
  expect(new Set(questions).size).toBe(questions.length);

  const { component, openAllStages } = questionBank;
  await openAllStages();

  await expect(component.locator('.q-btn .q-text')).toHaveCount(questions.length);
});

test('gives every question both a hint and a non-empty answer', () => {
  // Content guard: a question shipped without a hint would render a control
  // whose first click appears to do nothing. Pure data check — no mount needed.
  for (const stage of EN_BANK.stages) {
    for (const item of stage.items) {
      expect(item.hint, `${item.q} has a hint`).toBeTruthy();
      expect(item.answer.length, `${item.q} has an answer`).toBeGreaterThan(0);
    }
  }
});
