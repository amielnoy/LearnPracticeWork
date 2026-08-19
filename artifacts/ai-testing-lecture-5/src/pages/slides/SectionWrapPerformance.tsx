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
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function SectionWrapPerformance() {
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', justifyContent: 'center' }}>
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
            {t('Section 3 Recap', 'סיכום חלק 3')}
          </div>
          <h1
            style={{
              fontSize: '3.6vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Performance, Cost & Reliability', 'ביצועים, עלות ואמינות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
              {t('Latency Budget', 'תקציב זמן תגובה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Measure p95. Set an explicit per-endpoint budget. Fail the test when it is exceeded — not just alert.',
                'מדדו p95. הגדירו תקציב מפורש לכל נקודת קצה. כשלו את הבדיקה כשהוא חורג — לא רק התריעו.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
              {t('Retry Behavior', 'התנהגות ניסיון חוזר')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Test the 429 path explicitly. Exponential back-off and a retry cap are both required — not optional.',
                'בדקו את נתיב ה-429 במפורש. נסיגה מעריכית ומגבלת ניסיונות חוזרים נדרשות שניהן — לא אופציונליות.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
              {t('Graceful Degradation', 'הפחתה חינה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Test the provider-down path. A structured fallback beats a bare 500 for the user and for your on-call engineer.',
                'בדקו את הנתיב כשהספק מושבת. נסיגה מובנית עדיפה על 500 גולמי עבור המשתמש ועבור מהנדס התורנות.',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(13, 148, 136, 0.06)',
            border: '1px solid rgba(13, 148, 136, 0.2)',
            borderRadius: '1vw',
            padding: '2.5vh 3vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.6, fontWeight: 500 }}>
            {t(
              'Performance and reliability tests protect the product experience and the budget, not just correctness. They are not optional extras — they are first-class citizens in the test suite.',
              'בדיקות ביצועים ואמינות מגנות על חוויית המוצר ועל התקציב, לא רק על הנכונות. הן אינן תוספות אופציונליות — הן אזרחות מהשורה הראשונה בחבילת הבדיקות.',
            )}
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 23 of 30', 'שקופית 23 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
