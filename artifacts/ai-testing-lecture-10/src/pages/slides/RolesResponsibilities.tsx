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

export default function RolesResponsibilities() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Ownership', 'בעלות')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 1.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Roles and Responsibilities', 'תפקידים ואחריות')}
          </h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2vw' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ background: 'rgba(13,148,136,0.1)', borderRadius: '0.5vw', padding: '1vh 1vw', fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', textAlign: 'center' }}>
              {t('AI Quality Lead', 'ראש איכות AI')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Owns the strategy document, scorecard design, and the quarterly retro. One person per organization.', 'הבעלים של מסמך האסטרטגיה, עיצוב כרטיס הניקוד והרטרו הרבעוני. אדם אחד לארגון.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ background: 'rgba(56,189,248,0.1)', borderRadius: '0.5vw', padding: '1vh 1vw', fontSize: '1.1vw', fontWeight: 700, color: '#0369A1', textAlign: 'center' }}>
              {t('Team AI Quality Owner', 'בעל איכות AI של צוות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Owns the golden dataset, sprint retro, and monthly eval-set review for their team. One per team.', 'הבעלים של ערכת הנתונים הזהובה, רטרו ספרינט וסקירת ערכת הערכה חודשית לצוות שלהם. אחד לצוות.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '0.5vw', padding: '1vh 1vw', fontSize: '1.1vw', fontWeight: 700, color: '#92400E', textAlign: 'center' }}>
              {t('ML / Platform Engineer', 'מהנדס ML / פלטפורמה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Builds and maintains the CI pipeline, cost instrumentation, and the Supabase scorecard tables.', 'בונה ומתחזק את צינור ה-CI, מדידת עלות וטבלאות כרטיס הניקוד ב-Supabase.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ background: 'rgba(248,113,113,0.1)', borderRadius: '0.5vw', padding: '1vh 1vw', fontSize: '1.1vw', fontWeight: 700, color: '#991B1B', textAlign: 'center' }}>
              {t('Security Engineer', 'מהנדס אבטחה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Owns the security probe suite, findings triage, and ensures security remains a hard gate in all releases.', 'הבעלים של חבילת בדיקות האבטחה, תיוק ממצאים ומוודא שאבטחה נשארת שער קשיח בכל הגרסאות.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 31 of 40', 'שקופית 31 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
