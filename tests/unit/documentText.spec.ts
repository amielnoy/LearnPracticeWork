import { test, expect } from '../support/test';
import { allure } from 'allure-playwright';
import {
  EXTRACTORS,
  MAX_FILE_BYTES,
  MAX_RESUME_LENGTH,
  MIN_RESUME_LENGTH,
  extensionOf,
  extractorFor,
  normalizeExtractedText,
  precheckResumeFile,
  readResumeFile,
  type ResumeReadMessages,
} from '@academy/lib/documentText';

/**
 * Reading a résumé out of a file, decided before any parser is loaded.
 *
 * The component tests drive the same code through real PDFs and the real
 * pdf.js, which is where the scanned-résumé case belongs. What is checked here
 * is the part that has nothing to do with any one format: which extractor a
 * filename selects, which refusals happen without opening the file at all, and
 * the order the checks run in — because a scan and a résumé that is merely too
 * short need different things said to the person who uploaded them.
 */

test.beforeEach(async () => {
  await allure.layer('unit');
  await allure.feature('Résumé document reading');
});

const MESSAGES: ResumeReadMessages = {
  fileTooLarge: 'too large',
  scannedPdf: 'this is a scan',
  extractedTooLong: 'too long',
  extractionFailed: 'could not extract',
  unsupportedFormat: ext => `unsupported: ${ext}`,
};

/** A file with real bytes, so `size` and `text()` behave as the browser's would. */
function file(name: string, contents: string): File {
  return new File([contents], name, { type: 'text/plain' });
}

/** A file that reports a size without allocating it. */
function oversizedFile(name: string): File {
  const stub = new File(['x'], name);
  Object.defineProperty(stub, 'size', { value: MAX_FILE_BYTES + 1 });
  return stub;
}

test.describe('choosing an extractor', () => {
  test('reads the extension from the last dot, not the first', () => {
    expect(extensionOf('Amiel Peled - resume.v2.final.pdf')).toBe('pdf');
  });

  test('is case-insensitive, because file managers are not consistent', () => {
    expect(extractorFor('RESUME.PDF')).toBe(EXTRACTORS.pdf);
    expect(extractorFor('resume.DocX')).toBe(EXTRACTORS.docx);
  });

  test('has no extractor for a file with no extension at all', () => {
    expect(extractorFor('resume')).toBeUndefined();
  });

  test('offers exactly the three formats the upload zone advertises', () => {
    // The `accept` attribute on the input says ".pdf,.docx,.txt"; a format in
    // one list and not the other is a file the reader can pick and not use.
    expect(Object.keys(EXTRACTORS).sort()).toEqual(['docx', 'pdf', 'txt']);
  });

  test('marks only the PDF parser as slow to load', () => {
    // This is what decides whether the upload zone says "getting ready" before
    // it can report a page count. pdf.js is over a megabyte; mammoth is not.
    expect(EXTRACTORS.pdf!.slowToLoad).toBe(true);
    expect(EXTRACTORS.docx!.slowToLoad).toBe(false);
    expect(EXTRACTORS.txt!.slowToLoad).toBe(false);
  });
});

test.describe('refusals that need no parser', () => {
  test('names the size limit for a file above it', () => {
    expect(precheckResumeFile(oversizedFile('big.pdf'), MESSAGES)).toBe('too large');
  });

  test('accepts a file exactly at the limit', () => {
    const atLimit = new File(['x'], 'exact.pdf');
    Object.defineProperty(atLimit, 'size', { value: MAX_FILE_BYTES });

    expect(precheckResumeFile(atLimit, MESSAGES)).toBeNull();
  });

  test('names the extension it does not support', () => {
    expect(precheckResumeFile(file('resume.pages', 'x'), MESSAGES)).toBe('unsupported: pages');
  });

  test('checks the size before the format, so a huge .exe is refused as huge', () => {
    // The size is the reason to stop; telling someone to re-export a 40 MB file
    // as a PDF would be advice about the wrong problem.
    expect(precheckResumeFile(oversizedFile('malware.exe'), MESSAGES)).toBe('too large');
  });

  test('passes a supported file of an acceptable size', () => {
    expect(precheckResumeFile(file('resume.txt', 'x'), MESSAGES)).toBeNull();
  });
});

test.describe('normalising what a parser returns', () => {
  test('collapses the runs of spaces that PDF text layers leave behind', () => {
    expect(normalizeExtractedText('QA    Automation\tEngineer')).toBe('QA Automation Engineer');
  });

  test('keeps a paragraph break but discards the blank pages around it', () => {
    expect(normalizeExtractedText('SUMMARY\n\n\n\n\nEXPERIENCE')).toBe('SUMMARY\n\nEXPERIENCE');
  });

  test('leaves a single newline alone, because a résumé is a list of lines', () => {
    expect(normalizeExtractedText('Alex Morgan\nQA Engineer')).toBe('Alex Morgan\nQA Engineer');
  });

  test('trims the leading and trailing whitespace of the whole document', () => {
    expect(normalizeExtractedText('\n\n  Alex Morgan  \n\n')).toBe('Alex Morgan');
  });
});

test.describe('reading a file end to end', () => {
  const resume = 'Alex Morgan\nQA Engineer\nPlaywright, TypeScript, CI/CD, REST APIs, SQL';

  test('returns the normalised text of a plain-text résumé', async () => {
    const text = await readResumeFile(file('resume.txt', `  ${resume}  `), {
      messages: MESSAGES,
    });

    expect(text).toBe(resume);
  });

  test('refuses a file the precheck already rejected, without reading it', async () => {
    await expect(readResumeFile(oversizedFile('big.txt'), { messages: MESSAGES })).rejects.toThrow(
      'too large',
    );
  });

  test('reports a document with too little text as a failed extraction', async () => {
    const tooShort = 'Alex'.padEnd(MIN_RESUME_LENGTH - 1, ' ').trim();

    await expect(
      readResumeFile(file('stub.txt', tooShort), { messages: MESSAGES }),
    ).rejects.toThrow('could not extract');
  });

  test('reports a document past the editor bound as too long', async () => {
    const huge = 'a'.repeat(MAX_RESUME_LENGTH + 1);

    await expect(readResumeFile(file('huge.txt', huge), { messages: MESSAGES })).rejects.toThrow(
      'too long',
    );
  });

  test('does not call an empty text file a scan', async () => {
    // The scan message is specific to a file with no text *layer*. A .txt has
    // no layer to be missing, so an empty one is an extraction that came up
    // short — which is what its owner needs to hear.
    await expect(readResumeFile(file('empty.txt', ''), { messages: MESSAGES })).rejects.toThrow(
      'could not extract',
    );
  });

  test('reports progress only for a format that reads page by page', async () => {
    const pages: number[] = [];

    await readResumeFile(file('resume.txt', resume), {
      messages: MESSAGES,
      onProgress: page => pages.push(page),
    });

    expect(pages).toEqual([]);
  });
});
