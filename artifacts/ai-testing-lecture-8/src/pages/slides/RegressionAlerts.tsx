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

export default function RegressionAlerts() {
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
          {t('Catching Problems Early', 'תפיסת בעיות מוקדם')}
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
          {t('Regression Alerts', 'התראות רגרסיה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Performance regressions in AI features are often caused by model updates, prompt changes, or provider-side infrastructure events. Automated alerts catch them within one CI run.',
            'רגרסיות ביצועים בתכונות AI נגרמות לרוב מעדכוני מודל, שינויי פרומפט או אירועי תשתית בצד הספק. התראות אוטומטיות תופסות אותן בתוך ריצת CI אחת.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                {t('Latency regression threshold', 'סף רגרסיית זמן אחזור')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#DC2626' }}>p99 +20%</div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                {t('Cost regression threshold', 'סף רגרסיית עלות')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#D97706' }}>$/req +15%</div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                {t('Error rate regression', 'רגרסיית שיעור שגיאות')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#DC2626' }}>
                error +0.5%
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
              marginBottom: '2vh',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('Alert Routing', 'ניתוב התראות')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  borderRadius: '50%',
                  backgroundColor: '#DC2626',
                  flexShrink: 0,
                  marginTop: '0.3vh',
                }}
              />
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('CI gate fails (blocking)', 'שער CI נכשל (חוסם)')}
                </div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
                  {t(
                    'Latency or cost exceeds threshold vs. baseline. PR cannot merge.',
                    'זמן אחזור או עלות חורגים מסף לעומת בסיס. PR לא יכול להתמזג.',
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  borderRadius: '50%',
                  backgroundColor: '#D97706',
                  flexShrink: 0,
                  marginTop: '0.3vh',
                }}
              />
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t(
                    'Slack / PagerDuty alert (non-blocking)',
                    'התראת Slack / PagerDuty (לא חוסמת)',
                  )}
                </div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
                  {t(
                    'Production metric drift detected from monitoring. Nightly jobs only.',
                    'זוהה סחף מדדים בייצור מניטור. רק עבודות לילה.',
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  borderRadius: '50%',
                  backgroundColor: '#0D9488',
                  flexShrink: 0,
                  marginTop: '0.3vh',
                }}
              />
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('Dashboard annotation', 'הערה בדשבורד')}
                </div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
                  {t(
                    'Auto-mark inflection points in Supabase metrics to correlate with deploys.',
                    'סמן אוטומטית נקודות כפיפה במדדי Supabase כדי לקשר לפריסות.',
                  )}
                </div>
              </div>
            </div>
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
          <span>{t('Slide 28 of 40', 'שקופית 28 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
