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
  gap: '3vh',
  color: '#1E3A5F',
};

export default function GeneratingFromUserStories() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
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
            {t('Technique', 'טכניקה')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Generating Tests from User Stories', 'יצירת בדיקות מסיפורי משתמש')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3vw' }}>
          <div
            style={{
              background: '#1E3A5F',
              borderRadius: '1vw',
              padding: '3vh 2.5vw',
              color: '#FAFBFC',
              display: 'flex',
              flexDirection: 'column',
              gap: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 700,
                color: '#0D9488',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('User Story Input', 'קלט סיפור משתמש')}
            </div>
            <div
              style={{
                fontSize: '1.1vw',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              {t(
                '"As a customer, I want to apply a discount code at checkout so that I receive a reduced price."',
                '"כלקוח, אני רוצה להחיל קוד הנחה בקופה כדי לקבל מחיר מופחת."',
              )}
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              {t(
                'Acceptance criteria, edge cases in the description, and "given/when/then" patterns are all AI-readable signals.',
                'קריטריוני קבלה, מקרי קצה בתיאור ותבניות "given/when/then" הם אותות קריאים ל-AI.',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('AI-Generated Test Scenarios', 'תרחישי בדיקה שנוצרו על ידי AI')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.8vw',
                  padding: '2vh 2vw',
                  boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
                }}
              >
                <div
                  style={{
                    fontSize: '1vw',
                    fontWeight: 700,
                    color: '#059669',
                    marginBottom: '0.5vh',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('Happy Path', 'נתיב תקין')}
                </div>
                <div style={{ fontSize: '1.05vw', color: '#475569' }}>
                  {t(
                    'Apply valid 10% code SAVE10 — price reduced correctly',
                    'החל קוד תקין 10% SAVE10 — המחיר מופחת כראוי',
                  )}
                </div>
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.8vw',
                  padding: '2vh 2vw',
                  boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
                }}
              >
                <div
                  style={{
                    fontSize: '1vw',
                    fontWeight: 700,
                    color: '#D97706',
                    marginBottom: '0.5vh',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('Expired Code', 'קוד שפג תוקפו')}
                </div>
                <div style={{ fontSize: '1.05vw', color: '#475569' }}>
                  {t(
                    'Apply expired code — error message shown, price unchanged',
                    'החל קוד שפג תוקפו — הודעת שגיאה מוצגת, המחיר לא שונה',
                  )}
                </div>
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.8vw',
                  padding: '2vh 2vw',
                  boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
                }}
              >
                <div
                  style={{
                    fontSize: '1vw',
                    fontWeight: 700,
                    color: '#DC2626',
                    marginBottom: '0.5vh',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('Invalid Code', 'קוד לא תקין')}
                </div>
                <div style={{ fontSize: '1.05vw', color: '#475569' }}>
                  {t(
                    'Apply non-existent code — clear error, no exception thrown',
                    'החל קוד שאינו קיים — שגיאה ברורה, לא נזרקת חריגה',
                  )}
                </div>
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.8vw',
                  padding: '2vh 2vw',
                  boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
                }}
              >
                <div
                  style={{
                    fontSize: '1vw',
                    fontWeight: 700,
                    color: '#6366F1',
                    marginBottom: '0.5vh',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('Stacked Codes', 'קודים מצטברים')}
                </div>
                <div style={{ fontSize: '1.05vw', color: '#475569' }}>
                  {t(
                    'Apply two codes — only first accepted or both rejected per policy',
                    'החל שני קודים — רק הראשון מתקבל או שניהם נדחים לפי מדיניות',
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 9 of 40', 'שקופית 9 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
