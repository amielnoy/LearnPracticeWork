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

export default function CheckYourUnderstanding() {
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Discussion Prompts', 'נושאי דיון')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Check Your Understanding', 'בדקו את ההבנה שלכם')}
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2.5vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              display: 'flex',
              gap: '2vw',
              alignItems: 'flex-start',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.5vw',
                fontWeight: 700,
                color: '#0D9488',
                minWidth: '2.5vw',
              }}
            >
              Q1
            </div>
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.6 }}>
              {t(
                'What is wrong with asserting response.text equals an exact string against an LLM output? Give two distinct reasons.',
                'מה הבעיה בבדיקה ש-response.text שווה למחרוזת מדויקת מול פלט LLM? תנו שני טעמים נפרדים.',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2.5vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              display: 'flex',
              gap: '2vw',
              alignItems: 'flex-start',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.5vw',
                fontWeight: 700,
                color: '#D97706',
                minWidth: '2.5vw',
              }}
            >
              Q2
            </div>
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.6 }}>
              {t(
                'Where in the request lifecycle would you place a latency budget assertion, and why does placement matter?',
                'היכן במחזור חיי הבקשה תציבו קביעת תקציב זמן תגובה, ומדוע המיקום חשוב?',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2.5vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              display: 'flex',
              gap: '2vw',
              alignItems: 'flex-start',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.5vw',
                fontWeight: 700,
                color: '#DC2626',
                minWidth: '2.5vw',
              }}
            >
              Q3
            </div>
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.6 }}>
              {t(
                'Your AI endpoint returns a 200 and passes schema validation. A downstream consumer starts reporting wrong data. What testing layer did you miss?',
                'נקודת הקצה ה-AI שלכם מחזירה 200 ועוברת אימות סכמה. צרכן במורד הזרם מתחיל לדווח על נתונים שגויים. איזו שכבת בדיקה פספסתם?',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2.5vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              display: 'flex',
              gap: '2vw',
              alignItems: 'flex-start',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.5vw',
                fontWeight: 700,
                color: '#1E3A5F',
                minWidth: '2.5vw',
              }}
            >
              Q4
            </div>
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.6 }}>
              {t(
                "A provider returns a 429. Describe the test you would write to verify your service's retry and fallback behavior without making a real network call.",
                'ספק מחזיר 429. תארו את הבדיקה שתכתבו לאימות התנהגות הניסיון החוזר והנסיגה של השירות שלכם ללא ביצוע קריאת רשת אמיתית.',
              )}
            </div>
          </div>
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 27 of 30', 'שקופית 27 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
