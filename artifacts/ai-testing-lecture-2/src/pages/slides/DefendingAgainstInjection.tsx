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

export default function DefendingAgainstInjection() {
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
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Safety & Security', 'בטיחות ואבטחה')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Defending Against Injection', 'הגנה מפני הזרקת פרומפטים')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Separate instructions from data wherever the API allows it (system role vs. user content)', 'הפרידו הנחיות מנתונים בכל מקום שה-API מאפשר (תפקיד מערכת מול תוכן משתמש)')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Never grant a model more tool access or privilege than the task strictly requires', 'לעולם אל תעניקו למודל יותר גישה לכלים או הרשאות ממה שהמשימה דורשת בהחלט')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Treat any model output that will be executed or displayed as untrusted, and sanitize it', 'התייחסו לכל פלט מודל שיוצג או יופעל כאל בלתי מהימן, וטהרו אותו')}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Test injection resistance the same way you test any security control \u2014 with adversarial inputs, not just happy-path ones', 'בדקו עמידות בפני הזרקה כמו כל בקרת אבטחה אחרת \u2014 עם קלטים עוינים, לא רק מסלול תקין')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2vh', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ width: '6vw', height: '7vw', borderRadius: '1.5vw 1.5vw 0.5vw 0.5vw', backgroundColor: 'rgba(13, 148, 136, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '2.4vw', height: '2.4vw', borderRadius: '50%', backgroundColor: '#0D9488' }} />
          </div>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', textAlign: 'center' }}>
            {t('Defense in Layers', 'הגנה בשכבות')}
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 14 of 18', 'שקופית 14 מתוך 18')}</span>
        </div>
      </div>
    </div>
  );
}
