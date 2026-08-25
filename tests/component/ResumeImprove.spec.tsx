import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { ResumeAgent } from '@academy/components/agents/ResumeAgent';
import { en } from '@academy/lib/locales';
import { TRANSLATE_RESUME_PROMPT } from '@academy/lib/resumePrompt';

/**
 * What comes back from "build improved résumé", driven through the real
 * provider plumbing with the model's answers stubbed.
 *
 * The rewrite is the one artefact this site produces that someone else's
 * machine reads, and it has to be in English to survive that reading. Asking
 * the model for English is not enough: the default provider is a small model
 * being shown a Hebrew résumé under a Hebrew target role by a reader with a
 * Hebrew interface, and it answers in the language it was shown. So these
 * tests stub exactly that — a Hebrew answer to an English request — and assert
 * on what the applicant ends up holding.
 */

const S = en.s;

const SERVER_KEY = { groq: { available: true, defaultModel: 'openai/gpt-oss-20b' } };

const HEBREW_RESUME =
  'עמיאל פלד\nמהנדס אוטומציה בכיר עם ניסיון בבניית מסגרות בדיקות, ניטור מערכות והדגמות ללקוחות.\n' +
  'ניסיון: Playwright, TypeScript, Datadog, GitHub Actions, Kubernetes.';

const EVALUATION = JSON.stringify({
  overall: 72,
  summary: 'Strong automation background, thin on pre-sales metrics.',
  categories: [{ name: 'Technical Skills', score: 80 }],
  strengths: ['Deep Playwright experience'],
  gaps: ['No quantified pre-sales impact'],
  recommendations: ['Quantify PoC conversion'],
});

const HEBREW_REWRITE =
  'עמיאל פלד — מהנדס מכירות טכני\nפרופיל: מהנדס עם שמונה שנות ניסיון באוטומציה ובניטור מערכות.\n' +
  'ניסיון: הקים מסגרות בדיקות, קיצר זמני הרצה ב-70%, והציג ערך עסקי ללקוחות.';

const ENGLISH_REWRITE =
  'Amiel Peled — Sales Engineer\nSummary: Sales engineer with eight years in automation and observability.\n' +
  'Experience: Built test frameworks, cut suite runtime by 70%, and presented business value to customers.';

/** Every answer the stub handed back, and every request it was asked with. */
interface AiCall {
  system: string;
  content: string;
}

/**
 * Serves `/api/ai/generate` from a queue, one canned answer per call, and
 * records what was asked. The queue is what makes the repair pass visible:
 * a test that stubs a Hebrew rewrite is asserting on the call that follows it.
 */
async function stubAi(page: Page, replies: string[]): Promise<AiCall[]> {
  const calls: AiCall[] = [];
  await page.route('**/api/ai/config', route => route.fulfill({ json: SERVER_KEY }));
  await page.route('**/api/ai/generate', route => {
    const body = route.request().postDataJSON() as {
      system: string;
      messages: Array<{ content: string }>;
    };
    calls.push({ system: body.system, content: body.messages[0]?.content ?? '' });
    const text = replies[calls.length - 1] ?? '';
    return route.fulfill({ json: { text } });
  });
  return calls;
}

function harness() {
  return (
    <LocaleProvider>
      <ProgressProvider>
        <ProviderContextProvider>
          <ResumeAgent />
        </ProviderContextProvider>
      </ProgressProvider>
    </LocaleProvider>
  );
}

/** Fills the form with a Hebrew résumé for a Hebrew-titled role, and evaluates it. */
async function evaluateHebrewResume(component: ReturnType<Page['locator']>) {
  await component.locator('#targetRole').fill('מהנדס מכירות בחברת Datadog');
  await component.locator('#resumeText').fill(HEBREW_RESUME);
  await component.locator('#resumeDataConsent').check();
  await component.locator('#resumeBtn').click();
  await expect(component.locator('#resumeScore')).toHaveText('72');
}

test('translates a rewrite that came back in Hebrew instead of handing it over', async ({
  mount,
  page,
}) => {
  const calls = await stubAi(page, [EVALUATION, HEBREW_REWRITE, ENGLISH_REWRITE]);
  const component = await mount(harness());
  await evaluateHebrewResume(component);

  await component.locator('#improveBtn').click();

  const improved = component.locator('#improvedText');
  await expect(improved).toContainText('Sales Engineer');
  await expect(improved).not.toContainText(/[֐-׿]/);
  expect(calls).toHaveLength(3);
  expect(calls[2].system).toBe(TRANSLATE_RESUME_PROMPT);
  expect(calls[2].content).toContain(HEBREW_REWRITE);
});

test('spends no second call on a rewrite that already came back in English', async ({
  mount,
  page,
}) => {
  const calls = await stubAi(page, [EVALUATION, ENGLISH_REWRITE, HEBREW_REWRITE]);
  const component = await mount(harness());
  await evaluateHebrewResume(component);

  await component.locator('#improveBtn').click();

  await expect(component.locator('#improvedText')).toContainText('Sales Engineer');
  expect(calls).toHaveLength(2);
});

test('says so rather than delivering Hebrew when even the translation comes back in Hebrew', async ({
  mount,
  page,
}) => {
  const calls = await stubAi(page, [EVALUATION, HEBREW_REWRITE, HEBREW_REWRITE]);
  const component = await mount(harness());
  await evaluateHebrewResume(component);

  await component.locator('#improveBtn').click();

  await expect(component.locator('#improvedErr')).toHaveText(S.errImprovedNotEnglish);
  // Nothing is shown, because a Hebrew file is worse than none: its owner would
  // send it to an employer believing it to be the English one they asked for.
  await expect(component.locator('#improvedText')).toHaveCount(0);
  expect(calls).toHaveLength(3);
});

test('carries the applicant’s role into the rewrite request, in English', async ({
  mount,
  page,
}) => {
  const calls = await stubAi(page, [EVALUATION, ENGLISH_REWRITE]);
  const component = await mount(harness());
  await evaluateHebrewResume(component);

  await component.locator('#improveBtn').click();
  await expect(component.locator('#improvedText')).toContainText('Sales Engineer');

  expect(calls[1].content).toContain('מהנדס מכירות בחברת Datadog');
  expect(calls[1].content).toContain('Write the rewritten résumé in English only');
});
