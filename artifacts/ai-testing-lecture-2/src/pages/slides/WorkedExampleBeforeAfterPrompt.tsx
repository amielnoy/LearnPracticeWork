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
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '2.4vh 0',
  color: '#1E3A5F',
};

const codePanel: React.CSSProperties = {
  background: '#0F172A',
  borderRadius: '1vw',
  border: '1px solid #1E293B',
  padding: '2.4vh 1.8vw',
  fontFamily: "'SFMono-Regular', Menlo, Consolas, monospace",
  direction: 'ltr',
  textAlign: 'left',
  color: '#E2E8F0',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6vh',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh' }}>
      <div
        style={{ fontSize: '0.78vw', fontWeight: 700, letterSpacing: '0.08em', color: labelColor }}
      >
        {label}
      </div>
      <div style={{ fontSize: '0.95vw', lineHeight: 1.5, color: '#E2E8F0' }}>{children}</div>
    </div>
  );
}

const LEFT_COLORS = ['#F87171', '#94A3B8'];
const RIGHT_COLORS = ['#2DD4BF', '#38BDF8', '#FBBF24'];

export default function WorkedExampleBeforeAfterPrompt() {
  const [example, setExample] = useState<LectureExample | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchLectureExample(5)
      .then(data => {
        if (!cancelled) setExample(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const before = example?.panels[0];
  const after = example?.panels[1];

  return (
    <div style={wrap} dir={dir}>
      <div
        style={{
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
          <div>{t('CORE TECHNIQUES', 'טכניקות ליבה')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div style={{ textAlign: isHe ? 'right' : 'left' }}>
        <div
          style={{
            fontSize: '1.1vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '0.6vh',
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
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {example?.title ?? '\u00A0'}
        </h1>
      </div>

      {failed ? (
        <div style={{ fontSize: '1vw', color: '#94A3B8' }}>
          {t('Example content unavailable.', 'תוכן הדוגמה אינו זמין.')}
        </div>
      ) : !example ? (
        <div style={{ fontSize: '1vw', color: '#64748B' }}>{t('Loading\u2026', 'טוען\u2026')}</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw', minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh', minHeight: 0 }}>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#DC2626' }}>
              {before?.label}
            </div>
            <div style={{ ...codePanel, border: '1px solid #7F1D1D' }}>
              {before?.rows.map((row, ri) => (
                <Fragment key={ri}>
                  <Row label={row.label} labelColor={LEFT_COLORS[ri % LEFT_COLORS.length]}>
                    {row.value}
                  </Row>
                  {ri < (before?.rows.length ?? 0) - 1 && (
                    <div style={{ height: '1px', background: '#1E293B' }} />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh', minHeight: 0 }}>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#059669' }}>{after?.label}</div>
            <div style={{ ...codePanel, border: '1px solid #065F46' }}>
              {after?.rows.map((row, ri) => (
                <Fragment key={ri}>
                  <Row label={row.label} labelColor={RIGHT_COLORS[ri % RIGHT_COLORS.length]}>
                    {row.value}
                  </Row>
                  {ri < (after?.rows.length ?? 0) - 1 && (
                    <div style={{ height: '1px', background: '#1E293B' }} />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 5 of 21', 'שקופית 5 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
