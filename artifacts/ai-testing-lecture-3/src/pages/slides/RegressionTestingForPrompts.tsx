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
const card: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

export default function RegressionTestingForPrompts() {
  const versions = [
    { ver: 'v1.0', sim: '94%', fact: '96%', schema: '100%', status: t('baseline', 'בסיס') },
    { ver: 'v1.1', sim: '96%', fact: '97%', schema: '100%', status: t('✔ improved', '✔ שופר') },
    { ver: 'v1.2', sim: '91%', fact: '95%', schema: '98%',  status: t('⚠ regression', '⚠ נסיגה') },
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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
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
          {t('Regression Testing', 'בדיקות נסיגה')}
        </div>
        <h1
          style={{
            fontSize: '3.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Prompt Regression Testing', 'בדיקות נסיגה להנחיות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'Every time the prompt changes, re-run the full golden test suite. Track metric trends across versions to detect silent quality regressions before they reach production.',
            'בכל פעם שהנחיה משתנה, הרץ מחדש את חבילת הבדיקות הזהובות המלאה. עקוב אחר מגמות מדד בין גרסאות כדי לזהות נסיגות איכות שקטות לפני שהן מגיעות לייצור.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Version Your Prompts', 'גרס את ההנחיות שלך')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Store prompts in version control alongside your code. Every diff is reviewable and every change re-triggers the test suite.',
                'אחסן הנחיות בניהול גרסאות לצד הקוד שלך. כל שינוי ניתן לסקירה וכל שינוי מפעיל מחדש את חבילת הבדיקות.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Golden Test Suite', 'חבילת בדיקות זהובות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A curated set of prompt–expected-output pairs that represent the most important quality dimensions. Grows over time as new failure modes are discovered.',
                'קבוצה מוקפדת של זוגות הנחיה-פלט-צפוי המייצגים את ממדי האיכות החשובים ביותר. גדלה עם הזמן כשמגלים מצבי כישלון חדשים.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Trend Monitoring', 'ניטור מגמות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Plot pass-rates per metric over versions. A downward trend in similarity scores after a prompt tweak is a sign of unintended regression.',
                'תרשם שיעורי עבר לכל מדד לפי גרסאות. מגמה יורדת בציוני דמיון לאחר שינוי הנחיה היא סימן לנסיגה לא מכוונת.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — version table */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '3vh 2.5vw',
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
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Version Score Comparison', 'השוואת ציונים בין גרסאות')}
          </div>

          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              gap: '0.5vw',
              fontSize: '0.85vw',
              fontWeight: 700,
              color: '#64748B',
              paddingBottom: '1vh',
              borderBottom: '1px solid #E2E8F0',
              textAlign: 'center',
            }}
          >
            <div style={{ textAlign: isHe ? 'right' : 'left' }}>{t('Version', 'גרסה')}</div>
            <div>{t('Sim.', 'דמיון')}</div>
            <div>{t('Fact.', 'עובד.')}</div>
            <div>{t('Schema', 'סכמה')}</div>
            <div>{t('Status', 'סטטוס')}</div>
          </div>

          {versions.map((v, i) => {
            const isRegression = v.status.includes('regression') || v.status.includes('נסיגה');
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  gap: '0.5vw',
                  fontSize: '1vw',
                  fontWeight: 500,
                  color: '#1E3A5F',
                  padding: '1.2vh 0.8vw',
                  borderRadius: '0.6vw',
                  background: isRegression ? 'rgba(220,38,38,0.05)' : i === 0 ? 'rgba(100,116,139,0.05)' : 'rgba(13,148,136,0.05)',
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{ textAlign: isHe ? 'right' : 'left', fontWeight: 700, color: '#0D9488' }}>{v.ver}</div>
                <div>{v.sim}</div>
                <div>{v.fact}</div>
                <div>{v.schema}</div>
                <div
                  style={{
                    fontSize: '0.85vw',
                    fontWeight: 700,
                    color: isRegression ? '#DC2626' : i === 0 ? '#64748B' : '#0D9488',
                  }}
                >
                  {v.status}
                </div>
              </div>
            );
          })}

          <div
            style={{
              background: 'rgba(13,148,136,0.07)',
              border: '1.5px solid rgba(13,148,136,0.2)',
              borderRadius: '0.8vw',
              padding: '1.5vh 1.5vw',
              fontSize: '0.95vw',
              color: '#1E3A5F',
              fontWeight: 500,
              textAlign: isHe ? 'right' : 'left',
              lineHeight: 1.4,
            }}
          >
            💡 {t(
              'v1.2 shows regression in similarity AND a schema slip — two independent signals flagging the same prompt change.',
              'v1.2 מראה נסיגה בדמיון וגם בעיית סכמה — שני אותות עצמאיים המסמנים את אותו שינוי הנחיה.',
            )}
          </div>
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 24 of 30', 'שקופית 24 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
