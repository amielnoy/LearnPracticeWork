import { useCallback, useState } from 'react';
import {
  extractorFor,
  precheckResumeFile,
  readResumeFile,
  type ResumeReadMessages,
} from '../lib/documentText';

/**
 * The upload zone's own state: what its label says, and whether a drag is over
 * it. Reading the file is `readResumeFile`'s job; this hook only narrates it.
 */
export interface UploadLabels {
  prompt: string;
  /** Shown while a slow parser is still being fetched, before any page count exists. */
  preparing: (filename: string) => string;
  reading: (filename: string) => string;
  readingPage: (filename: string, page: number, pages: number) => string;
  loaded: (filename: string, characters: number) => string;
}

export interface ResumeUploadOptions {
  labels: UploadLabels;
  messages: ResumeReadMessages;
  onText: (text: string) => void;
  onError: (message: string) => void;
}

export interface ResumeUpload {
  label: string;
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
  handleFile: (file: File | undefined | null) => Promise<void>;
}

export function useResumeUpload({
  labels,
  messages,
  onText,
  onError,
}: ResumeUploadOptions): ResumeUpload {
  const [label, setLabel] = useState(labels.prompt);
  const [isDragging, setDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File | undefined | null) => {
      if (!file) return;
      onError('');
      const refusal = precheckResumeFile(file, messages);
      if (refusal) {
        setLabel(labels.prompt);
        onError(refusal);
        return;
      }
      // A PDF is not read the moment it is handed over: pdf.js and its worker
      // are fetched on first use, which is well over a megabyte and, on a slow
      // connection, the longest part of the wait — and all of it before there
      // is a page count to report. Naming that stretch separately is what stops
      // the label sitting on one unchanging line from beginning to end.
      const slow = extractorFor(file.name)?.slowToLoad ?? false;
      setLabel(slow ? labels.preparing(file.name) : labels.reading(file.name));
      try {
        const text = await readResumeFile(file, {
          messages,
          onProgress: (page, pages) => setLabel(labels.readingPage(file.name, page, pages)),
        });
        onText(text);
        setLabel(labels.loaded(file.name, text.length));
      } catch (e) {
        setLabel(labels.prompt);
        onError((e as Error).message);
      }
    },
    [labels, messages, onText, onError],
  );

  return { label, isDragging, setDragging, handleFile };
}
