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

export default function AccuracyMetrics() {
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
          {t('Metric Category 1', 'קטגוריית מדד 1')}
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
          {t('Accuracy and Quality Metrics', 'מדדי דיוק ואיכות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Quality metrics tell you whether the model is giving good answers. They must be measured relative to a stable baseline — not just as absolute numbers.',
            'מדדי איכות מספרים לך אם המודל נותן תשובות טובות. חייבים למדוד אותם יחסית לקו בסיס יציב — לא רק כמספרים מוחלטים.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('LLM-judge pass rate', 'שיעור הצלחת שופט LLM')}
            </div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: > 90%', 'יעד: > 90%')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Golden-set mean score', 'ציון ממוצע ערכה זהובה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: >= baseline', 'יעד: >= קו בסיס')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Hallucination rate', 'שיעור הזיות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: < 2%', 'יעד: < 2%')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Refusal rate on valid inputs', 'שיעור דחייה על קלטים תקינים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: < 1%', 'יעד: < 1%')}
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
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Choosing thresholds', 'בחירת סף')}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '1.1vw',
                  fontWeight: 600,
                  color: '#1E3A5F',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Start from current reality', 'התחל מהמציאות הנוכחית')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
                {t(
                  'Measure your baseline first. Aspirational targets that your current model cannot meet block every deploy.',
                  'מדוד קודם את קו הבסיס שלך. יעדים שאפתניים שהמודל הנוכחי שלך לא יכול לעמוד בהם חוסמים כל פריסה.',
                )}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.1vw',
                  fontWeight: 600,
                  color: '#1E3A5F',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Use relative deltas, not absolutes', 'השתמש בשינויים יחסיים, לא מוחלטים')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
                {t(
                  '"Score must not drop more than 5% from the last release baseline" is more robust than "score must be > 85".',
                  '"הציון לא יכול לרדת יותר מ-5% מקו הבסיס של הגרסה האחרונה" חזק יותר מ"ציון חייב להיות > 85".',
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
          <span>{t('Slide 15 of 40', 'שקופית 15 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
