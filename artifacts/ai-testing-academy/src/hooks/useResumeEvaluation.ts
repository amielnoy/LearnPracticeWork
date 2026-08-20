import { useCallback, useRef, useState } from 'react';
import type { Locale } from '../lib/locales';
import type { Message } from '../lib/providers';
import { isRtlText, linkifyHtml } from '../lib/domUtils';
import { buildResumePdf, resumeFilename } from '../lib/resumeExport';

/** What the model returns for a résumé, and what the scorecard renders. */
export interface EvalResult {
  overall: number;
  summary: string;
  categories: Array<{ name: string; score: number }>;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

/** The evaluation an improvement is built from: the exact text that was scored. */
interface LastEval {
  resume: string;
  role: string;
  evaluation: EvalResult;
}

/** Phrasing this hook needs that is not already in the shared string table. */
export interface EvaluationMessages {
  consentRequired: string;
  consentRequiredAgain: string;
}

export interface ResumeEvaluationOptions {
  S: Locale['s'];
  prompts: Locale['prompts'];
  messages: EvaluationMessages;
  hasConsent: boolean;
  resumeText: string;
  targetRole: string;
  jobDesc: string;
  callClaude: (system: string, messages: Message[], maxTokens?: number) => Promise<string>;
  extractJSON: (text: string) => unknown;
  onStart: () => void;
  onComplete: () => void;
  onError: (message: string) => void;
  /** Called each time the improved résumé is put on screen, so it can be scrolled to. */
  onImprovedShown: () => void;
}

export interface ResumeEvaluation {
  evaluating: boolean;
  result: EvalResult | null;
  evaluate: (textOverride?: string, roleOverride?: string) => Promise<void>;
  improving: boolean;
  improvedHtml: string;
  improvedDir: 'rtl' | 'ltr';
  improvedVisible: boolean;
  improvedError: string;
  downloadingPdf: boolean;
  showImproved: () => Promise<void>;
  downloadPdf: () => Promise<void>;
  /** Discards a cached improvement whose inputs no longer apply. */
  resetImproved: () => void;
}

const MIN_RESUME_CHARACTERS = 80;
const DEFAULT_ROLE = 'QA Automation Engineer';
const IMPROVE_MAX_TOKENS = 4000;

export function useResumeEvaluation({
  S,
  prompts,
  messages,
  hasConsent,
  resumeText,
  targetRole,
  jobDesc,
  callClaude,
  extractJSON,
  onStart,
  onComplete,
  onError,
  onImprovedShown,
}: ResumeEvaluationOptions): ResumeEvaluation {
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<EvalResult | null>(null);
  const [lastEval, setLastEval] = useState<LastEval | null>(null);

  const [improving, setImproving] = useState(false);
  const [improvedHtml, setImprovedHtml] = useState('');
  const [improvedDir, setImprovedDir] = useState<'rtl' | 'ltr'>('ltr');
  const [improvedVisible, setImprovedVisible] = useState(false);
  const [improvedError, setImprovedError] = useState('');
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  /** The improved résumé is one AI call; it is cached so re-reading is free. */
  const improvedResumeRef = useRef<string | null>(null);

  const resetImproved = useCallback(() => {
    improvedResumeRef.current = null;
    setImprovedVisible(false);
    setImprovedHtml('');
  }, []);

  const evaluate = useCallback(
    async (textOverride?: string, roleOverride?: string) => {
      const text = (textOverride ?? resumeText).trim();
      onError('');
      if (!hasConsent) return onError(messages.consentRequired);
      if (text.length < MIN_RESUME_CHARACTERS) return onError(S.errResumeEmpty);

      onStart();
      setEvaluating(true);
      try {
        const role = (roleOverride ?? targetRole).trim() || DEFAULT_ROLE;
        const reply = await callClaude(prompts.resume, [
          { role: 'user', content: S.promptRolePrefix + role + S.promptResumeLabel + text },
        ]);
        const evaluation = extractJSON(reply) as EvalResult;
        setResult(evaluation);
        setLastEval({ resume: text, role, evaluation });
        resetImproved();
        onComplete();
      } catch (e) {
        onError((e as Error).message);
      } finally {
        setEvaluating(false);
      }
    },
    [
      resumeText,
      targetRole,
      hasConsent,
      messages.consentRequired,
      S,
      prompts.resume,
      callClaude,
      extractJSON,
      onStart,
      onComplete,
      onError,
      resetImproved,
    ],
  );

  const ensureImprovedResume = useCallback(async (): Promise<string> => {
    if (!hasConsent) throw new Error(messages.consentRequiredAgain);
    if (improvedResumeRef.current) return improvedResumeRef.current;
    if (!lastEval) throw new Error(S.errNoEval);
    const jd = jobDesc.trim();
    const reply = await callClaude(
      prompts.improve,
      [
        {
          role: 'user',
          content:
            S.promptRolePrefixImprove +
            lastEval.role +
            (jd ? S.promptJobDescLabel + jd : '') +
            S.promptEvalResultsLabel +
            JSON.stringify({
              gaps: lastEval.evaluation.gaps,
              recommendations: lastEval.evaluation.recommendations,
            }) +
            S.promptOriginalResumeLabel +
            lastEval.resume,
        },
      ],
      IMPROVE_MAX_TOKENS,
    );
    improvedResumeRef.current = reply.trim();
    return improvedResumeRef.current;
  }, [
    hasConsent,
    messages.consentRequiredAgain,
    lastEval,
    jobDesc,
    S,
    callClaude,
    prompts.improve,
  ]);

  const showImproved = useCallback(async () => {
    setImprovedError('');
    setImproving(true);
    try {
      const text = await ensureImprovedResume();
      setImprovedHtml(linkifyHtml(text));
      setImprovedDir(isRtlText(text) ? 'rtl' : 'ltr');
      setImprovedVisible(true);
      onImprovedShown();
    } catch (e) {
      setImprovedError((e as Error).message);
    } finally {
      setImproving(false);
    }
  }, [ensureImprovedResume, onImprovedShown]);

  const downloadPdf = useCallback(async () => {
    setImprovedError('');
    setDownloadingPdf(true);
    try {
      const text = await ensureImprovedResume();
      const pdf = await buildResumePdf(text);
      pdf.save(resumeFilename(lastEval?.role || 'Resume'));
    } catch (e) {
      setImprovedError((e as Error).message);
    } finally {
      setDownloadingPdf(false);
    }
  }, [ensureImprovedResume, lastEval]);

  return {
    evaluating,
    result,
    evaluate,
    improving,
    improvedHtml,
    improvedDir,
    improvedVisible,
    improvedError,
    downloadingPdf,
    showImproved,
    downloadPdf,
    resetImproved,
  };
}
