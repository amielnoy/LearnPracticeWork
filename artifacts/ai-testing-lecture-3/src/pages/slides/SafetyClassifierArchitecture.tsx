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

export default function SafetyClassifierArchitecture() {
  const steps = [
    {
      label: t('User Prompt', 'הנחיית המשתמש'),
      sub: t('Input to the model', 'קלט למודל'),
      bg: '#E2E8F0',
      color: '#64748B',
      icon: '👤',
    },
    {
      label: t('LLM', 'LLM'),
      sub: t('Generates a response', 'מייצר תגובה'),
      bg: 'rgba(30,58,95,0.1)',
      color: '#1E3A5F',
      icon: '🤖',
    },
    {
      label: t('Safety Classifier', 'מסווג בטיחות'),
      sub: t('Toxicity + policy check', 'בדיקת רעילות + מדיניות'),
      bg: 'rgba(13,148,136,0.12)',
      color: '#0D9488',
      icon: '🛡',
    },
    {
      label: t('Gate', 'שער'),
      sub: t('Pass or block', 'עבור או חסום'),
      bg: 'rgba(245,158,11,0.1)',
      color: '#D97706',
      icon: '⬡',
    },
    {
      label: t('User / CI', 'משתמש / CI'),
      sub: t('Safe response delivered', 'תגובה בטוחה נמסרת'),
      bg: 'rgba(13,148,136,0.08)',
      color: '#0D9488',
      icon: '✔',
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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh' }}
      >
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
            {t('Safety Screening', 'סריקת בטיחות')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: '0 0 1vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Where Safety Screening Lives in the Pipeline', 'היכן סריקת הבטיחות נמצאת בצינור')}
          </h1>
          <p style={{ fontSize: '1.2vw', color: '#475569', margin: 0, lineHeight: 1.5 }}>
            {t(
              "A safety classifier acts as a gate between the LLM's raw output and the consumer — whether that consumer is a user or a CI test runner.",
              'מסווג בטיחות פועל כשער בין פלט ה-LLM הגולמי לצרכן — בין אם הצרכן הוא משתמש או מריץ בדיקות CI.',
            )}
          </p>
        </div>

        {/* Pipeline diagram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            flexWrap: 'nowrap',
            overflowX: 'hidden',
          }}
        >
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  background: step.bg,
                  border: `2px solid ${step.color}40`,
                  borderRadius: '1vw',
                  padding: '2.5vh 2vw',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.8vh',
                  minWidth: '12vw',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2vw' }}>{step.icon}</div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: step.color }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '0.85vw', color: '#64748B', lineHeight: 1.3 }}>
                  {step.sub}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{ fontSize: '1.5vw', color: '#94A3B8', padding: '0 0.5vw', flexShrink: 0 }}
                >
                  {isHe ? '←' : '→'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Branch: blocked path */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(220,38,38,0.05)',
              border: '1.5px dashed rgba(220,38,38,0.4)',
              borderRadius: '1vw',
              padding: '2vh 3vw',
              display: 'flex',
              alignItems: 'center',
              gap: '2vw',
              maxWidth: '80vw',
            }}
          >
            <div style={{ fontSize: '1.8vw' }}>🚫</div>
            <div style={{ textAlign: isHe ? 'right' : 'left' }}>
              <div
                style={{
                  fontSize: '1.05vw',
                  fontWeight: 700,
                  color: '#DC2626',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Blocked: Toxic / Policy Violation', 'חסום: רעילות / הפרת מדיניות')}
              </div>
              <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'The output is quarantined, logged, and replaced with a safe fallback response. CI test marked FAIL.',
                  'הפלט מוסגר, מתועד ומוחלף בתגובת חלופה בטוחה. בדיקת CI מסומנת כנכשלת.',
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two-column notes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 700,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              {t('Production Use', 'שימוש בייצור')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Gates the response before it reaches the end user. Every output is screened in real time.',
                'חוסם את התגובה לפני שהיא מגיעה למשתמש הקצה. כל פלט נסרק בזמן אמת.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 700,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              {t('CI Use', 'שימוש ב-CI')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Run against a safety test suite during every pull request. A failing safety test blocks the merge.',
                'מריץ מול חבילת בדיקות בטיחות בכל בקשת משיכה. בדיקת בטיחות שנכשלת חוסמת את המיזוג.',
              )}
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 16 of 30', 'שקופית 16 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
