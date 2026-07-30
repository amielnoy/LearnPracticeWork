import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { isRtlText, linkifyHtml, markdownLineToPlain } from '../lib/domUtils';
import { useReveal } from '../hooks/useReveal';

/* ── CDN dynamic loaders ── */
function loadScript(src: string): Promise<string> {
  return new Promise((ok, bad) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) existing.remove();
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => ok(src);
    s.onerror = () => { s.remove(); bad(new Error(src)); };
    document.head.appendChild(s);
  });
}

async function loadFirst(urls: string[], globalName: string): Promise<string | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any)[globalName]) return null;
  const errors: string[] = [];
  for (const u of urls) {
    try {
      await loadScript(u);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any)[globalName]) return u;
    } catch (e) {
      errors.push((e as Error).message);
    }
  }
  throw new Error('Could not load the parser library:\n' + errors.join('\n'));
}

const PDFJS_V = '3.11.174', MAMMOTH_V = '1.8.0';
const PDFJS_URLS = [
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_V}/pdf.min.js`,
  `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_V}/build/pdf.min.js`,
  `https://unpkg.com/pdfjs-dist@${PDFJS_V}/build/pdf.min.js`,
];
const MAMMOTH_URLS = [
  `https://cdnjs.cloudflare.com/ajax/libs/mammoth/${MAMMOTH_V}/mammoth.browser.min.js`,
  `https://cdn.jsdelivr.net/npm/mammoth@${MAMMOTH_V}/mammoth.browser.min.js`,
  `https://unpkg.com/mammoth@${MAMMOTH_V}/mammoth.browser.min.js`,
];
const JSPDF_V = '2.5.2', HTML2CANVAS_V = '1.4.1';
const JSPDF_URLS = [
  `https://cdnjs.cloudflare.com/ajax/libs/jspdf/${JSPDF_V}/jspdf.umd.min.js`,
  `https://cdn.jsdelivr.net/npm/jspdf@${JSPDF_V}/dist/jspdf.umd.min.js`,
  `https://unpkg.com/jspdf@${JSPDF_V}/dist/jspdf.umd.min.js`,
];
const HTML2CANVAS_URLS = [
  `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/${HTML2CANVAS_V}/html2canvas.min.js`,
  `https://cdn.jsdelivr.net/npm/html2canvas@${HTML2CANVAS_V}/dist/html2canvas.min.js`,
  `https://unpkg.com/html2canvas@${HTML2CANVAS_V}/dist/html2canvas.min.js`,
];

declare const pdfjsLib: {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (opts: { data: ArrayBuffer }) => { promise: Promise<{ numPages: number; getPage: (i: number) => Promise<{ getTextContent: () => Promise<{ items: Array<{ str: string }> }> }> }> };
};
declare const mammoth: { extractRawText: (opts: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }> };

async function extractPdf(file: File): Promise<string> {
  const loadedFrom = await loadFirst(PDFJS_URLS, 'pdfjsLib');
  if (loadedFrom) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = loadedFrom.replace('pdf.min.js', 'pdf.worker.min.js');
  }
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const out: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const content = await (await pdf.getPage(i)).getTextContent();
    out.push(content.items.map(it => it.str).join(' '));
  }
  return out.join('\n\n');
}

async function extractDocx(file: File): Promise<string> {
  await loadFirst(MAMMOTH_URLS, 'mammoth');
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

/* ── jsPDF helpers ── */
interface LinkInfo { label: string; href: string; }

interface JsPdfInstance {
  internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
  setFont: (f: string, s: string) => void;
  setFontSize: (n: number) => void;
  splitTextToSize: (text: string, maxW: number) => string[];
  text: (text: string, x: number, y: number) => void;
  textWithLink: (text: string, x: number, y: number, opts: { url: string }) => void;
  getTextWidth: (text: string) => number;
  addPage: () => void;
  addImage: (data: string, format: string, x: number, y: number, w: number, h: number) => void;
  link: (x: number, y: number, w: number, h: number, opts: { url: string | null }) => void;
  setPage: (n: number) => void;
  save: (filename: string) => void;
}

function drawLineWithLinks(pdf: JsPdfInstance, line: string, x0: number, y: number, remainingLinks: LinkInfo[]) {
  let x = x0, cursor = 0;
  for (;;) {
    let best: { l: LinkInfo; pos: number } | null = null;
    for (const l of remainingLinks) {
      const pos = line.indexOf(l.label, cursor);
      if (pos !== -1 && (!best || pos < best.pos)) best = { l, pos };
    }
    if (!best) break;
    if (best.pos > cursor) {
      const seg = line.slice(cursor, best.pos);
      pdf.text(seg, x, y);
      x += pdf.getTextWidth(seg);
    }
    pdf.textWithLink(best.l.label, x, y, { url: best.l.href });
    x += pdf.getTextWidth(best.l.label);
    cursor = best.pos + best.l.label.length;
    remainingLinks.splice(remainingLinks.indexOf(best.l), 1);
  }
  if (cursor < line.length) pdf.text(line.slice(cursor), x, y);
}

function pdfFromText(text: string): JsPdfInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { jsPDF } = (window as any).jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const margin = 15, lineH = 5;
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10.5);
  const maxWidth = pageW - margin * 2;
  let y = margin;
  for (const rawLine of text.split('\n')) {
    const { plain, links } = markdownLineToPlain(rawLine);
    const wrapped = plain === '' ? [''] : pdf.splitTextToSize(plain, maxWidth);
    const remainingLinks = links.slice();
    for (const line of wrapped) {
      if (y + lineH > pageH - margin) { pdf.addPage(); y = margin; }
      if (remainingLinks.length) drawLineWithLinks(pdf, line, margin, y, remainingLinks);
      else pdf.text(line, margin, y);
      y += lineH;
    }
  }
  return pdf;
}

const HOLDER_WIDTH_PX = 794;

async function pdfFromCanvas(text: string): Promise<JsPdfInstance> {
  await loadFirst(HTML2CANVAS_URLS, 'html2canvas');
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const canvas = await w.html2canvas(holder, { scale: 2, backgroundColor: '#ffffff' });
    const { jsPDF } = w.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
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
  const sectionRef = useReveal();

  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [jobDesc, setJobDesc] = useState('');
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

  // Preload PDF/DOCX parsers on window load
  useEffect(() => {
    const preload = () => {
      loadFirst(PDFJS_URLS, 'pdfjsLib').catch(() => {});
      loadFirst(MAMMOTH_URLS, 'mammoth').catch(() => {});
    };
    window.addEventListener('load', preload);
    return () => window.removeEventListener('load', preload);
  }, []);

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

  const evaluateResume = useCallback(async () => {
    const txt = resumeText.trim();
    setResumeErr('');
    if (txt.length < 80) { setResumeErr(S.errResumeEmpty); return; }
    setEvaluating(true);
    try {
      const role = targetRole.trim() || 'QA Automation Engineer';
      const reply = await callClaude(locale.prompts.resume, [
        { role: 'user', content: S.promptRolePrefix + role + S.promptResumeLabel + txt },
      ]);
      const r = extractJSON(reply) as EvalResult;
      setEvalResult(r);
      setLastEval({ resume: txt, role, evaluation: r });
      improvedResumeRef.current = null;
      setImprovedVisible(false);
      setImprovedHtml('');
    } catch (e) {
      setResumeErr((e as Error).message);
    }
    setEvaluating(false);
  }, [resumeText, targetRole, S, callClaude, extractJSON, locale.prompts.resume]);

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
      await loadFirst(JSPDF_URLS, 'jspdf');
      const role = lastEval?.role || 'Resume';
      const filename = ('Resume - ' + role).replace(/[\\/:*?"<>|]+/g, '-').trim().slice(0, 80) + '.pdf';
      const pdf = isRtlText(text) ? await pdfFromCanvas(text) : pdfFromText(text);
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
          onClick={evaluateResume}
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
