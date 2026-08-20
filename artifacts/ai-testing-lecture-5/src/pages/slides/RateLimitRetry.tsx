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

export default function RateLimitRetry() {
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
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
          {t('Section 3 \u2014 Performance & Cost', 'חלק 3 \u2014 ביצועים ועלות')}
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
          {t('Rate-Limit and Retry Testing', 'בדיקות הגבלת קצב וניסיון חוזר')}
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
            'Simulate a 429 from the provider and assert your API backs off and retries correctly instead of surfacing the raw provider error to the client.',
            'הדמו 429 מהספק ובדקו שה-API שלכם נסוג ומנסה שוב כראוי במקום לחשוף את שגיאת הספק הגולמית ללקוח.',
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
              {t('Inject a 429 with the Mock Layer', 'הזרקת 429 עם שכבת ההדמייה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Use responses.add() to return a 429 on the first call, then a 200 on the second. Assert your service retried and returned the successful second response to the client.',
                'השתמשו ב-responses.add() להחזרת 429 בקריאה הראשונה, ואז 200 בשנייה. בדקו שהשירות שלכם ניסה שוב והחזיר את התגובה המוצלחת השנייה ללקוח.',
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
              {t('Assert on Back-Off Behavior', 'בדיקת התנהגות נסיגה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Verify the retry delay is exponential, not immediate. A retry loop with no delay under rate limiting will amplify the problem rather than recover from it.',
                'אמתו שעיכוב הניסיון החוזר הוא מעריכי, לא מיידי. לולאת ניסיון חוזר ללא עיכוב תחת הגבלת קצב תגביר את הבעיה במקום להתאושש ממנה.',
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
              {t('Cap the Retry Count', 'הגבלת מספר הניסיונות החוזרים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Assert that your code gives up after a maximum number of retries and returns a clear 503 to the client — not an infinite loop that exhausts your token budget.',
                'בדקו שהקוד שלכם מוותר לאחר מספר מרבי של ניסיונות חוזרים ומחזיר 503 ברור ללקוח — לא לולאה אינסופית שמרוקנת את תקציב הטוקן.',
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
            padding: '3vh 2.5vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Mocking a 429 Sequence', 'הדמיית רצף 429')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.9vw',
              lineHeight: 1.8,
              color: '#E2E8F0',
              flex: 1,
            }}
          >
            <div style={{ color: '#64748B' }}>import responses</div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}># first call returns 429</div>
            <div style={{ color: '#38BDF8' }}>responses.add(</div>
            <div style={{ color: '#38BDF8' }}>
              &nbsp;&nbsp;method=<span style={{ color: '#4ADE80' }}>"POST"</span>,
            </div>
            <div style={{ color: '#38BDF8' }}>
              &nbsp;&nbsp;url=<span style={{ color: '#4ADE80' }}>ENDPOINT</span>,
            </div>
            <div style={{ color: '#38BDF8' }}>
              &nbsp;&nbsp;status=<span style={{ color: '#F87171' }}>429</span>,
            </div>
            <div style={{ color: '#38BDF8' }}>)</div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}># second call returns 200</div>
            <div style={{ color: '#38BDF8' }}>responses.add(</div>
            <div style={{ color: '#38BDF8' }}>
              &nbsp;&nbsp;method=<span style={{ color: '#4ADE80' }}>"POST"</span>,
            </div>
            <div style={{ color: '#38BDF8' }}>
              &nbsp;&nbsp;url=<span style={{ color: '#4ADE80' }}>ENDPOINT</span>,
            </div>
            <div style={{ color: '#38BDF8' }}>
              &nbsp;&nbsp;json=MOCK_RESPONSE, status=<span style={{ color: '#F87171' }}>200</span>,
            </div>
            <div style={{ color: '#38BDF8' }}>)</div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}>
              # assert final result is success
            </div>
            <div style={{ color: '#FBBF24' }}>result = my_service.call()</div>
            <div style={{ color: '#FBBF24' }}>assert result.ok</div>
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 21 of 30', 'שקופית 21 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
