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

export default function IntegrationLayer() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

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
          {t('Layer 2', 'שכבה 2')}
        </div>
        <h1
          style={{
            fontSize: '3.4vw',
            fontWeight: 800,
            margin: '0 0 2.5vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Integration Tests', 'בדיקות אינטגרציה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Integration tests actually call the model — but on a small, curated golden set. They run on every PR and use LLM-as-judge scoring to catch quality regressions.',
            'בדיקות אינטגרציה באמת קוראות למודל — אבל על ערכה זהובה קטנה ומוקפדת. הן רצות בכל PR ומשתמשות בניקוד LLM-as-judge לזיהוי רגרסיות איכות.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Golden set size', 'גודל הערכה הזהובה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t(
                '20–50 representative inputs — enough to be meaningful, small enough to be fast.',
                '20–50 קלטים מייצגים — מספיק משמעותי, קטן מספיק להיות מהיר.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Failure threshold', 'סף כישלון')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t(
                'If judge score drops below baseline by more than 10%, the PR is blocked.',
                'אם ציון השופט יורד מקו הבסיס ביותר מ-10%, ה-PR נחסם.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Cost control', 'שליטת עלות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t(
                'Use a cheaper model for integration evals; reserve the best model for nightly system tests.',
                'השתמשו במודל זול יותר להערכות אינטגרציה; שמרו את המודל הטוב ביותר לבדיקות מערכת לילי.',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.3vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Integration test trigger rules', 'כללי הפעלת בדיקות אינטגרציה')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: '#0D9488',
                  color: '#fff',
                  borderRadius: '0.4vw',
                  padding: '0.3vh 0.8vw',
                  fontSize: '0.9vw',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                PR
              </div>
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
                {t(
                  'Run the golden-set eval (~50 inputs). Block merge if quality regresses.',
                  'הרץ את הערכת הערכה הזהובה (~50 קלטים). חסום מיזוג אם האיכות נסוגה.',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: '#FBBF24',
                  color: '#fff',
                  borderRadius: '0.4vw',
                  padding: '0.3vh 0.8vw',
                  fontSize: '0.9vw',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                Nightly
              </div>
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
                {t(
                  'Run the full 2000-input eval set, security scans, and cost benchmarks.',
                  'הרץ את חבילת הערכה המלאה של 2000 קלטים, סריקות אבטחה ובסיסי עלות.',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: '#38BDF8',
                  color: '#fff',
                  borderRadius: '0.4vw',
                  padding: '0.3vh 0.8vw',
                  fontSize: '0.9vw',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                Deploy
              </div>
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
                {t(
                  'Re-run the integration set against the deployed endpoint as a smoke gate.',
                  'הרץ מחדש את הערכת האינטגרציה מול נקודת הקצה הפרוסה כשער עשן.',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 9 of 40', 'שקופית 9 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
