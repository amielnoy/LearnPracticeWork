/**
 * The lecture catalogue.
 *
 * This lived inside `components/LectureSeries.tsx` — 336 of that file's 425
 * lines were these two objects — which made editing a lecture blurb an edit to
 * a component, and left the catalogue with no importer other than the thing
 * that rendered it. Every other section of the site keeps its copy in
 * `lib/locales` or, where it is large enough to deserve its own file, in a
 * module like this one and `lib/questionBank.ts`.
 *
 * Having it here is also what lets anything else read the list — the static
 * prerender in `index.html` describes these same lectures and had drifted from
 * them, and a generator cannot import from a component.
 */

/**
 * The origin the decks are served from when nothing overrides it.
 *
 * These links used to be twenty absolute URLs pinned to the Replit deployment,
 * written out one per lecture per language. Every deck builds and publishes
 * alongside this app on each static host now, so pinning them meant the copies
 * on the host the visitor was already on could never be reached.
 *
 * `VITE_SITE_ORIGIN` moves all of them at once. The default is the origin they
 * already pointed at, so a build that does not set it is byte-identical to the
 * one before this change — moving hosts is a config flip, not an edit to
 * twenty strings.
 */
export const DEFAULT_SITE_ORIGIN = 'https://free-tier-insights--amielpeled.replit.app';

export interface LectureData {
  num: number;
  ready: boolean;
  title: string;
  desc: string;
  /**
   * One of our own decks, by number. The href is derived from the site origin
   * rather than stored, which is what lets it follow the deployment.
   */
  deck?: number;
  /** An external lecture. The cybersecurity track is hosted on gamma.site. */
  url?: string;
}

/**
 * Where a lecture's "open" link points, or null when there is nothing to open.
 *
 * The origin is passed in rather than read here because this module has two
 * importers in two runtimes: the component, where Vite substitutes
 * `import.meta.env`, and `scripts/generate-prerender.ts`, which runs under
 * Node where that does not exist.
 */
export function lectureHref(lec: LectureData, lang: string, origin?: string): string | null {
  if (lec.url) return lec.url;
  if (lec.deck === undefined) return null;
  const base = (origin || DEFAULT_SITE_ORIGIN).replace(/\/$/, '');
  return `${base}/ai-testing-lecture-${lec.deck}/slide1?lang=${lang}`;
}

export interface TrackData {
  title: string;
  lead: string;
  lectures: LectureData[];
}

export interface BankData {
  nav: string;
  title: string;
  lead: string;
  lectureLabel: string;
  /** The badge on a lecture that is available. Was hardcoded as "Live" in the
   *  component — the one English string left standing in the Hebrew UI, on
   *  twelve cards, inside an RTL flow. */
  liveLabel: string;
  comingSoon: string;
  openLecture: string;
  tracks: TrackData[];
}

export const EN: BankData = {
  nav: '🎓 Lecture Series',
  title: '🎓 Lecture Series',
  lead: 'Two structured tracks of 10 in-depth lectures each — from AI testing fundamentals to advanced evaluation techniques, and from AI basics to foundational cybersecurity practice. Work through them in order, or jump to what you need most.',
  lectureLabel: 'Lecture',
  liveLabel: 'Live',
  comingSoon: 'Coming soon',
  openLecture: 'Open lecture →',
  tracks: [
    {
      title: 'AI Testing',
      lead: 'From AI testing fundamentals to advanced evaluation techniques.',
      lectures: [
        {
          num: 1,
          ready: true,
          title: 'Introduction to AI Testing',
          desc: 'What is AI testing, why it matters, and how it differs from traditional software testing. Covers LLMs, non-determinism, evaluation strategies, and the modern AI testing landscape.',
          deck: 1,
        },
        {
          num: 2,
          ready: true,
          title: 'Prompt Engineering for Testers',
          desc: 'How to write prompts that produce consistent, testable outputs. Covers prompt structure, system messages, temperature, and prompt injection basics.',
          deck: 2,
        },
        {
          num: 3,
          ready: true,
          title: 'Testing LLM Outputs',
          desc: 'Evaluation frameworks for LLM responses — semantic similarity, factuality checks, toxicity detection, and JSON schema validation.',
          deck: 3,
        },
        {
          num: 4,
          ready: true,
          title: 'Playwright for AI Applications',
          desc: 'End-to-end testing of AI-powered UIs with Playwright — handling dynamic content, testing streaming responses, and building resilient selectors.',
          deck: 4,
        },
        {
          num: 5,
          ready: true,
          title: 'API Testing with AI Features',
          desc: 'Testing AI APIs with pytest and Requests — mocking LLM responses, testing edge cases, and validating structured outputs.',
          deck: 5,
        },
        {
          num: 6,
          ready: true,
          title: 'CI/CD for AI Test Suites',
          desc: 'Running AI tests in GitHub Actions — parallelism, flakiness handling, cost management, and integrating LLM-as-judge into pipelines.',
          deck: 6,
        },
        {
          num: 7,
          ready: true,
          title: 'Security Testing for AI',
          desc: 'Prompt injection attacks, data leakage, jailbreaking, and adversarial testing. How to write security tests for LLM-powered features.',
          deck: 7,
        },
        {
          num: 8,
          ready: true,
          title: 'Performance Testing AI Features',
          desc: 'Latency benchmarking, throughput testing, and token-cost optimization. Load testing AI endpoints and establishing performance baselines.',
          deck: 8,
        },
        {
          num: 9,
          ready: true,
          title: 'AI-Assisted Test Generation',
          desc: 'Using AI agents to generate test cases, identify edge cases, and triage failures. GitHub Copilot, Cursor, and custom test-generation pipelines.',
          deck: 9,
        },
        {
          num: 10,
          ready: true,
          title: 'Building an AI Testing Strategy',
          desc: 'Putting it all together — designing a full AI testing strategy for your team, from unit to system level, with metrics, reporting, and continuous improvement.',
          deck: 10,
        },
      ],
    },
    {
      title: 'AI-Powered Basic Cybersecurity',
      lead: 'Foundational cybersecurity concepts, powered and accelerated by AI tools.',
      lectures: [
        {
          num: 1,
          ready: true,
          title: 'Introduction to Cybersecurity with AI',
          desc: 'The fundamentals of cybersecurity — threats, attack surfaces, and defense-in-depth — and how AI tools are reshaping how security teams work today.',
          url: 'https://ai--hktwaey.gamma.site/',
        },
        {
          num: 2,
          ready: true,
          title: 'AI in Network Security Monitoring',
          desc: 'Applying AI to traffic analysis and intrusion detection — spotting lateral movement and exfiltration patterns in network logs.',
          url: 'https://ml-gf56k78.gamma.site/',
        },
        {
          num: 3,
          ready: false,
          title: 'AI-Powered Threat Detection Basics',
          desc: 'How machine learning models flag suspicious activity, from rule-based detection to anomaly scoring, and where AI adds real value over static rules.',
        },
        {
          num: 4,
          ready: false,
          title: 'Phishing & Social Engineering Detection with AI',
          desc: 'Using AI to spot phishing emails, deepfake voice scams, and social engineering attempts before they reach end users.',
        },
        {
          num: 5,
          ready: false,
          title: 'Malware Analysis Using Machine Learning',
          desc: 'Classifying and clustering malware samples with ML models, and the basics of static vs. behavioral analysis pipelines.',
        },
        {
          num: 6,
          ready: false,
          title: 'Automating Vulnerability Scanning with AI',
          desc: 'How AI-assisted scanners prioritize and triage vulnerabilities, reducing noise and helping teams focus on what matters.',
        },
        {
          num: 7,
          ready: false,
          title: 'AI for Log Analysis & Anomaly Detection',
          desc: 'Turning massive log volumes into actionable alerts with AI-driven anomaly detection and clustering techniques.',
        },
        {
          num: 8,
          ready: false,
          title: 'Securing AI Systems Themselves',
          desc: 'The flip side — protecting your own AI systems from prompt injection, model theft, data poisoning, and supply-chain risks.',
        },
        {
          num: 9,
          ready: false,
          title: 'AI-Assisted Incident Response',
          desc: 'Using AI copilots to speed up triage, root-cause analysis, and reporting during a live security incident.',
        },
        {
          num: 10,
          ready: false,
          title: 'Building a Cybersecurity AI Strategy',
          desc: 'Putting it all together — a practical roadmap for adopting AI across detection, response, and prevention in your security program.',
        },
      ],
    },
  ],
};

export const HE: BankData = {
  nav: '🎓 סדרת הרצאות',
  title: '🎓 סדרת הרצאות',
  lead: 'שני טראקים מובנים של 10 הרצאות כל אחד — מהיסודות של בדיקות AI ועד לטכניקות הערכה מתקדמות, ומיסודות הבינה המלאכותית ועד לתרגול אבטחת מידע בסיסי. עבדו לפי הסדר, או קפצו למה שאתם הכי צריכים.',
  lectureLabel: 'הרצאה',
  liveLabel: 'זמינה',
  comingSoon: 'בקרוב',
  openLecture: 'פתח הרצאה ←',
  tracks: [
    {
      title: 'בדיקות AI',
      lead: 'מהיסודות של בדיקות AI ועד לטכניקות הערכה מתקדמות.',
      lectures: [
        {
          num: 1,
          ready: true,
          title: 'מבוא לבדיקות AI',
          desc: 'מהן בדיקות AI, למה הן חשובות, וכיצד הן שונות מבדיקות תוכנה מסורתיות. מכסה LLMs, אי-דטרמיניזם, אסטרטגיות הערכה ונוף בדיקות ה-AI המודרני.',
          deck: 1,
        },
        {
          num: 2,
          ready: true,
          title: 'הנדסת Prompt לבודקים',
          desc: 'כיצד לכתוב prompts שמייצרים תוצאות עקביות וניתנות לבדיקה. מכסה מבנה prompt, system messages, temperature ויסודות prompt injection.',
          deck: 2,
        },
        {
          num: 3,
          ready: true,
          title: 'בדיקת פלטי LLM',
          desc: 'מסגרות הערכה לתגובות LLM — דמיון סמנטי, בדיקות עובדתיות, זיהוי רעילות ואימות JSON schema.',
          deck: 3,
        },
        {
          num: 4,
          ready: true,
          title: 'Playwright לאפליקציות AI',
          desc: 'בדיקות end-to-end לממשקי AI עם Playwright — טיפול בתוכן דינמי, בדיקת תגובות streaming ובניית selectors עמידים.',
          deck: 4,
        },
        {
          num: 5,
          ready: true,
          title: "בדיקות API עם פיצ'רים של AI",
          desc: 'בדיקת AI APIs עם pytest ו-Requests — הדמיית תגובות LLM, בדיקת מקרי קצה ואימות פלטים מובנים.',
          deck: 5,
        },
        {
          num: 6,
          ready: true,
          title: 'CI/CD לסוויטות בדיקות AI',
          desc: 'הרצת בדיקות AI ב-GitHub Actions — מקביליות, טיפול ב-flakiness, ניהול עלויות ושילוב LLM-as-judge ב-pipelines.',
          deck: 6,
        },
        {
          num: 7,
          ready: true,
          title: 'בדיקות אבטחה ל-AI',
          desc: "התקפות prompt injection, דליפת נתונים, jailbreaking ובדיקות adversarial. כיצד לכתוב בדיקות אבטחה לפיצ'רים מבוססי LLM.",
          deck: 7,
        },
        {
          num: 8,
          ready: true,
          title: "בדיקות ביצועים לפיצ'רים של AI",
          desc: 'ניתוח latency, בדיקות throughput ואופטימיזציית עלות-token. בדיקות עומס על AI endpoints וקביעת baselines של ביצועים.',
          deck: 8,
        },
        {
          num: 9,
          ready: true,
          title: 'יצירת בדיקות בעזרת AI',
          desc: 'שימוש בסוכני AI ליצירת test cases, זיהוי מקרי קצה וסיווג כשלים. GitHub Copilot, Cursor ו-pipelines מותאמים ליצירת בדיקות.',
          deck: 9,
        },
        {
          num: 10,
          ready: true,
          title: 'בניית אסטרטגיית בדיקות AI',
          desc: 'הכל ביחד — עיצוב אסטרטגיית בדיקות AI מלאה לצוות שלכם, מיחידה לרמת מערכת, עם מדדים, דיווח ושיפור מתמיד.',
          deck: 10,
        },
      ],
    },
    {
      title: 'בדיקות סייבר בסיסי עם בינה מלאכותית',
      lead: 'יסודות אבטחת מידע, מואצים ומופעלים באמצעות כלי בינה מלאכותית.',
      lectures: [
        {
          num: 1,
          ready: true,
          title: 'מבוא לאבטחת מידע עם בינה מלאכותית',
          desc: 'יסודות אבטחת המידע — איומים, משטחי תקיפה והגנה מרובדת — וכיצד כלי AI משנים כיום את אופן העבודה של צוותי אבטחה.',
          url: 'https://ai--hktwaey.gamma.site/',
        },
        {
          num: 2,
          ready: true,
          title: 'AI בניטור אבטחת רשת',
          desc: 'הפעלת AI על ניתוח תעבורת רשת וזיהוי חדירות — איתור תבניות תנועה רוחבית והדלפת מידע ביומני רשת.',
          url: 'https://ml-gf56k78.gamma.site/',
        },
        {
          num: 3,
          ready: false,
          title: 'יסודות זיהוי איומים עם AI',
          desc: 'כיצד מודלים של למידת מכונה מזהים פעילות חשודה, מזיהוי מבוסס חוקים ועד ניקוד אנומליות, והיכן AI מוסיף ערך אמיתי מעבר לחוקים סטטיים.',
        },
        {
          num: 4,
          ready: false,
          title: 'זיהוי פישינג והנדסה חברתית עם AI',
          desc: 'שימוש ב-AI לזיהוי הודעות פישינג, הונאות קול מבוססות deepfake וניסיונות הנדסה חברתית לפני שהם מגיעים למשתמשי הקצה.',
        },
        {
          num: 5,
          ready: false,
          title: 'ניתוח תוכנות זדוניות באמצעות למידת מכונה',
          desc: 'סיווג וקיבוץ של דגימות תוכנה זדונית עם מודלי ML, ויסודות הניתוח הסטטי לעומת ההתנהגותי.',
        },
        {
          num: 6,
          ready: false,
          title: 'אוטומציה של סריקת פגיעויות עם AI',
          desc: 'כיצד סורקים מבוססי AI מתעדפים ומסננים פגיעויות, מפחיתים רעש ומאפשרים לצוותים להתמקד במה שחשוב.',
        },
        {
          num: 7,
          ready: false,
          title: 'AI לניתוח לוגים וזיהוי אנומליות',
          desc: 'הפיכת כמויות עצומות של לוגים להתראות שניתן לפעול לפיהן, באמצעות זיהוי אנומליות וטכניקות clustering מבוססות AI.',
        },
        {
          num: 8,
          ready: false,
          title: 'אבטחת מערכות ה-AI עצמן',
          desc: 'הצד השני של המטבע — הגנה על מערכות ה-AI שלכם מפני prompt injection, גניבת מודלים, הרעלת נתונים וסיכוני שרשרת אספקה.',
        },
        {
          num: 9,
          ready: false,
          title: 'תגובה לאירועי אבטחה בסיוע AI',
          desc: "שימוש בעוזרי AI כדי להאיץ טריאז', ניתוח שורש הבעיה ודיווח במהלך אירוע אבטחה חי.",
        },
        {
          num: 10,
          ready: false,
          title: 'בניית אסטרטגיית AI לאבטחת מידע',
          desc: 'הכל ביחד — מפת דרכים מעשית לאימוץ AI על פני זיהוי, תגובה ומניעה בתוכנית האבטחה שלכם.',
        },
      ],
    },
  ],
};
