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
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 2.5vw',
  color: '#1E3A5F',
};

export default function Section4Recap() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Section 4 Recap', 'סיכום חלק 4')}</div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Baselines, Monitoring & Reporting — Key Takeaways', 'בסיסים, ניטור ודיווח — עיקרי הדברים')}
        </h1>
      </div>

      {/* Cards */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '2px solid #0D9488', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(13,148,136,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#0D9488', marginBottom: '1.5vh' }}>01</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>{t('Tag baselines with git SHA and model', 'תייג בסיסים עם git SHA ומודל')}</div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Without the git SHA, you can\'t correlate a regression to a specific change. Always include version context.', 'ללא git SHA, לא ניתן לקשר רגרסיה לשינוי ספציפי. תמיד כלול הקשר גרסה.')}</div>
        </div>
      </div>
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F', marginBottom: '1.5vh' }}>02</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>{t('Two tiers: smoke on PR, full on nightly', 'שתי רמות: עשן על PR, מלא כל לילה')}</div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Smoke runs fast enough for every PR. Full runs build the baseline that nightly regression compares against.', 'ריצת עשן מספיק מהירה לכל PR. ריצות מלאות בונות את הבסיס שהרגרסיה הלילית משווה אליו.')}</div>
        </div>
      </div>
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F', marginBottom: '1.5vh' }}>03</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>{t('Dashboards need Supabase as a source of truth', 'דשבורדים צריכים את Supabase כמקור האמת')}</div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Storing all run data in Supabase lets any team member query, visualize, and alert on perf trends without special tooling.', 'אחסון כל נתוני הריצה ב-Supabase מאפשר לכל חבר צוות לשאול, להמחיש ולהתריע על מגמות ביצועים ללא כלים מיוחדים.')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 32 of 40', 'שקופית 32 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
