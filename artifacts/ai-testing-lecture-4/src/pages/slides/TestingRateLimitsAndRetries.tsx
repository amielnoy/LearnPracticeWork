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

export default function TestingRateLimitsAndRetries() {
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
          {t('Failure Simulation', 'סימולציית כשל')}
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
          {t('Simulating Rate Limits and Failures', 'סימולציית מגבלות קצב וכשלים')}
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
            'Use page.route() to intercept AI API calls and return simulated error responses. This lets you test error-handling UI without hitting real rate limits.',
            'השתמשו ב-page.route() ליירוט קריאות API ל-AI ולהחזרת תגובות שגיאה מדומות. זה מאפשר לכם לבדוק UI לטיפול בשגיאות מבלי לפגוע במגבלות קצב אמיתיות.',
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
              {t('Simulate 429 Too Many Requests', 'סימולציית 429 יותר מדי בקשות')}
            </div>
            <div
              style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4, marginBottom: '0.8vh' }}
            >
              {t(
                'Route the AI endpoint to return a 429. Assert the UI shows a "rate limited" or "try again" message, and that the input field remains accessible.',
                'נתבו את ה-endpoint של ה-AI להחזיר 429. אמתו שה-UI מציג הודעת "הגבלת קצב" או "נסו שוב", ושדה הקלט נשאר נגיש.',
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
              {"await page.route('**/api/chat', r => r.fulfill({ status: 429 }))"}
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
              {t('Simulate 5xx Server Error', 'סימולציית שגיאת שרת 5xx')}
            </div>
            <div
              style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4, marginBottom: '0.8vh' }}
            >
              {t(
                'Return a 500 or 503 and verify the UI shows a user-friendly error state — not a blank screen or unhandled exception banner.',
                'החזירו 500 או 503 ואמתו שה-UI מציג מצב שגיאה ידידותי למשתמש — לא מסך ריק או באנר חריגה לא מטופלת.',
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
              {"await page.route('**/api/chat', r => r.fulfill({ status: 503 }))"}
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
              {t('Verify Retry / Backoff UI', 'אימות UI של ניסיון חוזר / backoff')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'If your app retries automatically, assert the retry indicator appears and then assert the UI recovers correctly once you remove the route override.',
                'אם האפליקציה שלכם מנסה שוב אוטומטית, אמתו שמחוון הניסיון מופיע ואז אמתו שה-UI מתאושש כראוי ברגע שמסירים את עקיפת ה-route.',
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
            {t('Error UI Checklist', 'רשימת UI שגיאה')}
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
              t('Error message is visible and meaningful', 'הודעת שגיאה גלויה ומשמעותית'),
              t('Input field stays enabled for retry', 'שדה הקלט נשאר מופעל לניסיון חוזר'),
              t(
                'No unhandled exception banners or blank screens',
                'אין באנרי חריגות לא מטופלות או מסכים ריקים',
              ),
              t(
                'Retry indicator shown when app retries automatically',
                'מחוון ניסיון חוזר מוצג כשהאפליקציה מנסה שוב אוטומטית',
              ),
              t(
                'UI recovers cleanly after error resolves',
                'ה-UI מתאושש בצורה נקייה לאחר פתרון השגיאה',
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
                <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>{item}</div>
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
          <span>{t('Slide 18 of 30', 'שקופית 18 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
