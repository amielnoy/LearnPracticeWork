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

export default function AnatomyDiagram() {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.6vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Pipeline Anatomy', 'אנטומיית הצינור')}
          </div>
          <h1
            style={{
              fontSize: '2.8vw',
              fontWeight: 800,
              margin: '0 0 1vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('From PR Open to Merge Allowed', 'מפתיחת PR ועד אישור מיזוג')}
          </h1>
        </div>

        {/* Pipeline flow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '0',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '1vw',
            overflow: 'hidden',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '2.5vh 1.8vw',
              borderRight: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1vh',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '4vw',
                height: '4vw',
                backgroundColor: 'rgba(13,148,136,0.12)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4vw',
                fontWeight: 800,
                color: '#0D9488',
              }}
            >
              1
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('PR Opened', 'PR נפתח')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Developer pushes code; CI triggers.', 'מפתח דוחף קוד; CI מופעל.')}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: '2.5vh 1.8vw',
              borderRight: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1vh',
              textAlign: 'center',
              background: 'rgba(13,148,136,0.04)',
            }}
          >
            <div
              style={{
                width: '4vw',
                height: '4vw',
                backgroundColor: 'rgba(13,148,136,0.18)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4vw',
                fontWeight: 800,
                color: '#0D9488',
              }}
            >
              2
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('AI Test Stage', 'שלב בדיקות AI')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Sharded, cached, budgeted.', 'מפוצל, מאוחסן, מתוקצב.')}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5vh',
                width: '100%',
                marginTop: '0.5vh',
              }}
            >
              <div
                style={{
                  background: 'rgba(13,148,136,0.1)',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 0.8vw',
                  fontSize: '0.85vw',
                  color: '#0D9488',
                  fontWeight: 600,
                }}
              >
                {t('Cost control attaches here', 'בקרת עלות מחוברת כאן')}
              </div>
              <div
                style={{
                  background: 'rgba(217,119,6,0.1)',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 0.8vw',
                  fontSize: '0.85vw',
                  color: '#D97706',
                  fontWeight: 600,
                }}
              >
                {t('Flakiness control attaches here', 'בקרת חוסר יציבות מחוברת כאן')}
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: '2.5vh 1.8vw',
              borderRight: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1vh',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '4vw',
                height: '4vw',
                backgroundColor: 'rgba(30,58,95,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4vw',
                fontWeight: 800,
                color: '#1E3A5F',
              }}
            >
              3
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Judge Gate', 'שער השופט')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('LLM scores response against rubric; threshold checked.', 'LLM מדרג תגובה מול רובריקה; סף נבדק.')}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: '2.5vh 1.8vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1vh',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '4vw',
                height: '4vw',
                backgroundColor: 'rgba(13,148,136,0.18)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4vw',
                fontWeight: 800,
                color: '#0D9488',
              }}
            >
              4
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Merge Allowed / Blocked', 'מיזוג מאושר / חסום')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Score above threshold: merge. Below: block with reasoning.', 'ציון מעל הסף: מיזוג. מתחת: חסום עם נימוק.')}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '0.8vw',
            padding: '1.5vh 2vw',
            fontSize: '1vw',
            color: '#475569',
            fontWeight: 500,
            textAlign: isHe ? 'right' : 'left',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          {t(
            'The full nightly suite reruns after merge to catch regressions against the full fixture set.',
            'חבילת הלילה המלאה מופעלת שוב לאחר מיזוג כדי לתפוס רגרסיות מול מערכת הקבועים המלאה.',
          )}
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
          <span>{t('Slide 5 of 30', 'שקופית 5 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
