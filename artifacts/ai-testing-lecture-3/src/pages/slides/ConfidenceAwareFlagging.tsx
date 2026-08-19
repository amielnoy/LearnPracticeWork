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

export default function ConfidenceAwareFlagging() {
  const tiers = [
    {
      label: t('High Confidence + Correct', 'ביטחון גבוה + נכון'),
      action: t('✔ Auto-pass', '✔ מעבר אוטומטי'),
      desc: t('Checker is confident and source confirms the claim.', 'הבודק בטוח והמקור מאשר את הטענה.'),
      bg: 'rgba(13,148,136,0.08)',
      border: 'rgba(13,148,136,0.3)',
      color: '#0D9488',
    },
    {
      label: t('Low Confidence (either direction)', 'ביטחון נמוך (בכל כיוון)'),
      action: t('⚑ Route to human review', '⚑ העבר לסקירה אנושית'),
      desc: t('NLI verdict is uncertain — insufficient evidence to rule definitively.', 'פסיקת NLI אינה ודאית — אין ראיות מספיקות לפסיקה חד-משמעית.'),
      bg: 'rgba(245,158,11,0.07)',
      border: 'rgba(245,158,11,0.3)',
      color: '#D97706',
    },
    {
      label: t('High Confidence + Contradicted', 'ביטחון גבוה + סותר'),
      action: t('✘ Auto-fail (critical)', '✘ כישלון אוטומטי (קריטי)'),
      desc: t('Checker is confident and source explicitly contradicts the claim.', 'הבודק בטוח והמקור סותר את הטענה במפורש.'),
      bg: 'rgba(220,38,38,0.05)',
      border: 'rgba(220,38,38,0.25)',
      color: '#DC2626',
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
          {t('Factuality Checking', 'בדיקת עובדתיות')}
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
          {t("When the Checker Isn't Sure", 'כשהבודק אינו בטוח')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'NLI models return a confidence score alongside their verdict. A low-confidence verdict — even a "supported" one — is not reliable enough to auto-pass in a high-stakes pipeline.',
            'מודלי NLI מחזירים ציון ביטחון יחד עם הפסיקה שלהם. פסיקה בביטחון נמוך — אפילו "נתמך" — אינה מהימנה מספיק למעבר אוטומטי בצינור בסיכון גבוה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Why Low Confidence Is a Signal', 'מדוע ביטחון נמוך הוא אות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'It often means the retrieved source is only tangentially related, or the claim is so novel the verifier has never seen it before.',
                'זה לעתים קרובות אומר שהמקור שאוחזר קשור רק בעקיפין, או שהטענה כה חדשה שהמאמת מעולם לא נתקל בה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('The Escalation Path', 'נתיב ההסלמה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Route low-confidence outputs to a human reviewer queue rather than auto-failing. Track the ratio to measure system calibration over time.',
                'העבר פלטים בביטחון נמוך לתור סקירה אנושית במקום כישלון אוטומטי. עקוב אחר היחס למדידת כיול המערכת לאורך זמן.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — routing tiers */}
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
            {t('Routing Decision Tree', 'עץ החלטות ניתוב')}
          </div>
          {tiers.map((tier, i) => (
            <div
              key={i}
              style={{
                background: tier.bg,
                border: `1.5px solid ${tier.border}`,
                borderRadius: '0.8vw',
                padding: '2vh 1.5vw',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>
                {tier.label}
              </div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: tier.color, marginBottom: '0.5vh' }}>
                {tier.action}
              </div>
              <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
                {tier.desc}
              </div>
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
          <span>{t('Slide 14 of 30', 'שקופית 14 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
