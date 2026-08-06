import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { isRtlText, linkifyHtml } from '../lib/domUtils';
import { pdfFromText, pdfFromRtlText, type JsPdfInstance } from '../lib/resumePdf';
import { useReveal } from '../hooks/useReveal';
import { useProgress } from '../context/ProgressContext';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

const SAMPLE_RESUMES = {
  en: {
    role: 'QA Automation Engineer',
    text: `Alex Morgan\nQA Engineer\nalex@example.com\n\nSUMMARY\nQA engineer with three years of experience testing web applications.\n\nEXPERIENCE\nQA Engineer — Example Software\n- Executed regression and smoke testing for weekly releases.\n- Wrote Selenium tests in Python and maintained CI jobs.\n- Reported defects and worked with developers to verify fixes.\n\nSKILLS\nPython, Selenium, REST APIs, Git, Jenkins, SQL`,
  },
  he: {
    role: 'מהנדס/ת אוטומציה QA',
    text: `אלכס מורגן\nמהנדס/ת QA\nalex@example.com\n\nתקציר\nמהנדס/ת בדיקות עם שלוש שנות ניסיון בבדיקת יישומי Web.\n\nניסיון\nמהנדס/ת QA — Example Software\n- ביצוע בדיקות רגרסיה ו-Smoke לגרסאות שבועיות.\n- כתיבת בדיקות Selenium ב-Python ותחזוקת תהליכי CI.\n- דיווח תקלות ועבודה עם מפתחים לאימות תיקונים.\n\nמיומנויות\nPython, Selenium, REST APIs, Git, Jenkins, SQL`,
  },
};

async function extractPdf(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const out: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const content = await (await pdf.getPage(i)).getTextContent();
    out.push(content.items.map(item => 'str' in item ? item.str : '').join(' '));
  }
  return out.join('\n\n');
}

async function extractDocx(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return result.value;
}

interface EvalResult {
  overall: number;
  summary: string;
  categories: Array<{ name: string; score: number }>;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

interface LastEval {
  resume: string;
  role: string;
  evaluation: EvalResult;
}

/* ── PDF helpers ── */
// The text builders live in lib/resumePdf.ts. Only the rasterising fallback
// stays here because it renders a temporary DOM node.

/**
 * Picks the builder for the text's direction. Hebrew goes through the embedded
 * font so the PDF carries selectable text an ATS can read; if that font cannot
 * be fetched we fall back to rasterising rather than emitting a PDF with no
 * Hebrew glyphs in it at all.
 */
async function buildResumePdf(text: string): Promise<JsPdfInstance> {
  if (!isRtlText(text)) return await pdfFromText(text);
  try {
    return await pdfFromRtlText(text);
  } catch {
    return pdfFromCanvas(text);
  }
}

const HOLDER_WIDTH_PX = 794;

async function pdfFromCanvas(text: string): Promise<JsPdfInstance> {
  const { default: html2canvas } = await import('html2canvas');
  const holder = document.createElement('div');
  holder.dir = 'rtl';
  holder.innerHTML = linkifyHtml(text);
  holder.style.cssText =
    `position:fixed;left:-9999px;top:0;width:${HOLDER_WIDTH_PX}px;background:#fff;color:#222;` +
    "padding:48px;font-family:'Segoe UI','Heebo',Arial,sans-serif;font-size:14px;line-height:1.6;" +
    'white-space:pre-wrap;word-wrap:break-word;';
  document.body.appendChild(holder);
  try {
    const holderRect = holder.getBoundingClientRect();
    const linkRects = [...holder.querySelectorAll('a')].map(a => {
      const r = a.getBoundingClientRect();
      return { href: a.getAttribute('href'), x: r.left - holderRect.left, y: r.top - holderRect.top, w: r.width, h: r.height };
    });
    const canvas = await html2canvas(holder, { scale: 2, backgroundColor: '#ffffff' });
    const pdf = await pdfFromText('');
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgH = canvas.height * pageW / canvas.width;
    const imgData = canvas.toDataURL('image/png');
    let heightLeft = imgH, position = 0, pageCount = 1;
    pdf.addImage(imgData, 'PNG', 0, position, pageW, imgH);
    heightLeft -= pageH;
    while (heightLeft > 0) {
      position -= pageH;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pageW, imgH);
      heightLeft -= pageH;
      pageCount++;
    }
    const mmPerPx = pageW / HOLDER_WIDTH_PX;
    for (const l of linkRects) {
      const yAbs = l.y * mmPerPx;
      const page = Math.min(pageCount - 1, Math.floor(yAbs / pageH));
      pdf.setPage(page + 1);
      pdf.link(l.x * mmPerPx, yAbs - page * pageH, l.w * mmPerPx, l.h * mmPerPx, { url: l.href });
    }
    return pdf;
  } finally {
    holder.remove();
  }
}

export function ResumeAgent() {
  const { locale, S } = useLocale();
  const t = locale.resume;
  const { callClaude, extractJSON } = useProviderContext();
  const { startTool, completeResume } = useProgress();
  const sectionRef = useReveal();

  const draftPrefix = `ata_resume_draft_${locale.lang}_`;
  const [resumeText, setResumeText] = useState(() => sessionStorage.getItem(draftPrefix + 'resume') || '');
  const [targetRole, setTargetRole] = useState(() => sessionStorage.getItem(draftPrefix + 'role') || '');
  const [jobDesc, setJobDesc] = useState(() => sessionStorage.getItem(draftPrefix + 'job') || '');
  const [uploadLabel, setUploadLabel] = useState(t.uploadPrompt);
  const [isDragging, setIsDragging] = useState(false);
  const [resumeErr, setResumeErr] = useState('');
  const [evaluating, setEvaluating] = useState(false);

  const [evalResult, setEvalResult] = useState<EvalResult | null>(null);
  const [lastEval, setLastEval] = useState<LastEval | null>(null);

  const [improving, setImproving] = useState(false);
  const [improvedHtml, setImprovedHtml] = useState('');
  const [improvedDir, setImprovedDir] = useState('ltr');
  const [improvedErr, setImprovedErr] = useState('');
  const [improvedVisible, setImprovedVisible] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const improvedWrapRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // cached improved resume text
  const improvedResumeRef = useRef<string | null>(null);

  // Reset improved when jobDesc changes
  useEffect(() => {
    improvedResumeRef.current = null;
    setImprovedVisible(false);
    setImprovedHtml('');
  }, [jobDesc]);

  useEffect(() => { sessionStorage.setItem(draftPrefix + 'resume', resumeText); }, [draftPrefix, resumeText]);
  useEffect(() => { sessionStorage.setItem(draftPrefix + 'role', targetRole); }, [draftPrefix, targetRole]);
  useEffect(() => { sessionStorage.setItem(draftPrefix + 'job', jobDesc); }, [draftPrefix, jobDesc]);

  const processFile = useCallback(async (file: File | undefined | null) => {
    if (!file) return;
    setResumeErr('');
    setUploadLabel(S.uploadReading + file.name + '...');
    try {
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      let text: string;
      if (ext === 'pdf') text = await extractPdf(file);
      else if (ext === 'docx') text = await extractDocx(file);
      else if (ext === 'txt') text = await file.text();
      else throw new Error(S.errFormatPrefix + ext + S.errFormatSuffix);
      text = text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      if (text.length < 40) throw new Error(S.errExtractFail);
      setResumeText(text);
      setUploadLabel('✅ ' + file.name + S.uploadLoadedMid + text.length + S.uploadLoadedSuffix);
    } catch (e) {
      setUploadLabel(S.uploadPrompt);
      setResumeErr((e as Error).message);
    }
  }, [S]);

  const evaluateResume = useCallback(async (textOverride?: string, roleOverride?: string) => {
    const txt = (textOverride ?? resumeText).trim();
    setResumeErr('');
    if (txt.length < 80) { setResumeErr(S.errResumeEmpty); return; }
    startTool('resume');
    setEvaluating(true);
    try {
      const role = (roleOverride ?? targetRole).trim() || 'QA Automation Engineer';
      const reply = await callClaude(locale.prompts.resume, [
        { role: 'user', content: S.promptRolePrefix + role + S.promptResumeLabel + txt },
      ]);
      const r = extractJSON(reply) as EvalResult;
      setEvalResult(r);
      setLastEval({ resume: txt, role, evaluation: r });
      improvedResumeRef.current = null;
      setImprovedVisible(false);
      setImprovedHtml('');
      completeResume();
    } catch (e) {
      setResumeErr((e as Error).message);
    }
    setEvaluating(false);
  }, [resumeText, targetRole, S, callClaude, extractJSON, locale.prompts.resume, startTool, completeResume]);

  useEffect(() => {
    const analyzeSample = () => {
      const sample = SAMPLE_RESUMES[locale.lang === 'he' ? 'he' : 'en'];
      setResumeText(sample.text);
      setTargetRole(sample.role);
      void evaluateResume(sample.text, sample.role);
    };
    window.addEventListener('ata:sample-resume', analyzeSample);
    return () => window.removeEventListener('ata:sample-resume', analyzeSample);
  }, [evaluateResume, locale.lang]);

  const ensureImprovedResume = useCallback(async (): Promise<string> => {
    if (improvedResumeRef.current) return improvedResumeRef.current;
    if (!lastEval) throw new Error(S.errNoEval);
    const jd = jobDesc.trim();
    const reply = await callClaude(locale.prompts.improve, [{
      role: 'user',
      content:
        S.promptRolePrefixImprove + lastEval.role +
        (jd ? S.promptJobDescLabel + jd : '') +
        S.promptEvalResultsLabel +
        JSON.stringify({ gaps: lastEval.evaluation.gaps, recommendations: lastEval.evaluation.recommendations }) +
        S.promptOriginalResumeLabel + lastEval.resume,
    }], 4000);
    improvedResumeRef.current = reply.trim();
    return improvedResumeRef.current;
  }, [lastEval, jobDesc, S, callClaude, locale.prompts.improve]);

  const showImprovedResume = useCallback(async () => {
    setImprovedErr('');
    setImproving(true);
    try {
      const text = await ensureImprovedResume();
      const rtl = isRtlText(text);
      setImprovedHtml(linkifyHtml(text));
      setImprovedDir(rtl ? 'rtl' : 'ltr');
      setImprovedVisible(true);
      setTimeout(() => improvedWrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (e) {
      setImprovedErr((e as Error).message);
    }
    setImproving(false);
  }, [ensureImprovedResume]);

  const downloadImprovedPdf = useCallback(async () => {
    setImprovedErr('');
    setDownloadingPdf(true);
    try {
      const text = await ensureImprovedResume();
      const role = lastEval?.role || 'Resume';
      const filename = ('Resume - ' + role).replace(/[\\/:*?"<>|]+/g, '-').trim().slice(0, 80) + '.pdf';
      const pdf = await buildResumePdf(text);
      pdf.save(filename);
    } catch (e) {
      setImprovedErr((e as Error).message);
    }
    setDownloadingPdf(false);
  }, [ensureImprovedResume, lastEval]);

  const scoreColor = evalResult
    ? evalResult.overall >= 75 ? 'var(--green)' : evalResult.overall >= 50 ? 'var(--yellow)' : 'var(--red)'
    : 'var(--accent)';

  return (
    <section id="resume" ref={sectionRef}>
      <h2>
        <span className="num">{t.num}</span> {t.title}
      </h2>
      <p className="lead reveal">{t.lead}</p>
      <div className="agent-box reveal">
        <h3>{t.boxTitle}</h3>
        <label htmlFor="targetRole">
          {t.targetRoleLabel} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{t.targetRoleOptional}</span>
        </label>
        <input
          type="text"
          id="targetRole"
          placeholder={t.targetRolePlaceholder}
          value={targetRole}
          onChange={e => setTargetRole(e.target.value)}
        />
        {/* Upload zone */}
        <label
          className={`upload-zone${isDragging ? ' drag' : ''}`}
          id="uploadZone"
          tabIndex={0}
          role="button"
          aria-label={t.uploadZoneAriaLabel}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragEnter={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
          onDrop={e => {
            e.preventDefault();
            setIsDragging(false);
            processFile(e.dataTransfer?.files[0]);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            type="file"
            id="resumeFile"
            ref={fileInputRef}
            accept=".pdf,.docx,.txt"
            style={{ display: 'none' }}
            onChange={e => processFile(e.target.files?.[0])}
          />
          <span id="uploadLabel">{uploadLabel}</span>
        </label>
        <label htmlFor="resumeText" style={{ marginTop: '14px', display: 'block' }}>
          {t.pasteLabel}
        </label>
        <textarea
          id="resumeText"
          rows={7}
          placeholder={t.pastePlaceholder}
          value={resumeText}
          onChange={e => setResumeText(e.target.value)}
        />
        <label htmlFor="jobDesc">
          {t.jobDescLabel} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{t.jobDescOptional}</span>
        </label>
        <textarea
          id="jobDesc"
          rows={4}
          placeholder={t.jobDescPlaceholder}
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
        />
        <div id="resumeErr" className="error" role="alert">{resumeErr}</div>
        <button
          type="button"
          className="primary"
          id="resumeBtn"
          disabled={evaluating}
          onClick={() => evaluateResume()}
        >
          {evaluating ? S.btnEvaluating : t.evaluateBtn}
        </button>
      </div>

      {evalResult && (
        <div id="resumeResult" style={{ marginTop: '22px' }}>
          <div className="score-wrap">
            <div
              className="score-circle"
              id="resumeScore"
              aria-label={t.scoreAriaLabel}
              style={{ borderColor: scoreColor }}
            >
              {evalResult.overall}
            </div>
            <p id="resumeSummary" style={{ flex: 1, color: 'var(--muted)', fontSize: '.95rem' }}>
              {evalResult.summary}
            </p>
          </div>
          <div id="resumeBars">
            {(evalResult.categories || []).map((c, i) => {
              const pct = Math.max(0, Math.min(100, Number(c.score) || 0));
              return (
                <div key={i} className="bar-row" role="img" aria-label={`${c.name}: ${pct} / 100`}>
                  <div className="bar-label" aria-hidden="true">
                    <span>{c.name}</span>
                    <span>{pct}</span>
                  </div>
                  <div className="bar">
                    <div style={{ width: pct + '%' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="result-cols">
            <div className="card">
              <h4>{t.strengthsTitle}</h4>
              <ul id="resumeStrengths">
                {(evalResult.strengths || []).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="card">
              <h4>{t.gapsTitle}</h4>
              <ul id="resumeGaps">
                {(evalResult.gaps || []).map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          </div>
          <div className="card" style={{ marginTop: '14px' }}>
            <h4>{t.recsTitle}</h4>
            <ul id="resumeRecs">
              {(evalResult.recommendations || []).map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div style={{ marginTop: '22px' }}>
            <button
              type="button"
              className="primary"
              id="improveBtn"
              disabled={improving}
              onClick={showImprovedResume}
            >
              {improving ? S.btnImproving : t.buildResumeBtn}
            </button>
          </div>
          <div id="improvedErr" className="error" role="alert">{improvedErr}</div>
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
                onClick={downloadImprovedPdf}
              >
                {downloadingPdf ? S.btnPreparingPdf : t.downloadPdfBtn}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
