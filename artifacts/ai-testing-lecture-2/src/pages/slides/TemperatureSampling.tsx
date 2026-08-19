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

export default function TemperatureSampling() {
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
          {t('Temperature & Sampling Parameters', 'טמפרטורה ופרמטרי דגימה')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Temperature controls how much randomness is injected into token selection', 'הטמפרטורה שולטת בכמות האקראיות שמוזרקת לבחירת הטוקנים')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Low temperature (0\u20130.3): near-deterministic, best for extraction, classification, structured output', 'טמפרטורה נמוכה (0\u20130.3): כמעט דטרמיניסטית, מתאימה לחילוץ מידע, סיווג ופלט מובנה')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('High temperature (0.7+): more varied, better for brainstorming \u2014 worse for anything you plan to assert on', 'טמפרטורה גבוהה (0.7+): מגוונת יותר, מתאימה לסיעור מוחות \u2014 פחות מתאימה לכל דבר שמתכננים לבדוק מולו assertion')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('top_p and max_tokens shape output further; testers should know their defaults, not just the model\u2019s', 'top_p ו-max_tokens מעצבים את הפלט הלאה; על הבודקים להכיר את ברירות המחדל שלהם, לא רק את אלה של המודל')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 2.5vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3vh', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ fontSize: '0.95vw', fontWeight: 600, color: '#64748B', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
            {t('Temperature Scale', 'סולם טמפרטורה')}
          </div>
          <div style={{ height: '1.2vh', borderRadius: '1vh', background: 'linear-gradient(90deg, rgba(13,148,136,0.9), rgba(13,148,136,0.15))' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9vw', color: '#64748B', fontWeight: 600 }}>
            <span>0.0</span>
            <span>0.3</span>
            <span>0.7</span>
            <span>1.0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95vw', color: '#1E3A5F', fontWeight: 600 }}>
            <span>{t('Deterministic', 'דטרמיניסטי')}</span>
            <span>{t('Varied', 'מגוון')}</span>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 6 of 18', 'שקופית 6 מתוך 18')}</span>
        </div>
      </div>
    </div>
  );
}
