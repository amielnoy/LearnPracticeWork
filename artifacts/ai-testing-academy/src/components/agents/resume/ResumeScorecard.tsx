import { useEffect, useRef } from 'react';
import type { Locale } from '../../../lib/locales';
import type { EvalResult } from '../../../hooks/useResumeEvaluation';

export interface ResumeScorecardProps {
  t: Locale['resume'];
  S: Locale['s'];
  result: EvalResult;
  improving: boolean;
  improvedError: string;
  improvedVisible: boolean;
  improvedHtml: string;
  improvedDir: 'rtl' | 'ltr';
  downloadingPdf: boolean;
  /** Bumped every time the improved résumé is shown, so it is scrolled into view again. */
  scrollToken: number;
  onImprove: () => void;
  onDownload: () => void;
}

const GOOD_SCORE = 75;
const FAIR_SCORE = 50;
const SCROLL_DELAY_MS = 50;

function scoreColor(overall: number): string {
  if (overall >= GOOD_SCORE) return 'var(--green)';
  if (overall >= FAIR_SCORE) return 'var(--yellow)';
  return 'var(--red)';
}

/** The evaluation result: score, per-category bars, findings and the improve action. */
export function ResumeScorecard({
  t,
  S,
  result,
  improving,
  improvedError,
  improvedVisible,
  improvedHtml,
  improvedDir,
  downloadingPdf,
  scrollToken,
  onImprove,
  onDownload,
}: ResumeScorecardProps) {
  const improvedWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollToken) return;
    // After paint, so the element being scrolled to is the one now on screen.
    const timer = window.setTimeout(
      () => improvedWrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      SCROLL_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [scrollToken]);

  return (
    <div id="resumeResult" style={{ marginTop: '22px' }}>
      <div className="score-wrap">
        <div
          className="score-circle"
          id="resumeScore"
          aria-label={t.scoreAriaLabel}
          style={{ borderColor: scoreColor(result.overall) }}
        >
          {result.overall}
        </div>
        <p id="resumeSummary" style={{ flex: 1, color: 'var(--muted)', fontSize: '.95rem' }}>
          {result.summary}
        </p>
      </div>
      <div id="resumeBars">
        {(result.categories || []).map((c, i) => (
          <CategoryBar key={i} name={c.name} score={c.score} />
        ))}
      </div>
      <div className="result-cols">
        <FindingList title={t.strengthsTitle} id="resumeStrengths" items={result.strengths} />
        <FindingList title={t.gapsTitle} id="resumeGaps" items={result.gaps} />
      </div>
      <div className="card" style={{ marginTop: '14px' }}>
        <h4>{t.recsTitle}</h4>
        <ul id="resumeRecs">
          {(result.recommendations || []).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '22px' }}>
        <button
          type="button"
          className="primary"
          id="improveBtn"
          disabled={improving}
          onClick={onImprove}
        >
          {improving ? S.btnImproving : t.buildResumeBtn}
        </button>
      </div>
      <div id="improvedErr" className="error" role="alert">
        {improvedError}
      </div>
      {improvedVisible && (
        <div id="improvedWrap" ref={improvedWrapRef} style={{ marginTop: '22px' }}>
          <div className="card">
            <h4>{t.improvedTitle}</h4>
            <pre
              id="improvedText"
              dir={improvedDir}
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                fontSize: '.9rem',
                textAlign: improvedDir === 'rtl' ? 'right' : 'left',
              }}
              dangerouslySetInnerHTML={{ __html: improvedHtml }}
            />
          </div>
          <button
            type="button"
            className="ghost"
            id="pdfBtn"
            disabled={downloadingPdf}
            onClick={onDownload}
          >
            {downloadingPdf ? S.btnPreparingPdf : t.downloadPdfBtn}
          </button>
        </div>
      )}
    </div>
  );
}

function CategoryBar({ name, score }: { name: string; score: number }) {
  const pct = Math.max(0, Math.min(100, Number(score) || 0));
  return (
    <div className="bar-row" role="img" aria-label={`${name}: ${pct} / 100`}>
      <div className="bar-label" aria-hidden="true">
        <span>{name}</span>
        <span>{pct}</span>
      </div>
      <div className="bar">
        <div style={{ width: pct + '%' }} />
      </div>
    </div>
  );
}

function FindingList({ title, id, items }: { title: string; id: string; items: string[] }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <ul id={id}>
        {(items || []).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
