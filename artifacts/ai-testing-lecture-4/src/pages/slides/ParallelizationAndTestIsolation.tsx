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

export default function ParallelizationAndTestIsolation() {
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
          {t('Scale', 'קנה מידה')}
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
          {t('Running Many AI Tests in Parallel Safely', 'הרצת בדיקות AI רבות במקביל בבטחה')}
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
            'AI tests have isolation concerns that ordinary web tests do not. Shared rate limits, conversation state, and user accounts can cause silent cross-test contamination.',
            'לבדיקות AI יש חששות בידוד שאין לבדיקות אינטרנט רגילות. מגבלות קצב משותפות, מצב שיחה וחשבונות משתמשים יכולים לגרום לזיהום שקט בין-בדיקות.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('One Test Account Per Worker', 'חשבון בדיקה אחד לכל Worker')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Parallelism multiplies requests. If four workers share one rate-limited account, the suite will hit 429s during parallel runs. Provision a separate test account per Playwright worker.',
                'מקביליות מכפילה בקשות. אם ארבעה workers חולקים חשבון מוגבל קצב אחד, הסוויטה תיתקל ב-429 במהלך הרצות מקביליות. הגדירו חשבון בדיקה נפרד לכל worker של Playwright.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Isolated Conversation IDs', 'IDs שיחה מבודדים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Generate a fresh conversation or session ID in each test\'s fixture setup. Never reuse a session ID across parallel tests — history from test A must not appear in test B.',
                'צרו ID שיחה או סשן חדש בהגדרת ה-fixture של כל בדיקה. לעולם אל תעשו שימוש חוזר ב-ID סשן בבדיקות מקביליות — ההיסטוריה מבדיקה A לא חייבת להופיע בבדיקה B.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Mock by Default in Parallel Runs', 'הדמייה כברירת מחדל בהרצות מקביליות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Mocked tests share nothing at the network level, eliminating all rate-limit and quota contention. Reserve real-model calls for sequentially-scheduled smoke suites.',
                'בדיקות מדומות אינן חולקות דבר ברמת הרשת, מה שמבטל את כל המחלוקות סביב מגבלות קצב ומכסות. שמרו קריאות מודל אמיתי לסוויטות עשן מתוזמנות ברצף.',
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
            {t('Isolation Checklist', 'רשימת בידוד')}
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
              t('Separate test account per parallel worker', 'חשבון בדיקה נפרד לכל worker מקבילי'),
              t('Unique conversation ID seeded per test', 'ID שיחה ייחודי נזרע לכל בדיקה'),
              t('Rate limit counters reset in test teardown', 'מוני מגבלת קצב מאופסים בפירוק הבדיקה'),
              t('Mocked by default — real model only in smoke', 'מדומה כברירת מחדל — מודל אמיתי רק בעשן'),
              t('No shared in-memory stores between workers', 'אין מאגרים בזיכרון משותפים בין workers'),
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
                <div style={{ fontSize: '1.05vw', fontWeight: 500, color: '#1E3A5F' }}>{item}</div>
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
          <span>{t('Slide 22 of 30', 'שקופית 22 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
