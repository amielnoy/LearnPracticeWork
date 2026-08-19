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

export default function QuarantineVsDelete() {
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
          {t('Section 2', 'חלק 2')}
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
          {t('Quarantine vs. Delete', 'בידוד לעומת מחיקה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'A chronically flaky AI test should move out of the required merge gate into a tracked, reviewed quarantine list \u2014 not be deleted or left to silently fail.',
            'בדיקת AI שאינה יציבה באופן כרוני צריכה לעבור משער המיזוג הנדרש לרשימת בידוד מעוקבת וסקורה \u2014 לא להימחק או להישאר כושלת בשקט.',
          )}
        </p>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '1vw',
            padding: '2.5vh 2vw',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.8vh' }}
          >
            {t('The quarantine rule', 'כלל הבידוד')}
          </div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
            {t(
              'If a test fails more than once in a rolling 7-day window without a code change that explains the failure, move it to the quarantine list with a tracking issue linked.',
              'אם בדיקה נכשלת יותר מפעם אחת בחלון 7 ימים מתגלגל ללא שינוי קוד שמסביר את הכשל, העבר אותה לרשימת הבידוד עם קישור לבעיה עוקבת.',
            )}
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
            {t('Three Options Compared', 'שלוש אפשרויות בהשוואה')}
          </div>
          <div
            style={{
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.2)',
              borderRadius: '0.8vw',
              padding: '1.8vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '0.4vh',
              }}
            >
              {t('Delete', 'מחיקה')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Removes coverage permanently. If the flakiness was hiding a real intermittent bug, you will never catch it.',
                'מסיר כיסוי לצמיתות. אם חוסר היציבות הסתיר באג אמיתי לסירוגין, לעולם לא תתפוס אותו.',
              )}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.2)',
              borderRadius: '0.8vw',
              padding: '1.8vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '0.4vh',
              }}
            >
              {t('Ignore failures', 'התעלמות מכשלים')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Erodes trust in CI. The team learns to dismiss red builds and eventually ignores all failures.',
                'שוחק את האמון ב-CI. הצוות לומד להתעלם מ-builds אדומים ובסוף מתעלם מכל הכשלים.',
              )}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(13,148,136,0.07)',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: '0.8vw',
              padding: '1.8vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '0.4vh',
              }}
            >
              {t('Quarantine', 'בידוד')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Moves the test out of the blocking gate but keeps it running and tracked. A weekly review decides fix, keep, or delete.',
                'מעביר את הבדיקה מחוץ לשער החוסם אבל ממשיך להפעיל ולעקוב אחריה. סקירה שבועית מחליטה לתקן, לשמור או למחוק.',
              )}
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 15 of 30', 'שקופית 15 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
