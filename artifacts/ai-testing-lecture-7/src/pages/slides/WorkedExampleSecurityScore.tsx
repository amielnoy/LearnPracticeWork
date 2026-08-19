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
  gridTemplateColumns: '2fr 3fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

const codePanel: React.CSSProperties = {
  background: '#0F172A',
  borderRadius: '1vw',
  border: '1px solid #1E293B',
  padding: '3vh 2.4vw',
  fontFamily: "'SFMono-Regular', Menlo, Consolas, monospace",
  color: '#E2E8F0',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.8vh',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  justifyContent: 'center',
};

export default function WorkedExampleSecurityScore() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '2vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Worked Example', 'דוגמה מעשית')}
        </div>
        <h1 style={{ fontSize: '2.4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {t('Composite Security Score from Supabase', 'ציון אבטחה מורכב מ-Supabase')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Aggregate results across all security test categories', 'צבור תוצאות על פני כל קטגוריות בדיקות האבטחה')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Weight critical categories (injection, PII) higher than informational ones', 'תן משקל גבוה יותר לקטגוריות קריטיות (הזרקה, PII) מאשר למידעיות')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Fail the build if composite score drops below 90', 'עצור את ה-build אם הציון המורכב יורד מתחת ל-90')}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codePanel}>
          <div style={{ fontSize: '0.85vw', fontWeight: 700, color: '#38BDF8', letterSpacing: '0.08em' }}>
            QUERY: weighted security score
          </div>
          <div style={{ fontSize: '1.05vw', color: '#E2E8F0', lineHeight: 1.7 }}>
            {'const { data } = await supabase'}<br />
            {'  .from("guardrail_ci_results")'}<br />
            {'  .select("category, blocked, allowed")'}<br />
            {'  .eq("build_id", buildSha);'}<br />
            <br />
            {'const weights = {'}<br />
            {'  prompt_injection: 3,'}<br />
            {'  pii_leakage: 3,'}<br />
            {'  jailbreak: 2,'}<br />
            {'  evasion: 1'}<br />
            {'};'}
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ fontSize: '1.05vw', color: '#E2E8F0', lineHeight: 1.7 }}>
            {'let weightedScore = 0, totalWeight = 0;'}<br />
            {'for (const row of data) {'}<br />
            {'  const total = row.blocked + row.allowed;'}<br />
            {'  const rate = row.blocked / total * 100;'}<br />
            {'  const w = weights[row.category] ?? 1;'}<br />
            {'  weightedScore += rate * w;'}<br />
            {'  totalWeight += w;'}<br />
            {'}'}<br />
            {'const score = weightedScore / totalWeight;'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
            <span style={{ background: '#059669', color: '#fff', borderRadius: '0.4vw', padding: '0.5vh 1vw', fontSize: '0.95vw', fontWeight: 700, letterSpacing: '0.05em' }}>
              SCORE: 93.4
            </span>
            <span style={{ fontSize: '0.95vw', color: '#94A3B8' }}>
              {t('Above threshold (90) — build passes', 'מעל הסף (90) — ה-build עובר')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 31 of 40', 'שקופית 31 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
