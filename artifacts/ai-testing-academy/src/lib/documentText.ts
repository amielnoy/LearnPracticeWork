/**
 * Reading a résumé out of whatever file the visitor happened to hand over.
 *
 * One extractor per format, looked up by extension, so supporting another
 * format means adding an entry to `EXTRACTORS` — the caller's code, and the
 * validation around it, stay as they are. Every parser is imported lazily:
 * pdf.js alone is well over a megabyte, and someone who pastes their résumé
 * should never pay for it.
 */
import { pdfItemsToText } from './domUtils';

export const MAX_RESUME_LENGTH = 100_000;
export const MAX_ROLE_LENGTH = 200;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_PDF_PAGES = 25;
/** Below this, what came back is not a résumé however the file was produced. */
export const MIN_RESUME_LENGTH = 40;

/** Which page is being read, out of how many, as reading proceeds. */
export type PageProgress = (page: number, pages: number) => void;

export interface ExtractedDocument {
  text: string;
  /**
   * How many text runs the parser found that carry an actual character, or
   * `null` for a format that is text all the way down and so has no text layer
   * to be missing. Zero means the file has no text layer at all — a scan, or a
   * résumé exported as a picture of itself — which is a different failure from
   * one that yielded a little text, and worth saying so: the same absence is
   * why an ATS cannot read the file either.
   */
  textRuns: number | null;
}

export interface DocumentExtractor {
  /**
   * Whether loading this format's parser is slow enough to be worth announcing
   * before any page count exists to report.
   */
  readonly slowToLoad: boolean;
  extract(file: File, onProgress: PageProgress): Promise<ExtractedDocument>;
}

const pdfExtractor: DocumentExtractor = {
  slowToLoad: true,
  async extract(file, onProgress) {
    // The worker URL is pulled in here rather than at module scope so this
    // module stays importable outside a bundler, and so the URL is not carried
    // by anyone who never opens a PDF.
    const [pdfjsLib, worker] = await Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ]);
    pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    if (pdf.numPages > MAX_PDF_PAGES) {
      throw new Error(`PDF has ${pdf.numPages} pages; the maximum is ${MAX_PDF_PAGES}.`);
    }
    const out: string[] = [];
    let textRuns = 0;
    for (let i = 1; i <= pdf.numPages; i++) {
      // Announced before the page is read, so the count names the work in hand
      // rather than the work just finished. Each read is a round trip to the
      // worker, which leaves the main thread free to paint in between.
      onProgress(i, pdf.numPages);
      const content = await (await pdf.getPage(i)).getTextContent();
      const items = content.items.filter(item => 'str' in item);
      textRuns += items.filter(item => item.str.trim() !== '').length;
      out.push(pdfItemsToText(items));
    }
    return { text: out.join('\n\n'), textRuns };
  },
};

const docxExtractor: DocumentExtractor = {
  slowToLoad: false,
  async extract(file) {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return { text: result.value, textRuns: null };
  },
};

const plainTextExtractor: DocumentExtractor = {
  slowToLoad: false,
  async extract(file) {
    const text = await file.text();
    return { text, textRuns: null };
  },
};

/**
 * Formats that can be read, keyed by the extension as it appears in a filename.
 */
export const EXTRACTORS: Readonly<Record<string, DocumentExtractor>> = {
  pdf: pdfExtractor,
  docx: docxExtractor,
  txt: plainTextExtractor,
};

export function extensionOf(filename: string): string {
  return (filename.split('.').pop() || '').toLowerCase();
}

export function extractorFor(filename: string): DocumentExtractor | undefined {
  return EXTRACTORS[extensionOf(filename)];
}

/** Whitespace an extractor leaves behind is noise in a prompt, not content. */
export function normalizeExtractedText(text: string): string {
  return text
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * The reasons a file can be refused, phrased by the caller so this module holds
 * no locale of its own.
 */
export interface ResumeReadMessages {
  fileTooLarge: string;
  scannedPdf: string;
  extractedTooLong: string;
  extractionFailed: string;
  unsupportedFormat: (extension: string) => string;
}

export interface ResumeReadOptions {
  messages: ResumeReadMessages;
  onProgress?: PageProgress;
}

/**
 * Why a file can be refused without opening it, or `null` if it may be read.
 *
 * Separate from `readResumeFile` so a caller can refuse an oversized file
 * before it starts narrating a read that is not going to happen.
 */
export function precheckResumeFile(file: File, messages: ResumeReadMessages): string | null {
  if (file.size > MAX_FILE_BYTES) return messages.fileTooLarge;
  if (!extractorFor(file.name)) return messages.unsupportedFormat(extensionOf(file.name));
  return null;
}

/**
 * Reads a résumé file and returns text known to be usable, or throws with the
 * reason the reader needs to hear. The order of the checks is deliberate: a
 * scan is reported as a scan before the length guard can call it a short
 * extraction, because the two need different things from whoever uploaded it.
 */
export async function readResumeFile(
  file: File,
  { messages, onProgress = () => {} }: ResumeReadOptions,
): Promise<string> {
  const refusal = precheckResumeFile(file, messages);
  if (refusal) throw new Error(refusal);

  const extracted = await extractorFor(file.name)!.extract(file, onProgress);
  if (extracted.textRuns === 0) throw new Error(messages.scannedPdf);

  const text = normalizeExtractedText(extracted.text);
  if (text.length > MAX_RESUME_LENGTH) throw new Error(messages.extractedTooLong);
  if (text.length < MIN_RESUME_LENGTH) throw new Error(messages.extractionFailed);
  return text;
}
