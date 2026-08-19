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
  color: '#FFFFFF',
};

export default function SectionDividerSchema() {
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
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isHe ? 'flex-end' : 'flex-start',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '1.5vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {t('Section 1', 'חלק 1')}
        </div>
        <h1
          style={{
            fontSize: '5vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '65vw',
          }}
        >
          {t('Schema & Contract Testing for AI Responses', 'בדיקות סכמה וחוזה עבור תגובות AI')}
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
            'Define the contract once, validate on every response — catch structural drift before it reaches your frontend or downstream consumers.',
            'הגדירו את החוזה פעם אחת, אמתו בכל תגובה — תפסו סחיפה מבנית לפני שהיא מגיעה לצד הלקוח או לצרכנים במורד הזרם.',
          )}
        </p>
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
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 500,
        }}
      >
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 6 of 30', 'שקופית 6 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
