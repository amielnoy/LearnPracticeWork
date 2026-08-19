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

const bulletRow: React.CSSProperties = { display: 'flex', gap: '1.2vw', alignItems: 'flex-start' };
const dot: React.CSSProperties = { width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#B45309', marginTop: '0.7vw' };

export default function PromptInjectionBasics() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('SAFETY & SECURITY', 'בטיחות ואבטחה')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#B45309', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Safety & Security', 'בטיחות ואבטחה')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Prompt Injection Basics: What It Is', 'יסודות הזרקת פרומפטים: מה זה')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Prompt injection: input designed to make the model ignore its original instructions', 'הזרקת פרומפטים: קלט שנועד לגרום למודל להתעלם מההנחיות המקוריות שלו')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('It exploits the fact that instructions and data often arrive in the same channel \u2014 plain text', 'היא מנצלת את העובדה שהנחיות ונתונים מגיעים לרוב באותו ערוץ \u2014 טקסט רגיל')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Any prompt that includes untrusted text (user input, web pages, documents) is a potential injection surface', 'כל פרומפט הכולל טקסט לא מהימן (קלט משתמש, דפי אינטרנט, מסמכים) הוא משטח הזרקה פוטנציאלי')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('This isn\u2019t a hypothetical \u2014 it\u2019s one of the most common real-world failures in AI features', 'זו לא תיאוריה \u2014 זהו אחד הכשלים הנפוצים ביותר בעולם האמיתי בפיצ\u2019רי AI')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2vh', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ width: '7vw', height: '7vw', borderRadius: '50%', border: '0.5vw solid rgba(180, 83, 9, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', backgroundColor: '#B45309' }} />
          </div>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', textAlign: 'center' }}>
            {t('Untrusted Text = Risk', 'טקסט לא מהימן = סיכון')}
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 12 of 18', 'שקופית 12 מתוך 18')}</span>
        </div>
      </div>
    </div>
  );
}
