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

const lectures = [
  { num: '01', en: 'Introduction to AI Testing', he: 'מבוא לבדיקות AI' },
  { num: '02', en: 'Prompt Engineering for Testers', he: 'הנדסת הנחיות לבודקים' },
  { num: '03', en: 'Testing LLM Outputs', he: 'בדיקת פלטי LLM' },
  { num: '04', en: 'Playwright for AI Applications', he: 'Playwright לאפליקציות AI' },
  { num: '05', en: 'API Testing with AI Features', he: 'בדיקות API עם תכונות AI' },
  { num: '06', en: 'CI/CD for AI Test Suites', he: 'CI/CD לחבילות בדיקות AI' },
  { num: '07', en: 'Security Testing for AI', he: 'בדיקות אבטחה ל-AI', current: true },
  { num: '08', en: 'Performance Testing AI Features', he: 'בדיקות ביצועים לתכונות AI' },
  { num: '09', en: 'AI-Assisted Test Generation', he: 'יצירת בדיקות בסיוע AI' },
  { num: '10', en: 'Building an AI Testing Strategy', he: 'בניית אסטרטגיית בדיקות AI' },
];

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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em', color: '#FAFBFC' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.4vw', fontWeight: 600, color: '#0D9488', marginBottom: '1.5vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Lecture 07 Complete', 'הרצאה 07 הושלמה')}
        </div>
        <h1 style={{ fontSize: '4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#FAFBFC' }}>
          {t('Thank You', 'תודה רבה')}
        </h1>
        <p style={{ fontSize: '1.4vw', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '3vh', maxWidth: '28vw' }}>
          {t(
            'You now have a complete framework for identifying, testing, and defending against the top AI security vulnerabilities.',
            'כעת יש לך מסגרת שלמה לזיהוי, בדיקה והגנה מפני פגיעויות האבטחה המובילות של AI.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{t('Next: Lecture 08 — Performance Testing AI Features', 'הבא: הרצאה 08 — בדיקות ביצועים לתכונות AI')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{t('10 Supabase-backed worked examples included in this lecture', '10 דוגמאות מעשיות מגובות ב-Supabase כלולות בהרצאה זו')}</div>
          </div>
        </div>
      </div>

      {/* Right: lecture series list */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1vw',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '3vh 2.5vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5vh',
          }}
        >
          <div style={{ fontSize: '1.1vw', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5vh', textAlign: isHe ? 'right' : 'left', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('The Full Series', 'הסדרה המלאה')}
          </div>
          {lectures.map((lec) => (
            <div
              key={lec.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5vw',
                padding: '1vh 1vw',
                borderRadius: '0.5vw',
                background: lec.current ? 'rgba(13,148,136,0.2)' : 'transparent',
                border: lec.current ? '1px solid rgba(13,148,136,0.4)' : '1px solid transparent',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ fontSize: '1vw', fontWeight: 700, color: lec.current ? '#0D9488' : 'rgba(255,255,255,0.4)', minWidth: '2.5vw' }}>
                {lec.num}
              </div>
              <div style={{ fontSize: '1.05vw', color: lec.current ? '#FAFBFC' : 'rgba(255,255,255,0.55)', fontWeight: lec.current ? 600 : 400 }}>
                {t(lec.en, lec.he)}
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
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '2vh',
          fontSize: '0.9vw',
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 500,
        }}
      >
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 40 of 40', 'שקופית 40 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
