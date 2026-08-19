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

export default function BiasAndFairnessChecks() {
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
          {t('Safety Dimension 2', 'מימד בטיחות 2')}
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
          {t('Testing for Bias, Not Just Toxicity', 'בדיקת הטיה, לא רק רעילות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            "A response can be entirely polite yet systematically unfair. Bias probes check whether the model's behaviour changes when the prompt's demographic details are varied.",
            'תגובה יכולה להיות מנומסת לחלוטין אך שיטתית בלתי הוגנת. בדיקות הטיה בודקות אם התנהגות המודל משתנה כשפרטים דמוגרפיים בהנחיה משתנים.',
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
              {t('Counterfactual Probing', 'בדיקות נגד-עובדתיות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                "Send the same prompt with varied demographic attributes (name, gender, nationality). Measure whether the model's sentiment, advice, or length changes systematically.",
                'שלח את אותה הנחיה עם מאפיינים דמוגרפיים שונים (שם, מגדר, לאום). מדוד אם הסנטימנט, העצה או האורך של המודל משתנים בצורה שיטתית.',
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
              {t('Stereotype Probing', 'בדיקת סטריאוטיפים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Present the model with sentence-completion tasks designed to elicit stereotyped associations. Score the ratio of stereotyped vs. neutral completions.',
                'הצג למודל משימות השלמת משפטים שנועדו להעלות אסוציאציות סטריאוטיפיות. תן ציון ליחס בין השלמות סטריאוטיפיות לניטרליות.',
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
              {t('Consistency Across Groups', 'עקביות בין קבוצות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'For every group A a prompt references, test the same prompt with group B. Flag responses where the policy, recommendation, or tone diverges.',
                'לכל קבוצה A שהנחיה מזכירה, בדוק את אותה הנחיה עם קבוצה B. סמן תגובות שבהן המדיניות, ההמלצה או הטון שונים.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
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
            {t('Bias vs. Toxicity', 'הטיה לעומת רעילות')}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5vw',
              textAlign: 'center',
            }}
          >
            {[
              {
                title: t('Toxicity', 'רעילות'),
                icon: '⚠️',
                desc: t(
                  'Explicitly harmful, offensive, or violent language.',
                  'שפה מזיקה, פוגענית או אלימה במפורש.',
                ),
                tag: t('Binary: YES / NO', 'בינארי: כן / לא'),
                bg: 'rgba(220,38,38,0.05)',
                border: 'rgba(220,38,38,0.2)',
              },
              {
                title: t('Bias', 'הטיה'),
                icon: '⚖️',
                desc: t(
                  'Differential treatment across demographic groups.',
                  'יחס שונה בין קבוצות דמוגרפיות.',
                ),
                tag: t('Measured: distribution', 'נמדד: התפלגות'),
                bg: 'rgba(245,158,11,0.07)',
                border: 'rgba(245,158,11,0.25)',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: item.bg,
                  border: `1.5px solid ${item.border}`,
                  borderRadius: '0.8vw',
                  padding: '2vh 1.5vw',
                }}
              >
                <div style={{ fontSize: '1.8vw', marginBottom: '0.8vh' }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: '1.05vw',
                    fontWeight: 700,
                    color: '#1E3A5F',
                    marginBottom: '0.8vh',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: '0.9vw',
                    color: '#64748B',
                    lineHeight: 1.4,
                    marginBottom: '1vh',
                  }}
                >
                  {item.desc}
                </div>
                <div
                  style={{
                    fontSize: '0.85vw',
                    fontWeight: 600,
                    color: '#64748B',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.4vw',
                    padding: '0.4vh 0.6vw',
                    display: 'inline-block',
                  }}
                >
                  {item.tag}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'rgba(13,148,136,0.07)',
              border: '1.5px solid rgba(13,148,136,0.2)',
              borderRadius: '0.8vw',
              padding: '1.8vh 1.5vw',
              fontSize: '1vw',
              color: '#1E3A5F',
              fontWeight: 500,
              lineHeight: 1.4,
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            💡{' '}
            {t(
              'A complete safety suite includes both toxicity classifiers and bias probe datasets — they catch different failure modes.',
              'חבילת בטיחות מלאה כוללת גם מסווגי רעילות וגם מערכי נתוני בדיקת הטיה — הם תופסים מצבי כישלון שונים.',
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
          <span>{t('Slide 17 of 30', 'שקופית 17 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
