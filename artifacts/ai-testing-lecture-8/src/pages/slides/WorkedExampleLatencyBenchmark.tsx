import { t, dir, isHe } from '@/lib/i18n';

const wrap: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#0F172A',
  fontFamily: "'Inter', sans-serif",
  padding: '4vh 4vw',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr 1.6fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 3vw',
  color: '#F1F5F9',
};

const codeBlock: React.CSSProperties = {
  background: '#1E293B',
  borderRadius: '0.8vw',
  padding: '2.5vh 2vw',
  fontFamily: "'Fira Code', 'Fira Mono', 'Courier New', monospace",
  fontSize: '1vw',
  lineHeight: 1.7,
  color: '#E2E8F0',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.08)',
};

export default function WorkedExampleLatencyBenchmark() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
          <div style={{ background: '#0D9488', color: '#FFFFFF', fontSize: '0.85vw', fontWeight: 700, padding: '0.4vh 1vw', borderRadius: '2vw', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('Worked Example', 'דוגמה עובדת')}
          </div>
          <div style={{ fontSize: '1vw', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Supabase Integration', 'אינטגרציה עם Supabase')}
        </div>
        <h2 style={{ fontSize: '2.4vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#F1F5F9' }}>
          {t('Write Latency Benchmark Results to Supabase', 'כתיבת תוצאות בנצ\'מרק זמן אחזור ל-Supabase')}
        </h2>
        <p style={{ fontSize: '1.05vw', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'After each load test run, persist p50/p95/p99 latency values to a perf_runs table. This enables trend analysis and CI regression gates.',
            'לאחר כל ריצת בדיקת עומס, שמור ערכי זמן אחזור p50/p95/p99 בטבלת perf_runs. זה מאפשר ניתוח מגמות ושערי רגרסיה ב-CI.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '0.6vw', padding: '1.5vh 1.5vw', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh' }}>{t('Table', 'טבלה')}</div>
            <div style={{ fontSize: '0.95vw', color: '#CBD5E1', fontFamily: 'monospace' }}>perf_runs</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '0.6vw', padding: '1.5vh 1.5vw', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh' }}>{t('Key columns', 'עמודות מפתח')}</div>
            <div style={{ fontSize: '0.95vw', color: '#CBD5E1', fontFamily: 'monospace', lineHeight: 1.6 }}>
              model, provider, p50_ms,<br />p95_ms, p99_ms, sample_count
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — code */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codeBlock}>
          <div style={{ color: '#64748B', marginBottom: '1vh', fontSize: '0.9vw' }}>// store-latency-results.ts</div>
          <div><span style={{ color: '#7DD3FC' }}>import</span> {'{ createClient }'} <span style={{ color: '#7DD3FC' }}>from</span> <span style={{ color: '#86EFAC' }}>'@supabase/supabase-js'</span>;</div>
          <div style={{ marginTop: '1.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> supabase = <span style={{ color: '#F472B6' }}>createClient</span>(
          </div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#86EFAC' }}>process.env.SUPABASE_URL</span><span style={{ color: '#64748B' }}>!,</span>
          </div>
          <div style={{ paddingLeft: '2vw', marginBottom: '1.5vh' }}>
            <span style={{ color: '#86EFAC' }}>process.env.SUPABASE_SERVICE_KEY</span><span style={{ color: '#64748B' }}>!</span>
          </div>
          <div>);</div>
          <div style={{ marginTop: '2vh' }}>
            <span style={{ color: '#7DD3FC' }}>async function</span> <span style={{ color: '#F472B6' }}>storeLatencyRun</span>(results: LatencyResult) {'{'}
          </div>
          <div style={{ paddingLeft: '2vw', marginTop: '0.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> {'{ error }'} = <span style={{ color: '#7DD3FC' }}>await</span> supabase
          </div>
          <div style={{ paddingLeft: '4vw' }}>.from(<span style={{ color: '#86EFAC' }}>'perf_runs'</span>)</div>
          <div style={{ paddingLeft: '4vw' }}>.insert({'{'}</div>
          <div style={{ paddingLeft: '6vw' }}>model: results.model,</div>
          <div style={{ paddingLeft: '6vw' }}>provider: results.provider,</div>
          <div style={{ paddingLeft: '6vw' }}>p50_ms: results.p50,</div>
          <div style={{ paddingLeft: '6vw' }}>p95_ms: results.p95,</div>
          <div style={{ paddingLeft: '6vw' }}>p99_ms: results.p99,</div>
          <div style={{ paddingLeft: '6vw' }}>sample_count: results.samples,</div>
          <div style={{ paddingLeft: '6vw' }}>run_at: <span style={{ color: '#F472B6' }}>new</span> <span style={{ color: '#7DD3FC' }}>Date</span>().toISOString(),</div>
          <div style={{ paddingLeft: '4vw' }}>{'}'});</div>
          <div style={{ paddingLeft: '2vw', marginTop: '0.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>if</span> (error) <span style={{ color: '#7DD3FC' }}>throw</span> error;
          </div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2vh', fontSize: '0.9vw', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 9 of 40', 'שקופית 9 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
