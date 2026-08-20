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
  color: '#FAFBFC',
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
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left */}
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
            letterSpacing: '0.08em',
          }}
        >
          {t('Lecture Complete', 'ההרצאה הושלמה')}
        </div>
        <h1
          style={{
            fontSize: '4vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FAFBFC',
          }}
        >
          {t('Thank You', 'תודה רבה')}
        </h1>
        <p
          style={{
            fontSize: '1.4vw',
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 4vh 0',
            lineHeight: 1.55,
            maxWidth: '38vw',
          }}
        >
          {t(
            'You now have the full toolkit to benchmark latency, load-test throughput, budget token costs, and gate regressions automatically in CI for any AI feature.',
            "עכשיו יש לך את ערכת הכלים המלאה לבנצ'מרק זמן אחזור, בדיקת עומס רוחב פס, תקצוב עלות טוקנים ורגרסיות שער אוטומטיות ב-CI לכל תכונת AI.",
          )}
        </p>

        <div style={{ display: 'flex', gap: '2vw' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid rgba(255,255,255,0.15)',
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Lecture', 'הרצאה')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#FAFBFC' }}>08</div>
              <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.55)' }}>
                {t('of 10', 'מתוך 10')}
              </div>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid rgba(255,255,255,0.15)',
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Slides', 'שקופיות')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#FAFBFC' }}>40</div>
              <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.55)' }}>
                {t('completed', 'הושלמו')}
              </div>
            </div>
          </div>
          <div
            style={{ background: '#0D9488', padding: '2.5vh 2vw', borderRadius: '1vw', flex: 1 }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Next up', 'הבא')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>
              {t('AI-Assisted Test Generation (Lecture 9)', 'יצירת בדיקות בעזרת AI (הרצאה 9)')}
            </div>
          </div>
        </div>
      </div>

      {/* Right — lecture series list */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            padding: '3vh 2.5vw',
            borderRadius: '1vw',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5vh',
          }}
        >
          <div
            style={{
              fontSize: '1.1vw',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '0.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Full Series', 'הסדרה המלאה')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.6)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('01 — Introduction to AI Testing', '01 — מבוא לבדיקות AI')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.6)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('02 — Prompt Engineering for Testers', '02 — הנדסת פרומפטים לבודקים')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.6)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('03 — Testing LLM Outputs', '03 — בדיקת פלטי LLM')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.6)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('04 — Playwright for AI Applications', '04 — Playwright ליישומי AI')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.6)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('05 — API Testing with AI Features', '05 — בדיקת API עם תכונות AI')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.6)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('06 — CI/CD for AI Test Suites', '06 — CI/CD לחבילות בדיקות AI')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.6)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('07 — Security Testing for AI', '07 — בדיקות אבטחה ל-AI')}
          </div>
          <div
            style={{
              fontSize: '1.05vw',
              color: '#0D9488',
              fontWeight: 700,
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('08 — Performance Testing AI Features', '08 — בדיקות ביצועים לתכונות AI')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: 'rgba(255,255,255,0.4)',
              paddingBottom: '1vh',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t('09 — AI-Assisted Test Generation', '09 — יצירת בדיקות בעזרת AI')}
          </div>
          <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.4)' }}>
            {t('10 — Building an AI Testing Strategy', '10 — בניית אסטרטגיית בדיקות AI')}
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
          color: 'rgba(255,255,255,0.35)',
          fontWeight: 500,
        }}
      >
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 40 of 40', 'שקופית 40 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
