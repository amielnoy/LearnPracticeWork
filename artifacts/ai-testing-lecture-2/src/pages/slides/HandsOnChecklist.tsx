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

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5vw',
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '1vw',
  padding: '1.8vh 2vw',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

const box: React.CSSProperties = {
  width: '1.6vw',
  height: '1.6vw',
  minWidth: '1.6vw',
  borderRadius: '0.4vw',
  border: '2px solid #0D9488',
};

export default function HandsOnChecklist() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('PRACTICAL TOOLKIT', 'ערכת כלים מעשית')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.5vh' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Practical Toolkit', 'ערכת כלים מעשית')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Hands-On Checklist for Your Next Prompt Review', 'רשימת בדיקה מעשית לסקירת הפרומפט הבאה שלכם')}
          </h1>
        </div>

        <div style={row}>
          <div style={box} />
          <div style={{ fontSize: '1.25vw', color: '#1E3A5F' }}>
            {t('Does the system message state rules explicitly enough to check against?', 'האם הודעת המערכת קובעת כללים באופן מפורש דיו כדי לבדוק מולם?')}
          </div>
        </div>
        <div style={row}>
          <div style={box} />
          <div style={{ fontSize: '1.25vw', color: '#1E3A5F' }}>
            {t('Are sampling settings (temperature, top_p) matched to how deterministic this feature needs to be?', 'האם הגדרות הדגימה (temperature, top_p) תואמות למידת הדטרמיניזם שהפיצ\u2019ר דורש?')}
          </div>
        </div>
        <div style={row}>
          <div style={box} />
          <div style={{ fontSize: '1.25vw', color: '#1E3A5F' }}>
            {t('Is the expected output structured enough to validate automatically?', 'האם הפלט הצפוי מובנה דיו כדי לוודא אותו אוטומטית?')}
          </div>
        </div>
        <div style={row}>
          <div style={box} />
          <div style={{ fontSize: '1.25vw', color: '#1E3A5F' }}>
            {t('Have you tried at least one adversarial or injection-style input against it?', 'האם ניסיתם לפחות קלט עוין אחד או מסוג הזרקה מולו?')}
          </div>
        </div>
        <div style={row}>
          <div style={box} />
          <div style={{ fontSize: '1.25vw', color: '#1E3A5F' }}>
            {t('Is this prompt versioned, reviewed, and covered by a regression test?', 'האם הפרומפט מנוהל בגרסאות, נסקר ומכוסה בבדיקת רגרסיה?')}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 21', 'שקופית 19 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
