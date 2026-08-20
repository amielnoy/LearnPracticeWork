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
  gap: '3vh 0',
  color: '#1E3A5F',
};

export default function CheckYourUnderstanding() {
  const questions = [
    {
      q: t(
        'A test for your chat widget uses waitForTimeout(4000) before asserting on the AI response. What is the problem and how would you fix it?',
        "בדיקה של ווידג'ט הצ'אט שלכם משתמשת ב-waitForTimeout(4000) לפני אסרציה על תגובת ה-AI. מה הבעיה וכיצד הייתם מתקנים אותה?",
      ),
      a: t(
        'Fixed waits are fragile — too short on slow responses, too long on fast ones. Replace it with waitForFunction() that polls for data-stream="done", or use page.waitForResponse() to gate on the network completion event.',
        'המתנות קבועות שבירות — קצרות מדי על תגובות איטיות, ארוכות מדי על מהירות. החליפו ב-waitForFunction() שסוקר data-stream="done", או השתמשו ב-page.waitForResponse() כדי לשבש את אירוע השלמת הרשת.',
      ),
    },
    {
      q: t(
        'You want to run 20 parallel AI tests in CI without hitting rate limits. What two things should your fixture setup do?',
        'אתם רוצים להריץ 20 בדיקות AI מקבילות ב-CI מבלי להיתקל במגבלות קצב. מה שני הדברים שהגדרת ה-fixture שלכם צריכה לעשות?',
      ),
      a: t(
        '1) Mock the AI endpoint — mocked tests share nothing at the network level. 2) If real-model calls are needed, assign a unique test account per worker so rate-limit counters are independent.',
        '1) הדמיית ה-endpoint של ה-AI — בדיקות מדומות אינן חולקות דבר ברמת הרשת. 2) אם קריאות מודל אמיתי נחוצות, הקצו חשבון בדיקה ייחודי לכל worker כדי שמוני מגבלת הקצב יהיו עצמאיים.',
      ),
    },
    {
      q: t(
        'Name two selectors you should prefer over getByText() when testing AI-generated content, and explain why each is more resilient.',
        'ציינו שני סלקטורים שכדאי להעדיף על getByText() בעת בדיקת תוכן מיוצר AI, והסבירו מדוע כל אחד עמיד יותר.',
      ),
      a: t(
        'getByRole() — uses ARIA role, survives text rewrites. getByTestId() — matches an explicit data-testid on a stable container, unaffected by what the model generates inside it.',
        'getByRole() — משתמש בתפקיד ARIA, שורד כתיבות טקסט מחדש. getByTestId() — מתאים ל-data-testid מפורש על מכיל יציב, לא מושפע ממה שהמודל מייצר בתוכו.',
      ),
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
          <div>{t('TESTING TOOLS', 'כלי בדיקה')}</div>
          <div>{t('LECTURE 04', 'הרצאה 04')}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
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
            {t('Knowledge Check', 'בדיקת ידע')}
          </div>
          <h1
            style={{
              fontSize: '2.8vw',
              fontWeight: 800,
              margin: '0 0 1vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Check Your Understanding', 'בדקו את ההבנה שלכם')}
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', flex: 1 }}>
          {questions.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '1vw',
                border: '1px solid #E2E8F0',
                padding: '2vh 2vw',
                boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
                display: 'flex',
                gap: '2vw',
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: '2.5vw',
                  height: '2.5vw',
                  minWidth: '2.5vw',
                  backgroundColor: 'rgba(13,148,136,0.12)',
                  color: '#0D9488',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1vw',
                  fontWeight: 800,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '1.05vw',
                    fontWeight: 700,
                    color: '#1E3A5F',
                    marginBottom: '1vh',
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </div>
                <div
                  style={{
                    background: 'rgba(13,148,136,0.06)',
                    borderRadius: '0.5vw',
                    border: '1px solid rgba(13,148,136,0.18)',
                    padding: '1vh 1vw',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.85vw',
                      fontWeight: 600,
                      color: '#0D9488',
                      marginBottom: '0.4vh',
                      textTransform: isHe ? 'none' : 'uppercase',
                    }}
                  >
                    {t('Answer', 'תשובה')}
                  </div>
                  <div style={{ fontSize: '0.95vw', color: '#475569', lineHeight: 1.5 }}>
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 26 of 30', 'שקופית 26 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
