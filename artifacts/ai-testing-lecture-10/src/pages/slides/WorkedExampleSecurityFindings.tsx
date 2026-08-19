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

export default function WorkedExampleSecurityFindings() {
  const [example, setExample] = useState<LectureExample | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchLectureExample(33)
      .then(data => { if (!cancelled) setExample(data); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  const defaultBullets = [
    t('Write security probe results to the security_findings table in Supabase', 'כתוב תוצאות בדיקת אבטחה לטבלת security_findings ב-Supabase'),
    t('Query open critical findings to block a release from the scorecard pipeline', 'שאל ממצאים קריטיים פתוחים כדי לחסום גרסה מצינור כרטיס הניקוד'),
    t('A single open critical finding sets the security score to 0', 'ממצא קריטי פתוח אחד מגדיר את ציון האבטחה ל-0'),
  ];

  const defaultCode = [
    { label: 'INSERT FINDING', value: "supabase.from('security_findings').insert({ release_id: 'v2.15.0-rc1', probe_type: 'prompt_injection', severity: 'critical', probe_input: 'Ignore previous instructions...', status: 'open' })" },
    { label: 'SECURITY GATE QUERY', value: "supabase.from('security_findings').select('id, severity').eq('release_id', 'v2.15.0-rc1').eq('severity', 'critical').eq('status', 'open')" },
    { label: 'RESULT', value: '[ { id: 42, severity: "critical" } ] — 1 open critical finding' },
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
          {example?.title ?? t('Security Findings in Supabase', 'ממצאי אבטחה ב-Supabase')}
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
                <span style={{ background: '#DC2626', color: '#fff', borderRadius: '0.4vw', padding: '0.5vh 1vw', fontSize: '0.95vw', fontWeight: 700, letterSpacing: '0.05em' }}>BLOCKED</span>
                <span style={{ fontSize: '0.95vw', color: '#94A3B8' }}>{t('Security score set to 0 — release blocked', 'ציון אבטחה הוגדר ל-0 — גרסה נחסמה')}</span>
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
                    <span style={{ background: panel.verdict.status.toUpperCase().includes('BLOCK') ? '#DC2626' : '#059669', color: '#fff', borderRadius: '0.4vw', padding: '0.5vh 1vw', fontSize: '0.95vw', fontWeight: 700, letterSpacing: '0.05em' }}>{panel.verdict.status}</span>
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
          <span>{t('Slide 33 of 40', 'שקופית 33 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
