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
  gap: '2.2vh',
  boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
  justifyContent: 'center',
};

function Row({ label, labelColor, children }: { label: string; labelColor: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6vh' }}>
      <div style={{ fontSize: '0.85vw', fontWeight: 700, letterSpacing: '0.08em', color: labelColor }}>{label}</div>
      <div style={{ fontSize: '1.1vw', lineHeight: 1.55, color: '#E2E8F0' }}>{children}</div>
    </div>
  );
}

const ROW_COLORS = ['#38BDF8', '#FBBF24', '#94A3B8', '#2DD4BF', '#F87171'];

const FALLBACK_ROWS = [
  { label: 'TABLE', value: 'test_roi' },
  { label: 'INSERT', value: "{ sprint, manual_minutes_saved: 480, bugs_caught_before_prod: 5, ai_generation_cost_usd: 3.20 }" },
  { label: 'DERIVED', value: "net_roi = (bugs_caught * avg_prod_bug_cost) - generation_cost" },
  { label: 'RESULT', value: "Sprint 12: net ROI = $2,460 at $492 per production bug prevented" },
];

export default function WorkedExampleTestROI() {
  const [example, setExample] = useState<LectureExample | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchLectureExample(35)
      .then(data => { if (!cancelled) setExample(data); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  const bullets = example?.bullets ?? [
    t('Record manual_minutes_saved (reviewer time for auto-generated vs hand-written), bugs_caught_before_prod, and generation cost per sprint', 'תעד manual_minutes_saved (זמן סוקר לבדיקות שנוצרו אוטומטית לעומת כתובות ביד), bugs_caught_before_prod, ועלות יצירה לכל ספרינט'),
    t('Net ROI = (bugs caught x average production bug cost) minus AI generation cost', 'ROI נטו = (באגים שנלכדו x עלות ממוצעת של באג בפרודקשן) פחות עלות יצירת AI'),
    t('Two quarters of test_roi data creates the business case for continued investment in the pipeline', 'שני רבעונים של נתוני test_roi יוצרים את העניין העסקי להמשך השקעה בצינור'),
  ];

  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {example?.eyebrow ?? t('Worked Example', 'דוגמה מעשית')}
        </div>
        <h1 style={{ fontSize: '2.4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {example?.title ?? t('Measuring Test ROI in Supabase', 'מדידת ROI בדיקות ב-Supabase')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4vh' }}>
          {bullets.map((bullet, i) => (
            <div style={bulletRow} key={i}>
              <div style={dot} />
              <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>{bullet}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codePanel}>
          {FALLBACK_ROWS.map((row, ri) => (
            <Fragment key={ri}>
              <Row label={row.label} labelColor={ROW_COLORS[ri % ROW_COLORS.length]}>{row.value}</Row>
              {ri < FALLBACK_ROWS.length - 1 && <div style={{ height: '1px', background: '#1E293B' }} />}
            </Fragment>
          ))}
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#7DD3FC' }}>{'// Log ROI per sprint'}</div>
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#E2E8F0' }}>{"await supabase.from('test_roi').insert({"}</div>
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#E2E8F0', paddingLeft: '2vw' }}>  {'sprint, manual_minutes_saved,'}</div>
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#E2E8F0', paddingLeft: '2vw' }}>  {'bugs_caught_before_prod, ai_generation_cost_usd'}</div>
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#E2E8F0' }}>{'})'}</div>
        </div>
      </div>

      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #E2E8F0',
          paddingTop: '2vh',
          fontSize: '0.9vw',
          color: '#94A3B8',
          fontWeight: 500,
        }}
      >
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 34 of 40', 'שקופית 34 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
