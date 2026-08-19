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
  display: 'flex',
  gap: '1.5vw',
  alignItems: 'flex-start',
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};
const badge: React.CSSProperties = {
  fontSize: '1.2vw',
  fontWeight: 700,
  color: '#0D9488',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  width: '3vw',
  height: '3vw',
  minWidth: '3vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
};

export default function BuildingACompositeTestSuite() {
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
          {t('Putting It Together', 'איחוד הכל יחד')}
        </div>
        <h1
          style={{
            fontSize: '3.6vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Building a Composite Test Suite', 'בניית חבילת בדיקות מורכבת')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'The three techniques layer naturally into a single ordered pipeline. Each gate runs in sequence — a failure at any stage halts the chain and surfaces a clear verdict.',
            'שלוש הטכניקות מתחברות באופן טבעי לצינור מסודר אחד. כל שער פועל ברצף — כשל בכל שלב עוצר את השרשרת ומציג פסיקה ברורה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={badge}>1</div>
            <div>
              <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
                {t('Semantic Similarity Check', 'בדיקת דמיון סמנטי')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Is the meaning close enough to the reference? Gate: cosine similarity \u2265 threshold.',
                  'האם המשמעות קרובה מספיק לייחוס? שער: דמיון קוסינוס \u2265 סף.',
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>2</div>
            <div>
              <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
                {t('Factuality Check', 'בדיקת עובדתיות')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Are all claims supported by the source? Gate: zero unsupported claims.',
                  'האם כל הטענות נתמכות על ידי המקור? שער: אפס טענות ללא תמיכה.',
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>3</div>
            <div>
              <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
                {t('Schema Validation', 'אימות סכמה')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Does the output conform to the declared contract? Gate: schema validation passes.',
                  'האם הפלט עומד בחוזה המוצהר? שער: אימות הסכמה עובר.',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column — pipeline verdict */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
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
              fontSize: '1.5vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Pipeline Verdicts', 'פסיקות הצינור')}
          </div>

          {/* Similarity step */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Similarity check', 'בדיקת דמיון')}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1vw',
                fontSize: '0.95vw',
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  color: '#0D9488',
                  backgroundColor: 'rgba(13, 148, 136, 0.1)',
                  padding: '0.4vh 0.8vw',
                  borderRadius: '0.4vw',
                }}
              >
                {t('\u2714 Pass \u2192 continue', '\u2714 עבר \u2192 המשך')}
              </span>
              <span
                style={{
                  color: '#DC2626',
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  padding: '0.4vh 0.8vw',
                  borderRadius: '0.4vw',
                }}
              >
                {t('\u2718 Fail \u2192 flag', '\u2718 נכשל \u2192 סמן')}
              </span>
            </div>
          </div>

          {/* Factuality step */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Factuality check', 'בדיקת עובדתיות')}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1vw',
                fontSize: '0.95vw',
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  color: '#0D9488',
                  backgroundColor: 'rgba(13, 148, 136, 0.1)',
                  padding: '0.4vh 0.8vw',
                  borderRadius: '0.4vw',
                }}
              >
                {t('\u2714 Pass \u2192 continue', '\u2714 עבר \u2192 המשך')}
              </span>
              <span
                style={{
                  color: '#DC2626',
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  padding: '0.4vh 0.8vw',
                  borderRadius: '0.4vw',
                }}
              >
                {t('\u2718 Fail \u2192 flag', '\u2718 נכשל \u2192 סמן')}
              </span>
            </div>
          </div>

          {/* Schema step */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Schema validation', 'אימות סכמה')}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1vw',
                fontSize: '0.95vw',
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  color: '#0D9488',
                  backgroundColor: 'rgba(13, 148, 136, 0.1)',
                  padding: '0.4vh 0.8vw',
                  borderRadius: '0.4vw',
                }}
              >
                {t('\u2714 Pass \u2192 continue', '\u2714 עבר \u2192 המשך')}
              </span>
              <span
                style={{
                  color: '#DC2626',
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  padding: '0.4vh 0.8vw',
                  borderRadius: '0.4vw',
                }}
              >
                {t('\u2718 Fail \u2192 flag', '\u2718 נכשל \u2192 סמן')}
              </span>
            </div>
          </div>

          {/* Final verdict */}
          <div
            style={{
              borderTop: '1px solid #E2E8F0',
              paddingTop: '2vh',
              display: 'flex',
              alignItems: 'center',
              gap: '1vw',
            }}
          >
            <div
              style={{
                fontSize: '1.4vw',
                fontWeight: 700,
                color: '#0D9488',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                padding: '1vh 1.5vw',
                borderRadius: '0.6vw',
              }}
            >
              {t('ALL PASS \u2192 VERDICT: GOOD', 'הכל עבר \u2192 פסיקה: תקין')}
            </div>
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
          <span>{t('Slide 22 of 30', 'שקופית 22 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
