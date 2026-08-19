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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}
        >
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
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
            letterSpacing: '0.08em',
          }}
        >
          {t('AI Testing Academy \u2014 Series Complete', 'AI Testing Academy \u2014 הסדרה הושלמה')}
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
            "You\u2019ve completed all six lectures of the AI Testing Academy. You now have the full toolkit to design, run, and maintain AI test suites that are reliable, affordable, and honest about what they find.",
            'השלמת את כל שש ההרצאות של AI Testing Academy. כעת יש לך את ערכת הכלים המלאה לתכנון, הפעלה ותחזוקה של חבילות בדיקות AI שהן אמינות, כלכליות וכנות לגבי מה שהן מוצאות.',
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
              {t('Lectures Completed', 'הרצאות שהושלמו')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#FAFBFC' }}>06</div>
              <div
                style={{
                  fontSize: '1vw',
                  fontWeight: 600,
                  color: '#0D9488',
                  backgroundColor: 'rgba(13, 148, 136, 0.2)',
                  padding: '0.5vh 0.8vw',
                  borderRadius: '2vw',
                }}
              >
                {t('of 06', 'מתוך 06')}
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
              {t('Series Status', 'מצב הסדרה')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1vw' }}>
              <div style={{ fontSize: '2.2vw', fontWeight: 700, color: '#0D9488' }}>
                {t('Complete', 'הושלם')}
              </div>
            </div>
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
            background: 'rgba(255,255,255,0.06)',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid rgba(255,255,255,0.12)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '1.3vw',
              fontWeight: 700,
              color: '#FAFBFC',
              borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('The Full Series', 'הסדרה המלאה')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8vh' }}>
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
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Lecture 1: Introduction to AI Testing', 'הרצאה 1: מבוא לבדיקות AI')}
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
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Lecture 2: Prompt Engineering for Testers', 'הרצאה 2: הנדסת Prompt לבודקים')}
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
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Lecture 3: Testing LLM Outputs', 'הרצאה 3: בדיקת פלטי LLM')}
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
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Lecture 4: Playwright for AI Applications', 'הרצאה 4: Playwright ליישומי AI')}
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
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Lecture 5: API Testing with AI Features', 'הרצאה 5: בדיקות API עם תכונות AI')}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1.5vw',
                alignItems: 'center',
                background: 'rgba(13,148,136,0.15)',
                borderRadius: '0.8vw',
                padding: '1vh 1vw',
              }}
            >
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  flexShrink: 0,
                  border: '3px solid rgba(255,255,255,0.4)',
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#FAFBFC' }}>
                {t('Lecture 6: CI/CD for AI Test Suites', 'הרצאה 6: CI/CD לחבילות בדיקות AI')}
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
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 500,
        }}
      >
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 30 of 30', 'שקופית 30 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
