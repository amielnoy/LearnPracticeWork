import { test, expect } from '@playwright/experimental-ct-react';
import type { Page } from '@playwright/test';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { QuestionBank } from '@academy/components/QuestionBank';
import { EN_BANK } from '@academy/lib/questionBank';

/**
 * The section that wires the content to the cards. These tests assert the
 * relationship between the bank and the DOM rather than any single question,
 * so adding a question to the catalog must not require editing a test.
 */

const totalQuestions = EN_BANK.stages.reduce((sum, stage) => sum + stage.items.length, 0);

/** The provider context probes this on mount; nothing here needs a real server. */
const serveConfig = (page: Page) =>
  page.route('**/api/ai/config', route => route.fulfill({ json: { gemini: { available: false } } }));

const Subject = (
  <LocaleProvider>
    <ProviderContextProvider>
      <QuestionBank />
    </ProviderContextProvider>
  </LocaleProvider>
);

/** Stage panels are collapsed `<details>`; open them all. */
async function openEveryStage(component: ReturnType<Page['locator']>) {
  const stages = component.locator('details.agent-box').filter({ has: component.page().locator('.q-list') });
  const count = await stages.count();
  for (let i = 0; i < count; i++) await stages.nth(i).locator('summary').click();
}

test('renders one collapsible panel per interview stage', async ({ mount, page }) => {
  await serveConfig(page);
  const component = await mount(Subject);

  await expect(component.locator('.q-list')).toHaveCount(EN_BANK.stages.length);

  for (const stage of EN_BANK.stages) {
    await expect(component.getByRole('heading', { name: stage.title })).toBeVisible();
  }
});

test('renders one button per question across every stage', async ({ mount, page }) => {
  await serveConfig(page);
  const component = await mount(Subject);
  await openEveryStage(component);

  await expect(component.locator('.q-btn')).toHaveCount(totalQuestions);
  expect(totalQuestions).toBeGreaterThan(0);
});

test('hides every hint and answer until asked', async ({ mount, page }) => {
  await serveConfig(page);
  const component = await mount(Subject);
  await openEveryStage(component);

  await expect(component.locator('.q-hint')).toHaveCount(0);
  await expect(component.locator('.q-answer')).toHaveCount(0);
});

test('reveals one question at a time, leaving its neighbours collapsed', async ({
  mount,
  page,
}) => {
  await serveConfig(page);
  const component = await mount(Subject);
  await openEveryStage(component);

  await component.locator('.q-btn').first().click();

  await expect(component.locator('.q-hint')).toHaveCount(1);
  await expect(component.locator('.q-answer')).toHaveCount(0);

  await component.locator('.q-btn').first().click();
  await expect(component.locator('.q-answer')).toHaveCount(1);
  // 26 neighbours untouched — each card owns its own stage.
  await expect(component.locator('.q-hint')).toHaveCount(1);
});

test('gives every question a unique text, so the cards keep stable keys', async ({
  mount,
  page,
}) => {
  const questions = EN_BANK.stages.flatMap(stage => stage.items.map(item => item.q));
  expect(new Set(questions).size).toBe(questions.length);

  await serveConfig(page);
  const component = await mount(Subject);
  await openEveryStage(component);

  await expect(component.locator('.q-btn .q-text')).toHaveCount(questions.length);
});

test('gives every question both a hint and a non-empty answer', async () => {
  // Content guard: a question shipped without a hint would render a control
  // whose first click appears to do nothing.
  for (const stage of EN_BANK.stages) {
    for (const item of stage.items) {
      expect(item.hint, `${item.q} has a hint`).toBeTruthy();
      expect(item.answer.length, `${item.q} has an answer`).toBeGreaterThan(0);
    }
  }
});
