import { t, dir, isHe } from '@/lib/i18n';

const wrap: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#1E3A5F',
  fontFamily: "'Inter', sans-serif",
  padding: '4vh 4vw',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 4vw',
  color: '#FAFBFC',
};

export default function SectionDivider2() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
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
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: '#FAFBFC',
            }}
          >
            AI Testing Academy
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2vw',
            fontSize: '1vw',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Body */}
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
            marginBottom: '2vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {t('Section 3 of 5', 'חלק 3 מתוך 5')}
        </div>
        <h1
          style={{
            fontSize: '5vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#FAFBFC',
          }}
        >
          {t('Data Leakage & Privacy', 'דליפת נתונים ופרטיות')}
        </h1>
        <p
          style={{
            fontSize: '1.5vw',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
            maxWidth: '55vw',
          }}
        >
          {t(
            'PII leakage in model outputs, training data extraction, over-permissioned tools, and output filtering strategies.',
            'דליפת PII בפלטי מודל, חילוץ נתוני אימון, כלים בעלי הרשאת יתר ואסטרטגיות סינון פלט.',
          )}
        </p>
        <div
          style={{
            width: '6vw',
            height: '0.4vw',
            backgroundColor: '#0D9488',
            borderRadius: '1vw',
            marginTop: '3vh',
          }}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '2vh',
          fontSize: '0.9vw',
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 500,
        }}
      >
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 13 of 40', 'שקופית 13 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
