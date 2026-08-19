import { useState, useCallback } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { useReveal } from '../hooks/useReveal';
import { QuestionCard } from './QuestionCard';
import { EN_BANK, HE_BANK } from '../lib/questionBank';
import { useProgress } from '../context/ProgressContext';
import { sectionNum } from '../lib/sections';

const SEED_KEYWORDS =
  'AI dev, AI test automation, Playwright, pytest, Page Object Model, flaky tests, CI/CD, Docker, API testing, SDET, AI/LLM testing';
const INTERVIEW_VIDEO_ID = 'gl2TVA4JLpc';

interface EnrichedQA {
  stage?: string;
  question: string;
  answer?: string;
  keywords?: string[];
}

const QA_SYSTEM =
  'You are a senior QA-Automation interviewer and career coach. Return ONLY valid JSON, no prose.';

export function QuestionBank() {
  const { lang } = useLocale();
  const bank = lang === 'he' ? HE_BANK : EN_BANK;
  const { callGrounded, extractJSON } = useProviderContext();
  const { completePracticeItem } = useProgress();
  const sectionRef = useReveal();

  const [keywords, setKeywords] = useState('');
  const [enriching, setEnriching] = useState(false);
  const [enrichErr, setEnrichErr] = useState('');
  const [enrichedItems, setEnrichedItems] = useState<EnrichedQA[]>([]);
  const [enrichedRole, setEnrichedRole] = useState('');
  const [enrichedHeading, setEnrichedHeading] = useState('');

  const doEnrich = useCallback(async () => {
    setEnrichErr('');
    const role = keywords.trim() || bank.roleDefault;
    setEnriching(true);
    try {
      const user =
        'You have Google Search — use it. Find the QA / test-automation interview questions that have been ' +
        'most commonly asked and searched in the LAST 3 MONTHS, seeding the search with these keywords: ' +
        `${SEED_KEYWORDS}, ${role}. Prioritise current, trending topics — especially AI in development and ` +
        'test automation. Return the 8 highest-value questions a candidate should prepare now, each with a ' +
        'concise 2-4 sentence model answer. ' +
        'Return ONLY JSON: {"questions":[{"stage":"...","question":"...","answer":"...","keywords":["..."]}]}. ' +
        `Write every question and answer in ${bank.langName}.`;
      const reply = await callGrounded(QA_SYSTEM, user, 3000);
      // Accept either the requested {"questions":[…]} wrapper or a bare […]
      // array, since the model sometimes drops the wrapper.
      const parsed = extractJSON(reply) as { questions?: EnrichedQA[] } | EnrichedQA[];
      const items = Array.isArray(parsed) ? parsed : (parsed.questions ?? []);
      setEnrichedItems(items);
      setEnrichedRole(role);
      setEnrichedHeading(bank.enrichHeading);
    } catch (e) {
      setEnrichErr((e as Error).message);
    } finally {
      setEnriching(false);
    }
  }, [keywords, bank, callGrounded, extractJSON]);

  return (
    <section id="interview-questions" ref={sectionRef}>
      <h2>
        <span className="num">{sectionNum('interview-questions')}</span> {bank.title}
      </h2>
      <p className="lead reveal">{bank.lead}</p>

      {/* Hebrew-only video embed */}
      {lang === 'he' && bank.videoHeading && (
        <>
          <h3>{bank.videoHeading}</h3>
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${INTERVIEW_VIDEO_ID}`}
              title={bank.videoHeading}
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          {bank.videoMentorBtn && bank.videoMentorUrl && (
            <a
              href={bank.videoMentorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost"
              style={{ display: 'inline-block', marginTop: '10px', textDecoration: 'none' }}
            >
              {bank.videoMentorBtn}
            </a>
          )}
          {bank.videoInterviewGuideBtn && bank.videoInterviewGuideUrl && (
            <a
              href={bank.videoInterviewGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost"
              style={{
                display: 'inline-block',
                marginTop: '10px',
                marginInlineStart: '10px',
                textDecoration: 'none',
              }}
            >
              {bank.videoInterviewGuideBtn}
            </a>
          )}
        </>
      )}

      {/* AI enrichment */}
      <div className="agent-box reveal">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            id="qaKeywords"
            placeholder={bank.enrichPlaceholder}
            value={keywords}
            style={{ flex: '1', minWidth: '220px' }}
            onChange={e => setKeywords(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                doEnrich();
              }
            }}
          />
          <button
            type="button"
            className="primary"
            id="qaEnrichBtn"
            style={{ marginTop: 0 }}
            disabled={enriching}
            onClick={doEnrich}
          >
            {enriching ? bank.enriching : bank.enrichCta}
          </button>
        </div>
        <p className="notice">{bank.enrichHint}</p>
        <div id="qaEnrichErr" className="error" role="alert">
          {enrichErr}
        </div>
        {enrichedItems.length > 0 && (
          <div id="qaEnriched" role="region" aria-live="polite">
            <h3>
              {enrichedHeading} — {enrichedRole}
            </h3>
            {enrichedItems.map((q, i) => (
              <details key={i} className="agent-box">
                <summary>
                  <h3 style={{ display: 'inline', margin: 0 }}>{q.question}</h3>
                </summary>
                {q.answer && <p style={{ marginTop: '12px' }}>{q.answer}</p>}
                <div>
                  {(q.keywords || []).map((k, j) => (
                    <span key={j} className="tag">
                      {k}
                    </span>
                  ))}
                  {q.stage && (
                    <span className="notice" style={{ marginInlineStart: '8px' }}>
                      {q.stage}
                    </span>
                  )}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Curated stages — every question is a card that reveals a hint, then a
          full answer. Stages stay collapsed by default so the section is
          skimmable before it is studied. */}
      {bank.stages.map((stage, stageIndex) => (
        <details key={stageIndex} className="agent-box reveal">
          <summary>
            <h3 style={{ display: 'inline', margin: 0 }}>
              {stage.icon} {stage.title}
            </h3>
          </summary>
          <ul className="q-list">
            {stage.items.map((item, itemIndex) => (
              <QuestionCard
                key={item.q}
                item={item}
                labels={bank.labels}
                onComplete={() =>
                  completePracticeItem(`${lang}:question:${stageIndex}:${itemIndex}`)
                }
              />
            ))}
          </ul>
        </details>
      ))}

      <p className="notice">{bank.note}</p>
    </section>
  );
}
