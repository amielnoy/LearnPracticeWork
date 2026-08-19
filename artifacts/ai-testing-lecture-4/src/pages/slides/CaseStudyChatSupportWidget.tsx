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

export default function CaseStudyChatSupportWidget() {
  const steps = [
    {
      num: '1',
      title: t('Seed a Support Conversation', 'זריעת שיחת תמיכה'),
      desc: t(
        'beforeEach: inject auth, create a fresh conversation ID, mock the AI endpoint with a fixture that returns a known support FAQ answer.',
        'beforeEach: הזריקו auth, צרו ID שיחה חדש, הדמו את ה-endpoint של ה-AI עם fixture שמחזיר תשובה ידועה לשאלות נפוצות.',
      ),
    },
    {
      num: '2',
      title: t('Submit a User Question', 'הגשת שאלת משתמש'),
      desc: t(
        'Type into getByLabel("Your message"), click getByRole("button", { name: /send/i }). Assert the typing indicator appears immediately.',
        'הקלידו ל-getByLabel("Your message"), לחצו getByRole("button", { name: /send/i }). אמתו שמחוון ההקלדה מופיע מיידית.',
      ),
    },
    {
      num: '3',
      title: t('Wait for Stream Completion', 'המתנה לסיום הסטרים'),
      desc: t(
        'waitForFunction: data-stream="done" on [data-testid="ai-response-body"]. Never use a fixed timeout.',
        'waitForFunction: data-stream="done" על [data-testid="ai-response-body"]. לעולם אל תשתמשו ב-timeout קבוע.',
      ),
    },
    {
      num: '4',
      title: t('Assert on Structure, Not Exact Text', 'אסרציה על מבנה, לא על טקסט מדויק'),
      desc: t(
        'expect(responseBody).not.toBeEmpty(). Check that action buttons (copy, thumbs-up) are visible. Regex-match on expected structural keywords.',
        'expect(responseBody).not.toBeEmpty(). בדקו שכפתורי פעולה (העתקה, אגודל למעלה) גלויים. התאמת Regex על מילות מפתח מבניות צפויות.',
      ),
    },
    {
      num: '5',
      title: t('Verify Error Fallback', 'אימות חזרת שגיאה'),
      desc: t(
        'Override the route to return 503. Assert a graceful error message renders and the user can re-submit. Confirm the UI never freezes.',
        'דרסו את ה-route להחזרת 503. אמתו שהודעת שגיאה אלגנטית מרונדרת והמשתמש יכול לשלוח מחדש. אשרו שה-UI לא קופא.',
      ),
    },
  ];

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
          {t('Case Study', 'מקרה בוחן')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('A Chat Support Widget', 'ווידג\'ט תמיכת צ\'אט')}
        </h1>
        <p
          style={{
            fontSize: '1.2vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '38vw',
          }}
        >
          {t(
            'A realistic test suite for an AI chat support widget wires together dynamic-content assertions, streaming waits, resilient selectors, and error simulation in a single test.',
            'סוויטת בדיקות ריאליסטית לווידג\'ט תמיכת צ\'אט AI מחברת יחד אסרציות תוכן דינמי, המתנות סטרימינג, סלקטורים עמידים וסימולציית שגיאות בבדיקה אחת.',
          )}
        </p>

        <div
          style={{
            background: 'rgba(13,148,136,0.08)',
            border: '1px solid rgba(13,148,136,0.25)',
            borderRadius: '0.8vw',
            padding: '1.5vh 1.5vw',
          }}
        >
          <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.4vh' }}>
            {t('Techniques applied', 'טכניקות מיושמות')}
          </div>
          <div style={{ fontSize: '0.9vw', color: '#475569', lineHeight: 1.5 }}>
            {t(
              'Fixture setup · model mocking · streaming waits · data-testid selectors · getByRole · error simulation',
              'הגדרת Fixture · הדמיית מודל · המתנות סטרימינג · סלקטורי data-testid · getByRole · סימולציית שגיאות',
            )}
          </div>
        </div>
      </div>

      {/* Right column — numbered steps */}
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
            gap: '1.8vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '2.2vw',
                  height: '2.2vw',
                  minWidth: '2.2vw',
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1vw',
                  fontWeight: 700,
                }}
              >
                {s.num}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '1.05vw',
                    fontWeight: 700,
                    color: '#1E3A5F',
                    marginBottom: '0.3vh',
                  }}
                >
                  {s.title}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{s.desc}</div>
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
          <span>{t('Slide 25 of 30', 'שקופית 25 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
