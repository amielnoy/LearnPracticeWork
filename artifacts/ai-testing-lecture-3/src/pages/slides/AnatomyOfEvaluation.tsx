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

export default function AnatomyOfEvaluation() {
  const cols = [
    {
      label: t('Deterministic Checks', 'בדיקות דטרמיניסטיות'),
      desc: t('Exact-match, regex, schema validation', 'התאמה מדויקת, regex, אימות סכמה'),
      speed: t('⚡ Fast', '⚡ מהיר'),
      cost: t('$ Free', '$ חינם'),
      precision: t('✦ Binary', '✦ בינארי'),
      bg: 'rgba(13,148,136,0.08)',
      accent: '#0D9488',
    },
    {
      label: t('Statistical / Similarity', 'סטטיסטי / דמיון'),
      desc: t('Embedding cosine distance, BLEU, ROUGE', 'מרחק קוסינוס בהטמעה, BLEU, ROUGE'),
      speed: t('⚡ Fast–Medium', '⚡ מהיר-בינוני'),
      cost: t('$$ Embedding API', '$$ API הטמעה'),
      precision: t('✦ Continuous score', '✦ ציון רציף'),
      bg: 'rgba(13,148,136,0.14)',
      accent: '#0D9488',
    },
    {
      label: t('LLM-as-Judge', 'LLM כשופט'),
      desc: t('A second model grades the first model\'s output', 'מודל שני מדרג את פלט המודל הראשון'),
      speed: t('🐢 Slow', '🐢 איטי'),
      cost: t('$$$ LLM inference', '$$$ הסקת LLM'),
      precision: t('✦ Nuanced rubric', '✦ רובריקה עדינה'),
      bg: 'rgba(30,58,95,0.07)',
      accent: '#1E3A5F',
    },
  ];

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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.8vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Evaluation Spectrum', 'ספקטרום ההערכה')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('The Evaluation Spectrum', 'ספקטרום ההערכה')}
          </h1>
          <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2vh 0', lineHeight: 1.5 }}>
            {t(
              'Not all evaluation techniques are equal — each trades off speed, cost, and precision differently.',
              'לא כל טכניקות ההערכה שוות — כל אחת מאזנת בין מהירות, עלות ודיוק בצורה שונה.',
            )}
          </p>
        </div>

        {/* Spectrum bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            marginBottom: '2vh',
            height: '1vh',
          }}
        >
          <div style={{ flex: 1, height: '0.6vh', background: 'linear-gradient(90deg, #0D9488 0%, #1E3A5F 100%)', borderRadius: '1vw' }} />
          <div style={{ fontSize: '0.9vw', color: '#64748B', padding: '0 1vw', whiteSpace: 'nowrap' }}>
            {t('← cheaper / faster    more nuanced / costly →', '← זול יותר / מהיר יותר    עדין יותר / יקר →')}
          </div>
        </div>

        {/* Three columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
          {cols.map((col, i) => (
            <div
              key={i}
              style={{
                background: col.bg,
                border: `1.5px solid ${col.accent}30`,
                borderRadius: '1vw',
                padding: '3vh 2vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5vh',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ fontSize: '1.25vw', fontWeight: 700, color: col.accent }}>
                {col.label}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{col.desc}</div>
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5vh', display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                <div style={{ fontSize: '0.95vw', color: '#64748B', fontWeight: 500 }}>{col.speed}</div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', fontWeight: 500 }}>{col.cost}</div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', fontWeight: 500 }}>{col.precision}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '1vw',
            padding: '2vh 2vw',
            fontSize: '1.05vw',
            color: '#1E3A5F',
            fontWeight: 500,
            textAlign: isHe ? 'right' : 'left',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          💡 {t(
            'This lecture focuses on the first two tiers — techniques you can run in CI without incurring heavy per-call LLM costs.',
            'הרצאה זו מתמקדת בשתי הרמות הראשונות — טכניקות שניתן להריץ ב-CI ללא עלויות כבדות של LLM.',
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
          <span>{t('Slide 4 of 30', 'שקופית 4 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
