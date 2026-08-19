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

export default function Section1Recap() {
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
            {t('Section 1 Recap', 'סיכום חלק 1')}
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
            {t('Running AI Tests in CI', 'הרצת בדיקות AI ב-CI')}
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
              {t('Technique 1', 'טכניקה 1')}
            </div>
            <div style={{ fontSize: '2.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Sharding', 'Sharding')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Split tests across parallel runners; cap concurrency to avoid rate limits.',
                'פצל בדיקות על פני runners מקבילים; הגבל מקביליות להימנע מהגבלות קצב.',
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
              {t('Technique 2', 'טכניקה 2')}
            </div>
            <div style={{ fontSize: '2.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Caching', 'Caching')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Replay cached responses for unchanged prompts; only re-record on fixture changes.',
                'השמע תגובות שמורות עבור prompts ללא שינוי; הקלט מחדש רק בשינוי קובעים.',
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
              {t('Technique 3', 'טכניקה 3')}
            </div>
            <div style={{ fontSize: '2.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Secret Hygiene', 'תברואת סודות')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Encrypted repo secrets scoped per step; never hardcoded or echoed into logs.',
                'סודות repository מוצפנים עם scope לכל צעד; לעולם לא מקודדים קשיח או מוצגים ב-logs.',
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#475569', lineHeight: 1.6, maxWidth: '55vw' }}>
            {t(
              'Together, these three techniques make an AI test suite affordable and fast enough to run on every pull request without surprising the team.',
              'יחד, שלוש הטכניקות הללו הופכות חבילת בדיקות AI לכלכלית ומהירה מספיק להרצה בכל pull request מבלי להפתיע את הצוות.',
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
          <span>{t('Slide 11 of 30', 'שקופית 11 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
