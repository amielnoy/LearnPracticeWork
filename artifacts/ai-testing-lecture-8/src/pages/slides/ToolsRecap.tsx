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

export default function ToolsRecap() {
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
          {t('Tools You Can Use Today', 'כלים שאתה יכול להשתמש בהם היום')}
        </h1>
      </div>

      {/* Tools grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Load Testing', 'בדיקות עומס')}</div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>k6 / Locust</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('Step-load scripts for LLM endpoints. k6 supports streaming response handling.', 'סקריפטי עומס שלבי לנקודות קצה של LLM. k6 תומך בטיפול בתגובות streaming.')}</div>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Timing', 'תזמון')}</div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>openai-sdk timings</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('usage.total_ms, stream.on("chunk") timestamps, performance.now() wrappers.', 'usage.total_ms, חותמות זמן stream.on("chunk"), עטיפות performance.now().')}</div>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Cost Tracking', 'מעקב עלות')}</div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>LangSmith / Helicone</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('Per-request cost logging, token counting, model comparison dashboards out of the box.', 'רישום עלות לבקשה, ספירת טוקנים, דשבורדי השוואת מודלים מחוץ לקופסא.')}</div>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Caching', 'מטמון')}</div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>GPTCache / Redis</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('Exact and semantic caching layers. Redis for exact-match, GPTCache for embedding-based.', 'שכבות מטמון מדויקות וסמנטיות. Redis למדויק, GPTCache מבוסס embeddings.')}</div>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Storage & Trending', 'אחסון ומגמות')}</div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>Supabase</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('perf_runs, throughput_runs, request_costs, perf_baselines — all your perf data in one place.', 'perf_runs, throughput_runs, request_costs, perf_baselines — כל נתוני הביצועים שלך במקום אחד.')}</div>
        </div>
        <div style={{ background: '#1E3A5F', borderRadius: '1vw', padding: '2.5vh 2vw', display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Alerting', 'התראות')}</div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#FFFFFF' }}>PagerDuty / Slack</div>
          <div style={{ fontSize: '0.95vw', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{t('Webhook on CI failure, Supabase edge function to push Slack on metric drift.', 'Webhook על כשל CI, Supabase edge function לדחיפת Slack על סחף מדדים.')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 37 of 40', 'שקופית 37 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
