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
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function WhenSchemaValidPassesAreNotEnough() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3vh',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('Section Transition', 'מעבר בין סעיפים')}
        </div>
        <h1
          style={{
            fontSize: '3.6vw',
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '70vw',
          }}
        >
          {t('Schema-Valid ≠ Semantically Correct', 'תקינות סכמה ≠ נכונות סמנטית')}
        </h1>
        <p
          style={{
            fontSize: '1.4vw',
            color: '#475569',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '60vw',
          }}
        >
          {t(
            'A response can pass every schema constraint and still carry a completely wrong value. Schema validation checks shape, not sense.',
            'תגובה יכולה לעבור כל אילוץ סכמה ועדיין להכיל ערך שגוי לחלוטין. אימות סכמה בודק צורה, לא משמעות.',
          )}
        </p>

        {/* Side-by-side example */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw', width: '80vw' }}>
          <div
            style={{
              background: 'rgba(13,148,136,0.07)',
              border: '1.5px solid rgba(13,148,136,0.3)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Schema Validation View', 'מבט אימות סכמה')}
            </div>
            <div
              style={{
                background: '#0D1B2A',
                borderRadius: '0.6vw',
                padding: '1.5vh 1.5vw',
                fontFamily: 'monospace',
                fontSize: '0.9vw',
                color: '#E2E8F0',
                lineHeight: 1.7,
                marginBottom: '1.5vh',
              }}
            >
              <div>{'{'}</div>
              <div style={{ paddingLeft: '1.5vw', color: '#F59E0B' }}>"price": 9999.99,</div>
              <div style={{ paddingLeft: '1.5vw', color: '#F59E0B' }}>"currency": "USD"</div>
              <div>{'}'}</div>
            </div>
            <div style={{ fontSize: '0.9vw', color: '#0D9488', fontWeight: 600 }}>
              {t(
                '✔ Schema passes — type: number, currency: valid enum',
                '✔ סכמה עוברת — סוג: מספר, מטבע: enum תקין',
              )}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(220,38,38,0.05)',
              border: '1.5px solid rgba(220,38,38,0.25)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Semantic Reality', 'מציאות סמנטית')}
            </div>
            <div
              style={{
                background: '#0D1B2A',
                borderRadius: '0.6vw',
                padding: '1.5vh 1.5vw',
                fontFamily: 'monospace',
                fontSize: '0.9vw',
                color: '#E2E8F0',
                lineHeight: 1.7,
                marginBottom: '1.5vh',
              }}
            >
              <div style={{ color: '#94A3B8' }}>
                // {t('Expected price: $12.99', 'מחיר צפוי: $12.99')}
              </div>
              <div>{'{'}</div>
              <div style={{ paddingLeft: '1.5vw', color: '#DC2626' }}>"price": 9999.99,</div>
              <div style={{ paddingLeft: '1.5vw', color: '#F59E0B' }}>"currency": "USD"</div>
              <div>{'}'}</div>
            </div>
            <div style={{ fontSize: '0.9vw', color: '#DC2626', fontWeight: 600 }}>
              {t(
                '✘ Semantically wrong — price is 770× too high',
                '✘ שגוי סמנטית — המחיר גבוה פי 770',
              )}
            </div>
          </div>
        </div>

        {/* Bridge */}
        <div
          style={{
            background: '#1E3A5F',
            borderRadius: '1vw',
            padding: '2.5vh 4vw',
            fontSize: '1.3vw',
            color: '#FFFFFF',
            fontWeight: 600,
            maxWidth: '70vw',
          }}
        >
          {t(
            'Next: Common Pitfalls — knowing the limits of each technique prevents over-reliance on any single gate.',
            'הבא: מלכודות נפוצות — הכרת מגבלות כל טכניקה מונעת הסתמכות יתר על שער בודד.',
          )}
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 21 of 30', 'שקופית 21 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
