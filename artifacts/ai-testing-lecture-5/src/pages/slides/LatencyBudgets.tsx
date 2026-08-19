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

export default function LatencyBudgets() {
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
          {t('Latency Budgets', 'תקציבי זמן תגובה')}
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
            'An AI-augmented endpoint has a slower, more variable p95 than a plain database read. Set an explicit budget per endpoint and fail the test or alert when it is exceeded.',
            'לנקודת קצה המוגברת ב-AI יש p95 איטי ומשתנה יותר מאשר קריאת מסד נתונים פשוטה. הגדירו תקציב מפורש לכל נקודת קצה וכשלו את הבדיקה או התריעו כשהוא חורג.',
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
              {t('Measure p95, Not Mean', 'מדדו p95, לא ממוצע')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Mean latency hides tail cases. A mean of 800ms with a p95 of 8s means 5% of users wait 10x longer. Set the budget on p95 or p99.',
                'זמן תגובה ממוצע מסתיר מקרי קצה. ממוצע של 800ms עם p95 של 8s אומר ש-5% מהמשתמשים מחכים פי 10 יותר. הגדירו את התקציב על p95 או p99.',
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
              {t('Budget Per Endpoint', 'תקציב לכל נקודת קצה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Different endpoints have different SLAs. A background triage job can tolerate 10s; a user-facing chat completion cannot. Document the budget alongside the endpoint.',
                "לנקודות קצה שונות יש SLAs שונים. משימת טריאז ברקע יכולה לסבול 10s; השלמת צ'אט מול משתמש לא יכולה. תעדו את התקציב לצד נקודת הקצה.",
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
              {t('Token Budget in Addition to Time', 'תקציב טוקן בנוסף לזמן')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Log token usage per call. Assert that response.usage.total_tokens is below your budget. A single bad prompt template can 10x your cost before the alert fires.',
                'תעדו שימוש בטוקן לכל קריאה. קבעו ש-response.usage.total_tokens נמוך מהתקציב שלכם. תבנית הנחיה רעה אחת יכולה להכפיל את העלות פי 10 לפני שההתראה מופעלת.',
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
            {t('Latency Budget Assertion', 'קביעת תקציב זמן תגובה')}
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
            <div style={{ color: '#64748B' }}># define the budget once</div>
            <div>
              <span style={{ color: '#38BDF8' }}>LATENCY_BUDGET_MS</span> ={' '}
              <span style={{ color: '#F87171' }}>3000</span>
            </div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}># time the call</div>
            <div>
              <span style={{ color: '#FBBF24' }}>start</span> = time.monotonic()
            </div>
            <div>
              <span style={{ color: '#38BDF8' }}>response</span> = client.summarize(ticket)
            </div>
            <div>
              <span style={{ color: '#FBBF24' }}>elapsed_ms</span> = (time.monotonic() - start) *
              1000
            </div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}>
              # fail the test if over budget
            </div>
            <div>
              <span style={{ color: '#FBBF24' }}>assert</span> elapsed_ms &lt;= LATENCY_BUDGET_MS, \
            </div>
            <div style={{ color: '#4ADE80' }}>
              &nbsp;&nbsp;f"Latency {'{'}elapsed_ms:.0f{'}'}ms exceeds {'{'}LATENCY_BUDGET_MS{'}'}
              ms"
            </div>
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: '#64748B',
              lineHeight: 1.5,
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t(
              'Wrap the same assertion around token usage: assert response.usage.total_tokens <= TOKEN_BUDGET.',
              'עטפו את אותה קביעה סביב שימוש בטוקן: assert response.usage.total_tokens <= TOKEN_BUDGET.',
            )}
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
          <span>{t('Slide 19 of 30', 'שקופית 19 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
