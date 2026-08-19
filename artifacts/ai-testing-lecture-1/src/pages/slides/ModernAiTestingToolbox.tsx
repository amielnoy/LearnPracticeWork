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
const col: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '3vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6vh',
};
const num: React.CSSProperties = {
  fontSize: '1.2vw',
  fontWeight: 700,
  color: '#0D9488',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  width: '3vw',
  height: '3vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
};

export default function ModernAiTestingToolbox() {
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
          <div>{t('PRACTICAL TOOLKIT', 'ערכת כלים מעשית')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
        </div>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '4vh', justifyContent: 'center' }}
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
            {t('Practical Toolkit', 'ערכת כלים מעשית')}
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
            {t('The Modern AI Testing Toolbox', 'ארגז הכלים המודרני לבדיקות AI')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div style={col}>
            <div style={num}>1</div>
            <div
              style={{
                fontSize: '1.3vw',
                fontWeight: 700,
                color: '#1E3A5F',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              {t('Evaluation Frameworks', 'מסגרות הערכה')}
            </div>
            <div
              style={{
                fontSize: '1.05vw',
                color: '#64748B',
                lineHeight: 1.5,
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              {t(
                'Run golden datasets and LLM-as-judge scoring at scale, on a schedule.',
                'הרצת datasets זהב וניקוד LLM-as-judge בקנה מידה, לפי לוח זמנים.',
              )}
            </div>
          </div>
          <div style={col}>
            <div style={num}>2</div>
            <div
              style={{
                fontSize: '1.3vw',
                fontWeight: 700,
                color: '#1E3A5F',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              {t('Observability Platforms', 'פלטפורמות ניטור ואבחון')}
            </div>
            <div
              style={{
                fontSize: '1.05vw',
                color: '#64748B',
                lineHeight: 1.5,
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              {t(
                'Trace every prompt, response, and score back to a single request.',
                'מעקב אחר כל פרומפט, תגובה וציון עד לבקשה הבודדת.',
              )}
            </div>
          </div>
          <div style={col}>
            <div style={num}>3</div>
            <div
              style={{
                fontSize: '1.3vw',
                fontWeight: 700,
                color: '#1E3A5F',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              {t('CI/CD Integration', 'אינטגרציה עם CI/CD')}
            </div>
            <div
              style={{
                fontSize: '1.05vw',
                color: '#64748B',
                lineHeight: 1.5,
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              {t(
                'Block a deploy automatically when evaluation scores drop.',
                'חסימה אוטומטית של דיפלוי כאשר ציוני ההערכה יורדים.',
              )}
            </div>
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
          <span>{t('Slide 18 of 22', 'שקופית 18 מתוך 22')}</span>
        </div>
      </div>
    </div>
  );
}
