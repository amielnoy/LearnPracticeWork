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
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#FAFBFC',
};

export default function ClosingSlide() {
  return (
    <div style={wrap} dir={dir}>
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em', color: '#FAFBFC' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '2vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.1em' }}>
          {t('AI Testing Academy', 'AI Testing Academy')}
        </div>
        <h1 style={{ fontSize: '4vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFBFC' }}>
          {t('Thank You', 'תודה רבה')}
        </h1>
        <p style={{ fontSize: '1.4vw', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: '36vw', marginBottom: '4vh' }}>
          {t(
            'You now have the knowledge to set up, operate, and improve an AI-assisted test generation pipeline.',
            'עכשיו יש לכם את הידע להקים, להפעיל ולשפר צינור יצירת בדיקות בסיוע AI.',
          )}
        </p>
        <div style={{ width: '6vw', height: '0.4vw', backgroundColor: '#0D9488', borderRadius: '1vw' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '1vw',
            padding: '4vh 3vw',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2vh',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#FAFBFC', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '2vh' }}>
            {t('The Series', 'הסדרה')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>01 — {t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>02 — {t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>03 — {t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>04 — {t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>05 — {t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>06 — {t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>07 — {t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.6)' }}>08 — {t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488' }}>09 — {t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')} ←</div>
            <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.4)' }}>10 — {t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
          </div>
        </div>
      </div>

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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 40 of 40', 'שקופית 40 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
