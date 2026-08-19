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

export default function SettingUpTestFixtures() {
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
          {t('Test Setup', 'הגדרת בדיקות')}
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
          {t('Setting Up Test Fixtures for AI Apps', 'הגדרת Fixtures לבדיקות AI')}
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
            'AI apps carry extra state between requests. Good fixtures isolate that state before every test run.',
            'אפליקציות AI נושאות מצב נוסף בין בקשות. Fixtures טובים מבדדים מצב זה לפני כל הרצת בדיקה.',
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
              {t('Seed Conversation State', 'זריעת מצב שיחה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Pre-populate the chat history your test needs via an API call or direct DB seed — never rely on a previous test to leave the right state behind.',
                'מלאו מראש את היסטוריית הצ\'אט שהבדיקה שלכם צריכה דרך קריאת API או זריעת DB ישירה — לעולם אל תסתמכו על בדיקה קודמת להשאיר את המצב הנכון.',
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
              {t('Mock Auth Before Navigation', 'הדמיית Auth לפני ניווט')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Inject a valid session cookie or bearer token in the Playwright fixture\'s beforeEach so every test starts already authenticated — eliminates flaky login flows.',
                'הזריקו cookie סשן תקפה או bearer token ב-beforeEach של ה-fixture של Playwright כדי שכל בדיקה תתחיל כשהיא כבר מאומתת — מבטל תהליכי התחברות רגישים.',
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
              {t('Reset Rate Limit Counters Between Tests', 'איפוס מונה מגבלת קצב בין בדיקות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'If your backend tracks per-user request quotas, call a reset endpoint or use a fresh test account per worker so rate-limit state never bleeds across tests.',
                'אם ה-backend שלכם עוקב אחר מכסות בקשות למשתמש, קראו ל-endpoint לאיפוס או השתמשו בחשבון בדיקה חדש לכל worker כדי שמצב מגבלת הקצב לא יזלוג בין בדיקות.',
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
            {t('Fixture Checklist', 'רשימת Fixtures')}
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
            {[
              t('Each test owns its own conversation context', 'כל בדיקה בעלת הקשר שיחה משלה'),
              t('Auth state injected — no UI login flow', 'מצב Auth מוזרק — ללא תהליך התחברות UI'),
              t('Rate limit counters reset in afterEach', 'מוני מגבלת קצב מאופסים ב-afterEach'),
              t('Model mock or fixture response pre-loaded', 'מוק מודל או תגובת fixture טעונה מראש'),
            ].map((item, i) => (
              <div
                key={i}
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
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>{item}</div>
              </div>
            ))}
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
          <span>{t('Slide 6 of 30', 'שקופית 6 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
