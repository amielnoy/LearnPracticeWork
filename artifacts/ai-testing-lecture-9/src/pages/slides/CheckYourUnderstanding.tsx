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
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function CheckYourUnderstanding() {
  return (
    <div style={wrap} dir={dir}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '2vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Discussion Questions', 'שאלות לדיון')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 0.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Check Your Understanding', 'בדוק את הבנתך')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5vw' }}>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(13,148,136,0.25)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q1', 'ש1')}</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t('A new developer runs AI generation with no examples and gets 40 tests. She notices they all follow the same pattern. What is the most likely cause and fix?', 'מפתחת חדשה מריצה יצירת AI ללא דוגמאות ומקבלת 40 בדיקות. היא שמה לב שכולן עוקבות אחרי אותה תבנית. מה הסיבה הסבירה ביותר והתיקון?')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(217,119,6,0.25)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q2', 'ש2')}</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t('The AI triage verdict says "flaky" with 0.6 confidence. The human reviewer thinks it is a real bug. What should the process require before filing a ticket?', 'פסיקת הסיווג של AI אומרת "flaky" עם ביטחון 0.6. הסוקר האנושי חושב שזה באג אמיתי. מה צריך התהליך לדרוש לפני פתיחת כרטיס?')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(220,38,38,0.25)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#DC2626', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q3', 'ש3')}</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t('Coverage climbs from 72% to 91% after three sprints of AI-generated tests. The bug count in production does not decrease. What is the most likely explanation?', 'הכיסוי עולה מ-72% ל-91% לאחר שלושה ספרינטים של בדיקות שנוצרו על ידי AI. מספר הבאגים בפרודקשן לא יורד. מה ההסבר הסביר ביותר?')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(30,58,95,0.2)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q4', 'ש4')}</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t('Your acceptance_rate drops from 78% to 52% week-over-week. Which two Supabase columns would you query first to diagnose the problem?', 'שיעור ה-acceptance_rate שלך יורד מ-78% ל-52% משבוע לשבוע. אילו שתי עמודות Supabase תשאל תחילה לאבחון הבעיה?')}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
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
          <span>{t('Slide 38 of 40', 'שקופית 38 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
