import { test, expect } from './fixtures';

test('the home screen presents the three primary tools clearly', async ({ home }) => {
  const launcher = home.main.locator('.tool-launcher');

  await expect(launcher.getByRole('heading', { name: 'Resume Coach' })).toBeVisible();
  await expect(launcher.getByRole('heading', { name: 'Mock Interview' })).toBeVisible();
  await expect(launcher.getByRole('heading', { name: 'Practice Library' })).toBeVisible();
  await expect(launcher.locator('.tool-card')).toHaveCount(3);
});

test('the sample CV CTA loads a useful example without asking for setup first', async ({ hero, page }) => {
  await hero.cta('Analyze a sample CV').click();

  await expect(page).toHaveURL(/#resume$/);
  await expect(page.locator('#resumeText')).toHaveValue(/Alex Morgan/);
  await expect(page.locator('#targetRole')).toHaveValue('QA Automation Engineer');
});

test('progress survives a reload and offers a continue action', async ({ home: _home, page }) => {
  await page.evaluate(() => {
    localStorage.setItem('ata_progress_v1', JSON.stringify({
      resumeStarted: true,
      resumeCompleted: false,
      interviewStarted: false,
      interviewAnswers: 0,
      interviewCompleted: false,
      practiceCompleted: [],
      lastTool: 'resume',
    }));
  });
  await page.reload();

  const launcher = page.locator('.tool-launcher');
  await expect(launcher.getByRole('link', { name: /Continue where you stopped Resume Coach/ })).toBeVisible();
  await expect(launcher.getByRole('progressbar', { name: 'Resume Coach — Progress' }))
    .toHaveAttribute('aria-valuenow', '35');
});
