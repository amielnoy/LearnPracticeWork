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
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function WhyAIPerfDiffers() {
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
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('The Core Problem', 'הבעיה המרכזית')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('AI Perf Is Not Traditional Perf', 'ביצועי AI אינם ביצועים מסורתיים')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Traditional APIs return in milliseconds with deterministic latency. LLM calls take seconds, stream tokens, cold-start, and vary by input length — fundamentally different performance contracts.',
            'APIs מסורתיות מחזירות בתוך מילישניות עם זמן אחזור דטרמיניסטי. קריאות LLM לוקחות שניות, מזרימות טוקנים, מבצעות cold-start ומשתנות לפי אורך הקלט — חוזי ביצועים שונים מהותית.',
          )}
        </p>
        <div style={{ display: 'flex', gap: '2vw' }}>
          <div style={{ background: '#FFFFFF', padding: '2vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', flex: 1, boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F', marginBottom: '0.5vh' }}>3–30s</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B' }}>{t('Typical LLM p50 latency', 'זמן אחזור p50 טיפוסי של LLM')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', flex: 1, boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#0D9488', marginBottom: '0.5vh' }}>10x</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B' }}>{t('p99 vs p50 spread', 'פיזור p99 לעומת p50')}</div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B', marginBottom: '1.5vh', textTransform: isHe ? 'none' : 'uppercase' }}>
            {t('Three Unique Challenges', 'שלושה אתגרים ייחודיים')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '2.2vw', height: '2.2vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#0D9488', borderRadius: '0.2vw' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.3vh' }}>{t('Latency variance', 'שונות זמן אחזור')}</div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('Response time swings with input tokens, server load, and model version.', 'זמן תגובה משתנה עם טוקני קלט, עומס שרת וגרסת מודל.')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '2.2vw', height: '2.2vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#0D9488', borderRadius: '0.2vw' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.3vh' }}>{t('Token streaming', 'זרימת טוקנים')}</div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('Time-to-first-token matters as much as total completion time.', 'זמן לטוקן הראשון חשוב כמו זמן השלמה כולל.')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '2.2vw', height: '2.2vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#0D9488', borderRadius: '0.2vw' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.3vh' }}>{t('Cold starts', 'Cold starts')}</div>
                <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('First request after idle can be 5–10x slower than steady state.', 'הבקשה הראשונה לאחר סרלנות יכולה להיות 5–10x איטית יותר.')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 3 of 40', 'שקופית 3 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
