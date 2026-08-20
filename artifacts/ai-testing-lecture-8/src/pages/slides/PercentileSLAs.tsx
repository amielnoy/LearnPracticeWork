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
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function PercentileSLAs() {
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
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left */}
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
          {t('Measuring the Long Tail', 'מדידת הזנב הארוך')}
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
          {t('Percentile-Based SLAs', 'SLAs מבוססי אחוזון')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Average latency hides outliers. SLAs based on p50, p95, and p99 reveal the true distribution and protect users in the tail.',
            'זמן אחזור ממוצע מסתיר חריגים. SLAs מבוססי p50, p95 ו-p99 חושפים את הפיזור האמיתי ומגנים על משתמשים בזנב.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              display: 'flex',
              gap: '2vw',
              alignItems: 'center',
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '2.2vw', fontWeight: 800, color: '#0D9488', minWidth: '5vw' }}>
              p50
            </div>
            <div>
              <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Median — the typical experience', 'חציון — חוויה טיפוסית')}
              </div>
              <div style={{ fontSize: '0.9vw', color: '#64748B' }}>
                {t(
                  'Half of requests are faster, half are slower',
                  'מחצית הבקשות מהירות יותר, מחצית איטיות יותר',
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '2vw',
              alignItems: 'center',
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '2.2vw', fontWeight: 800, color: '#1E3A5F', minWidth: '5vw' }}>
              p95
            </div>
            <div>
              <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Tail — 1 in 20 requests', 'זנב — 1 מ-20 בקשות')}
              </div>
              <div style={{ fontSize: '0.9vw', color: '#64748B' }}>
                {t(
                  'Your SLA ceiling for interactive features',
                  'תקרת SLA שלך לתכונות אינטראקטיביות',
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '2vw',
              alignItems: 'center',
              background: '#FEF2F2',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #FECACA',
            }}
          >
            <div style={{ fontSize: '2.2vw', fontWeight: 800, color: '#DC2626', minWidth: '5vw' }}>
              p99
            </div>
            <div>
              <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Far tail — 1 in 100 requests', 'זנב רחוק — 1 מ-100 בקשות')}
              </div>
              <div style={{ fontSize: '0.9vw', color: '#64748B' }}>
                {t(
                  'High-volume systems see this hourly — must monitor',
                  'מערכות נפח גבוה רואות זאת מדי שעה — חייב לנטר',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1vw',
              fontWeight: 700,
              color: '#64748B',
              marginBottom: '2.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('Example SLA Contract', 'דוגמה לחוזה SLA')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1.5vh',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>TTFT p50</div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488' }}>&lt; 400ms</div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1.5vh',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>TTFT p95</div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F' }}>&lt; 1.2s</div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1.5vh',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>Total p99</div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#DC2626' }}>&lt; 30s</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Error rate', 'שיעור שגיאות')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488' }}>&lt; 0.5%</div>
            </div>
          </div>
        </div>
        <div
          style={{
            background: 'rgba(13,148,136,0.08)',
            borderRadius: '0.8vw',
            padding: '2vh 2vw',
            border: '1px solid rgba(13,148,136,0.2)',
          }}
        >
          <div
            style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}
          >
            {t('Pro tip', 'טיפ מקצועי')}
          </div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t(
              'Collect at least 200 samples per condition before reporting percentiles — smaller samples produce unreliable p99 values.',
              'אסוף לפחות 200 דגימות לכל תנאי לפני דיווח אחוזונים — דגימות קטנות יותר מייצרות ערכי p99 לא אמינים.',
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
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 8 of 40', 'שקופית 8 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
