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
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function PerformanceDashboards() {
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

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Visibility at a Glance', 'נראות במבט אחד')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Performance Dashboards', 'דשבורדי ביצועים')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'A perf dashboard backed by Supabase gives your whole team visibility into latency, cost, and throughput trends without needing to run queries.',
            'דשבורד ביצועים מגובה ב-Supabase נותן לכל הצוות נראות של מגמות זמן אחזור, עלות ורוחב פס מבלי להצטרך להריץ שאילתות.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Essential charts:', 'תרשימים חיוניים:')}</div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('p50/p95/p99 latency over 30 days (time series)', 'זמן אחזור p50/p95/p99 על 30 יום (סדרה זמנית)')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Daily cost per feature (bar chart with budget line)', 'עלות יומית לכל תכונה (תרשים עמודות עם קו תקציב)')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Error rate by model (line chart)', 'שיעור שגיאות לפי מודל (תרשים קו)')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Throughput vs. baseline table (current CI run)', 'רוחב פס לעומת טבלת בסיס (ריצת CI נוכחית)')}</div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B', marginBottom: '2vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Mock Dashboard — Latency Trend', 'דשבורד לדוגמה — מגמת זמן אחזור')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-end', height: '12vh' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5vh', flex: 1 }}>
                <div style={{ width: '100%', height: '6vh', background: '#BFDBFE', borderRadius: '0.4vw 0.4vw 0 0' }} />
                <div style={{ fontSize: '0.7vw', color: '#94A3B8' }}>W1</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5vh', flex: 1 }}>
                <div style={{ width: '100%', height: '7vh', background: '#93C5FD', borderRadius: '0.4vw 0.4vw 0 0' }} />
                <div style={{ fontSize: '0.7vw', color: '#94A3B8' }}>W2</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5vh', flex: 1 }}>
                <div style={{ width: '100%', height: '6.5vh', background: '#60A5FA', borderRadius: '0.4vw 0.4vw 0 0' }} />
                <div style={{ fontSize: '0.7vw', color: '#94A3B8' }}>W3</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5vh', flex: 1 }}>
                <div style={{ width: '100%', height: '9vh', background: '#3B82F6', borderRadius: '0.4vw 0.4vw 0 0' }} />
                <div style={{ fontSize: '0.7vw', color: '#94A3B8' }}>W4</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5vh', flex: 1 }}>
                <div style={{ width: '100%', height: '11vh', background: '#DC2626', borderRadius: '0.4vw 0.4vw 0 0' }} />
                <div style={{ fontSize: '0.7vw', color: '#DC2626', fontWeight: 600 }}>W5</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5vh', borderTop: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.9vw', color: '#64748B' }}>{t('p99 latency by week', 'זמן אחזור p99 לפי שבוע')}</div>
              <div style={{ fontSize: '0.9vw', color: '#DC2626', fontWeight: 700 }}>{t('Regression at W5', 'רגרסיה ב-W5')}</div>
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(13,148,136,0.08)', borderRadius: '0.8vw', padding: '2vh 2vw', border: '1px solid rgba(13,148,136,0.2)' }}>
          <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t('Supabase + any charting library (Recharts, Chart.js) makes this dashboard buildable in an afternoon.', 'Supabase + כל ספריית תרשימים (Recharts, Chart.js) הופכת את הדשבורד הזה לניתן לבנייה בצהריים.')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 29 of 40', 'שקופית 29 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
