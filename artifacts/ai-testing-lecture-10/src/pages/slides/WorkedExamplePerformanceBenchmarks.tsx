import { Fragment, useEffect, useState } from 'react';
import { t, dir, isHe } from '@/lib/i18n';
import { fetchLectureExample, type LectureExample } from '@/lib/examplesClient';

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
  gridTemplateColumns: '2fr 3fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

const bulletRow: React.CSSProperties = { display: 'flex', gap: '1.2vw', alignItems: 'flex-start' };
const dot: React.CSSProperties = { width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' };
const codePanel: React.CSSProperties = { background: '#0F172A', borderRadius: '1vw', border: '1px solid #1E293B', padding: '3vh 2.4vw', fontFamily: "'SFMono-Regular', Menlo, Consolas, monospace", color: '#E2E8F0', width: '100%', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '2vh', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)', justifyContent: 'center' };
const ROW_COLORS = ['#38BDF8', '#FBBF24', '#94A3B8', '#2DD4BF', '#F87171'];

function Row({ label, labelColor, children }: { label: string; labelColor: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6vh' }}>
      <div style={{ fontSize: '0.85vw', fontWeight: 700, letterSpacing: '0.08em', color: labelColor }}>{label}</div>
      <div style={{ fontSize: '1.05vw', lineHeight: 1.55, color: '#E2E8F0' }}>{children}</div>
    </div>
  );
}

export default function WorkedExamplePerformanceBenchmarks() {
  const [example, setExample] = useState<LectureExample | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchLectureExample(34)
      .then(data => { if (!cancelled) setExample(data); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  const defaultBullets = [
    t('Write latency benchmark results to Supabase after each nightly run', 'כתוב תוצאות בסיס זמן אחזור ל-Supabase לאחר כל ריצה לילית'),
    t('Query the last 10 runs to compute rolling p95 and detect regressions', 'שאל את 10 הריצות האחרונות כדי לחשב p95 נגלל ולזהות רגרסיות'),
    t('Alert when p95 crosses the 4-second threshold', 'התרה כאשר p95 חוצה את סף 4 השניות'),
  ];

  const defaultCode = [
    { label: 'INSERT BENCHMARK', value: "supabase.from('latency_benchmarks').insert({ release_id: 'v2.15.0', run_date: '2025-11-15', p50_ms: 1820, p95_ms: 3650, p99_ms: 6200, ttft_ms: 540 })" },
    { label: 'REGRESSION QUERY', value: "supabase.from('latency_benchmarks').select('run_date, p95_ms').order('run_date', { ascending: false }).limit(10)" },
    { label: 'THRESHOLD CHECK', value: 'data.filter(row => row.p95_ms > 4000) // Alert if any recent run exceeds SLA' },
  ];

  return (
    <div style={wrap} dir={dir}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {example?.eyebrow ?? t('Worked Example', 'דוגמה מעשית')}
        </div>
        <h1 style={{ fontSize: '2.4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {example?.title ?? t('Latency Benchmarks in Supabase', 'בסיסי זמן אחזור ב-Supabase')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4vh' }}>
          {(example?.bullets ?? defaultBullets).map((bullet, i) => (
            <div style={bulletRow} key={i}>
              <div style={dot} />
              <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>{bullet}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codePanel}>
          {failed ? (
            <div style={{ fontSize: '1vw', color: '#94A3B8' }}>{t('Example content unavailable.', 'תוכן הדוגמה אינו זמין.')}</div>
          ) : !example ? (
            <>
              {defaultCode.map((row, ri) => (
                <Fragment key={ri}>
                  <Row label={row.label} labelColor={ROW_COLORS[ri % ROW_COLORS.length]}>{row.value}</Row>
                  <div style={{ height: '1px', background: '#1E293B' }} />
                </Fragment>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
                <span style={{ background: '#059669', color: '#fff', borderRadius: '0.4vw', padding: '0.5vh 1vw', fontSize: '0.95vw', fontWeight: 700, letterSpacing: '0.05em' }}>PASS</span>
                <span style={{ fontSize: '0.95vw', color: '#94A3B8' }}>{t('p95 = 3650ms — within 4s SLA', 'p95 = 3650ms — בתוך SLA של 4 שניות')}</span>
              </div>
            </>
          ) : (
            example.panels.map((panel, pi) => (
              <div key={pi} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                {panel.rows.map((row, ri) => (
                  <Fragment key={ri}>
                    <Row label={row.label} labelColor={ROW_COLORS[ri % ROW_COLORS.length]}>{row.value}</Row>
                    <div style={{ height: '1px', background: '#1E293B' }} />
                  </Fragment>
                ))}
                {panel.verdict && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
                    <span style={{ background: '#059669', color: '#fff', borderRadius: '0.4vw', padding: '0.5vh 1vw', fontSize: '0.95vw', fontWeight: 700, letterSpacing: '0.05em' }}>{panel.verdict.status}</span>
                    <span style={{ fontSize: '0.95vw', color: '#94A3B8' }}>{panel.verdict.note}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 34 of 40', 'שקופית 34 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
