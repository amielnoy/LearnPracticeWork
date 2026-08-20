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

export default function SecurityConsiderationsTeaser() {
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
          <div>{t('TESTING TOOLS', 'כלי בדיקה')}</div>
          <div>{t('LECTURE 04', 'הרצאה 04')}</div>
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
          {t('Coming Up', 'בקרוב')}
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
          {t("Testing Isn't Just About Correctness", 'בדיקות הן לא רק על נכונות')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'Everything covered in this lecture focuses on correctness: does the UI render the right output? But AI applications carry a unique class of security risk that correctness tests alone cannot catch.',
            'כל מה שנכסה בהרצאה זו מתמקד בנכונות: האם ה-UI מרנדר את הפלט הנכון? אך אפליקציות AI נושאות סוג ייחודי של סיכון אבטחה שבדיקות נכונות לבד אינן יכולות לתפוס.',
          )}
        </p>

        <div
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '0.8vw',
            padding: '2vh 1.5vw',
            marginBottom: '2vh',
          }}
        >
          <div
            style={{
              fontSize: '1.1vw',
              fontWeight: 700,
              color: '#D97706',
              marginBottom: '0.8vh',
            }}
          >
            {t('Prompt Injection', 'הזרקת פרומפט')}
          </div>
          <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
            {t(
              'An attacker embeds instructions inside user-supplied text that cause the model to override its system prompt, leak private data, or perform unintended actions. This is a security vulnerability — not a functional regression.',
              'תוקף מטמיע הוראות בתוך טקסט שסופק על ידי המשתמש הגורמות למודל לעקוף את פרומפט המערכת שלו, לדלוף נתונים פרטיים, או לבצע פעולות לא מכוונות. זה פגיעות אבטחה — לא רגרסיה פונקציונלית.',
            )}
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '0.8vw',
            padding: '2vh 1.5vw',
            boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.1vw',
              fontWeight: 700,
              color: '#1E3A5F',
              marginBottom: '0.8vh',
            }}
          >
            {t('Security-Focused E2E Testing', 'בדיקות E2E ממוקדות אבטחה')}
          </div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
            {t(
              'Writing Playwright tests that deliberately submit adversarial inputs and assert the UI (and model) responds safely is its own discipline — covered in a dedicated future lecture.',
              'כתיבת בדיקות Playwright שמגישות בכוונה קלטים יריבים ומוודאת שה-UI (והמודל) מגיבים בצורה בטוחה היא דיסציפלינה בפני עצמה — תכוסה בהרצאה עתידית ייעודית.',
            )}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#1E3A5F',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '3vh',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '1.5vw',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Correctness vs. Security Testing', 'בדיקות נכונות לעומת אבטחה')}
          </div>
          {[
            {
              aspect: t('Goal', 'מטרה'),
              correctness: t('UI renders correct output', 'UI מרנדר פלט נכון'),
              security: t('System resists adversarial input', 'המערכת עומדת בפני קלט יריבי'),
            },
            {
              aspect: t('Input type', 'סוג קלט'),
              correctness: t('Realistic user queries', 'שאילתות משתמש ריאליסטיות'),
              security: t('Crafted attack payloads', 'מטענות תקיפה מעוצבות'),
            },
            {
              aspect: t('Assertion focus', 'מיקוד אסרציה'),
              correctness: t('Structure, intent, completeness', 'מבנה, כוונה, שלמות'),
              security: t('Containment, refusal, data leakage', 'הכלה, סירוב, דליפת נתונים'),
            },
            {
              aspect: t('Covered in', 'מכוסה ב'),
              correctness: t('This lecture', 'הרצאה זו'),
              security: t('Dedicated security lecture', 'הרצאת אבטחה ייעודית'),
            },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr 1.5fr',
                gap: '0.5vw',
                alignItems: 'start',
              }}
            >
              <div style={{ fontSize: '0.9vw', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                {row.aspect}
              </div>
              <div
                style={{
                  fontSize: '0.88vw',
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.4vw',
                  padding: '0.5vh 0.6vw',
                  lineHeight: 1.3,
                }}
              >
                {row.correctness}
              </div>
              <div
                style={{
                  fontSize: '0.88vw',
                  color: '#FBBF24',
                  fontWeight: 500,
                  background: 'rgba(245,158,11,0.12)',
                  borderRadius: '0.4vw',
                  padding: '0.5vh 0.6vw',
                  lineHeight: 1.3,
                }}
              >
                {row.security}
              </div>
            </div>
          ))}
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
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 28 of 30', 'שקופית 28 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
