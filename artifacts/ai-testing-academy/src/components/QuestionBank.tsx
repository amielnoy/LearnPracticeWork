import { useState, useCallback } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { useReveal } from '../hooks/useReveal';

const SEED_KEYWORDS = 'AI dev, AI test automation, Playwright, pytest, Page Object Model, flaky tests, CI/CD, Docker, API testing, SDET, AI/LLM testing';
const INTERVIEW_VIDEO_ID = 'gl2TVA4JLpc';

interface StageData {
  icon: string;
  title: string;
  items: string[];
}

interface BankData {
  nav: string;
  title: string;
  lead: string;
  note: string;
  videoHeading?: string;
  enrichCta: string;
  enrichPlaceholder: string;
  enrichHint: string;
  enriching: string;
  enrichHeading: string;
  roleDefault: string;
  langName: string;
  stages: StageData[];
}

const EN: BankData = {
  nav: '❓ Interview Questions',
  title: '❓ Real Interview Questions',
  lead: 'The questions QA-Automation candidates actually get, grouped by the five interview stages. Read them, prepare your STAR answers, then run a live mock with the agent above.',
  note: '💡 Practice these out loud with Agent 2 — turn on 🔊 Voice for a hands-free mock interview.',
  enrichCta: '✨ Enrich with AI',
  enrichPlaceholder: 'Role or keywords (e.g. SDET, Playwright, CI/CD)',
  enrichHint: 'Uses Gemini with live Google Search to pull the QA / AI-test-automation interview questions most searched in the last 3 months — each with a model answer. Needs a Gemini key in the Connection Setup above.',
  enriching: '✨ Enriching…',
  enrichHeading: '✨ AI-enriched Q&A — trending in the last 3 months',
  roleDefault: 'QA Automation Engineer',
  langName: 'English',
  stages: [
    { icon: '🧭', title: 'Stage 1 — HR & Motivation', items: [
      'Walk me through your background and why you moved into test automation.',
      'Why are you leaving your current role, and what are you looking for next?',
      'Tell me about a project you are proud of — what was your specific contribution?',
      'Describe a conflict with a developer over a bug. How did you resolve it?',
      'Where do you see QA automation heading in the next few years?',
    ]},
    { icon: '🎭', title: 'Stage 2 — Test Automation Knowledge', items: [
      'What is the Page Object Model and what problem does it solve?',
      'How do you decide what to automate and what to leave as manual testing?',
      'A test passes locally but is flaky in CI. How do you diagnose and fix it?',
      'Explicit vs. implicit waits — when do you use each, and why avoid fixed sleeps?',
      'How do you keep tests isolated and independent of execution order?',
      'How would you structure a suite across UI, API, and unit layers (the test pyramid)?',
    ]},
    { icon: '🧩', title: 'Stage 3 — Code & API', items: [
      'Explain pytest fixtures and fixture scope. When would you use a session fixture?',
      'How do you parametrize a test to run the same logic over many inputs?',
      'How do you test a REST API — status codes, schema, and negative cases?',
      'When do you mock a dependency versus hitting the real service?',
      'Write a function that reverses the words in a sentence. How would you test it?',
      'How do you make write operations (POST/PUT) safe to retry?',
    ]},
    { icon: '🐳', title: 'Stage 4 — DevOps & CI', items: [
      'Why run tests in Docker, and what makes a build reproducible?',
      'Walk me through a CI pipeline that runs your tests on every pull request.',
      'How do you speed up a slow suite — parallelism, sharding, test selection?',
      'How do you surface results: reports, trends, and failure screenshots?',
      'How do you handle secrets and environment config in CI?',
    ]},
    { icon: '🤖', title: 'Stage 5 — AI Testing', items: [
      'How do you test a feature powered by an LLM deterministically?',
      'What is prompt injection, and how would you write a test that proves it is blocked?',
      'How do you check that a model response does not leak secrets or PII (DLP)?',
      'How can AI agents help you write or triage tests — and where is human review required?',
      'How would you evaluate the quality of an AI feature beyond a simple pass/fail?',
    ]},
  ],
};

const HE: BankData = {
  nav: '❓ שאלות ראיון',
  title: '❓ שאלות ראיון אמיתיות',
  lead: 'השאלות שמועמדי QA Automation באמת נשאלים, מחולקות לחמשת שלבי הראיון. קראו, הכינו תשובות בשיטת STAR, ואז הריצו סימולציה חיה עם הסוכן למעלה.',
  note: '💡 תרגלו בקול רם עם סוכן 2 — הפעילו 🔊 קול לראיון סימולציה ללא ידיים.',
  videoHeading: '🎥 צפו בראיון אמיתי לפני שמתחילים',
  enrichCta: '✨ העשר עם AI',
  enrichPlaceholder: 'תפקיד או מילות מפתח (למשל SDET, Playwright, CI/CD)',
  enrichHint: 'משתמש ב-Gemini עם חיפוש Google חי כדי להביא את שאלות הראיון (QA ואוטומציית בדיקות מבוססת AI) המחופשות ביותר ב-3 החודשים האחרונים — כל אחת עם תשובת מודל. דורש מפתח Gemini באזור החיבור למעלה.',
  enriching: '✨ מעשיר…',
  enrichHeading: '✨ שו"ת בהעשרת AI — מגמות 3 החודשים האחרונים',
  roleDefault: 'מהנדס/ת אוטומציית QA',
  langName: 'Hebrew',
  stages: [
    { icon: '🧭', title: 'שלב 1 — משאבי אנוש ומוטיבציה', items: [
      'ספר על הרקע שלך ולמה עברת לאוטומציית בדיקות.',
      'למה אתה עוזב את התפקיד הנוכחי, ומה אתה מחפש בתפקיד הבא?',
      'ספר על פרויקט שאתה גאה בו — מה בדיוק הייתה התרומה שלך?',
      'תאר קונפליקט עם מפתח על באג. איך פתרת אותו?',
      'לאן לדעתך אוטומציית QA מתקדמת בשנים הקרובות?',
    ]},
    { icon: '🎭', title: 'שלב 2 — ידע באוטומציית בדיקות', items: [
      'מהו Page Object Model ואיזו בעיה הוא פותר?',
      'איך אתה מחליט מה לאוטמט ומה להשאיר כבדיקה ידנית?',
      'בדיקה עוברת מקומית אך מתנדנדת (flaky) ב-CI. איך תאבחן ותתקן?',
      'המתנות מפורשות מול משתמעות — מתי כל אחת, ולמה להימנע מ-sleep קבוע?',
      'איך אתה שומר על בדיקות מבודדות ובלתי תלויות בסדר ההרצה?',
      'איך היית בונה סוויטה על פני שכבות UI, API ו-unit (פירמידת הבדיקות)?',
    ]},
    { icon: '🧩', title: 'שלב 3 — קוד ו-API', items: [
      'הסבר fixtures ב-pytest ואת ה-scope שלהם. מתי תשתמש ב-session fixture?',
      'איך תפעיל parametrize כדי להריץ את אותה לוגיקה על קלטים רבים?',
      'איך אתה בודק REST API — קודי סטטוס, סכימה ומקרי קצה שליליים?',
      'מתי למקק (mock) תלות ומתי לפנות לשירות האמיתי?',
      'כתוב פונקציה שהופכת את סדר המילים במשפט. איך תבדוק אותה?',
      'איך אתה הופך פעולות כתיבה (POST/PUT) לבטוחות ל-retry?',
    ]},
    { icon: '🐳', title: 'שלב 4 — DevOps ו-CI', items: [
      'למה להריץ בדיקות ב-Docker, ומה הופך build לשחזורי?',
      'תאר pipeline של CI שמריץ את הבדיקות בכל pull request.',
      'איך תאיץ סוויטה איטית — מקביליות, sharding, בחירת בדיקות?',
      'איך אתה חושף תוצאות: דוחות, מגמות וצילומי מסך של כשלים?',
      'איך אתה מטפל בסודות ובקונפיגורציית סביבה ב-CI?',
    ]},
    { icon: '🤖', title: 'שלב 5 — בדיקות AI', items: [
      "איך אתה בודק פיצ'ר שמבוסס LLM בצורה דטרמיניסטית?",
      'מהו prompt injection, ואיך תכתוב בדיקה שמוכיחה שהוא נחסם?',
      'איך אתה מוודא שתשובת המודל לא מדליפה סודות או מידע אישי (DLP)?',
      'איך סוכני AI יכולים לעזור לכתוב או למיין בדיקות — ואיפה נדרשת בקרת אדם?',
      "איך היית מעריך את איכות פיצ'ר ה-AI מעבר ל-pass/fail פשוט?",
    ]},
  ],
};

interface EnrichedQA {
  stage?: string;
  question: string;
  answer?: string;
  keywords?: string[];
}

const QA_SYSTEM = 'You are a senior QA-Automation interviewer and career coach. Return ONLY valid JSON, no prose.';

export function QuestionBank() {
  const { lang } = useLocale();
  const bank = lang === 'he' ? HE : EN;
  const { callGrounded, extractJSON } = useProviderContext();
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
      const items = ((extractJSON(reply) as { questions?: EnrichedQA[] }).questions || []);
      setEnrichedItems(items);
      setEnrichedRole(role);
      setEnrichedHeading(bank.enrichHeading);
    } catch (e) {
      setEnrichErr((e as Error).message);
    }
    setEnriching(false);
  }, [keywords, bank, callGrounded, extractJSON]);

  return (
    <section id="interview-questions" ref={sectionRef}>
      <h2>{bank.title}</h2>
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
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); doEnrich(); } }}
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
        <div id="qaEnrichErr" className="error" role="alert">{enrichErr}</div>
        {enrichedItems.length > 0 && (
          <div id="qaEnriched" role="region" aria-live="polite">
            <h3>{enrichedHeading} — {enrichedRole}</h3>
            {enrichedItems.map((q, i) => (
              <details key={i} className="agent-box">
                <summary>
                  <h3 style={{ display: 'inline', margin: 0 }}>{q.question}</h3>
                </summary>
                {q.answer && <p style={{ marginTop: '12px' }}>{q.answer}</p>}
                <div>
                  {(q.keywords || []).map((k, j) => (
                    <span key={j} className="tag">{k}</span>
                  ))}
                  {q.stage && (
                    <span className="notice" style={{ marginInlineStart: '8px' }}>{q.stage}</span>
                  )}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Curated stages */}
      {bank.stages.map((stage, i) => (
        <details key={i} className="agent-box reveal">
          <summary>
            <h3 style={{ display: 'inline', margin: 0 }}>{stage.icon} {stage.title}</h3>
          </summary>
          <ul style={{ marginTop: '14px' }}>
            {stage.items.map((q, j) => <li key={j}>{q}</li>)}
          </ul>
        </details>
      ))}

      <p className="notice">{bank.note}</p>
    </section>
  );
}
