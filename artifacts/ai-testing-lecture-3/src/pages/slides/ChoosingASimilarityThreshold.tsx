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

export default function ChoosingASimilarityThreshold() {
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
          gap: '2.5vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div>
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
            {t('Threshold Calibration', 'כיול הסף')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: '0 0 1vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Choosing the Right Threshold', 'בחירת הסף הנכון')}
          </h1>
          <p style={{ fontSize: '1.2vw', color: '#475569', margin: 0, lineHeight: 1.5 }}>
            {t(
              'The similarity threshold is the most consequential tuning decision in semantic evaluation. Set it wrong and you introduce systematic errors.',
              'סף הדמיון הוא החלטת הכוונון המשמעותית ביותר בהערכה סמנטית. הגדר אותו בצורה שגויה ותכניס שגיאות שיטתיות.',
            )}
          </p>
        </div>

        {/* Slider visual */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '1vw',
            padding: '3vh 3vw',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '3vh' }}>
            {t('Similarity Score Range: 0.0 → 1.0', 'טווח ציון דמיון: 0.0 → 1.0')}
          </div>
          {/* Track */}
          <div style={{ position: 'relative', height: '1.2vh', marginBottom: '1.5vh' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                borderRadius: '1vw',
                background: 'linear-gradient(90deg, #DC2626 0%, #F59E0B 40%, #0D9488 70%, #0D9488 100%)',
              }}
            />
            {/* Marker: too low */}
            <div
              style={{
                position: 'absolute',
                top: '-1.5vh',
                left: isHe ? 'auto' : '25%',
                right: isHe ? '25%' : 'auto',
                transform: 'translateX(-50%)',
                width: '0.4vw',
                height: '4vh',
                background: '#DC2626',
                borderRadius: '2px',
              }}
            />
            {/* Marker: recommended */}
            <div
              style={{
                position: 'absolute',
                top: '-1.5vh',
                left: isHe ? 'auto' : '78%',
                right: isHe ? '78%' : 'auto',
                transform: 'translateX(-50%)',
                width: '0.4vw',
                height: '4vh',
                background: '#0D9488',
                borderRadius: '2px',
              }}
            />
          </div>
          {/* Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85vw', color: '#94A3B8', fontWeight: 500, marginBottom: '3vh' }}>
            <span>0.0</span>
            <span>0.5</span>
            <span>1.0</span>
          </div>
        </div>

        {/* Two-column tradeoff */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
          <div
            style={{
              background: 'rgba(220,38,38,0.05)',
              border: '1.5px solid rgba(220,38,38,0.3)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#DC2626', marginBottom: '1.2vh' }}>
              {t('Threshold Too Low (e.g. 0.5)', 'סף נמוך מדי (לדוג. 0.5)')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              {[
                t('False positives: wrong answers slip through', 'חיובי שווא: תשובות שגויות עוברות'),
                t('Paraphrases of wrong facts score as PASS', 'פרפרזות של עובדות שגויות מקבלות עבר'),
                t('Test suite loses its ability to catch regressions', 'חבילת הבדיקה מאבדת יכולת לתפוס נסיגות'),
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.8vw', alignItems: 'flex-start', fontSize: '1vw', color: '#64748B' }}>
                  <span style={{ color: '#DC2626', fontWeight: 700, marginTop: '0.1vh' }}>✘</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(245,158,11,0.05)',
              border: '1.5px solid rgba(245,158,11,0.3)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#D97706', marginBottom: '1.2vh' }}>
              {t('Threshold Too High (e.g. 0.98)', 'סף גבוה מדי (לדוג. 0.98)')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              {[
                t('False negatives: valid paraphrases are rejected', 'שלילי שווא: פרפרזות תקפות נדחות'),
                t('Test suite becomes brittle — prompts fail silently', 'חבילת הבדיקה שבירה — הנחיות נכשלות בשקט'),
                t('Human review burden increases unnecessarily', 'עומס הסקירה האנושית גדל שלא לצורך'),
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.8vw', alignItems: 'flex-start', fontSize: '1vw', color: '#64748B' }}>
                  <span style={{ color: '#D97706', fontWeight: 700, marginTop: '0.1vh' }}>⚠</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div
          style={{
            background: 'rgba(13,148,136,0.07)',
            border: '1.5px solid rgba(13,148,136,0.3)',
            borderRadius: '1vw',
            padding: '2vh 2vw',
            fontSize: '1.05vw',
            color: '#1E3A5F',
            fontWeight: 500,
          }}
        >
          ✦ {t(
            'Start at 0.80–0.85, measure precision/recall against a labelled sample, then iterate. One threshold does not fit all task types.',
            'התחל ב-0.80–0.85, מדוד דיוק/recall מול דוגמה מתויגת, ואז חזור על התהליך. סף אחד אינו מתאים לכל סוגי המשימות.',
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
          <span>{t('Slide 9 of 30', 'שקופית 9 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
