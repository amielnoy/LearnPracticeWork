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

export default function CostLatencyAlerting() {
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
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
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
          {t('Section 3', 'חלק 3')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Alerting on Cost or Latency Regressions', 'התראות על רגרסיות עלות או זמן אחזור')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            "Track the AI test stage's average cost and duration over time. Alert when a new PR's run deviates sharply from the rolling baseline.",
            'עקוב אחר העלות הממוצעת ומשך שלב בדיקות ה-AI לאורך זמן. שלח התראה כשריצה של PR חדש סוטה בחדות מקו הבסיס המתגלגל.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Establish a rolling baseline', 'קבע קו בסיס מתגלגל')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Compute the 14-day rolling mean and standard deviation of cost and duration across recent runs. This is your normal range.',
                'חשב את הממוצע המתגלגל ל-14 יום וסטיית התקן של עלות ומשך בין ריצות אחרונות. זה הטווח הנורמלי שלך.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Alert on sharp deviation', 'התרעה על סטייה חדה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                "If a run's cost or duration exceeds baseline + 2 standard deviations, fire a warning in the PR and notify the test-infra channel.",
                'אם עלות ריצה או משכה חורגים מקו הבסיס + 2 סטיות תקן, שלח אזהרה ב-PR והודע לערוץ test-infra.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t("Warn, don't necessarily block", 'הזהר, לא בהכרח חסום')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A cost regression alert is a warning by default. Only escalate to a build block if the overage exceeds a hard cap, not just a statistical anomaly.',
                'התראת רגרסיית עלות היא אזהרה כברירת מחדל. הסלים לחסימת build רק אם החריגה עולה על גבול קשיח, לא רק חריגה סטטיסטית.',
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
            gap: '2vh',
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
            {t('Sample Metric Run', 'ריצת מדד לדוגמה')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.9vw',
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#94A3B8' }}>AI test stage metrics:</div>
            <div style={{ color: '#E2E8F0', marginTop: '0.5vh' }}>
              baseline_cost: $0.38 +/- $0.04
            </div>
            <div style={{ color: '#E2E8F0' }}>baseline_duration: 4m12s +/- 18s</div>
            <div style={{ color: '#94A3B8', marginTop: '0.5vh' }}>this run:</div>
            <div style={{ color: '#F87171' }}> cost: $0.71 (WARN: +87% vs baseline)</div>
            <div style={{ color: '#FBBF24' }}> duration: 4m08s (OK)</div>
            <div style={{ color: '#94A3B8', marginTop: '0.5vh' }}>action:</div>
            <div style={{ color: '#F87171' }}> PR warning posted, #test-infra alerted</div>
          </div>
          <div
            style={{
              background: 'rgba(13,148,136,0.07)',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: '0.8vw',
              padding: '1.5vh 1.5vw',
              fontSize: '1vw',
              color: '#0D9488',
              fontWeight: 600,
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t(
              'Latency is fine; cost spike triggered the alert. Build is not blocked.',
              'זמן האחזור תקין; קפיצת עלות הפעילה את ההתראה. ה-build אינו חסום.',
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 22 of 30', 'שקופית 22 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
