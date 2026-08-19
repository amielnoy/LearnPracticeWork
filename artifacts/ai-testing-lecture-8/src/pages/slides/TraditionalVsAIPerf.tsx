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

export default function TraditionalVsAIPerf() {
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
          {t('Traditional vs. AI Performance Contracts', 'חוזי ביצועים מסורתיים לעומת AI')}
        </h1>
      </div>

      {/* Comparison table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1vw' }}>
        {/* Header row */}
        <div style={{ background: '#1E3A5F', borderRadius: '0.8vw 0.8vw 0 0', padding: '2vh 2vw' }}>
          <div style={{ fontSize: '1.1vw', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{t('Dimension', 'ממד')}</div>
        </div>
        <div style={{ background: '#1E3A5F', borderRadius: '0.8vw 0.8vw 0 0', padding: '2vh 2vw', borderLeft: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#FAFBFC' }}>{t('Traditional API', 'API מסורתי')}</div>
        </div>
        <div style={{ background: '#0D9488', borderRadius: '0.8vw 0.8vw 0 0', padding: '2vh 2vw' }}>
          <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#FFFFFF' }}>{t('LLM/AI API', 'API של LLM/AI')}</div>
        </div>

        {/* Row 1 */}
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Typical latency', 'זמן אחזור טיפוסי')}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '1.05vw', color: '#475569' }}>10–100ms</div>
        </div>
        <div style={{ background: '#F0FDF9', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #CCFBF1' }}>
          <div style={{ fontSize: '1.05vw', color: '#0F766E', fontWeight: 600 }}>1–30+ seconds</div>
        </div>

        {/* Row 2 */}
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Response variance (p99/p50)', 'שונות תגובה (p99/p50)')}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '1.05vw', color: '#475569' }}>1.5–3x</div>
        </div>
        <div style={{ background: '#F0FDF9', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #CCFBF1' }}>
          <div style={{ fontSize: '1.05vw', color: '#0F766E', fontWeight: 600 }}>5–20x</div>
        </div>

        {/* Row 3 */}
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Response size', 'גודל תגובה')}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Fixed schema, bytes', 'סכמה קבועה, בייטים')}</div>
        </div>
        <div style={{ background: '#F0FDF9', padding: '2vh 2vw', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #CCFBF1' }}>
          <div style={{ fontSize: '1.05vw', color: '#0F766E', fontWeight: 600 }}>{t('Variable tokens (cost driver)', 'טוקנים משתנים (מניע עלות)')}</div>
        </div>

        {/* Row 4 */}
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0 0 0 0.8vw' }}>
          <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Cost model', 'מודל עלות')}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderLeft: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Fixed infra cost', 'עלות תשתית קבועה')}</div>
        </div>
        <div style={{ background: '#F0FDF9', padding: '2vh 2vw', borderLeft: '1px solid #CCFBF1', borderRadius: '0 0 0.8vw 0' }}>
          <div style={{ fontSize: '1.05vw', color: '#0F766E', fontWeight: 600 }}>{t('Per-token metered billing', 'חיוב מדוד לפי טוקן')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 5 of 40', 'שקופית 5 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
