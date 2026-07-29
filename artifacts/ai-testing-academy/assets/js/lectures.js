/* Lecture Series — a curated series of 10 in-depth lectures on AI Testing.
   Lecture 1 links to the Gamma.app presentation on AI testing fundamentals.
   Future lectures show as "coming soon" placeholders. */
import { $ } from './dom.js';
import { activeLang } from './i18n.js';

const EN = {
  nav: '🎓 Lecture Series',
  groupLabel: 'Learning',
  title: '🎓 Lecture Series — AI Testing Mastery',
  lead: 'A structured series of 10 in-depth lectures taking you from AI testing fundamentals to advanced evaluation techniques. Work through them in order, or jump to what you need most.',
  lectureLabel: 'Lecture',
  comingSoon: 'Coming soon',
  openLecture: 'Open lecture →',
  lectures: [
    {
      num: 1, ready: true,
      title: 'Introduction to AI Testing',
      desc: 'What is AI testing, why it matters, and how it differs from traditional software testing. Covers LLMs, non-determinism, evaluation strategies, and the modern AI testing landscape.',
      url: 'https://gamma.app/docs/AI--e2m8rc9urhszuwb?mode=doc'
    },
    {
      num: 2, ready: false,
      title: 'Prompt Engineering for Testers',
      desc: 'How to write prompts that produce consistent, testable outputs. Covers prompt structure, system messages, temperature, and prompt injection basics.'
    },
    {
      num: 3, ready: false,
      title: 'Testing LLM Outputs',
      desc: 'Evaluation frameworks for LLM responses — semantic similarity, factuality checks, toxicity detection, and JSON schema validation.'
    },
    {
      num: 4, ready: false,
      title: 'Playwright for AI Applications',
      desc: 'End-to-end testing of AI-powered UIs with Playwright — handling dynamic content, testing streaming responses, and building resilient selectors.'
    },
    {
      num: 5, ready: false,
      title: 'API Testing with AI Features',
      desc: 'Testing AI APIs with pytest and Requests — mocking LLM responses, testing edge cases, and validating structured outputs.'
    },
    {
      num: 6, ready: false,
      title: 'CI/CD for AI Test Suites',
      desc: 'Running AI tests in GitHub Actions — parallelism, flakiness handling, cost management, and integrating LLM-as-judge into pipelines.'
    },
    {
      num: 7, ready: false,
      title: 'Security Testing for AI',
      desc: 'Prompt injection attacks, data leakage, jailbreaking, and adversarial testing. How to write security tests for LLM-powered features.'
    },
    {
      num: 8, ready: false,
      title: 'Performance Testing AI Features',
      desc: 'Latency benchmarking, throughput testing, and token-cost optimization. Load testing AI endpoints and establishing performance baselines.'
    },
    {
      num: 9, ready: false,
      title: 'AI-Assisted Test Generation',
      desc: 'Using AI agents to generate test cases, identify edge cases, and triage failures. GitHub Copilot, Cursor, and custom test-generation pipelines.'
    },
    {
      num: 10, ready: false,
      title: 'Building an AI Testing Strategy',
      desc: 'Putting it all together — designing a full AI testing strategy for your team, from unit to system level, with metrics, reporting, and continuous improvement.'
    }
  ]
};

const HE = {
  nav: '🎓 סדרת הרצאות',
  groupLabel: 'למידה',
  title: '🎓 סדרת הרצאות — שליטה בבדיקות AI',
  lead: 'סדרה מובנית של 10 הרצאות מעמיקות שמובילות אתכם מהיסודות של בדיקות AI ועד לטכניקות הערכה מתקדמות. עבדו לפי הסדר, או קפצו למה שאתם הכי צריכים.',
  lectureLabel: 'הרצאה',
  comingSoon: 'בקרוב',
  openLecture: 'פתח הרצאה ←',
  lectures: [
    {
      num: 1, ready: true,
      title: 'מבוא לבדיקות AI',
      desc: 'מהן בדיקות AI, למה הן חשובות, וכיצד הן שונות מבדיקות תוכנה מסורתיות. מכסה LLMs, אי-דטרמיניזם, אסטרטגיות הערכה ונוף בדיקות ה-AI המודרני.',
      url: 'https://gamma.app/docs/AI--e2m8rc9urhszuwb?mode=doc'
    },
    {
      num: 2, ready: false,
      title: 'הנדסת Prompt לבודקים',
      desc: 'כיצד לכתוב prompts שמייצרים תוצאות עקביות וניתנות לבדיקה. מכסה מבנה prompt, system messages, temperature ויסודות prompt injection.'
    },
    {
      num: 3, ready: false,
      title: 'בדיקת פלטי LLM',
      desc: 'מסגרות הערכה לתגובות LLM — דמיון סמנטי, בדיקות עובדתיות, זיהוי רעילות ואימות JSON schema.'
    },
    {
      num: 4, ready: false,
      title: 'Playwright לאפליקציות AI',
      desc: 'בדיקות end-to-end לממשקי AI עם Playwright — טיפול בתוכן דינמי, בדיקת תגובות streaming ובניית selectors עמידים.'
    },
    {
      num: 5, ready: false,
      title: 'בדיקות API עם פיצ\'רים של AI',
      desc: 'בדיקת AI APIs עם pytest ו-Requests — הדמיית תגובות LLM, בדיקת מקרי קצה ואימות פלטים מובנים.'
    },
    {
      num: 6, ready: false,
      title: 'CI/CD לסוויטות בדיקות AI',
      desc: 'הרצת בדיקות AI ב-GitHub Actions — מקביליות, טיפול ב-flakiness, ניהול עלויות ושילוב LLM-as-judge ב-pipelines.'
    },
    {
      num: 7, ready: false,
      title: 'בדיקות אבטחה ל-AI',
      desc: 'התקפות prompt injection, דליפת נתונים, jailbreaking ובדיקות adversarial. כיצד לכתוב בדיקות אבטחה לפיצ\'רים מבוססי LLM.'
    },
    {
      num: 8, ready: false,
      title: 'בדיקות ביצועים לפיצ\'רים של AI',
      desc: 'ניתוח latency, בדיקות throughput ואופטימיזציית עלות-token. בדיקות עומס על AI endpoints וקביעת baselines של ביצועים.'
    },
    {
      num: 9, ready: false,
      title: 'יצירת בדיקות בעזרת AI',
      desc: 'שימוש בסוכני AI ליצירת test cases, זיהוי מקרי קצה וסיווג כשלים. GitHub Copilot, Cursor ו-pipelines מותאמים ליצירת בדיקות.'
    },
    {
      num: 10, ready: false,
      title: 'בניית אסטרטגיית בדיקות AI',
      desc: 'הכל ביחד — עיצוב אסטרטגיית בדיקות AI מלאה לצוות שלכם, מיחידה לרמת מערכת, עם מדדים, דיווח ושיפור מתמיד.'
    }
  ]
};

export function initLectures() {
  const bank = activeLang === 'he' ? HE : EN;

  // Build the section
  const section = document.createElement('section');
  section.id = 'lecture-series';

  section.innerHTML = `
    <h2><span class="num">04</span> ${bank.title}</h2>
    <p class="lead">${bank.lead}</p>
    <div class="grid">
      ${bank.lectures.map(lec => `
        <div class="card" style="${lec.ready ? '' : 'opacity:.6;'}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
            <span style="background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border-radius:8px;padding:3px 10px;font-family:monospace;font-size:.78rem;font-weight:700;white-space:nowrap;">${bank.lectureLabel} ${lec.num}</span>
            ${lec.ready
              ? '<span style="background:var(--green);color:#fff;border-radius:6px;padding:2px 8px;font-size:.7rem;font-weight:700;letter-spacing:.03em;">● Live</span>'
              : `<span style="color:var(--muted);font-size:.75rem;font-style:italic;">${bank.comingSoon}</span>`
            }
          </div>
          <h4 style="margin-bottom:8px;font-size:1rem;">${lec.title}</h4>
          <p style="font-size:.88rem;">${lec.desc}</p>
          ${lec.ready && lec.url
            ? `<a href="${lec.url}" target="_blank" rel="noopener noreferrer"
                style="display:inline-block;margin-top:16px;background:linear-gradient(90deg,var(--accent),var(--accent2));
                color:#fff;border-radius:9px;padding:9px 18px;font-weight:700;font-size:.875rem;
                text-decoration:none;transition:filter .2s,transform .2s;"
                onmouseover="this.style.filter='brightness(1.08)';this.style.transform='translateY(-1px)'"
                onmouseout="this.style.filter='';this.style.transform=''"
              >${bank.openLecture}</a>`
            : ''
          }
        </div>
      `).join('')}
    </div>
  `;

  // Insert the section: before #interview-talk if it exists, otherwise append
  const interviewSection = document.getElementById('interview-talk');
  if (interviewSection) {
    interviewSection.before(section);
  } else {
    const main = $('main-content');
    if (main) main.appendChild(section);
  }

  // Add nav link after the #resume link
  const navLink = document.createElement('a');
  navLink.className = 'link';
  navLink.href = '#lecture-series';
  navLink.textContent = bank.nav;

  const resumeLink = document.querySelector('nav a[href="#resume"]');
  if (resumeLink) {
    resumeLink.after(navLink);
  } else {
    const interviewLink = document.querySelector('nav a[href="#interview-talk"]');
    if (interviewLink) {
      interviewLink.before(navLink);
    } else {
      const nav = $('nav');
      if (nav) nav.appendChild(navLink);
    }
  }
}
