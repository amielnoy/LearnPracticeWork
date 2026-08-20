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

export default function DebuggingFlakyAiTests() {
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
          {t('Debugging', 'ניפוי באגים')}
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
          {t('Debugging Flaky AI Tests', 'ניפוי באגים בבדיקות AI תנודתיות')}
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
            "AI test flakiness usually comes from timing, non-deterministic output, or shared state. Playwright's built-in tools make the root cause visible without re-running locally.",
            'תנודתיות בדיקות AI מגיעה בדרך כלל מתזמון, פלט אי-דטרמיניסטי, או מצב משותף. הכלים המובנים של Playwright הופכים את הסיבה השורשית לגלויה מבלי להריץ מחדש מקומית.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Trace Viewer', 'מציג Trace')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Enable tracing in playwright.config.ts (on: "on-first-retry" or "retain-on-failure"). The trace archive lets you step through every action, network request, and DOM snapshot from the failed run.',
                'הפעילו tracing ב-playwright.config.ts (on: "on-first-retry" או "retain-on-failure"). ארכיון ה-trace מאפשר לכם לעבור על כל פעולה, בקשת רשת ו-snapshot DOM מההרצה הנכשלת.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Video Recording', 'הקלטת וידאו')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Set video: "retain-on-failure" to capture a screen recording for every test that fails. You can see exactly when the UI froze, what state it was in, and what changed mid-test.',
                'הגדירו video: "retain-on-failure" לצילום הקלטת מסך לכל בדיקה שנכשלת. ניתן לראות בדיוק מתי ה-UI קפא, באיזה מצב הוא היה, ומה השתנה באמצע הבדיקה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Inspect the Network Log', 'בדיקת יומן הרשת')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Use the network tab in the trace viewer to check what the AI API actually returned. An unexpected empty response or unexpected status code often explains a mysterious assertion failure.',
                'השתמשו בלשונית הרשת ב-trace viewer לבדיקת מה ה-API של ה-AI בפועל החזיר. תגובה ריקה בלתי צפויה או קוד סטטוס בלתי צפוי לרוב מסביר כשל assertion מסתורי.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
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
            gap: '3vh',
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
            {t('Flake Diagnosis Workflow', 'זרימת עבודה לאבחון תנודתיות')}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}
          >
            <div
              style={
                {
                  position: 'absolute',
                  [isHe ? 'right' : 'left']: '0.5vw',
                  top: '2vh',
                  bottom: '2vh',
                  width: '2px',
                  backgroundColor: '#E2E8F0',
                } as React.CSSProperties
              }
            />
            {[
              t(
                'Download trace archive from CI artefacts',
                'הורידו ארכיון trace מ-artefacts של CI',
              ),
              t('Open with: npx playwright show-trace', 'פתחו עם: npx playwright show-trace'),
              t(
                'Identify the first divergence from expected flow',
                'זהו את הסטייה הראשונה מהזרימה הצפויה',
              ),
              t(
                'Check network tab for unexpected AI response',
                'בדקו לשונית רשת לתגובת AI בלתי צפויה',
              ),
              t(
                'Add waitForFunction or tighten the assertion scope',
                'הוסיפו waitForFunction או הדקו את טווח ה-assertion',
              ),
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '2vw',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: '1vw',
                    height: '1vw',
                    backgroundColor: '#0D9488',
                    borderRadius: '50%',
                    border: '4px solid #FFFFFF',
                    boxShadow: '0 0 0 1px #E2E8F0',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1.05vw', fontWeight: 500, color: '#1E3A5F' }}>{item}</div>
              </div>
            ))}
          </div>
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
          <span>{t('Slide 24 of 30', 'שקופית 24 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
