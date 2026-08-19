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
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

const card: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

export default function MockingTheModelLayer() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div
        style={{
          gridColumn: '1 / -1',
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

      {/* Left column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '1vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('CI Strategy', 'אסטרטגיית CI')}
        </div>
        <h1
          style={{
            fontSize: '3.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Mocking the Model Layer', 'הדמיית שכבת המודל')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'Intercepting the network call to the AI backend and returning a deterministic fixture response makes your CI runs fast, cheap, and non-flaky.',
            'יירוט קריאת הרשת ל-backend של ה-AI והחזרת תגובת fixture דטרמיניסטית הופך את הרצות ה-CI שלכם למהירות, זולות וללא תנודתיות.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Intercept with page.route()', 'יירוט עם page.route()')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4, marginBottom: '0.8vh' }}>
              {t(
                'Match the AI endpoint URL pattern and return a pre-defined JSON or streaming SSE fixture. The rest of the test exercises real UI code with predictable input.',
                'התאימו את דפוס ה-URL של endpoint ה-AI והחזירו JSON מוגדר מראש או fixture SSE בסטרימינג. שאר הבדיקה מפעיל קוד UI אמיתי עם קלט צפוי.',
              )}
            </div>
            <div
              style={{
                background: '#1E3A5F',
                borderRadius: '0.5vw',
                padding: '0.8vh 1vw',
                fontFamily: 'monospace',
                fontSize: '0.85vw',
                color: '#7DD3C8',
              }}
            >
              {"await page.route('**/api/chat', r => r.fulfill({ body: JSON.stringify(fixture) }))"}
            </div>
          </div>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Keep Fixture Responses Minimal', 'שמרו תגובות Fixture מינימליות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A fixture only needs to be realistic enough to drive the UI path under test. Include the fields the UI actually reads; omit everything else to keep tests readable.',
                'ה-fixture צריך להיות ריאליסטי מספיק כדי להנהיג את נתיב ה-UI הנבדק. כללו את השדות שה-UI אכן קורא; השמיטו כל השאר כדי לשמור על בדיקות קריאות.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Complement with a Real-Model Smoke Suite', 'השלמה עם סוויטת עשן עם מודל אמיתי')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Run mocked tests on every PR. Schedule a separate, smaller suite that calls the real model API once a day to catch integration drift.',
                'הריצו בדיקות מדומות בכל PR. תזמנו סוויטה נפרדת וקטנה יותר שקוראת ל-API המודל האמיתי פעם ביום כדי לזהות סטיות אינטגרציה.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — before/after panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.5vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Real Model vs. Mocked', 'מודל אמיתי מול מדומה')}
          </div>
          {[
            {
              aspect: t('Speed', 'מהירות'),
              real: t('Seconds–minutes', 'שניות–דקות'),
              mocked: t('Milliseconds', 'מילישניות'),
            },
            {
              aspect: t('Determinism', 'דטרמיניזם'),
              real: t('Non-deterministic', 'אי-דטרמיניסטי'),
              mocked: t('100% repeatable', '100% חוזר'),
            },
            {
              aspect: t('Cost', 'עלות'),
              real: t('API tokens consumed', 'טוקני API מתבזבזים'),
              mocked: t('Zero API cost', 'עלות API אפסית'),
            },
            {
              aspect: t('CI suitability', 'התאמה ל-CI'),
              real: t('Smoke suite only', 'סוויטת עשן בלבד'),
              mocked: t('Every PR / commit', 'כל PR / commit'),
            },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.5vw',
                alignItems: 'start',
              }}
            >
              <div style={{ fontSize: '0.95vw', fontWeight: 600, color: '#64748B' }}>
                {row.aspect}
              </div>
              <div
                style={{
                  fontSize: '0.9vw',
                  color: '#475569',
                  background: 'rgba(239,68,68,0.07)',
                  borderRadius: '0.4vw',
                  padding: '0.5vh 0.5vw',
                }}
              >
                {row.real}
              </div>
              <div
                style={{
                  fontSize: '0.9vw',
                  color: '#0D9488',
                  fontWeight: 500,
                  background: 'rgba(13,148,136,0.08)',
                  borderRadius: '0.4vw',
                  padding: '0.5vh 0.5vw',
                }}
              >
                {row.mocked}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          gridColumn: '1 / -1',
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
          <span>{t('Slide 20 of 30', 'שקופית 20 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
