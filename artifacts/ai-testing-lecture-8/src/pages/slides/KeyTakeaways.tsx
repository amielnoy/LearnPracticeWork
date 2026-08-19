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
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function KeyTakeaways() {
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
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Lecture Summary', 'סיכום ההרצאה')}</div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Key Takeaways', 'עיקרי הדברים')}
        </h1>
      </div>

      {/* Four takeaways */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', display: 'flex', gap: '2vw', alignItems: 'flex-start', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#0D9488', lineHeight: 1, flexShrink: 0 }}>01</div>
          <div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('TTFT and percentiles, not just averages', 'TTFT ואחוזונים, לא רק ממוצעים')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('AI latency is high-variance. p99 is what hurts users, TTFT is what they feel first, and averages hide both.', 'זמן האחזור של AI הוא בשונות גבוהה. p99 הוא מה שפוגע במשתמשים, TTFT הוא מה שהם מרגישים ראשון, וממוצעים מסתירים את שניהם.')}</div>
          </div>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', display: 'flex', gap: '2vw', alignItems: 'flex-start', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F', lineHeight: 1, flexShrink: 0 }}>02</div>
          <div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Find your degradation point before production does', 'מצא את נקודת הדגרדציה שלך לפני שהייצור ימצא אותה')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Step-load tests reveal the concurrency ceiling. Operate at 50-60% of it to leave headroom for spikes.', 'בדיקות עומס שלבי חושפות את תקרת המקביליות. פעל ב-50-60% ממנה כדי להשאיר מרחב לקפיצות.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', display: 'flex', gap: '2vw', alignItems: 'flex-start', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#0D9488', lineHeight: 1, flexShrink: 0 }}>03</div>
          <div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Token cost is a performance metric', 'עלות טוקנים היא מדד ביצועים')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Budget cost per request the same way you budget latency. Prompt bloat and model over-sizing are the biggest levers.', 'תקצב עלות לבקשה באותה דרך שאתה מתקצב זמן אחזור. נפיחות פרומפט ובחירת מודל מופרז הם המנופים הגדולים ביותר.')}</div>
          </div>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', display: 'flex', gap: '2vw', alignItems: 'flex-start', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F', lineHeight: 1, flexShrink: 0 }}>04</div>
          <div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Baselines in Supabase make CI regression automatic', 'בסיסים ב-Supabase הופכים רגרסיית CI לאוטומטית')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Every run writes to perf_runs, compares to perf_baselines, and gates the PR. No human judgment needed.', 'כל ריצה כותבת ל-perf_runs, משווה ל-perf_baselines ומגדרת את ה-PR. אין צורך בשיפוט אנושי.')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 38 of 40', 'שקופית 38 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
