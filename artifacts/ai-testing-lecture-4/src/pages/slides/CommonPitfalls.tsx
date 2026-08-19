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

export default function CommonPitfalls() {
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
          {t('Lessons Learned', 'לקחים שנלמדו')}
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
          {t('Common Pitfalls to Avoid', 'מלכודות נפוצות שכדאי להימנע מהן')}
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
            'Most Playwright AI test failures come from three repeatable mistakes. Recognise them before they make it to your CI pipeline.',
            'רוב כשלי בדיקות AI ב-Playwright נובעים משלוש טעויות חוזרות. זהו אותן לפני שהן מגיעות לצינור ה-CI שלכם.',
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
              {t('Asserting on Exact Generated Text', 'אסרציה על טקסט מיוצר מדויק')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'toHaveText() on AI-generated content is fragile by definition. The model will rephrase and your suite will break on a valid answer. Assert on structure or intent instead.',
                'toHaveText() על תוכן מיוצר AI הוא שביר בהגדרה. המודל ינסח מחדש וסוויטת הבדיקות שלכם תישבר על תשובה תקפה. בדקו מבנה או כוונה במקום.',
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
              {t('Using sleep() Instead of Real Signals', 'שימוש ב-sleep() במקום אותות אמיתיים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'waitForTimeout(5000) either times out on slow model responses or races on fast ones. Always synchronise on an observable DOM signal the app actually emits.',
                'waitForTimeout(5000) מסתיים בפסק זמן על תגובות מודל איטיות או מתחרה על מהירות. תמיד סנכרנו על אות DOM נצפה שהאפליקציה אכן פולטת.',
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
              {t('Never Testing the Failure Path', 'אי-בדיקת נתיב הכשל לעולם')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Dev always returns a perfect response, so the error path never gets exercised. Mock a failure and verify the UI handles it gracefully before users find the blank screen first.',
                'ב-dev תמיד מחזירים תגובה מושלמת, ולכן נתיב השגיאה לעולם אינו נבדק. דמו כשל ואמתו שה-UI מטפל בו בצורה אלגנטית לפני שהמשתמשים מוצאים את המסך הריק ראשונים.',
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
            {t('A Quick Self-Check', 'בדיקה עצמית מהירה')}
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
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Does any test use toHaveText() on AI-generated content?',
                  'האם בדיקה כלשהי משתמשת ב-toHaveText() על תוכן מיוצר AI?',
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
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Does any test call waitForTimeout() before asserting on a stream?',
                  'האם בדיקה כלשהי קוראת ל-waitForTimeout() לפני אסרציה על סטרים?',
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
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Is there at least one test that mocks a model failure?',
                  'האם קיימת לפחות בדיקה אחת שמדמה כשל מודל?',
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
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 29 of 30', 'שקופית 29 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
