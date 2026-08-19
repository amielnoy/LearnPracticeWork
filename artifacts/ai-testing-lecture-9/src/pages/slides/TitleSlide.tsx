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
  gridTemplateColumns: '3fr 2fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

export default function TitleSlide() {
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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}
        >
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
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
          {t('Lecture Series — AI Testing Track', 'סדרת הרצאות — מסלול בדיקות AI')}
        </div>
        <h1
          style={{
            fontSize: '4.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}
        </h1>
        <p
          style={{
            fontSize: '1.4vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 4vh 0',
            lineHeight: 1.5,
            maxWidth: '38vw',
          }}
        >
          {t(
            'Using AI agents, Copilot, and custom pipelines to generate, review, and continuously improve your test suite.',
            'שימוש ב-AI agents, Copilot וצינורות מותאמים אישית ליצירה, סקירה ושיפור מתמיד של חבילת הבדיקות.',
          )}
        </p>

        <div style={{ display: 'flex', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              flex: 1,
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Lecture Number', 'מספר הרצאה')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#1E3A5F' }}>09</div>
              <div
                style={{
                  fontSize: '1vw',
                  fontWeight: 600,
                  color: '#0D9488',
                  backgroundColor: 'rgba(13,148,136,0.1)',
                  padding: '0.5vh 0.8vw',
                  borderRadius: '2vw',
                }}
              >
                {t('of 10', 'מתוך 10')}
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              flex: 1,
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Run Time', 'משך זמן')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#1E3A5F' }}>60</div>
              <div
                style={{
                  fontSize: '1vw',
                  fontWeight: 600,
                  color: '#0D9488',
                  backgroundColor: 'rgba(13,148,136,0.1)',
                  padding: '0.5vh 0.8vw',
                  borderRadius: '2vw',
                }}
              >
                {t('minutes', 'דקות')}
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
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
            {t("Today's Roadmap", 'מפת הדרך להיום')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', marginTop: '2vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '0.5vw', height: '4vh', backgroundColor: 'rgba(13,148,136,0.3)', borderRadius: '2px' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', fontWeight: 500 }}>{t('Why AI test generation', 'למה יצירת בדיקות AI')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '0.5vw', height: '4vh', backgroundColor: 'rgba(13,148,136,0.5)', borderRadius: '2px' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', fontWeight: 500 }}>{t('AI agents generating tests', 'AI agents מייצרים בדיקות')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '0.5vw', height: '4vh', backgroundColor: 'rgba(13,148,136,0.7)', borderRadius: '2px' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', fontWeight: 500 }}>{t('Tooling in practice', 'כלים בפועל')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '0.5vw', height: '4vh', backgroundColor: 'rgba(13,148,136,0.85)', borderRadius: '2px' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', fontWeight: 500 }}>{t('Quality control', 'בקרת איכות')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '0.5vw', height: '4vh', backgroundColor: '#0D9488', borderRadius: '2px' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', fontWeight: 500 }}>{t('End-to-end pipeline', 'צינור מקצה לקצה')}</div>
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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 1 of 40', 'שקופית 1 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
