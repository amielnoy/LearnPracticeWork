import { t, dir, isHe } from '@/lib/i18n';

const wrap: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif",
  padding: '4vh 4vw',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 0',
  color: '#1E3A5F',
};

export default function ToolsAndLibrariesRecap() {
  const tools = [
    {
      category: t('Network Interception & Mocking', 'יירוט רשת והדמייה'),
      capability: 'page.route()',
      desc: t(
        'Intercept and stub any HTTP/HTTPS request. Use it to return deterministic AI fixture responses, simulate 4xx/5xx errors, and eliminate external API dependencies from CI.',
        'יירוט ובעצם כל בקשת HTTP/HTTPS. השתמשו בה להחזרת תגובות AI דטרמיניסטיות, סימולציית שגיאות 4xx/5xx ובחינת תלויות API חיצוניות מ-CI.',
      ),
    },
    {
      category: t('Trace Viewer & Diagnostics', 'מציג Trace ואבחון'),
      capability: 'npx playwright show-trace',
      desc: t(
        'Step through every action, network request, console log, and DOM snapshot from a test run. Indispensable for diagnosing AI test flakiness without re-running locally.',
        'עברו על כל פעולה, בקשת רשת, יומן console ו-snapshot DOM מהרצת בדיקה. חיוני לאבחון תנודתיות בדיקות AI מבלי להריץ מחדש מקומית.',
      ),
    },
    {
      category: t('Visual Comparisons', 'השוואות ויזואליות'),
      capability: 'expect(page).toHaveScreenshot()',
      desc: t(
        'Built-in screenshot diffing with configurable thresholds. Combine with the mask option to exclude AI-generated text regions and focus visual assertions on stable layout chrome.',
        'השוואת צילומי מסך מובנית עם סף ניתן להגדרה. שלבו עם אפשרות המסכה להחרגת אזורי טקסט מיוצר AI ולהתמקדות אסרציות ויזואליות ב-chrome פריסה יציב.',
      ),
    },
    {
      category: t('Test Sharding', 'פיצול בדיקות'),
      capability: '--shard=1/4',
      desc: t(
        'Split a test suite across multiple machines with --shard. Reduces total wall-clock time proportionally. Pair with mocked tests to keep parallel AI runs free from rate-limit contention.',
        'פצלו סוויטת בדיקות על פני מספר מכונות עם --shard. מפחית זמן שעון כולל באופן פרופורציונלי. שלבו עם בדיקות מדומות לשמירה על הרצות AI מקביליות ללא מחלוקת מגבלת קצב.',
      ),
    },
    {
      category: t('Accessibility-Driven Selectors', 'סלקטורים מונעי נגישות'),
      capability: 'getByRole() / getByLabel()',
      desc: t(
        'Query elements by ARIA role and accessible name. These locators are inherently resilient to AI output changes and simultaneously enforce accessible HTML structure.',
        'שאלת אלמנטים לפי תפקיד ARIA ושם נגיש. לוקייטורים אלו עמידים מטבעם לשינויי פלט AI ובמקביל אוכפים מבנה HTML נגיש.',
      ),
    },
    {
      category: t('Retry & Flake Detection', 'זיהוי ניסיון חוזר ותנודתיות'),
      capability: 'retries in playwright.config.ts',
      desc: t(
        'Configure automatic retries per test in CI. Combine with --reporter=html to surface tests that only pass on retry — a clear signal of unresolved flakiness.',
        'הגדירו ניסיונות חוזרים אוטומטיים לכל בדיקה ב-CI. שלבו עם --reporter=html כדי לחשוף בדיקות שעוברות רק בניסיון חוזר — אות ברור לתנודתיות לא פתורה.',
      ),
    },
  ];

  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '2vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div
            style={{
              width: '2vw',
              height: '2vw',
              backgroundColor: '#0D9488',
              borderRadius: '0.4vw',
            }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2vw',
            fontSize: '1vw',
            fontWeight: 500,
            color: '#64748B',
          }}
        >
          <div>{t('TESTING TOOLS', 'כלי בדיקה')}</div>
          <div>{t('LECTURE 04', 'הרצאה 04')}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Recap', 'סיכום')}
          </div>
          <h1
            style={{
              fontSize: '2.8vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Tools You Can Use Today', 'כלים שאתם יכולים להשתמש בהם היום')}
          </h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1.5vh 2vw',
            flex: 1,
          }}
        >
          {tools.map((tool, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '0.8vw',
                border: '1px solid #E2E8F0',
                padding: '1.8vh 1.5vw',
                boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8vh',
              }}
            >
              <div
                style={{
                  fontSize: '0.85vw',
                  fontWeight: 600,
                  color: '#0D9488',
                  textTransform: isHe ? 'none' : 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {tool.category}
              </div>
              <div
                style={{
                  background: '#1E3A5F',
                  borderRadius: '0.4vw',
                  padding: '0.5vh 0.7vw',
                  fontFamily: 'monospace',
                  direction: 'ltr',
                  textAlign: 'left',
                  fontSize: '0.85vw',
                  color: '#7DD3C8',
                  display: 'inline-block',
                }}
              >
                {tool.capability}
              </div>
              <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.5 }}>
                {tool.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #E2E8F0',
          paddingTop: '2vh',
          fontSize: '0.9vw',
          color: '#94A3B8',
          fontWeight: 500,
        }}
      >
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 27 of 30', 'שקופית 27 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
