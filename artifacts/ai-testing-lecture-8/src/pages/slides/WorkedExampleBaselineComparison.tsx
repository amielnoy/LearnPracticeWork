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

export default function WorkedExampleBaselineComparison() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '2vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div
            style={{
              width: '2vw',
              height: '2vw',
              backgroundColor: '#0D9488',
              borderRadius: '0.4vw',
            }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
          <div
            style={{
              background: '#0D9488',
              color: '#FFFFFF',
              fontSize: '0.85vw',
              fontWeight: 700,
              padding: '0.4vh 1vw',
              borderRadius: '2vw',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Worked Example', 'דוגמה עובדת')}
          </div>
          <div style={{ fontSize: '1vw', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
            {t('LECTURE 08', 'הרצאה 08')}
          </div>
        </div>
      </div>

      {/* Left */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.1vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '1vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('Supabase Integration', 'אינטגרציה עם Supabase')}
        </div>
        <h2
          style={{
            fontSize: '2.4vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#F1F5F9',
          }}
        >
          {t(
            'Fetch Baseline from Supabase and Fail CI on Regression',
            'שלוף בסיס מ-Supabase וכשול CI על רגרסיה',
          )}
        </h2>
        <p
          style={{
            fontSize: '1.05vw',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            margin: '0 0 2.5vh 0',
          }}
        >
          {t(
            "Pull the most recent baseline for the current feature and model. Compare CI run's p99 to the baseline. Fail if it exceeds the threshold.",
            'שלוף את הבסיס העדכני ביותר לתכונה ולמודל הנוכחיים. השווה את p99 של ריצת ה-CI לבסיס. כשול אם הוא חורג מהסף.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '0.6vw',
              padding: '1.5vh 1.5vw',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              {t('Table', 'טבלה')}
            </div>
            <div style={{ fontSize: '0.95vw', color: '#CBD5E1', fontFamily: 'monospace' }}>
              perf_baselines
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '0.6vw',
              padding: '1.5vh 1.5vw',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              {t('Key columns', 'עמודות מפתח')}
            </div>
            <div
              style={{
                fontSize: '0.95vw',
                color: '#CBD5E1',
                fontFamily: 'monospace',
                lineHeight: 1.6,
              }}
            >
              feature, model, p99_ms,
              <br />
              cost_usd, git_sha, created_at
            </div>
          </div>
        </div>
      </div>

      {/* Right — code */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codeBlock}>
          <div style={{ color: '#64748B', marginBottom: '1vh', fontSize: '0.9vw' }}>
            // ci-regression-gate.ts
          </div>
          <div>
            <span style={{ color: '#7DD3FC' }}>import</span> {'{ createClient }'}{' '}
            <span style={{ color: '#7DD3FC' }}>from</span>{' '}
            <span style={{ color: '#86EFAC' }}>'@supabase/supabase-js'</span>;
          </div>
          <div style={{ marginTop: '1.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> sb ={' '}
            <span style={{ color: '#F472B6' }}>createClient</span>(URL, KEY);
          </div>
          <div style={{ marginTop: '1.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>async function</span>{' '}
            <span style={{ color: '#F472B6' }}>assertNoLatencyRegression</span>(
          </div>
          <div style={{ paddingLeft: '2vw' }}>feature: string,</div>
          <div style={{ paddingLeft: '2vw' }}>model: string,</div>
          <div style={{ paddingLeft: '2vw', marginBottom: '0.5vh' }}>currentP99Ms: number</div>
          <div>) {'{'}</div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> {'{ data }'} ={' '}
            <span style={{ color: '#7DD3FC' }}>await</span> sb
          </div>
          <div style={{ paddingLeft: '4vw' }}>
            .from(<span style={{ color: '#86EFAC' }}>'perf_baselines'</span>)
          </div>
          <div style={{ paddingLeft: '4vw' }}>
            .select(<span style={{ color: '#86EFAC' }}>'p99_ms'</span>)
          </div>
          <div style={{ paddingLeft: '4vw' }}>
            .eq(<span style={{ color: '#86EFAC' }}>'feature'</span>, feature)
          </div>
          <div style={{ paddingLeft: '4vw' }}>
            .eq(<span style={{ color: '#86EFAC' }}>'model'</span>, model)
          </div>
          <div style={{ paddingLeft: '4vw' }}>
            .order(<span style={{ color: '#86EFAC' }}>'created_at'</span>, {'{ ascending: false }'})
          </div>
          <div style={{ paddingLeft: '4vw', marginBottom: '1vh' }}>.limit(1).single();</div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> threshold = data.p99_ms *{' '}
            <span style={{ color: '#FDA4AF' }}>1.20</span>;
          </div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#7DD3FC' }}>if</span> (currentP99Ms {'>'} threshold)
          </div>
          <div style={{ paddingLeft: '4vw' }}>
            <span style={{ color: '#7DD3FC' }}>throw new</span> Error(
          </div>
          <div style={{ paddingLeft: '6vw' }}>
            <span style={{ color: '#86EFAC' }}>
              `p99 regression: ${'{'}currentP99Ms{'}'}ms`
            </span>
          </div>
          <div style={{ paddingLeft: '4vw' }}>);</div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2vh',
          fontSize: '0.9vw',
          color: 'rgba(255,255,255,0.35)',
          fontWeight: 500,
        }}
      >
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 27 of 40', 'שקופית 27 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
