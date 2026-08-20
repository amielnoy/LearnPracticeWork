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
const dot: React.CSSProperties = {
  width: '0.6vw',
  height: '0.6vw',
  minWidth: '0.6vw',
  borderRadius: '50%',
  backgroundColor: '#0D9488',
  marginTop: '0.7vw',
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
  gap: '2.2vh',
  boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
  justifyContent: 'center',
};

function Row({
  label,
  labelColor,
  children,
}: {
  label: string;
  labelColor: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6vh' }}>
      <div
        style={{ fontSize: '0.85vw', fontWeight: 700, letterSpacing: '0.08em', color: labelColor }}
      >
        {label}
      </div>
      <div style={{ fontSize: '1.1vw', lineHeight: 1.55, color: '#E2E8F0' }}>{children}</div>
    </div>
  );
}

const ROW_COLORS = ['#38BDF8', '#FBBF24', '#94A3B8', '#2DD4BF', '#F87171'];

const FALLBACK_ROWS = [
  { label: 'TABLE', value: 'generator_runs' },
  {
    label: 'INSERT',
    value:
      "{ run_date, tool: 'copilot', prompt_version: 'v2.1', generated: 12, accepted: 9, flaky: 2 }",
  },
  {
    label: 'QUERY',
    value:
      'SELECT tool, AVG(accepted::float/generated) AS accept_rate FROM generator_runs GROUP BY tool',
  },
  { label: 'RESULT', value: 'copilot: 71.4%, cursor: 82.1%, custom_pipeline: 78.3%' },
];

export default function WorkedExampleGeneratorComparison() {
  const [example, setExample] = useState<LectureExample | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchLectureExample(34)
      .then(data => {
        if (!cancelled) setExample(data);
      })
      // A failed fetch is not an error state here: the slide already holds
      // the same figures inline, so it simply keeps showing those.
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const bullets = example?.bullets ?? [
    t(
      'Track each generation run per tool in generator_runs: date, tool, prompt version, generated count, accepted count',
      'עקוב אחר כל ריצת יצירה לכל כלי ב-generator_runs: תאריך, כלי, גרסת פרומפט, מספר שנוצרו, מספר שאושרו',
    ),
    t(
      'Aggregate acceptance rate per tool to compare Copilot, Cursor, and custom pipeline quality',
      'צבור שיעור קבלה לכל כלי להשוואת איכות Copilot, Cursor וצינור מותאם',
    ),
    t(
      'Prompt version column enables before/after analysis when prompts are changed',
      'עמודת גרסת הפרומפט מאפשרת ניתוח לפני/אחרי בעת שינוי פרומפטים',
    ),
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
        <div
          style={{
            display: 'flex',
            gap: '2vw',
            fontSize: '1vw',
            fontWeight: 500,
            color: '#64748B',
          }}
        >
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

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
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '1vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {example?.eyebrow ?? t('Worked Example', 'דוגמה מעשית')}
        </div>
        <h1
          style={{
            fontSize: '2.4vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {example?.title ?? t('Generator Comparison Dashboard', 'לוח השוואת גנרטורים')}
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
              <Row label={row.label} labelColor={ROW_COLORS[ri % ROW_COLORS.length]}>
                {row.value}
              </Row>
              {ri < FALLBACK_ROWS.length - 1 && (
                <div style={{ height: '1px', background: '#1E293B' }} />
              )}
            </Fragment>
          ))}
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#7DD3FC' }}>
            {'// Insert run metadata per generation session'}
          </div>
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#E2E8F0' }}>
            {"await supabase.from('generator_runs').insert({"}
          </div>
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#E2E8F0', paddingLeft: '2vw' }}>
            {' '}
            {'run_date, tool, prompt_version,'}
          </div>
          <div style={{ fontSize: '1vw', lineHeight: 1.7, color: '#E2E8F0', paddingLeft: '2vw' }}>
            {' '}
            {'generated_count, accepted_count, flaky_count'}
          </div>
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
          <span>{t('Slide 33 of 40', 'שקופית 33 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
