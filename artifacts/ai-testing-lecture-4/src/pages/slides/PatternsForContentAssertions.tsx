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

export default function PatternsForContentAssertions() {
  const patterns = [
    {
      label: t('Regex / Structure Checks', 'בדיקות Regex / מבנה'),
      badge: t('Pattern A', 'דפוס א'),
      desc: t(
        'Use expect(text).toMatch(/\\d+ results?/i) to verify the response contains a number followed by "result" — without caring what the exact count is.',
        'השתמשו ב-expect(text).toMatch(/\\d+ results?/i) לאימות שהתגובה מכילה מספר ואחריו "result" — ללא תלות בספירה המדויקת.',
      ),
      code: 'expect(text).toMatch(/\\d+ results?/i)',
      good: true,
    },
    {
      label: t('Normalised Snapshot Testing', 'בדיקת Snapshot מנורמל'),
      badge: t('Pattern B', 'דפוס ב'),
      desc: t(
        'Strip volatile fields (dates, IDs, model-generated phrasing) before snapshotting. Lock down the shape and structure, not the exact words.',
        'הסירו שדות תנודתיים (תאריכים, IDs, ניסוחים מיוצרי מודל) לפני יצירת ה-snapshot. נעלו את הצורה והמבנה, לא את המילים המדויקות.',
      ),
      code: 'expect(normalize(html)).toMatchSnapshot()',
      good: true,
    },
    {
      label: t('Semantic Assertions', 'אסרציות סמנטיות'),
      badge: t('Pattern C', 'דפוס ג'),
      desc: t(
        'Assert that a response container is non-empty and contains at least one paragraph — verifying the UI rendered something meaningful without pinning the content.',
        'בדקו שמכיל התגובה אינו ריק ומכיל לפחות פסקה אחת — מאמת שה-UI רינדר משהו משמעותי מבלי לנעול את התוכן.',
      ),
      code: 'expect(await el.locator("p").count()).toBeGreaterThan(0)',
      good: true,
    },
    {
      label: t('Exact Text Match — Avoid', 'התאמת טקסט מדויקת — הימנעו'),
      badge: t('Anti-pattern', 'אנטי-דפוס'),
      desc: t(
        'toHaveText("The quick brown fox…") will break the next time the model rephrases a correct answer. Never assert on the model\'s exact phrasing.',
        'toHaveText("השועל החום המהיר…") ייתקל בכשל בפעם הבאה שהמודל ינסח מחדש תשובה נכונה. לעולם אל תאמתו על הניסוח המדויק של המודל.',
      ),
      code: 'await expect(el).toHaveText("exact string") // ✗',
      good: false,
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
            {t('Technique 1', 'טכניקה 1')}
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
            {t('Patterns for Asserting on Generated Content', 'דפוסים לאסרציה על תוכן מיוצר')}
          </h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2vh 2vw',
            flex: 1,
          }}
        >
          {patterns.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '1vw',
                border: `1px solid ${p.good ? '#E2E8F0' : 'rgba(239,68,68,0.3)'}`,
                padding: '2vh 2vw',
                boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1vh',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div style={{ fontSize: '1.15vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {p.label}
                </div>
                <div
                  style={{
                    fontSize: '0.85vw',
                    fontWeight: 600,
                    color: p.good ? '#0D9488' : '#EF4444',
                    backgroundColor: p.good ? 'rgba(13,148,136,0.1)' : 'rgba(239,68,68,0.1)',
                    padding: '0.3vh 0.7vw',
                    borderRadius: '2vw',
                  }}
                >
                  {p.badge}
                </div>
              </div>
              <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{p.desc}</div>
              <div
                style={{
                  background: '#1E3A5F',
                  borderRadius: '0.5vw',
                  padding: '1vh 1vw',
                  fontFamily: 'monospace',
                  fontSize: '0.9vw',
                  color: '#7DD3C8',
                  marginTop: 'auto',
                }}
              >
                {p.code}
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
          <span>{t('Slide 8 of 30', 'שקופית 8 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
