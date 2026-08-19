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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '2.5vh',
  color: '#1E3A5F',
};

export default function DegradationUnderLoad() {
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
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: isHe ? 'right' : 'left' }}>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Reading the Degradation Curve', 'קריאת עקומת הדגרדציה')}
        </h1>
      </div>

      {/* Three-phase diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '2px solid #0D9488',
            padding: '3vh 2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 0.5vw 1.5vw rgba(13,148,136,0.1)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Phase 1 — Stable', 'שלב 1 — יציב')}
            </div>
            <h2
              style={{
                fontSize: '1.6vw',
                fontWeight: 700,
                color: '#1E3A5F',
                margin: '0 0 1.5vh 0',
              }}
            >
              {t('Linear scaling region', 'אזור סקלינג ליניארי')}
            </h2>
            <p style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              {t(
                'Adding concurrency raises throughput proportionally. Latency stays flat or grows slowly.',
                'הוספת מקביליות מגדילה את הרוחב פס באופן פרופורציונלי. זמן האחזור נשאר שטוח או גדל לאט.',
              )}
            </p>
          </div>
          <div
            style={{
              marginTop: '2vh',
              padding: '1.5vh 1.5vw',
              background: '#F0FDF9',
              borderRadius: '0.6vw',
              border: '1px solid #CCFBF1',
            }}
          >
            <div style={{ fontSize: '0.95vw', color: '#0F766E', fontWeight: 600 }}>
              {t('Safe operating range', 'טווח הפעלה בטוח')}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '2px solid #D97706',
            padding: '3vh 2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 0.5vw 1.5vw rgba(217,119,6,0.1)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 700,
                color: '#D97706',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Phase 2 — Knee', 'שלב 2 — נקודת מפנה')}
            </div>
            <h2
              style={{
                fontSize: '1.6vw',
                fontWeight: 700,
                color: '#1E3A5F',
                margin: '0 0 1.5vh 0',
              }}
            >
              {t('Inflection point', 'נקודת כפיפה')}
            </h2>
            <p style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              {t(
                'Throughput gains slow. Latency starts rising non-linearly. Queues begin forming inside the provider.',
                'רווחי הרוחב פס מאטים. זמן האחזור מתחיל לעלות בצורה לא ליניארית. תורים מתחילים להיווצר בתוך הספק.',
              )}
            </p>
          </div>
          <div
            style={{
              marginTop: '2vh',
              padding: '1.5vh 1.5vw',
              background: '#FFFBEB',
              borderRadius: '0.6vw',
              border: '1px solid #FDE68A',
            }}
          >
            <div style={{ fontSize: '0.95vw', color: '#B45309', fontWeight: 600 }}>
              {t('This is your capacity ceiling', 'זוהי תקרת הקיבולת שלך')}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '2px solid #DC2626',
            padding: '3vh 2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 0.5vw 1.5vw rgba(220,38,38,0.1)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Phase 3 — Collapse', 'שלב 3 — קריסה')}
            </div>
            <h2
              style={{
                fontSize: '1.6vw',
                fontWeight: 700,
                color: '#1E3A5F',
                margin: '0 0 1.5vh 0',
              }}
            >
              {t('Saturated and failing', 'רווי ונכשל')}
            </h2>
            <p style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              {t(
                '429s arrive. Timeouts begin. Adding concurrency now hurts — backoff retries amplify load.',
                '429s מגיעות. פסקי זמן מתחילים. הוספת מקביליות עכשיו פוגעת — ניסיונות backoff מגבירים עומס.',
              )}
            </p>
          </div>
          <div
            style={{
              marginTop: '2vh',
              padding: '1.5vh 1.5vw',
              background: '#FEF2F2',
              borderRadius: '0.6vw',
              border: '1px solid #FECACA',
            }}
          >
            <div style={{ fontSize: '0.95vw', color: '#991B1B', fontWeight: 600 }}>
              {t('Alert threshold breached', 'סף התראה הופר')}
            </div>
          </div>
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
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 16 of 40', 'שקופית 16 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
