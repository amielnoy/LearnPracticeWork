import { test, expect } from '@playwright/experimental-ct-react';
import { QuestionCard } from '@academy/components/QuestionCard';
import type { QuestionItem, QuestionLabels } from '@academy/lib/questionBank';

/**
 * The interview question is itself the control: click once for a hint, again
 * for the full answer, again to collapse. Same three-stage cycle as
 * ChallengeCard, driven here through the real button.
 */

const item: QuestionItem = {
  q: 'How do you test a feature powered by an LLM deterministically?',
  hint: 'Split the system: the parts you can pin, and the part you can only score.',
  answer: [
    'Separate the deterministic shell from the probabilistic core.',
    'Pin the model: fix temperature and seed, freeze the version, replay fixtures.',
    'Assert properties rather than exact strings.',
  ],
};

const labels: QuestionLabels = {
  hint: 'Hint',
  answer: 'Answer',
  showHint: 'Show hint',
  showAnswer: 'Show full answer',
  hide: 'Hide',
};

test('renders the question as a button, with nothing revealed', async ({ mount }) => {
  const component = await mount(<QuestionCard item={item} labels={labels} />);

  const button = component.getByRole('button');
  await expect(button).toContainText(item.q);
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(component.getByText(item.hint)).toBeHidden();
  await expect(component.locator('.q-answer')).toBeHidden();
});

test('tells the reader what the next click will do', async ({ mount }) => {
  const component = await mount(<QuestionCard item={item} labels={labels} />);
  const cue = component.locator('.q-cue');

  await expect(cue).toHaveText(labels.showHint);
  await component.getByRole('button').click();
  await expect(cue).toHaveText(labels.showAnswer);
  await component.getByRole('button').click();
  await expect(cue).toHaveText(labels.hide);
});

test('reveals the hint on the first click, without giving away the answer', async ({ mount }) => {
  const component = await mount(<QuestionCard item={item} labels={labels} />);

  await component.getByRole('button').click();

  await expect(component.getByText(item.hint)).toBeVisible();
  await expect(component.locator('.q-answer')).toBeHidden();
  await expect(component.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
});

test('reveals every paragraph of the answer on the second click', async ({ mount }) => {
  const component = await mount(<QuestionCard item={item} labels={labels} />);

  await component.getByRole('button').click();
  await component.getByRole('button').click();

  await expect(component.locator('.q-answer')).toBeVisible();
  await expect(component.locator('.q-answer p')).toHaveCount(item.answer.length);
  for (const paragraph of item.answer) {
    await expect(component.getByText(paragraph)).toBeVisible();
  }
  // The hint stays put — the answer builds on it rather than replacing it.
  await expect(component.getByText(item.hint)).toBeVisible();
});

test('collapses back to the bare question on the third click', async ({ mount }) => {
  const component = await mount(<QuestionCard item={item} labels={labels} />);

  const button = component.getByRole('button');
  await button.click();
  await button.click();
  await button.click();

  await expect(component.getByText(item.hint)).toBeHidden();
  await expect(component.locator('.q-answer')).toBeHidden();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('renders the inline markup the answers carry, rather than printing it', async ({ mount }) => {
  const marked: QuestionItem = {
    q: 'How do you parametrize a test?',
    hint: 'Reach for `@pytest.mark.parametrize`.',
    answer: ['Use `ids=` so the report names the case, and assert a *rate* rather than a single run.'],
  };

  const component = await mount(<QuestionCard item={marked} labels={labels} />);
  await component.getByRole('button').click();
  await component.getByRole('button').click();

  await expect(component.locator('.q-hint code.inline')).toHaveText('@pytest.mark.parametrize');
  await expect(component.locator('.q-answer code.inline')).toHaveText('ids=');
  await expect(component.locator('.q-answer em')).toHaveText('rate');
  // The delimiters themselves must not survive into the rendered text.
  await expect(component.locator('.q-answer')).not.toContainText('`');
  await expect(component.locator('.q-answer')).not.toContainText('*');
});

test('keeps the question readable as the only always-visible text', async ({ mount }) => {
  // Guards the layout contract the CSS relies on: question first, cue second,
  // both inside the one control so a screen reader announces them together.
  const component = await mount(<QuestionCard item={item} labels={labels} />);

  await expect(component.locator('.q-btn .q-text')).toHaveText(item.q);
  await expect(component.locator('.q-btn .q-cue')).toHaveText(labels.showHint);
});
