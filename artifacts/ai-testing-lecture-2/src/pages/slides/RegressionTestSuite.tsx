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
  gridTemplateColumns: '3fr 2fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

const bulletRow: React.CSSProperties = { display: 'flex', gap: '1.2vw', alignItems: 'flex-start' };
const dot: React.CSSProperties = {
  width: '0.6vw',
  height: '0.6vw',
  minWidth: '0.6vw',
  borderRadius: '50%',
  backgroundColor: '#0D9488',
  marginTop: '0.7vw',
};
const checkRow: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '1vw' };
const check: React.CSSProperties = {
  width: '1.4vw',
  height: '1.4vw',
  minWidth: '1.4vw',
  borderRadius: '0.3vw',
  backgroundColor: '#0D9488',
};

export default function RegressionTestSuite() {
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
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

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
          {t('Practical Toolkit', 'ערכת כלים מעשית')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Building a Prompt Regression Test Suite', 'בניית חבילת בדיקות רגרסיה לפרומפטים')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Golden prompts \u2014 a fixed set of inputs with known-good expected properties, run on every change',
                'פרומפטים \u201cזהב\u201d \u2014 קבוצה קבועה של קלטים עם תכונות צפויות ידועות, שמורצת בכל שינוי',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Assert on structure and required content, not brittle exact-text matches',
                'בצעו assertion על מבנה ותוכן נדרש, לא על התאמות טקסט מדויקות ושבריריות',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Include adversarial cases: injection attempts, edge-case inputs, empty or malformed context',
                'כללו מקרים עוינים: ניסיונות הזרקה, קלטי קצה, הקשר ריק או פגום',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Re-run the suite whenever the prompt, model version, or sampling settings change',
                'הריצו מחדש את החבילה בכל שינוי בפרומפט, בגרסת המודל או בהגדרות הדגימה',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '3.5vh 2.5vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2vh',
          }}
        >
          <div
            style={{
              fontSize: '0.9vw',
              fontWeight: 600,
              color: '#64748B',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('Suite Coverage', 'כיסוי החבילה')}
          </div>
          <div style={checkRow}>
            <div style={check} />
            <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>
              {t('Golden prompts', 'פרומפטי זהב')}
            </div>
          </div>
          <div style={checkRow}>
            <div style={check} />
            <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>
              {t('Structural assertions', 'assertion מבניים')}
            </div>
          </div>
          <div style={checkRow}>
            <div style={check} />
            <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>
              {t('Adversarial cases', 'מקרים עוינים')}
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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 18 of 21', 'שקופית 18 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
