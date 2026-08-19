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

export default function SectionDivider1() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em', color: '#FAFBFC' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '2vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.1em' }}>
          {t('Section 1 of 5', 'חלק 1 מתוך 5')}
        </div>
        <h1 style={{ fontSize: '5vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFBFC' }}>
          {t('Strategy Layers', 'שכבות האסטרטגיה')}
        </h1>
        <p style={{ fontSize: '1.5vw', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '55vw' }}>
          {t(
            'From unit tests to production monitoring — the adapted AI test pyramid and how to assign each AI feature to the right layer.',
            'מבדיקות יחידה ועד ניטור ייצור — פירמידת בדיקות ה-AI המותאמת וכיצד להקצות כל תכונת AI לשכבה הנכונה.',
          )}
        </p>
        <div style={{ width: '6vw', height: '0.4vw', backgroundColor: '#0D9488', borderRadius: '1vw', marginTop: '3vh' }} />
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '2vh', fontSize: '0.9vw', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 6 of 40', 'שקופית 6 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
