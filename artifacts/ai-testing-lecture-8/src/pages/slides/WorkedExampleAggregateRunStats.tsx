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

export default function WorkedExampleAggregateRunStats() {
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

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Supabase Integration', 'אינטגרציה עם Supabase')}
        </div>
        <h2 style={{ fontSize: '2.4vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#F1F5F9' }}>
          {t('Aggregate Throughput Stats Across Concurrency Levels', 'צבור סטטיסטיקות רוחב פס על רמות מקביליות')}
        </h2>
        <p style={{ fontSize: '1.05vw', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Query throughput_runs to get the maximum stable concurrency level — the highest concurrency where degraded=false. Use this as your capacity ceiling in alerting logic.',
            'שאל throughput_runs כדי לקבל את רמת המקביליות היציבה המרבית — המקביליות הגבוהה ביותר שבה degraded=false. השתמש בזה כתקרת הקיבולת שלך בלוגיקת ההתראה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '0.6vw', padding: '1.5vh 1.5vw', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh' }}>{t('Table', 'טבלה')}</div>
            <div style={{ fontSize: '0.95vw', color: '#CBD5E1', fontFamily: 'monospace' }}>throughput_runs</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '0.6vw', padding: '1.5vh 1.5vw', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh' }}>{t('Output', 'פלט')}</div>
            <div style={{ fontSize: '0.95vw', color: '#CBD5E1', fontFamily: 'monospace', lineHeight: 1.6 }}>
              max_stable_concurrency,<br />peak_rps, degradation_p95_ms
            </div>
          </div>
        </div>
      </div>

      {/* Right — code */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codeBlock}>
          <div style={{ color: '#64748B', marginBottom: '1vh', fontSize: '0.9vw' }}>// aggregate-throughput-stats.ts</div>
          <div><span style={{ color: '#7DD3FC' }}>import</span> {'{ createClient }'} <span style={{ color: '#7DD3FC' }}>from</span> <span style={{ color: '#86EFAC' }}>'@supabase/supabase-js'</span>;</div>
          <div style={{ marginTop: '1.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> sb = <span style={{ color: '#F472B6' }}>createClient</span>(URL, KEY);
          </div>
          <div style={{ marginTop: '1.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>async function</span> <span style={{ color: '#F472B6' }}>getCapacityCeiling</span>() {'{'}
          </div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#94A3B8' }}>// stable = degraded is false</span>
          </div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> {'{ data }'} = <span style={{ color: '#7DD3FC' }}>await</span> sb
          </div>
          <div style={{ paddingLeft: '4vw' }}>.from(<span style={{ color: '#86EFAC' }}>'throughput_runs'</span>)</div>
          <div style={{ paddingLeft: '4vw' }}>.select(<span style={{ color: '#86EFAC' }}>'concurrency, rps, p95_ms'</span>)</div>
          <div style={{ paddingLeft: '4vw' }}>.eq(<span style={{ color: '#86EFAC' }}>'degraded'</span>, <span style={{ color: '#FDA4AF' }}>false</span>)</div>
          <div style={{ paddingLeft: '4vw' }}>.order(<span style={{ color: '#86EFAC' }}>'concurrency'</span>, {'{ ascending: false }'})</div>
          <div style={{ paddingLeft: '4vw' }}>.limit(<span style={{ color: '#FDA4AF' }}>1</span>)</div>
          <div style={{ paddingLeft: '4vw', marginBottom: '1vh' }}>.single();</div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#7DD3FC' }}>return</span> {'{'}
          </div>
          <div style={{ paddingLeft: '4vw' }}>max_stable_concurrency: data?.concurrency,</div>
          <div style={{ paddingLeft: '4vw' }}>peak_rps: data?.rps,</div>
          <div style={{ paddingLeft: '4vw' }}>degradation_p95_ms: data?.p95_ms,</div>
          <div style={{ paddingLeft: '2vw' }}>{'}'};
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
          <span>{t('Slide 17 of 40', 'שקופית 17 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
