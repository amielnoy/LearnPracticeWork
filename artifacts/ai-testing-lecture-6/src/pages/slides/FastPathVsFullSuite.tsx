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

export default function FastPathVsFullSuite() {
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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}
        >
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
        </div>
      </div>

      {/* Left column — Fast path */}
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
          {t('Fast Path vs. Full Suite', 'נתיב מהיר לעומת חבילה מלאה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'Run a small, cheap subset of AI tests on every PR for quick feedback. Reserve the full suite for a nightly scheduled run.',
            'הרץ קבוצת משנה קטנה וזולה של בדיקות AI בכל PR לקבלת משוב מהיר. שמור את החבילה המלאה לריצה לילית מתוזמנת.',
          )}
        </p>
        <div
          style={{
            background: 'rgba(13,148,136,0.07)',
            border: '1.5px solid rgba(13,148,136,0.2)',
            borderRadius: '1vw',
            padding: '2.5vh 2vw',
          }}
        >
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
            {t('PR Fast Path', 'נתיב מהיר לPR')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t('Tests tagged @smoke or @fast', 'בדיקות מסומנות @smoke או @fast')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t('Maximum 5-10 minutes wall time', 'זמן ריצה מרבי 5-10 דקות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t('Cached responses; minimal live calls', 'תגובות שמורות; מינימום קריאות חיות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t('Budget cap enforced: $0.50 per run', 'מגבלת תקציב: $0.50 לכל ריצה')}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — Full suite */}
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
            {t('Nightly Full Suite', 'חבילה מלאה לילית')}
          </div>
          <div
            style={{
              background: 'rgba(30,58,95,0.06)',
              border: '1.5px solid rgba(30,58,95,0.15)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>
              {t('Nightly Full Suite', 'חבילה מלאה לילית')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              <div style={{ fontSize: '1vw', color: '#475569' }}>
                {t('All tests including @extended and @regression', 'כל הבדיקות כולל @extended ו-@regression')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>
                {t('Uncapped runtime; fresh live calls on new fixtures', 'זמן ריצה ללא גבול; קריאות חיות חדשות על קובעים חדשים')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>
                {t('Results published to team dashboard', 'תוצאות מפורסמות ללוח המחוונים של הצוות')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>
                {t('Failures alert on-call; do not block developer flow', 'כשלים מתריעים לכוננות; לא חוסמים זרימת מפתחים')}
              </div>
            </div>
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
              'Two triggers, one test collection: @smoke filter for PRs, no filter for nightly.',
              'שני טריגרים, אוסף בדיקות אחד: מסנן @smoke ל-PRs, ללא מסנן ללילי.',
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
          <span>{t('Slide 21 of 30', 'שקופית 21 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
