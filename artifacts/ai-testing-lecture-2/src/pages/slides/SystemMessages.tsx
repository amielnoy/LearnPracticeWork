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
const chip: React.CSSProperties = {
  fontSize: '0.9vw',
  fontWeight: 600,
  color: '#0D9488',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  padding: '1vh 1.2vw',
  borderRadius: '0.5vw',
  textAlign: 'center',
};

export default function SystemMessages() {
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
        <h1 style={{ fontSize: '3.6vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('System Messages: Setting the Contract', 'הודעות מערכת: קביעת החוזה')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'The system message is the closest thing a prompt has to a spec \u2014 put constraints there, not in the user turn',
                'הודעת המערכת היא הדבר הקרוב ביותר שיש לפרומפט למפרט \u2014 יש למקם בה את האילוצים, לא בפניית המשתמש',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'State what the model must never do (scope, tone, disallowed topics) as explicitly as what it should do',
                'יש לציין באופן מפורש מה המודל אסור לו לעשות (היקף, טון, נושאים אסורים) בדיוק כמו מה שהוא כן אמור לעשות',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'A vague system message (\u201cbe helpful\u201d) produces vague, hard-to-test behavior',
                'הודעת מערכת מעורפלת (\u201cתהיה מועיל\u201d) מייצרת התנהגות מעורפלת וקשה לבדיקה',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Testable system messages name concrete rules a reviewer \u2014 or an assertion \u2014 can check against',
                'הודעות מערכת ניתנות לבדיקה מגדירות כללים קונקרטיים שסוקר \u2014 או assertion \u2014 יכול לבדוק מולם',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '3.5vh 2.5vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ fontSize: '0.95vw', fontWeight: 600, color: '#64748B', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em', textAlign: isHe ? 'right' : 'left' }}>
            {t('The Contract', 'החוזה')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1vw' }}>
            <div style={chip}>{t('ROLE', 'תפקיד')}</div>
            <div style={chip}>{t('TONE', 'טון')}</div>
            <div style={chip}>{t('SCOPE', 'היקף')}</div>
            <div style={chip}>{t('RULES', 'כללים')}</div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 6 of 21', 'שקופית 6 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
