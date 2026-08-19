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

export default function ToxicitySafetyScreening() {
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
          {t('Safety Testing', 'בדיקות בטיחות')}
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
          {t('Screening for Toxicity & Safety', 'סינון לגילוי רעילות ובטיחות')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 4vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'A functionally correct answer can still be harmful. Automated safety classifiers form a dedicated testing layer that runs independently of accuracy checks.',
            'תשובה נכונה מבחינה פונקציונלית עדיין יכולה להיות מזיקה. מסווגי בטיחות אוטומטיים מהווים שכבת בדיקה ייעודית שפועלת ללא תלות בבדיקות דיוק.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Harassment & Hate Speech', 'הטרדה ושפת שנאה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Classifiers trained on hate-speech datasets score outputs and flag content targeting individuals or protected groups.',
                'מסווגים שהוכשרו על מערכי נתוני שפת שנאה מנקדים פלטים ומסמנים תוכן המכוון כלפי יחידים או קבוצות מוגנות.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Self-Harm & Crisis Content', 'תוכן פגיעה עצמית ומשבר')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Dedicated safety models detect outputs that may encourage self-harm or provide harmful instructions in a crisis context.',
                'מודלי בטיחות ייעודיים מזהים פלטים שעלולים לעודד פגיעה עצמית או לספק הוראות מזיקות בהקשר של משבר.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Unsafe Instructions', 'הוראות לא בטוחות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Screen for step-by-step instructions that would cause real-world harm — chemicals, weapons, bypass of security controls.',
                'סנן אחר הוראות שלב-אחר-שלב שיגרמו לנזק בעולם האמיתי — כימיקלים, נשק, עקיפת בקרות אבטחה.',
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
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '3vh',
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
            {t('How Safety Screening Works', 'כיצד פועל סינון הבטיחות')}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}
          >
            <div
              style={
                {
                  position: 'absolute',
                  [isHe ? 'right' : 'left']: '0.5vw',
                  top: '2vh',
                  bottom: '2vh',
                  width: '2px',
                  backgroundColor: '#E2E8F0',
                } as React.CSSProperties
              }
            />
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Run a purpose-built safety classifier, not a general-purpose LLM',
                  'הפעילו מסווג בטיחות ייעודי, לא LLM לשימוש כללי',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Score on multiple categories — one score misses multi-dimensional risk',
                  'נקדו על פני קטגוריות מרובות — ציון אחד מפספס סיכון רב-ממדי',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Set per-category thresholds; review borderline scores manually',
                  'קבעו סף לכל קטגוריה; בדקו ציונים גבוליים ידנית',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Test safety layer independently from accuracy layer',
                  'בדקו את שכבת הבטיחות בנפרד משכבת הדיוק',
                )}
              </div>
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
          <span>{t('Slide 15 of 30', 'שקופית 15 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
