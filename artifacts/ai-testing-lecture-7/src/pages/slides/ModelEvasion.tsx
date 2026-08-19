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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function ModelEvasion() {
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
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
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
          {t('Robustness Testing', 'בדיקות עמידות')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Model Evasion Testing', 'בדיקות התחמקות מהמודל')}
        </h1>
      </div>

      {/* Left */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.3vw',
            fontWeight: 700,
            color: '#1E3A5F',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '1.5vh',
          }}
        >
          {t('What Is Evasion?', 'מהי התחמקות?')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.6 }}>
          {t(
            'Evasion attacks craft inputs that look benign to classifiers but cause the model to produce harmful, biased, or incorrect outputs. Unlike injection, the goal is to fly under the guardrail radar.',
            'מתקפות התחמקות יוצרות קלטים שנראים שפירים למסווגים אך גורמים למודל לייצר פלטים מזיקים, מוטים או שגויים. בשונה מהזרקה, המטרה היא לעוף מתחת לרדאר של ה-guardrail.',
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#D97706',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Synonym substitution: replace flagged words with allowed synonyms',
                'החלפת נרדפות: החלף מילים מסומנות בנרדפות מותרות',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#D97706',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Indirect phrasing: ask for the outcome rather than the prohibited action',
                'ניסוח עקיף: בקש את התוצאה במקום הפעולה האסורה',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.3vw',
            fontWeight: 700,
            color: '#1E3A5F',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '1.5vh',
          }}
        >
          {t('Testing Approach', 'גישת בדיקה')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Build a "paraphrase" library: 10+ semantically equivalent variants per seed prompt',
                'בנה ספריית "paraphrase": 10+ גרסאות שוות-משמעות לכל prompt זרע',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Assert all variants produce the same policy decision (BLOCKED or ALLOWED)',
                'ודא שכל הגרסאות מייצרות את אותה החלטת מדיניות (BLOCKED או ALLOWED)',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Track inconsistency rate: mismatches between semantically equivalent variants',
                'עקוב אחר שיעור חוסר-עקביות: אי-התאמות בין גרסאות שוות-משמעות',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Rotate the paraphrase library monthly so evasion paths cannot become stable',
                'רענן את ספריית ה-paraphrase חודשיות כדי שנתיבי התחמקות לא יהפכו יציבים',
              )}
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
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 23 of 40', 'שקופית 23 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
