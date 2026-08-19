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

export default function CIPipelineForPlaywrightAiTests() {
  const pipelineSteps = [
    {
      step: t('Fast Mocked Suite', 'סוויטה מדומה מהירה'),
      trigger: t('Every PR & commit', 'כל PR ו-commit'),
      detail: t('All AI calls mocked. Sharded across workers for speed. Fails fast on regressions.', 'כל קריאות AI מדומות. מחולק בין workers למהירות. נכשל מהר על רגרסיות.'),
      color: '#0D9488',
    },
    {
      step: t('Real-Model Smoke Suite', 'סוויטת עשן עם מודל אמיתי'),
      trigger: t('Scheduled — once daily', 'מתוזמן — פעם ביום'),
      detail: t('Small set of critical paths against the live model API. Catches integration drift and model behaviour changes.', 'סט קטן של נתיבים קריטיים מול ה-API של המודל החי. מזהה סטיות אינטגרציה ושינויים בהתנהגות המודל.'),
      color: 'rgba(13,148,136,0.55)',
    },
    {
      step: t('Failure Triage', 'תיאום כשלים'),
      trigger: t('On flake or red build', 'על תנודתיות או build אדום'),
      detail: t('Open trace viewer for the failed test. Check video recording. Inspect network log for unexpected AI responses.', 'פתחו את trace viewer עבור הבדיקה הנכשלת. בדקו הקלטת וידאו. בדקו יומן רשת לתגובות AI בלתי צפויות.'),
      color: 'rgba(13,148,136,0.25)',
    },
  ];

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
          <div>{t('TESTING TOOLS', 'כלי בדיקה')}</div>
          <div>{t('LECTURE 04', 'הרצאה 04')}</div>
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
          {t('CI Architecture', 'ארכיטקטורת CI')}
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
          {t('A CI Pipeline for AI E2E Tests', 'צינור CI לבדיקות E2E של AI')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'A two-track strategy separates fast mocked tests (run on every commit) from slower real-model smoke tests (run on a schedule), giving you both speed and coverage.',
            'אסטרטגיית שני מסלולים מפרידה בין בדיקות מדומות מהירות (רצות על כל commit) לבין בדיקות עשן איטיות יותר עם מודל אמיתי (רצות לפי תזמון), ומעניקה לכם גם מהירות וגם כיסוי.',
          )}
        </p>

        {/* Pipeline steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          {pipelineSteps.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1.5vw',
                alignItems: 'flex-start',
                background: '#FFFFFF',
                padding: '1.5vh 1.5vw',
                borderRadius: '0.8vw',
                border: '1px solid #E2E8F0',
                boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.04)',
              }}
            >
              <div
                style={{
                  width: '0.6vw',
                  minWidth: '0.6vw',
                  alignSelf: 'stretch',
                  backgroundColor: s.color,
                  borderRadius: '0.3vw',
                }}
              />
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.3vh' }}>
                  {s.step}
                </div>
                <div style={{ fontSize: '0.85vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.5vh' }}>
                  {s.trigger}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
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
              fontSize: '1.5vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Pipeline Configuration Principles', 'עקרונות תצורת הצינור')}
          </div>
          {[
            {
              label: t('Sharding', 'שיתוף מקביל'),
              desc: t('Split the mocked suite across multiple CI machines to keep PR feedback under 2 minutes.', 'פצלו את הסוויטה המדומה על פני מספר מכונות CI כדי לשמור משוב PR מתחת ל-2 דקות.'),
            },
            {
              label: t('Retry Policy', 'מדיניות ניסיון חוזר'),
              desc: t('Allow up to 2 retries in CI for mocked tests (transient infra issues). Zero retries for real-model tests — a retry masks a real flake.', 'אפשרו עד 2 ניסיונות חוזרים ב-CI לבדיקות מדומות (בעיות תשתית חולפות). אפס ניסיונות חוזרים לבדיקות מודל אמיתי — ניסיון חוזר מסתיר תנודתיות אמיתית.'),
            },
            {
              label: t('Artefact Retention', 'שמירת Artefacts'),
              desc: t('Always upload Playwright trace files and video recordings on failure so debugging is possible without re-running locally.', 'תמיד העלו קבצי trace של Playwright והקלטות וידאו בכשל כדי שניפוי באגים יהיה אפשרי מבלי להריץ מחדש מקומית.'),
            },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.4vh' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
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
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 23 of 30', 'שקופית 23 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
