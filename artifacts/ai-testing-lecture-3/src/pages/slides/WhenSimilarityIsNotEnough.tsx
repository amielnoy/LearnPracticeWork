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

export default function WhenSimilarityIsNotEnough() {
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

      {/* Body — transition layout */}
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
            fontSize: '3.8vw',
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '70vw',
          }}
        >
          {t('Similarity Scores Meaning — Not Truth', 'ציון הדמיון מודד משמעות — לא אמת')}
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
            "Semantic similarity tells you whether the model's phrasing is close to a reference. It cannot tell you whether the facts inside that phrasing are correct.",
            'דמיון סמנטי אומר לך אם הניסוח של המודל קרוב לייחוס. הוא אינו יכול לומר לך אם העובדות בתוך הניסוח הן נכונות.',
          )}
        </p>

        {/* Example comparison */}
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
              {t('Reference', 'ייחוס')}
            </div>
            <div
              style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5, fontStyle: 'italic' }}
            >
              {t('"The treaty was signed in 1648."', '"האמנה נחתמה בשנת 1648."')}
            </div>
            <div
              style={{ marginTop: '1.5vh', fontSize: '0.9vw', color: '#0D9488', fontWeight: 600 }}
            >
              {t('✔ Factually correct', '✔ נכון עובדתית')}
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
              {t('Model Output', 'פלט המודל')}
            </div>
            <div
              style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5, fontStyle: 'italic' }}
            >
              {t('"The treaty was signed in 1652."', '"האמנה נחתמה בשנת 1652."')}
            </div>
            <div
              style={{ marginTop: '1.5vh', display: 'flex', flexDirection: 'column', gap: '0.5vh' }}
            >
              <div style={{ fontSize: '0.9vw', color: '#0D9488', fontWeight: 600 }}>
                {t('✔ Similarity score: 0.97 (PASS)', '✔ ציון דמיון: 0.97 (עבר)')}
              </div>
              <div style={{ fontSize: '0.9vw', color: '#DC2626', fontWeight: 600 }}>
                {t('✘ Factually wrong — wrong year', '✘ שגוי עובדתית — שנה שגויה')}
              </div>
            </div>
          </div>
        </div>

        {/* Bridge to factuality */}
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
            'Next: Factuality Checking — because paraphrase detection is not enough when correctness matters.',
            'הבא: בדיקת עובדתיות — כי זיהוי פרפרזה אינו מספיק כשנכונות חשובה.',
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
          <span>{t('Slide 10 of 30', 'שקופית 10 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
