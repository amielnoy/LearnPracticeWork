import { test, expect } from '../support/test';
import {
  DEFAULT_TARGET_ROLE,
  IMPROVE_RESUME_PROMPT,
  TRANSLATE_RESUME_PROMPT,
  buildImproveRequest,
  buildTranslateRequest,
  needsEnglishRepair,
  nonLatinShare,
} from '@academy/lib/resumePrompt';

/**
 * The rewritten résumé is the one thing this site produces that is read by a
 * machine belonging to someone else. Two properties decide whether it survives
 * that reading: it is written in English, and it is written for the role the
 * applicant actually typed. Both used to depend on which language catalog
 * happened to be loaded, which is why they are asserted here.
 */

const HEBREW_RESUME = 'עמיאל פלד\nמהנדס אוטומציה\n' + 'ניסיון: Playwright, TypeScript';

test.describe('IMPROVE_RESUME_PROMPT', () => {
  test('demands English regardless of the language of the original', () => {
    expect(IMPROVE_RESUME_PROMPT).toContain('ENGLISH ONLY');
    expect(IMPROVE_RESUME_PROMPT).toContain('whatever language the original is in');
  });

  test('rules out leaving non-Latin characters in the output', () => {
    expect(IMPROVE_RESUME_PROMPT).toContain('transliterate');
    expect(IMPROVE_RESUME_PROMPT).toContain('non-Latin');
  });

  test('takes its brief from the target role rather than a hard-coded one', () => {
    expect(IMPROVE_RESUME_PROMPT).toContain('ONE target role');
    // The old prompt aimed every rewrite at QA/SDET whatever the applicant asked for.
    expect(IMPROVE_RESUME_PROMPT).not.toContain('targeted for QA Automation and SDET roles');
  });

  test('is itself written in English, so it cannot invite a reply in another language', () => {
    expect(IMPROVE_RESUME_PROMPT).not.toMatch(/[֐-׿]/);
  });
});

test.describe('buildImproveRequest', () => {
  test('names the role it was given', () => {
    const request = buildImproveRequest({
      role: 'Sales Engineer — Observability',
      resume: 'Amiel Peled\nAutomation engineer',
    });

    expect(request).toContain('Sales Engineer — Observability');
    expect(request).toContain('for it and for nothing else');
  });

  test('falls back to a default role only when none was typed', () => {
    const request = buildImproveRequest({ role: '   ', resume: 'Amiel Peled' });

    expect(request).toContain(DEFAULT_TARGET_ROLE);
  });

  test('closes with the English instruction, where a small model still has it', () => {
    const request = buildImproveRequest({ role: 'Sales Engineer', resume: HEBREW_RESUME });

    expect(request.trimEnd().endsWith('English only, targeted at: Sales Engineer')).toBe(true);
  });

  test('carries the job description when one is supplied', () => {
    const request = buildImproveRequest({
      role: 'Sales Engineer',
      jobDesc: 'Datadog APM, Kubernetes, customer demos',
      resume: 'Amiel Peled',
    });

    expect(request).toContain('Job description for that role:');
    expect(request).toContain('Datadog APM, Kubernetes, customer demos');
  });

  test('leaves the job-description section out rather than heading an empty one', () => {
    const request = buildImproveRequest({ role: 'Sales Engineer', jobDesc: '  ', resume: 'x' });

    expect(request).not.toContain('Job description');
  });

  test('lists the gaps and recommendations the evaluation found', () => {
    const request = buildImproveRequest({
      role: 'Sales Engineer',
      gaps: ['No pre-sales metrics', 'No cloud certifications'],
      recommendations: ['Quantify PoC conversion'],
      resume: 'Amiel Peled',
    });

    expect(request).toContain('- No pre-sales metrics');
    expect(request).toContain('- No cloud certifications');
    expect(request).toContain('- Quantify PoC conversion');
  });

  test('omits the findings sections when the evaluation produced none', () => {
    const request = buildImproveRequest({
      role: 'Sales Engineer',
      gaps: [],
      recommendations: [],
      resume: 'Amiel Peled',
    });

    expect(request).not.toContain('Gaps found');
    expect(request).not.toContain('Recommendations from the evaluation');
  });

  test('keeps its own wording in English around a Hebrew résumé', () => {
    // The Hebrew is the applicant's text, and the only Hebrew allowed through:
    // a request phrased in Hebrew is answered in Hebrew.
    const request = buildImproveRequest({ role: 'Sales Engineer', resume: HEBREW_RESUME });

    expect(request).toContain(HEBREW_RESUME);
    expect(request.replace(HEBREW_RESUME, '')).not.toMatch(/[֐-׿]/);
    expect(request).toContain('the rewrite must be in English');
  });
});

/**
 * The check that does not depend on the model cooperating. A small model shown
 * a Hebrew résumé under a Hebrew target role answers in Hebrew however the
 * system prompt is worded, so the answer is measured rather than trusted.
 */
test.describe('needsEnglishRepair', () => {
  test('passes a résumé that is written in English', () => {
    expect(
      needsEnglishRepair(
        'Amiel Peled\nSales Engineer\nBuilt Playwright suites and Datadog dashboards.',
      ),
    ).toBe(false);
  });

  test('catches a rewrite that came back in Hebrew', () => {
    expect(needsEnglishRepair(HEBREW_RESUME)).toBe(true);
  });

  test('catches a rewrite that is half English and half Hebrew', () => {
    expect(needsEnglishRepair('Sales Engineer\nמהנדס מכירות טכני עם ניסיון רב')).toBe(true);
  });

  test('tolerates a name the model chose not to transliterate', () => {
    const english =
      'Amiel Peled — Sales Engineer\n'.repeat(20) +
      'Built and shipped observability tooling across CI pipelines. (עמיאל)';

    expect(needsEnglishRepair(english)).toBe(false);
  });

  test('says nothing about text with no letters in it at all', () => {
    expect(nonLatinShare('')).toBe(0);
    expect(nonLatinShare('2025 — 40% · 15/1.5')).toBe(0);
    expect(needsEnglishRepair('')).toBe(false);
  });

  test('reads a fully Hebrew draft as almost entirely non-Latin', () => {
    expect(nonLatinShare(HEBREW_RESUME)).toBeGreaterThan(0.5);
  });
});

test.describe('the repair call', () => {
  test('asks for a translation, not a second rewrite', () => {
    expect(TRANSLATE_RESUME_PROMPT).toContain('Change nothing but the language');
    expect(TRANSLATE_RESUME_PROMPT).toContain('do not improve it further');
  });

  test('hands back the draft under the role it was written for', () => {
    const request = buildTranslateRequest({ role: 'Sales Engineer', draft: HEBREW_RESUME });

    expect(request).toContain('Sales Engineer');
    expect(request).toContain(HEBREW_RESUME);
  });

  test('falls back to the default role when the draft has none', () => {
    expect(buildTranslateRequest({ role: '', draft: HEBREW_RESUME })).toContain(
      DEFAULT_TARGET_ROLE,
    );
  });
});
