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
  gap: '4vh 4vw',
  color: '#1E3A5F',
};
const panel: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  padding: '4vh 3vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4vh',
};
const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1vw',
  fontSize: '1.2vw',
  color: '#334155',
};
const dot: React.CSSProperties = {
  width: '0.7vw',
  height: '0.7vw',
  borderRadius: '50%',
  backgroundColor: '#0D9488',
  flexShrink: 0,
};

export default function TraditionalVsAiTesting() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('FOUNDATIONS', 'יסודות')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
        </div>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '3vh', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center' }}>
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
            {t('A Different Kind of Testing', 'סוג שונה של בדיקות')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Traditional Testing vs. AI Testing', 'בדיקות מסורתיות מול בדיקות AI')}
          </h1>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3vw',
          }}
        >
          <div style={panel}>
            <div
              style={{
                fontSize: '1.4vw',
                fontWeight: 700,
                color: '#1E3A5F',
                borderBottom: '1px solid #E2E8F0',
                paddingBottom: '1.6vh',
              }}
            >
              {t('Traditional Software Testing', 'בדיקות תוכנה מסורתיות')}
            </div>
            <div style={row}>
              <span style={dot} />
              {t(
                'Deterministic inputs map to fixed outputs',
                'קלטים דטרמיניסטיים ממופים לפלטים קבועים',
              )}
            </div>
            <div style={row}>
              <span style={dot} />
              {t(
                'Pass/fail assertions decide the result',
                'assertions של עובר/נכשל קובעים את התוצאה',
              )}
            </div>
            <div style={row}>
              <span style={dot} />
              {t('Coverage is measured in lines of code', 'כיסוי נמדד בשורות קוד')}
            </div>
          </div>
          <div style={panel}>
            <div
              style={{
                fontSize: '1.4vw',
                fontWeight: 700,
                color: '#1E3A5F',
                borderBottom: '1px solid #E2E8F0',
                paddingBottom: '1.6vh',
              }}
            >
              {t('AI System Testing', 'בדיקות מערכות AI')}
            </div>
            <div style={row}>
              <span style={dot} />
              {t('Probabilistic outputs vary between runs', 'פלטים הסתברותיים משתנים בין הרצות')}
            </div>
            <div style={row}>
              <span style={dot} />
              {t('Responses are graded, scored, or judged', 'תגובות מדורגות, מנוקדות או נשפטות')}
            </div>
            <div style={row}>
              <span style={dot} />
              {t(
                'Coverage is measured in behaviors and scenarios',
                'כיסוי נמדד בהתנהגויות ותרחישים',
              )}
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '3.6vw',
              height: '3.6vw',
              borderRadius: '50%',
              backgroundColor: '#1E3A5F',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1vw',
              fontWeight: 700,
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.2)',
            }}
          >
            VS
          </div>
        </div>
      </div>

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
        <div>{t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 5 of 22', 'שקופית 5 מתוך 22')}</span>
        </div>
      </div>
    </div>
  );
}
