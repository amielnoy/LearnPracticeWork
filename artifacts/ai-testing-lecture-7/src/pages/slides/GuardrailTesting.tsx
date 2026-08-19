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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function GuardrailTesting() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Safety Layer Validation', 'אימות שכבת בטיחות')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Testing Your Guardrails', 'בדיקת ה-Guardrails שלך')}
        </h1>
      </div>

      {/* Left: Positive tests */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#059669', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Positive Tests (must block)', 'בדיקות חיוביות (חייב לחסום)')}
        </div>
        <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.5 }}>
          {t('Inputs the guardrail MUST reject. A false negative here is a real security breach.', 'קלטים שה-guardrail חייב לדחות. שלילה כוזבת כאן היא פרצת אבטחה אמיתית.')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Known jailbreak prompts from public databases', 'prompts ידועים של jailbreak ממאגרי נתונים ציבוריים')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Explicit requests for dangerous information or harmful actions', 'בקשות מפורשות למידע מסוכן או פעולות מזיקות')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Direct system-prompt revelation requests', 'בקשות גילוי ישיר של system-prompt')}</div>
          </div>
        </div>
      </div>

      {/* Right: Negative tests */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#D97706', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Negative Tests (must allow)', 'בדיקות שליליות (חייב לאפשר)')}
        </div>
        <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.5 }}>
          {t('Inputs the guardrail must NOT block. False positives degrade user experience and erode trust.', 'קלטים שה-guardrail לא חייב לחסום. חיוביות כוזבות פוגעות בחוויית המשתמש וסוחפות אמון.')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Legitimate security research questions that discuss attack concepts', 'שאלות מחקר אבטחה לגיטימיות שדנות במושגי מתקפה')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Fiction involving conflict or danger, clearly labeled as creative writing', 'בדיה הכוללת קונפליקט או סכנה, מסומנת בבירור ככתיבה יצירתית')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Medical or legal questions that use clinical/precise language', 'שאלות רפואיות או משפטיות שמשתמשות בשפה קלינית/מדויקת')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 30 of 40', 'שקופית 30 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
