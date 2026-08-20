import { t, dir, isHe } from '@/lib/i18n';

const wrap: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#1E3A5F',
  fontFamily: "'Inter', sans-serif",
  padding: '4vh 4vw',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '3fr 2fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#FFFFFF',
};

export default function ClosingSlide() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
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
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
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
            marginBottom: '2vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('AI Testing Academy', 'AI Testing Academy')}
        </div>
        <h1
          style={{
            fontSize: '4.5vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Thank You', 'תודה רבה')}
        </h1>
        <p
          style={{
            fontSize: '1.5vw',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 4vh 0',
            lineHeight: 1.5,
            maxWidth: '38vw',
          }}
        >
          {t(
            'You now have the full toolkit for testing AI-backed API endpoints — from schema contracts to semantic checks, latency budgets, and graceful fallbacks.',
            'כעת יש לכם את ערכת הכלים המלאה לבדיקת נקודות קצה API המגובות ב-AI — מחוזי סכמה ועד בדיקות סמנטיות, תקציבי זמן תגובה ונסיגות חינות.',
          )}
        </p>

        {/* Next lecture teaser */}
        <div
          style={{
            background: 'rgba(13, 148, 136, 0.15)',
            border: '1px solid rgba(13, 148, 136, 0.4)',
            borderRadius: '1vw',
            padding: '2.5vh 2.5vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div
            style={{
              fontSize: '0.9vw',
              fontWeight: 700,
              color: '#0D9488',
              marginBottom: '1vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Coming Next', 'בא בהמשך')}
          </div>
          <div style={{ fontSize: '1.5vw', fontWeight: 700, color: '#FFFFFF' }}>
            {t(
              'Lecture 6 \u2014 CI/CD for AI Test Suites',
              'הרצאה 6 \u2014 CI/CD לחבילות בדיקות AI',
            )}
          </div>
          <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.7)', marginTop: '0.8vh' }}>
            {t(
              'Automate the full test pipeline: gate merges, track regressions, and ship AI features with confidence.',
              'אוטומטו את צינור הבדיקות המלא: עצרו מיזוגים, עקבו אחר נסיגות, ושלחו תכונות AI בביטחון.',
            )}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.07)',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid rgba(255,255,255,0.12)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
            {t('Lecture Series Progress', 'התקדמות סדרת הרצאות')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh', marginTop: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.5)' }}>
                {t('Lec 1: Intro to AI Testing', 'הרצ 1: מבוא לבדיקות AI')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.5)' }}>
                {t('Lec 2: Prompt Engineering for Testers', 'הרצ 2: הנדסת הנחיות לבודקים')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.5)' }}>
                {t('Lec 3: Testing LLM Outputs', 'הרצ 3: בדיקת פלטי LLM')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.5)' }}>
                {t('Lec 4: Playwright for AI Apps', 'הרצ 4: Playwright לאפליקציות AI')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  border: '3px solid #0D9488',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1vw', color: '#FFFFFF', fontWeight: 600 }}>
                {t('Lec 5: API Testing with AI Features', 'הרצ 5: בדיקות API עם תכונות AI')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  backgroundColor: 'transparent',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.4)' }}>
                {t('Lec 6: CI/CD for AI Test Suites', 'הרצ 6: CI/CD לחבילות בדיקות AI')}
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
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '2vh',
          fontSize: '0.9vw',
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 500,
        }}
      >
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 30 of 30', 'שקופית 30 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
