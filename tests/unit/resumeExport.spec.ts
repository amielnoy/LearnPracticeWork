import { test, expect } from '../support/test';
import { allure } from 'allure-playwright';
import { resumeFilename } from '@academy/lib/resumeExport';

/**
 * The name the improved résumé is saved under.
 *
 * The role it is built from is free text the visitor typed, and it goes
 * straight into a download filename. A path separator or a reserved character
 * in there is a save that fails, or worse, one that lands somewhere else.
 */

test.beforeEach(async () => {
  await allure.layer('unit');
  await allure.feature('Résumé export');
});

test('names the file after the role it was targeted at', () => {
  expect(resumeFilename('QA Automation Engineer')).toBe('Resume - QA Automation Engineer.pdf');
});

test('replaces a path separator rather than creating a directory', () => {
  expect(resumeFilename('QA/Automation')).toBe('Resume - QA-Automation.pdf');
  expect(resumeFilename('QA\\Automation')).toBe('Resume - QA-Automation.pdf');
});

test('collapses a run of reserved characters into one dash', () => {
  expect(resumeFilename('SDET<>:"|?*Lead')).toBe('Resume - SDET-Lead.pdf');
});

test('does not let a traversal sequence survive as one', () => {
  expect(resumeFilename('../../etc/passwd')).toBe('Resume - ..-..-etc-passwd.pdf');
});

test('keeps a Hebrew role intact, since it is a valid filename', () => {
  expect(resumeFilename('מהנדס אוטומציה')).toBe('Resume - מהנדס אוטומציה.pdf');
});

test('caps the length so a pasted job description cannot become the filename', () => {
  const name = resumeFilename('Senior '.repeat(50) + 'Engineer');

  // The bound applies to the stem; the extension is added after it.
  expect(name.length).toBeLessThanOrEqual(84);
  expect(name.endsWith('.pdf')).toBe(true);
});

test('does not leave a trailing space before the extension', () => {
  expect(resumeFilename('QA Engineer   ')).toBe('Resume - QA Engineer.pdf');
});
