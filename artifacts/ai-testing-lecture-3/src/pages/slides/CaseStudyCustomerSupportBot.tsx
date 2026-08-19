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

export default function CaseStudyCustomerSupportBot() {
  const checks = [
    {
      name: t('Semantic Similarity', 'דמיון סמנטי'),
      purpose: t(
        'Does the response convey the right policy information?',
        'האם התגובה מעבירה את מידע המדיניות הנכון?',
      ),
      threshold: t('≥ 0.82 vs. gold answer', '≥ 0.82 מול תשובה זהובה'),
      outcome: t('✔ PASS — policy wording captured', '✔ עבר — ניסוח המדיניות נתפס'),
      color: '#0D9488',
    },
    {
      name: t('Factuality Check', 'בדיקת עובדתיות'),
      purpose: t(
        'Are the quoted return-window days and refund amount accurate?',
        'האם ימי חלון ההחזרה וסכום ההחזר המצוטטים מדויקים?',
      ),
      threshold: t('0 contradicted claims', '0 טענות סותרות'),
      outcome: t(
        '✘ FAIL — "30 days" contradicts policy (28 days)',
        '✘ נכשל — "30 ימים" סותר מדיניות (28 ימים)',
      ),
      color: '#DC2626',
    },
    {
      name: t('Schema Validation', 'אימות סכמה'),
      purpose: t(
        'Does the structured payload include required fields?',
        'האם המטען המובנה כולל שדות חובה?',
      ),
      threshold: t('100% required fields present', '100% שדות חובה קיימים'),
      outcome: t(
        '✔ PASS — all fields present, types correct',
        '✔ עבר — כל השדות קיימים, סוגים נכונים',
      ),
      color: '#0D9488',
    },
    {
      name: t('Safety Screen', 'סריקת בטיחות'),
      purpose: t(
        'Is the response free of harmful or policy-violating content?',
        'האם התגובה נקייה מתוכן מזיק או מפר מדיניות?',
      ),
      threshold: t('Toxicity score < 0.05', 'ציון רעילות < 0.05'),
      outcome: t('✔ PASS — clean output', '✔ עבר — פלט נקי'),
      color: '#0D9488',
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
          {t('Case Study', 'מקרה בוחן')}
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
          {t('A Customer Support Bot', 'בוט תמיכת לקוחות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2vh 0', lineHeight: 1.6 }}>
          {t(
            'A retail e-commerce bot answers questions about returns, refunds, and shipping. All three evaluation techniques are applied in sequence to every response.',
            'בוט מסחר אלקטרוני קמעוני עונה על שאלות לגבי החזרות, החזרי כספים ומשלוחים. כל שלוש טכניקות ההערכה מיושמות ברצף על כל תגובה.',
          )}
        </p>

        {/* Scenario */}
        <div
          style={{
            background: '#0D1B2A',
            borderRadius: '0.8vw',
            padding: '2vh 2vw',
          }}
        >
          <div
            style={{ fontSize: '0.85vw', color: '#64748B', marginBottom: '0.8vh', fontWeight: 600 }}
          >
            {t('CUSTOMER QUERY', 'שאילתת לקוח')}
          </div>
          <div style={{ fontSize: '1vw', color: '#E2E8F0', lineHeight: 1.5 }}>
            {t(
              '"How many days do I have to return a product, and will I get a full refund?"',
              '"כמה ימים יש לי להחזיר מוצר, והאם אקבל החזר מלא?"',
            )}
          </div>
        </div>
      </div>

      {/* Right column — checks */}
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
            gap: '1.8vh',
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
            {t('Evaluation Results', 'תוצאות הערכה')}
          </div>

          {checks.map((check, i) => (
            <div
              key={i}
              style={{
                background:
                  check.color === '#DC2626' ? 'rgba(220,38,38,0.04)' : 'rgba(13,148,136,0.04)',
                border: `1px solid ${check.color}25`,
                borderRadius: '0.8vw',
                padding: '1.5vh 1.5vw',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  fontSize: '1.05vw',
                  fontWeight: 700,
                  color: '#1E3A5F',
                  marginBottom: '0.4vh',
                }}
              >
                {check.name}
              </div>
              <div
                style={{
                  fontSize: '0.9vw',
                  color: '#64748B',
                  marginBottom: '0.6vh',
                  lineHeight: 1.3,
                }}
              >
                {check.purpose}
              </div>
              <div style={{ fontSize: '0.85vw', color: '#94A3B8', marginBottom: '0.5vh' }}>
                {t('Threshold: ', 'סף: ')}
                {check.threshold}
              </div>
              <div style={{ fontSize: '0.9vw', fontWeight: 700, color: check.color }}>
                {check.outcome}
              </div>
            </div>
          ))}

          <div
            style={{
              background: 'rgba(220,38,38,0.07)',
              border: '1.5px solid rgba(220,38,38,0.25)',
              borderRadius: '0.8vw',
              padding: '1.5vh 1.5vw',
              fontSize: '0.95vw',
              fontWeight: 700,
              color: '#DC2626',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t(
              '→ PIPELINE: BLOCKED — factuality failure gates deployment',
              '← צינור: חסום — כישלון עובדתי עוצר פריסה',
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
          <span>{t('Slide 26 of 30', 'שקופית 26 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
