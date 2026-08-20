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

export default function CaseStudyMigration() {
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
          {t('Case Study', 'מקרה בוחן')}
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
          {t('Jenkins to GitHub Actions', 'Jenkins ל-GitHub Actions')}
        </h1>
        <p style={{ fontSize: '1.1vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'A team migrates their AI test suite from a single Jenkins job to GitHub Actions. Three problems, three fixes.',
            'צוות מעביר את חבילת בדיקות ה-AI שלו ממשימת Jenkins בודדת ל-GitHub Actions. שלוש בעיות, שלוש תיקונות.',
          )}
        </p>
        <div
          style={{
            background: '#0F172A',
            borderRadius: '0.8vw',
            padding: '2vh 2vw',
          }}
        >
          <div
            style={{ fontSize: '0.85vw', color: '#64748B', marginBottom: '0.8vh', fontWeight: 600 }}
          >
            {t('BEFORE MIGRATION', 'לפני ההעברה')}
          </div>
          <div style={{ fontSize: '1vw', color: '#E2E8F0', lineHeight: 1.5 }}>
            {t(
              'Single Jenkins job. 40 minutes per PR. Leaked key. One flaky test blocked merges for a week.',
              'משימת Jenkins בודדת. 40 דקות ל-PR. מפתח דלף. בדיקה אחת לא יציבה חסמה מיזוגים במשך שבוע.',
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
            gap: '1.8vh',
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
            {t('Three Problems, Three Fixes', 'שלוש בעיות, שלוש תיקונות')}
          </div>
          <div
            style={{
              background: 'rgba(220,38,38,0.04)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderRadius: '0.8vw',
              padding: '1.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#DC2626', marginBottom: '0.3vh' }}
            >
              {t('Problem: 40-minute unsharded run', 'בעיה: ריצה לא מפוצלת של 40 דקות')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Fix: 4-shard matrix + response caching reduced PR wall time to 6 minutes.',
                'תיקון: מטריקס של 4 shards + מטמון תגובות הפחיתו זמן PR ל-6 דקות.',
              )}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(220,38,38,0.04)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderRadius: '0.8vw',
              padding: '1.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#DC2626', marginBottom: '0.3vh' }}
            >
              {t('Problem: API key leaked in a log line', 'בעיה: מפתח API דלף בשורת log')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Fix: Key moved to encrypted GitHub secret scoped to the test step; debug logging disabled on the API call.',
                'תיקון: מפתח הועבר לסוד GitHub מוצפן עם scope לצעד הבדיקה; לוגינג debug הושבת על קריאת ה-API.',
              )}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(220,38,38,0.04)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderRadius: '0.8vw',
              padding: '1.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#DC2626', marginBottom: '0.3vh' }}
            >
              {t(
                'Problem: flaky test blocked merges for a week',
                'בעיה: בדיקה לא יציבה חסמה מיזוגים למשך שבוע',
              )}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Fix: Retry wrapper with logging; test moved to quarantine list after 3 failures in 7 days.',
                'תיקון: עטיפת ניסיון חוזר עם רישום; בדיקה הועברה לרשימת בידוד לאחר 3 כשלים ב-7 ימים.',
              )}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(13,148,136,0.07)',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: '0.8vw',
              padding: '1.2vh 1.5vw',
              fontSize: '1vw',
              fontWeight: 600,
              color: '#0D9488',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t(
              'After migration: 6m PR builds, no leaks, no blocked merges.',
              'לאחר ההעברה: PR builds של 6 דקות, אין דליפות, אין מיזוגים חסומים.',
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
          <span>{t('Slide 25 of 30', 'שקופית 25 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
