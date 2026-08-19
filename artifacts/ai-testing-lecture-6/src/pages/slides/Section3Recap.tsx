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

export default function Section3Recap() {
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
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.8vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Section 3 Recap', 'סיכום חלק 3')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Cost, Speed & Merge Gates', 'עלות, מהירות ושערי מיזוג')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Principle 1', 'עיקרון 1')}
            </div>
            <div style={{ fontSize: '2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Budget Every Run', 'תקצב כל ריצה')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Track token spend per pipeline run and block or alert on budget violations.',
                'עקוב אחר צריכת tokens לכל ריצת צינור וחסום או הזהר על הפרות תקציב.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Principle 2', 'עיקרון 2')}
            </div>
            <div style={{ fontSize: '2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Split Fast from Full', 'הפרד מהיר ממלא')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                '@smoke subset on every PR; full suite nightly. Two triggers, one collection.',
                'קבוצת @smoke בכל PR; חבילה מלאה לילית. שני טריגרים, אוסף אחד.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Principle 3', 'עיקרון 3')}
            </div>
            <div style={{ fontSize: '2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Alert on Drift', 'הזהר על סטייה')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Rolling baseline comparison catches cost and latency regressions before they become a budget surprise.',
                'השוואת קו בסיס מתגלגל תופסת רגרסיות עלות וזמן אחזור לפני שהן הופכות להפתעת תקציב.',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '3vh 4vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#475569', lineHeight: 1.6, maxWidth: '55vw' }}>
            {t(
              'A merge gate that takes 40 minutes will be bypassed. A gate that catches nothing is useless. The balance is a fast subset with a judge that has a clear threshold.',
              'שער מיזוג שלוקח 40 דקות יעקף. שער שלא תופס כלום חסר תועלת. האיזון הוא קבוצת משנה מהירה עם שופט שיש לו סף ברור.',
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 23 of 30', 'שקופית 23 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
