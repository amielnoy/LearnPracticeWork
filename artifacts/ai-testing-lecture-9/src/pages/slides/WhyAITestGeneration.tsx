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

export default function WhyAITestGeneration() {
  return (
    <div style={wrap} dir={dir}>
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
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
          {t('The Problem', 'הבעיה')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Coverage Gaps and Developer Time', 'פערי כיסוי וזמן מפתחים')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ fontSize: '2.2vw', fontWeight: 800, color: '#DC2626', marginBottom: '0.5vh' }}>68%</div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.4 }}>
              {t('of reported bugs occur in code paths with no existing test coverage', 'מהבאגים המדווחים מתרחשים בנתיבי קוד ללא כיסוי בדיקות')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ fontSize: '2.2vw', fontWeight: 800, color: '#D97706', marginBottom: '0.5vh' }}>4h</div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.4 }}>
              {t('average time a developer spends writing tests per feature', 'זמן ממוצע שמפתח מבלה בכתיבת בדיקות לכל תכונה')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            height: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5vh',
          }}
        >
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('Where AI Helps vs. Hurts', 'איפה AI עוזר לעומת מזיק')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ textAlign: isHe ? 'right' : 'left' }}>
              <div style={{ fontSize: '1vw', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1vh' }}>
                {t('AI excels at', 'AI מצטיין ב')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.4 }}>{t('Generating boilerplate unit tests quickly', 'יצירה מהירה של בדיקות יחידה בסיסיות')}</div>
                <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.4 }}>{t('Discovering edge cases from type signatures', 'גילוי מקרי קצה מחתימות סוגים')}</div>
                <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.4 }}>{t('Parsing specs and producing test skeletons', 'פענוח מפרטים וייצור שלדי בדיקות')}</div>
              </div>
            </div>
            <div style={{ height: '1px', background: '#E2E8F0' }} />
            <div style={{ textAlign: isHe ? 'right' : 'left' }}>
              <div style={{ fontSize: '1vw', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1vh' }}>
                {t('AI struggles with', 'AI מתקשה ב')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.4 }}>{t('Domain-specific business logic assertions', 'אסרציות לוגיקה עסקית ספציפית לדומיין')}</div>
                <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.4 }}>{t('Integration tests requiring deep context', 'בדיקות אינטגרציה הדורשות הקשר עמוק')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 3 of 40', 'שקופית 3 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
