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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '2.5vh',
  color: '#1E3A5F',
};

export default function PerfTestingInCI() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
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
      <div style={{ textAlign: isHe ? 'right' : 'left' }}>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Making Performance Testing a CI First-Class Citizen', 'הפיכת בדיקות ביצועים לאזרח ראשון ב-CI')}
        </h1>
      </div>

      {/* Five stages */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '1.5vw' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 1.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '0.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#FFFFFF' }}>1</div>
          </div>
          <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Smoke benchmark', 'בנצ\'מרק עשן')}</div>
          <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('10 requests per feature. Runs on every PR. Fast, cheap signal.', '10 בקשות לכל תכונה. פועל בכל PR. אות מהיר וזול.')}</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 1.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', background: '#1E3A5F', borderRadius: '0.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#FFFFFF' }}>2</div>
          </div>
          <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Full benchmark', 'בנצ\'מרק מלא')}</div>
          <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('300+ requests per feature. Nightly on main branch. Full percentile profile.', '300+ בקשות לכל תכונה. כל לילה על ענף main. פרופיל אחוזון מלא.')}</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 1.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '0.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#FFFFFF' }}>3</div>
          </div>
          <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Baseline compare', 'השוואת בסיס')}</div>
          <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('Fetch baseline from Supabase. Flag p99 or cost regression automatically.', 'שלוף בסיס מ-Supabase. סמן רגרסיית p99 או עלות אוטומטית.')}</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 1.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', background: '#1E3A5F', borderRadius: '0.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#FFFFFF' }}>4</div>
          </div>
          <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Gate decision', 'החלטת שער')}</div>
          <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('Block PR merge on regression. Allow with warning on soft threshold breach.', 'חסום מיזוג PR על רגרסיה. אפשר עם אזהרה על הפרת סף רך.')}</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 1.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '0.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 800, color: '#FFFFFF' }}>5</div>
          </div>
          <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Store & trend', 'שמור ועקוב אחר מגמות')}</div>
          <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('Write results to Supabase. Feed dashboard. Alert on sustained drift.', 'כתוב תוצאות ל-Supabase. הזן דשבורד. התריע על סחף מתמשך.')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 31 of 40', 'שקופית 31 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
