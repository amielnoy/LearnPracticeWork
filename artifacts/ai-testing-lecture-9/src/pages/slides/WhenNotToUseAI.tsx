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
  gap: '3vh',
  color: '#1E3A5F',
};

export default function WhenNotToUseAI() {
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Guard Rails', 'מגבלות')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 0.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('When Not to Use AI for Tests', 'מתי לא להשתמש ב-AI לבדיקות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div
              style={{
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '1vw',
                padding: '2.5vh 2vw',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>
                {t('Security-critical logic', 'לוגיקה קריטית לאבטחה')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
                {t('Auth flows, permission checks, and payment handling demand human-authored assertions that verify actual intent, not generated surface coverage.', 'זרימות auth, בדיקות הרשאות וטיפול בתשלומים דורשים אסרציות שנכתבו על ידי אדם המאמתות כוונה אמיתית, לא כיסוי שטח שנוצר.')}
              </div>
            </div>
            <div
              style={{
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '1vw',
                padding: '2.5vh 2vw',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>
                {t('Regulatory compliance tests', 'בדיקות תאימות רגולטורית')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
                {t('Tests that must satisfy auditors need to be traceable to a human author with documented rationale — AI-generated tests rarely meet this bar without significant review.', 'בדיקות שחייבות לספק מבקרים צריכות להיות ניתנות למעקב עד לאדם עם נימוק מתועד.')}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div
              style={{
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '1vw',
                padding: '2.5vh 2vw',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>
                {t('Complex state-machine scenarios', 'תרחישים של מכונת מצב מורכבת')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
                {t('Multi-step transactional sequences where the order of operations matters deeply. AI may generate valid-looking tests that miss crucial state transitions.', 'רצפי עסקאות רב-שלביים שסדר הפעולות בהם קריטי. AI עלול ליצור בדיקות שנראות תקינות אך מחמיצות מעברי מצב חיוניים.')}
              </div>
            </div>
            <div
              style={{
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '1vw',
                padding: '2.5vh 2vw',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>
                {t('Entirely novel code with no patterns', 'קוד חדש לחלוטין ללא תבניות')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
                {t('AI generation quality degrades sharply when it cannot reference existing test patterns in the codebase. Write the first tests manually, then let AI follow the established pattern.', 'איכות יצירת AI יורדת חדה כשאין תבניות בדיקות קיימות. כתוב את הבדיקות הראשונות ידנית, ואז תן ל-AI לעקוב אחרי התבנית.')}
              </div>
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
          <span>{t('Slide 5 of 40', 'שקופית 5 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
