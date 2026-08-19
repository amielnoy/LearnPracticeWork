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
const dot: React.CSSProperties = { width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' };
const tag: React.CSSProperties = {
  fontSize: '1vw',
  fontWeight: 700,
  color: '#0D9488',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  padding: '1vh 1.4vw',
  borderRadius: '2vw',
};

export default function PromptTemplatesVersioning() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('CORE TECHNIQUES', 'טכניקות ליבה')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Core Techniques', 'טכניקות ליבה')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Prompt Templates & Versioning', 'תבניות פרומפטים וניהול גרסאות')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Treat prompts as code: store them in version control, not scattered in strings across the codebase', 'התייחסו לפרומפטים כמו לקוד: שמרו אותם בבקרת גרסאות, לא מפוזרים כמחרוזות ברחבי הקוד')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Parameterize the variable parts (user input, context) and keep the scaffold fixed and reviewable', 'הפכו את החלקים המשתנים לפרמטרים (קלט משתמש, הקשר) ושמרו על השלד קבוע וניתן לסקירה')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Tag a prompt version alongside the model version it was tuned against', 'תייגו גרסת פרומפט יחד עם גרסת המודל שמולה היא כווננה')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('A prompt change should trigger the same review and test run as any other code change', 'שינוי בפרומפט צריך להפעיל את אותה סקירה והרצת בדיקות כמו כל שינוי קוד אחר')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 2.5vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vh' }}>
          <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#64748B', textTransform: isHe ? 'none' : 'uppercase' }}>
            {t('Prompt Version History', 'היסטוריית גרסאות פרומפט')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1vw', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={tag}>v1.0</div>
            <span style={{ color: '#94A3B8', fontSize: '1.2vw' }}>&rarr;</span>
            <div style={tag}>v1.1</div>
            <span style={{ color: '#94A3B8', fontSize: '1.2vw' }}>&rarr;</span>
            <div style={tag}>v2.0</div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 12 of 21', 'שקופית 12 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
