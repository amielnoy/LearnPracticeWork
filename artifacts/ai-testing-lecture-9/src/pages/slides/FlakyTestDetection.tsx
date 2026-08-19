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

export default function FlakyTestDetection() {
  return (
    <div style={wrap} dir={dir}>
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Quality Control', 'בקרת איכות')}
        </div>
        <h1 style={{ fontSize: '2.8vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {t('Flaky Test Detection in Generated Tests', 'זיהוי בדיקות לא-יציבות בבדיקות שנוצרו')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2vh 0', lineHeight: 1.6 }}>
          {t(
            'AI-generated tests are more prone to flakiness because they often rely on timing assumptions, random data, or external services without proper isolation.',
            'בדיקות שנוצרו על ידי AI נוטות יותר לחוסר יציבות כי לעתים קרובות הן מסתמכות על הנחות תזמון, נתונים אקראיים, או שירותים חיצוניים ללא בידוד מתאים.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#D97706', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('Hardcoded time.sleep() or Date.now() comparisons without mocking', 'time.sleep() מקודד בצורה קשיחה או השוואות Date.now() ללא mock')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#D97706', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('Tests that depend on execution order (shared mutable state)', 'בדיקות שתלויות בסדר הביצוע (מצב משותף הניתן לשינוי)')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#D97706', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('Random data generation without fixed seeds', 'יצירת נתונים אקראית ללא זרעים קבועים')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            height: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5vh',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
            {t('Flaky Detection Strategy', 'אסטרטגיית זיהוי חוסר יציבות')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Run new tests 3x before merging', 'הרץ בדיקות חדשות 3 פעמים לפני מיזוג')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Any pass/fail variance marks the test as flaky and blocks it from the suite.', 'כל שונות pass/fail מסמנת את הבדיקה כלא-יציבה ומונעת כניסתה לחבילה.')}</div>
            </div>
            <div style={{ height: '1px', background: '#E2E8F0' }} />
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Static analysis pass before runtime', 'מעבר ניתוח סטטי לפני זמן ריצה')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Grep generated code for time.sleep, Date.now, Math.random without seed. Reject before CI runs.', 'חפש בקוד שנוצר time.sleep, Date.now, Math.random ללא seed. דחה לפני ריצת CI.')}</div>
            </div>
            <div style={{ height: '1px', background: '#E2E8F0' }} />
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Log flakiness verdicts in Supabase', 'רשום פסיקות חוסר יציבות ב-Supabase')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Store generator_tool so you can compare Copilot vs. Cursor flakiness rates.', 'אחסן generator_tool כדי שתוכל להשוות שיעורי חוסר יציבות בין Copilot ל-Cursor.')}</div>
            </div>
          </div>
        </div>
      </div>

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
          <span>{t('Slide 22 of 40', 'שקופית 22 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
