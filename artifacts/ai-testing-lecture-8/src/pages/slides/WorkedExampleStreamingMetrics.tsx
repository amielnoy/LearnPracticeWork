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
  direction: 'ltr',
  textAlign: 'left',
  fontSize: '1vw',
  lineHeight: 1.7,
  color: '#E2E8F0',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.08)',
};

export default function WorkedExampleStreamingMetrics() {
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
          {t('Capture TTFT from a Streaming Response', 'לכוד TTFT מתגובת Streaming')}
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
            'Use the OpenAI stream to measure TTFT precisely and store it to Supabase alongside total completion time and token counts.',
            'השתמש בזרם OpenAI למדידת TTFT בדיוק ושמור אותו ב-Supabase לצד זמן ההשלמה הכולל וספירות הטוקנים.',
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
            <div
              style={{
                fontSize: '0.95vw',
                color: '#CBD5E1',
                fontFamily: 'monospace',
                direction: 'ltr',
                textAlign: 'left',
              }}
            >
              perf_runs
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
                direction: 'ltr',
                textAlign: 'left',
                lineHeight: 1.6,
              }}
            >
              ttft_ms, total_ms,
              <br />
              input_tokens, output_tokens
            </div>
          </div>
        </div>
      </div>

      {/* Right — code */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codeBlock}>
          <div style={{ color: '#64748B', marginBottom: '1vh', fontSize: '0.9vw' }}>
            // measure-streaming-ttft.ts
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
            <span style={{ color: '#F472B6' }}>measureAndStore</span>(prompt: string) {'{'}
          </div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> t0 = performance.now();
          </div>
          <div style={{ paddingLeft: '2vw', marginTop: '0.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>const</span> stream ={' '}
            <span style={{ color: '#7DD3FC' }}>await</span> openai.chat.completions
          </div>
          <div style={{ paddingLeft: '4vw' }}>.create({'{ model, messages, stream: true }'});</div>
          <div style={{ paddingLeft: '2vw', marginTop: '0.5vh' }}>
            <span style={{ color: '#7DD3FC' }}>let</span> ttft ={' '}
            <span style={{ color: '#FDA4AF' }}>0</span>, total ={' '}
            <span style={{ color: '#FDA4AF' }}>0</span>;
          </div>
          <div style={{ paddingLeft: '2vw' }}>
            <span style={{ color: '#7DD3FC' }}>for await</span> (
            <span style={{ color: '#7DD3FC' }}>const</span> chunk{' '}
            <span style={{ color: '#7DD3FC' }}>of</span> stream) {'{'}
          </div>
          <div style={{ paddingLeft: '4vw' }}>
            <span style={{ color: '#7DD3FC' }}>if</span> (!ttft) ttft = performance.now() - t0;
          </div>
          <div style={{ paddingLeft: '2vw' }}>{'}'}</div>
          <div style={{ paddingLeft: '2vw' }}>total = performance.now() - t0;</div>
          <div style={{ paddingLeft: '2vw', marginTop: '1vh' }}>
            <span style={{ color: '#7DD3FC' }}>await</span> sb.from(
            <span style={{ color: '#86EFAC' }}>'perf_runs'</span>).insert({'{'}
          </div>
          <div style={{ paddingLeft: '4vw' }}>ttft_ms: Math.round(ttft),</div>
          <div style={{ paddingLeft: '4vw' }}>total_ms: Math.round(total),</div>
          <div style={{ paddingLeft: '4vw' }}>
            run_at: <span style={{ color: '#F472B6' }}>new</span> Date().toISOString(),
          </div>
          <div style={{ paddingLeft: '2vw' }}>{'}'});</div>
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
          <span>{t('Slide 39 of 40', 'שקופית 39 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
