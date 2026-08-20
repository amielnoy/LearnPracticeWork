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

export default function ToolkitOverview() {
  const tools = [
    {
      name: t('GitHub Actions Matrix / Sharding', 'GitHub Actions matrix / sharding'),
      desc: t(
        'Distribute test files across parallel runners to cut wall-clock time without hitting rate limits.',
        'פיזור קבצי בדיקה על פני runners מקבילים לקיצור זמן ריצה מבלי לפגוע בהגבלות קצב.',
      ),
      bg: 'rgba(13,148,136,0.07)',
      border: 'rgba(13,148,136,0.2)',
      accent: '#0D9488',
    },
    {
      name: t('Encrypted Repo Secrets', 'סודות repository מוצפנים'),
      desc: t(
        'Store provider API keys as encrypted GitHub secrets scoped to the workflow that needs them.',
        'אחסון מפתחות API של ספקים כסודות GitHub מוצפנים עם scope לצינור שצריך אותם.',
      ),
      bg: 'rgba(30,58,95,0.05)',
      border: 'rgba(30,58,95,0.15)',
      accent: '#1E3A5F',
    },
    {
      name: t('Response Caching Between Runs', 'מטמון תגובות בין ריצות'),
      desc: t(
        'Replay cached responses for prompts that have not changed, reserving live calls for new or modified fixtures.',
        'השמעה חוזרת של תגובות שמורות עבור prompts שלא השתנו, ושמירת קריאות חיות לקבועים חדשים או שונים.',
      ),
      bg: 'rgba(13,148,136,0.07)',
      border: 'rgba(13,148,136,0.2)',
      accent: '#0D9488',
    },
    {
      name: t('Retry-with-Logging Wrapper', 'עטיפת ניסיון חוזר עם רישום'),
      desc: t(
        'A bounded retry loop that logs every attempt outcome so a flaky test cannot silently pass on retry.',
        'לולאת ניסיונות חוזרים עם גבול שרושמת כל תוצאת ניסיון כדי שבדיקה לא יציבה לא תעבור בשקט בניסיון חוזר.',
      ),
      bg: 'rgba(30,58,95,0.05)',
      border: 'rgba(30,58,95,0.15)',
      accent: '#1E3A5F',
    },
    {
      name: t('LLM-as-Judge Harness', 'רתמת LLM כשופט'),
      desc: t(
        'A second model scores each response against a rubric; a threshold gates the merge decision.',
        'מודל שני מדרג כל תגובה מול רובריקה; סף קובע את החלטת המיזוג.',
      ),
      bg: 'rgba(13,148,136,0.07)',
      border: 'rgba(13,148,136,0.2)',
      accent: '#0D9488',
    },
    {
      name: t('Cost / Latency Dashboard', 'לוח בקרה עלות / זמן אחזור'),
      desc: t(
        'Track token spend and stage duration per run so regressions are visible before they become a budget problem.',
        'מעקב אחר צריכת token ומשך שלב לכל ריצה כדי שרגרסיות יהיו גלויות לפני שהן הופכות לבעיית תקציב.',
      ),
      bg: 'rgba(30,58,95,0.05)',
      border: 'rgba(30,58,95,0.15)',
      accent: '#1E3A5F',
    },
  ];

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
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
            {t('The Full Toolkit', 'ערכת הכלים המלאה')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Six Tools for AI Tests in CI', 'שישה כלים לבדיקות AI ב-CI')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5vw' }}>
          <div
            style={{
              background: tools[0].bg,
              border: `1.5px solid ${tools[0].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 700,
                color: tools[0].accent,
                marginBottom: '0.8vh',
              }}
            >
              {tools[0].name}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
              {tools[0].desc}
            </div>
          </div>
          <div
            style={{
              background: tools[1].bg,
              border: `1.5px solid ${tools[1].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 700,
                color: tools[1].accent,
                marginBottom: '0.8vh',
              }}
            >
              {tools[1].name}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
              {tools[1].desc}
            </div>
          </div>
          <div
            style={{
              background: tools[2].bg,
              border: `1.5px solid ${tools[2].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 700,
                color: tools[2].accent,
                marginBottom: '0.8vh',
              }}
            >
              {tools[2].name}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
              {tools[2].desc}
            </div>
          </div>
          <div
            style={{
              background: tools[3].bg,
              border: `1.5px solid ${tools[3].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 700,
                color: tools[3].accent,
                marginBottom: '0.8vh',
              }}
            >
              {tools[3].name}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
              {tools[3].desc}
            </div>
          </div>
          <div
            style={{
              background: tools[4].bg,
              border: `1.5px solid ${tools[4].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 700,
                color: tools[4].accent,
                marginBottom: '0.8vh',
              }}
            >
              {tools[4].name}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
              {tools[4].desc}
            </div>
          </div>
          <div
            style={{
              background: tools[5].bg,
              border: `1.5px solid ${tools[5].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 700,
                color: tools[5].accent,
                marginBottom: '0.8vh',
              }}
            >
              {tools[5].name}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
              {tools[5].desc}
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 4 of 30', 'שקופית 4 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
