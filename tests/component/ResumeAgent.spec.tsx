import { test, expect } from './fixtures';
import { en } from '@academy/lib/locales';
import { imageOnlyPdf, longResumeText, textPdf } from '../support/pdfFixtures';

/**
 * The résumé uploader, driven with real PDFs through the real pdf.js.
 *
 * The case worth the setup is the résumé that is a picture of a résumé. It has
 * been reached twice from different directions — once by the site's own
 * rasterising fallback, which emitted image-only PDFs whenever the Hebrew font
 * failed to load, and once by an applicant simply scanning a printout. Both
 * produce a file that looks right to the person holding it and is empty to
 * every machine that reads one, an applicant tracking system included, so
 * saying "could not extract text" and stopping there leaves the reader with no
 * idea that their file is the problem.
 *
 * These tests therefore assert on which message comes back, not merely that
 * some error did: the two failures need different things from the reader.
 */

const S = en.s;

/** Comfortably past the length below which the component calls extraction failed. */
const FULL_RESUME =
  'Amiel Peled\nQA Automation Engineer\namielnoy@gmail.com\n\n' +
  'SUMMARY\nAutomation engineer building Playwright suites and CI pipelines.\n\n' +
  'SKILLS\nPlaywright, TypeScript, Node.js, CI/CD, REST APIs, SQL';

test.describe('a résumé with no text layer', () => {
  test('is named as a scan rather than as an extraction that came up short', async ({
    resumeAgent,
  }) => {
    await resumeAgent.upload('scanned-resume.pdf', imageOnlyPdf());

    await expect(resumeAgent.error).toHaveText(S.errScannedPdf);
  });

  test('warns that no applicant tracking system can read it either', async ({ resumeAgent }) => {
    // The consequence, not the mechanism: someone whose only copy is a scan has
    // a problem well beyond this upload failing, and this is where they find out.
    await resumeAgent.upload('scanned-resume.pdf', imageOnlyPdf());

    await expect(resumeAgent.error).toContainText('applicant tracking system');
  });

  test('leaves the editor empty rather than half-filling it', async ({ resumeAgent }) => {
    await resumeAgent.upload('scanned-resume.pdf', imageOnlyPdf());

    await expect(resumeAgent.error).toHaveText(S.errScannedPdf);
    await expect(resumeAgent.resumeText).toHaveValue('');
    // Back to the invitation, so the zone does not sit on a filename that was
    // never actually read.
    await expect(resumeAgent.uploadLabel).toHaveText(S.uploadPrompt);
  });
});

test.describe('a résumé that does have a text layer', () => {
  test('still reports a nearly empty one as a failed extraction', async ({ resumeAgent }) => {
    // The distinction the scan message must not swallow. This file has real
    // text in it, just not enough to be a résumé, and telling its owner to
    // re-export it as a text PDF would be advice about the wrong problem.
    await resumeAgent.upload('stub.pdf', await textPdf('Amiel'));

    await expect(resumeAgent.error).toHaveText(S.errExtractFail);
  });

  test('loads into the editor, with the character count in the label', async ({ resumeAgent }) => {
    await resumeAgent.upload('resume.pdf', await textPdf(FULL_RESUME));

    await expect(resumeAgent.error).toHaveText('');
    await expect(resumeAgent.resumeText).toHaveValue(/QA Automation Engineer/);
    await expect(resumeAgent.uploadLabel).toContainText('resume.pdf');
    await expect(resumeAgent.uploadLabel).toContainText(S.uploadLoadedSuffix);
  });
});

/**
 * One page of a résumé is read in about a millisecond, so none of this is about
 * speed. It is about the label never sitting still long enough to be mistaken
 * for a stall: the fetch of pdf.js and its worker is the one genuinely slow
 * step, it happens before there is anything to count, and a zone that says the
 * same thing throughout is what made a working upload look like a hung one.
 */
test.describe('while a résumé is being read', () => {
  /** The page counters the zone showed, in order, as `{ page, pages }`. */
  function pageCounters(labels: readonly string[]): Array<{ page: number; pages: number }> {
    return labels
      .filter(label => label.includes(S.uploadPageMid))
      .map(label => {
        const counter = label.slice(label.indexOf(S.uploadPageMid) + S.uploadPageMid.length);
        const [page, pages] = counter.replace(/\.{3}$/, '').split(S.uploadPageOf);
        return { page: Number(page), pages: Number(pages) };
      });
  }

  test('says it is getting ready before it can count anything', async ({ resumeAgent }) => {
    const read = await resumeAgent.recordUploadLabels();

    await resumeAgent.upload('resume.pdf', await textPdf(FULL_RESUME));
    await expect(resumeAgent.resumeText).toHaveValue(/QA Automation Engineer/);

    // First state after the file is handed over, and the only one covering the
    // download of the reader itself.
    expect(await read()).toContain(`${S.uploadPreparing}resume.pdf...`);
  });

  test('counts its way through a résumé that runs to several pages', async ({ resumeAgent }) => {
    const read = await resumeAgent.recordUploadLabels();

    await resumeAgent.upload('long-resume.pdf', await textPdf(longResumeText(4)));
    await expect(resumeAgent.resumeText).toHaveValue(/milestone 1\./);

    const counters = pageCounters(await read());
    const total = counters[0]?.pages ?? 0;
    expect(total).toBeGreaterThan(1);
    // Starts at the first page, ends at the last, never goes backwards, and
    // every step agrees on how many pages there are. Deliberately not an
    // assertion that all N were seen: the counters are read from rendered
    // frames, and a frame the browser coalesces under load is not a defect.
    expect(counters[0]?.page).toBe(1);
    expect(counters.at(-1)?.page).toBe(total);
    expect(counters.every(c => c.pages === total)).toBe(true);
    expect(counters.map(c => c.page)).toEqual([...counters.map(c => c.page)].sort((a, b) => a - b));
  });

  test('leaves the counter behind once the text is in', async ({ resumeAgent }) => {
    await resumeAgent.upload('long-resume.pdf', await textPdf(longResumeText(4)));

    await expect(resumeAgent.uploadLabel).toContainText(S.uploadLoadedSuffix);
    await expect(resumeAgent.uploadLabel).not.toContainText(S.uploadPageMid);
  });
});

test.describe('choosing a file a second time', () => {
  test('leaves the picker holding nothing, so the same file can be chosen again', async ({
    resumeAgent,
  }) => {
    // A real file picker fires `change` only when the selection differs from
    // what the input already holds, so an input still holding `resume.pdf`
    // ignores `resume.pdf` being chosen again — and the obvious recovery from a
    // failed upload, picking the same file once more, does nothing at all.
    // Clearing the input after each read is what keeps that route open.
    //
    // Asserted on the input rather than by choosing twice: `setInputFiles`
    // raises the events itself whatever the input holds, so a test driven that
    // way passes with or without the clearing and proves nothing.
    await resumeAgent.upload('resume.pdf', await textPdf(FULL_RESUME));
    await expect(resumeAgent.resumeText).toHaveValue(/QA Automation Engineer/);

    await expect(resumeAgent.fileInput).toHaveValue('');
    expect(await resumeAgent.selectedFileCount()).toBe(0);
  });

  test('re-reads a file it has already read', async ({ resumeAgent }) => {
    // Weaker than the check above and kept for a different reason: nothing in
    // the read path may quietly treat a filename it has seen before as done.
    const pdf = await textPdf(FULL_RESUME);
    await resumeAgent.upload('resume.pdf', pdf);
    await expect(resumeAgent.resumeText).toHaveValue(/QA Automation Engineer/);

    await resumeAgent.resumeText.fill('');
    await resumeAgent.upload('resume.pdf', pdf);

    await expect(resumeAgent.resumeText).toHaveValue(/QA Automation Engineer/);
  });

  test('recovers after a rejected file, without a reload', async ({ resumeAgent }) => {
    // The whole point of the retry: the reader is told their scan is unreadable,
    // exports a text PDF, and picks a file again in the same session.
    await resumeAgent.upload('scanned-resume.pdf', imageOnlyPdf());
    await expect(resumeAgent.error).toHaveText(S.errScannedPdf);

    await resumeAgent.upload('resume.pdf', await textPdf(FULL_RESUME));

    await expect(resumeAgent.error).toHaveText('');
    await expect(resumeAgent.resumeText).toHaveValue(/QA Automation Engineer/);
  });
});
