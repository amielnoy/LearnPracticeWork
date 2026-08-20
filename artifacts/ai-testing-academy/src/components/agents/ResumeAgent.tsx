import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useProviderContext } from '../../context/ProviderContext';
import { useProgress } from '../../context/ProgressContext';
import { useReveal } from '../../hooks/useReveal';
import { useResumeDrafts } from '../../hooks/useResumeDrafts';
import { useResumeUpload, type UploadLabels } from '../../hooks/useResumeUpload';
import { useResumeEvaluation, type EvaluationMessages } from '../../hooks/useResumeEvaluation';
import {
  MAX_RESUME_LENGTH,
  MAX_ROLE_LENGTH,
  type ResumeReadMessages,
} from '../../lib/documentText';
import { sampleResumeFor } from '../../lib/resumeSamples';
import { sectionNum } from '../../lib/sections';
import { AiDataConsent } from './AiDataConsent';
import { ResumeTips } from './resume/ResumeTips';
import { ResumeUploadZone } from './resume/ResumeUploadZone';
import { ResumeScorecard } from './resume/ResumeScorecard';

/**
 * The résumé tool: reading a file, scoring it, and rewriting it.
 *
 * Everything with a rule in it lives elsewhere — `lib/documentText` reads
 * files, `lib/resumeExport` writes PDFs, and the three hooks hold the state of
 * a draft, an upload and an evaluation. What is left here is the wiring and
 * the form, so a change to how a DOCX is parsed never touches this file.
 */
export function ResumeAgent() {
  const { locale, S } = useLocale();
  const t = locale.resume;
  const hebrew = locale.lang === 'he';
  const { callClaude, extractJSON } = useProviderContext();
  const { startTool, completeResume } = useProgress();
  const sectionRef = useReveal();

  const drafts = useResumeDrafts(locale.lang);
  const [dataConsent, setDataConsent] = useState(false);
  const [resumeErr, setResumeErr] = useState('');
  const [scrollToken, setScrollToken] = useState(0);

  const readMessages = useMemo<ResumeReadMessages>(
    () => ({
      fileTooLarge: hebrew
        ? 'הקובץ גדול מדי. הגודל המרבי הוא 10MB.'
        : 'This file is too large. The maximum size is 10 MB.',
      extractedTooLong: hebrew
        ? 'הטקסט שחולץ ארוך מדי. המגבלה היא 100,000 תווים.'
        : 'The extracted text is too long. The limit is 100,000 characters.',
      scannedPdf: S.errScannedPdf,
      extractionFailed: S.errExtractFail,
      unsupportedFormat: ext => S.errFormatPrefix + ext + S.errFormatSuffix,
    }),
    [hebrew, S],
  );

  const uploadLabels = useMemo<UploadLabels>(
    () => ({
      prompt: S.uploadPrompt,
      preparing: name => S.uploadPreparing + name + '...',
      reading: name => S.uploadReading + name + '...',
      readingPage: (name, page, pages) =>
        S.uploadReading + name + S.uploadPageMid + page + S.uploadPageOf + pages + '...',
      loaded: (name, characters) =>
        '✅ ' + name + S.uploadLoadedMid + characters + S.uploadLoadedSuffix,
    }),
    [S],
  );

  const evaluationMessages = useMemo<EvaluationMessages>(
    () => ({
      consentRequired: hebrew
        ? 'יש לקרוא ולאשר את הודעת הפרטיות לפני שליחה ל‑AI.'
        : 'Read and accept the privacy notice before sending data to AI.',
      consentRequiredAgain: hebrew
        ? 'יש לאשר את הודעת הפרטיות לפני שליחה נוספת ל‑AI.'
        : 'Accept the privacy notice before another AI submission.',
    }),
    [hebrew],
  );

  const { setResumeText } = drafts;
  const upload = useResumeUpload({
    labels: uploadLabels,
    messages: readMessages,
    onText: setResumeText,
    onError: setResumeErr,
  });

  const onImprovedShown = useCallback(() => setScrollToken(token => token + 1), []);
  const evaluation = useResumeEvaluation({
    S,
    prompts: locale.prompts,
    messages: evaluationMessages,
    hasConsent: dataConsent,
    resumeText: drafts.resumeText,
    targetRole: drafts.targetRole,
    jobDesc: drafts.jobDesc,
    callClaude,
    extractJSON,
    onStart: useCallback(() => startTool('resume'), [startTool]),
    onComplete: completeResume,
    onError: setResumeErr,
    onImprovedShown,
  });

  // A rewrite is built for one job description; a different one invalidates it.
  const { resetImproved } = evaluation;
  const { jobDesc } = drafts;
  useEffect(() => {
    resetImproved();
  }, [jobDesc, resetImproved]);

  const { evaluate } = evaluation;
  const { setTargetRole } = drafts;
  useEffect(() => {
    const analyzeSample = () => {
      const sample = sampleResumeFor(locale.lang);
      setResumeText(sample.text);
      setTargetRole(sample.role);
      if (dataConsent) void evaluate(sample.text, sample.role);
      else
        setResumeErr(
          hebrew
            ? 'קורות החיים לדוגמה נטענו. יש לאשר את הודעת הפרטיות כדי לשלוח אותם ל‑AI.'
            : 'The sample resume is ready. Accept the privacy notice to send it to AI.',
        );
    };
    window.addEventListener('ata:sample-resume', analyzeSample);
    return () => window.removeEventListener('ata:sample-resume', analyzeSample);
  }, [dataConsent, evaluate, hebrew, locale.lang, setResumeText, setTargetRole]);

  return (
    <section id="resume" ref={sectionRef}>
      <h2>
        <span className="num">{sectionNum('resume')}</span> {t.title}
      </h2>
      <p className="lead reveal">{t.lead}</p>

      <ResumeTips t={t} />

      <div className="agent-box reveal">
        <h3>{t.boxTitle}</h3>
        <label htmlFor="targetRole">
          {t.targetRoleLabel}{' '}
          <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{t.targetRoleOptional}</span>
        </label>
        <input
          type="text"
          id="targetRole"
          placeholder={t.targetRolePlaceholder}
          value={drafts.targetRole}
          maxLength={MAX_ROLE_LENGTH}
          onChange={e => setTargetRole(e.target.value)}
        />
        <ResumeUploadZone
          label={upload.label}
          ariaLabel={t.uploadZoneAriaLabel}
          isDragging={upload.isDragging}
          onDraggingChange={upload.setDragging}
          onFile={file => void upload.handleFile(file)}
        />
        <label htmlFor="resumeText" style={{ marginTop: '14px', display: 'block' }}>
          {t.pasteLabel}
        </label>
        <textarea
          id="resumeText"
          rows={7}
          placeholder={t.pastePlaceholder}
          value={drafts.resumeText}
          maxLength={MAX_RESUME_LENGTH}
          onChange={e => setResumeText(e.target.value)}
        />
        <label htmlFor="jobDesc">
          {t.jobDescLabel}{' '}
          <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{t.jobDescOptional}</span>
        </label>
        <textarea
          id="jobDesc"
          rows={4}
          placeholder={t.jobDescPlaceholder}
          value={drafts.jobDesc}
          maxLength={MAX_RESUME_LENGTH}
          onChange={e => drafts.setJobDesc(e.target.value)}
        />
        <AiDataConsent id="resumeDataConsent" checked={dataConsent} onChange={setDataConsent} />
        <div id="resumeErr" className="error" role="alert">
          {resumeErr}
        </div>
        <button
          type="button"
          className="primary"
          id="resumeBtn"
          disabled={evaluation.evaluating || !dataConsent}
          onClick={() => void evaluate()}
        >
          {evaluation.evaluating ? S.btnEvaluating : t.evaluateBtn}
        </button>
      </div>

      {evaluation.result && (
        <ResumeScorecard
          t={t}
          S={S}
          result={evaluation.result}
          improving={evaluation.improving}
          improvedError={evaluation.improvedError}
          improvedVisible={evaluation.improvedVisible}
          improvedHtml={evaluation.improvedHtml}
          improvedDir={evaluation.improvedDir}
          downloadingPdf={evaluation.downloadingPdf}
          scrollToken={scrollToken}
          onImprove={() => void evaluation.showImproved()}
          onDownload={() => void evaluation.downloadPdf()}
        />
      )}
    </section>
  );
}
