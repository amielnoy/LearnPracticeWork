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
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '2.5vh',
  color: '#1E3A5F',
};

export default function CommonPitfalls() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: isHe ? 'right' : 'left' }}>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Common Pitfalls to Avoid', 'מכשולים נפוצים להימנע מהם')}
        </h1>
      </div>

      {/* Pitfalls grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
        <div style={{ background: '#FEF2F2', borderRadius: '1vw', padding: '2.5vh 2vw', border: '1px solid #FECACA', display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', backgroundColor: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
          </div>
          <div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Reporting only averages', 'דיווח רק על ממוצעים')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('Average latency hides the 5% of users experiencing 10x worse performance. Always include p95 and p99.', 'זמן אחזור ממוצע מסתיר את 5% המשתמשים שחווים ביצועים גרועים פי 10. תמיד כלול p95 ו-p99.')}</div>
          </div>
        </div>

        <div style={{ background: '#FEF2F2', borderRadius: '1vw', padding: '2.5vh 2vw', border: '1px solid #FECACA', display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', backgroundColor: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
          </div>
          <div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Testing at c=1, shipping at c=50', 'בדיקה ב-c=1, שליחה ב-c=50')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('Single-user benchmarks don\'t reveal queuing behavior. Always test at your expected peak concurrency.', 'בנצ\'מרקים של משתמש יחיד אינם חושפים התנהגות תור. תמיד בדוק במקביליות השיא הצפויה שלך.')}</div>
          </div>
        </div>

        <div style={{ background: '#FFFBEB', borderRadius: '1vw', padding: '2.5vh 2vw', border: '1px solid #FDE68A', display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', backgroundColor: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
          </div>
          <div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Benchmarking with toy prompts', 'בנצ\'מרק עם פרומפטים צעצוע')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('"Hello, world!" prompts show best-case latency. Use a sample of your real production prompt distribution.', 'פרומפטים של "Hello, world!" מראים זמן אחזור במקרה הטוב ביותר. השתמש במדגם של הפיזור האמיתי שלך.')}</div>
          </div>
        </div>

        <div style={{ background: '#FFFBEB', borderRadius: '1vw', padding: '2.5vh 2vw', border: '1px solid #FDE68A', display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', backgroundColor: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
          </div>
          <div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('No baseline after a model upgrade', 'אין בסיס לאחר שדרוג מודל')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.5 }}>{t('Provider model upgrades silently change performance. Always re-baseline after any version change.', 'שדרוגי מודל של ספק משנים ביצועים בשקט. תמיד קח בסיס חדש לאחר כל שינוי גרסה.')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 35 of 40', 'שקופית 35 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
