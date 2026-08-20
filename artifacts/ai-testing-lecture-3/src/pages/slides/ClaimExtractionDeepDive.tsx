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

export default function ClaimExtractionDeepDive() {
  const claims = [
    {
      claim: t('"The capital of France is Paris."', '"בירת צרפת היא פריז."'),
      verdict: t('✔ SUPPORTED', '✔ נתמך'),
      color: '#0D9488',
      bg: 'rgba(13,148,136,0.08)',
    },
    {
      claim: t('"The Eiffel Tower is 300 metres tall."', '"מגדל אייפל גבוה 300 מטר."'),
      verdict: t('✘ CONTRADICTED (330 m)', '✘ סותר (330 מ׳)'),
      color: '#DC2626',
      bg: 'rgba(220,38,38,0.06)',
    },
    {
      claim: t('"It was built in the 19th century."', '"הוא נבנה במאה ה-19."'),
      verdict: t('✔ SUPPORTED', '✔ נתמך'),
      color: '#0D9488',
      bg: 'rgba(13,148,136,0.08)',
    },
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
          {t('Factuality Deep Dive', 'צלילה עמוקה לעובדתיות')}
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
          {t('Breaking Answers Into Checkable Claims', 'פירוק תשובות לטענות בדיקות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'A single response may contain multiple facts. Factuality checking atomises the response into individual verifiable claims before cross-referencing each against a trusted source.',
            'תגובה בודדת עשויה להכיל עובדות מרובות. בדיקת עובדתיות מפרקת את התגובה לטענות מאומתות בנות בדיקה לפני הצלבת כל אחת עם מקור מהימן.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('1. Claim Segmentation', '1. פילוח טענות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Use an NLP model or LLM to split the response into atomic proposition units — one verifiable fact per unit.',
                'השתמש במודל NLP או LLM כדי לפצל את התגובה ליחידות הצעה אטומיות — עובדה אחת ניתנת לאימות ליחידה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('2. Source Retrieval', '2. אחזור מקורות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'For each claim, retrieve the most relevant supporting document from the knowledge base or the RAG context that was provided to the model.',
                'לכל טענה, אחזר את המסמך הרלוונטי ביותר מבסיס הידע או מהקשר RAG שסופק למודל.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('3. Entailment Verdict', '3. פסיקת גרירה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'An NLI model classifies each (claim, source) pair as: SUPPORTED, CONTRADICTED, or NOT ENOUGH INFO.',
                'מודל NLI מסווג כל זוג (טענה, מקור) כ: נתמך, סותר, או אין מספיק מידע.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — example */}
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
            gap: '2vh',
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
            {t('Claim Extraction Example', 'דוגמת חילוץ טענות')}
          </div>

          {/* Source text */}
          <div
            style={{
              background: '#0D1B2A',
              borderRadius: '0.6vw',
              padding: '1.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.85vw',
                color: '#64748B',
                marginBottom: '0.5vh',
                fontWeight: 600,
              }}
            >
              {t('MODEL OUTPUT', 'פלט המודל')}
            </div>
            <div style={{ fontSize: '1vw', color: '#E2E8F0', lineHeight: 1.5 }}>
              {t(
                '"Paris is the capital of France. The Eiffel Tower is 300 metres tall and was built in the 19th century."',
                '"פריז היא בירת צרפת. מגדל אייפל גבוה 300 מטר ונבנה במאה ה-19."',
              )}
            </div>
          </div>

          <div
            style={{
              fontSize: '1vw',
              fontWeight: 600,
              color: '#64748B',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('→ Extracted Claims & Verdicts', '← טענות שחולצו ופסיקות')}
          </div>

          {claims.map((c, i) => (
            <div
              key={i}
              style={{
                background: c.bg,
                border: `1px solid ${c.color}30`,
                borderRadius: '0.8vw',
                padding: '1.5vh 1.5vw',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  fontSize: '1vw',
                  color: '#1E3A5F',
                  lineHeight: 1.4,
                  marginBottom: '0.5vh',
                }}
              >
                {c.claim}
              </div>
              <div style={{ fontSize: '0.9vw', fontWeight: 700, color: c.color }}>{c.verdict}</div>
            </div>
          ))}
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
          <span>{t('Slide 12 of 30', 'שקופית 12 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
