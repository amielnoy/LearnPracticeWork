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
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 2.5vw',
  color: '#1E3A5F',
};

export default function Section1Recap() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
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
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Section 1 Recap', 'סיכום חלק 1')}</div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Latency Benchmarking — Key Takeaways', 'בנצ\'מרקינג זמן אחזור — עיקרי הדברים')}
        </h1>
      </div>

      {/* Cards */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '2px solid #0D9488', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(13,148,136,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#0D9488', marginBottom: '1.5vh' }}>01</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>{t('Measure TTFT separately', 'מדוד TTFT בנפרד')}</div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Time-to-first-token drives perceived performance more than total completion time for streaming UIs.', 'זמן לטוקן ראשון מניע ביצועים נתפסים יותר מזמן השלמה כולל עבור ממשקי streaming.')}</div>
        </div>
      </div>
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F', marginBottom: '1.5vh' }}>02</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>{t('Define percentile SLAs', 'הגדר SLAs לפי אחוזון')}</div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Report p50, p95, p99 — averages mask the outliers that actually hurt real users.', 'דווח p50, p95, p99 — ממוצעים מסתירים חריגים שפוגעים בפועל במשתמשים אמיתיים.')}</div>
        </div>
      </div>
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F', marginBottom: '1.5vh' }}>03</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>{t('Benchmark all provider candidates', 'בנצ\'מרק את כל ספקי המועמדים')}</div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Same model, same region, same prompts — p99 differences of 2x are common across providers.', 'אותו מודל, אותו אזור, אותם פרומפטים — הבדלי p99 של פי 2 נפוצים בין ספקים.')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 11 of 40', 'שקופית 11 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
