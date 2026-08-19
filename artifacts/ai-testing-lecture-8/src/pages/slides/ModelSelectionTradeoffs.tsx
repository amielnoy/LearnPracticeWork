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

export default function ModelSelectionTradeoffs() {
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
          {t('Model Selection Tradeoffs', 'פשרות בחירת מודל')}
        </h1>
      </div>

      {/* Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2vw' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '2px solid #0D9488', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(13,148,136,0.1)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ fontSize: '1.3vw', fontWeight: 800, color: '#0D9488' }}>{t('Small / Fast', 'קטן / מהיר')}</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>GPT-4o mini, Claude Haiku, Gemini Flash</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh', marginTop: '1vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Latency', 'זמן אחזור')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488' }}>{t('Low', 'נמוך')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Cost/1k tokens', 'עלות/1k טוקנים')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488' }}>{t('Very low', 'נמוך מאוד')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Quality', 'איכות')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#D97706' }}>{t('Good', 'טוב')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Best for', 'הכי מתאים ל')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Routing, triage', 'ניתוב, מיון')}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ fontSize: '1.3vw', fontWeight: 800, color: '#1E3A5F' }}>{t('Mid-tier', 'בינוני')}</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>GPT-4o, Claude Sonnet, Gemini Pro</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh', marginTop: '1vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Latency', 'זמן אחזור')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488' }}>{t('Medium', 'בינוני')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Cost/1k tokens', 'עלות/1k טוקנים')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#D97706' }}>{t('Medium', 'בינוני')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Quality', 'איכות')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488' }}>{t('Very good', 'טוב מאוד')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Best for', 'הכי מתאים ל')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Most features', 'רוב התכונות')}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ fontSize: '1.3vw', fontWeight: 800, color: '#1E3A5F' }}>{t('Frontier', 'ביצועים גבוהים')}</div>
          <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>o3, Claude Opus, Gemini Ultra</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh', marginTop: '1vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Latency', 'זמן אחזור')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#DC2626' }}>{t('High', 'גבוה')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Cost/1k tokens', 'עלות/1k טוקנים')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#DC2626' }}>{t('High', 'גבוה')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Quality', 'איכות')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488' }}>{t('Best', 'הטוב ביותר')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.95vw', color: '#475569' }}>{t('Best for', 'הכי מתאים ל')}</div>
              <div style={{ fontSize: '0.95vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Complex reasoning', 'הסקה מורכבת')}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: '1vw', padding: '3vh 2vw', display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ fontSize: '1.3vw', fontWeight: 800, color: '#0D9488' }}>{t('Rule of Thumb', 'כלל אצבע')}</div>
          <div style={{ fontSize: '1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            {t('Start with the smallest model that meets quality thresholds. Move up only when evals show deficiencies. The cost difference is often 10–100x.', 'התחל עם המודל הקטן ביותר העומד בסף האיכות. עבור לגדול יותר רק כאשר הערכות מראות חסרונות. ההבדל בעלות הוא לרוב פי 10–100.')}
          </div>
          <div style={{ marginTop: 'auto', padding: '1.5vh 1.5vw', background: 'rgba(13,148,136,0.2)', borderRadius: '0.6vw', border: '1px solid rgba(13,148,136,0.4)' }}>
            <div style={{ fontSize: '0.95vw', color: '#0D9488', fontWeight: 600 }}>{t('Test quality separately from perf', 'בדוק איכות בנפרד מביצועים')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 23 of 40', 'שקופית 23 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
