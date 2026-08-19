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

export default function CrossProviderLatency() {
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

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Provider Selection', 'בחירת ספק')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Comparing Latency Across Providers', 'השוואת זמן אחזור בין ספקים')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Different providers expose the same model (e.g. GPT-4) through different infrastructure with different SLAs. Benchmark all candidates with the same prompt set before committing.',
            'ספקים שונים חושפים את אותו מודל (למשל GPT-4) דרך תשתיות שונות עם SLAs שונים. בצע בנצ\'מרק לכל המועמדים עם אותו סט פרומפטים לפני ההחלטה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('What to hold constant:', 'מה להשאיר קבוע:')}</div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Same prompt text and system prompt', 'אותו טקסט פרומפט ופרומפט מערכת')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Same model version and parameter settings', 'אותה גרסת מודל והגדרות פרמטרים')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Same geographic region for your test runner', 'אותו אזור גיאוגרפי לרץ הבדיקות שלך')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 }} />
            <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Same time of day (avoid off-peak skew)', 'אותה שעה ביום (הימנע מהטיית שעות שקטות)')}</div>
          </div>
        </div>
      </div>

      {/* Right — comparison table */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B', marginBottom: '2vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Example Benchmark Results', 'תוצאות בנצ\'מרק לדוגמה')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0', fontSize: '0.9vw', fontWeight: 700, color: '#64748B', marginBottom: '1vh', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div>{t('Provider', 'ספק')}</div>
            <div>p50</div>
            <div>p95</div>
            <div>p99</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '1.5vh 0', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>OpenAI</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>620ms</div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>1.8s</div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>4.2s</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '1.5vh 0', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>Azure OAI</div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>840ms</div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>2.4s</div>
              <div style={{ fontSize: '1vw', color: '#DC2626', fontWeight: 600 }}>8.1s</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '1.5vh 0', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>Anthropic</div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>910ms</div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>2.1s</div>
              <div style={{ fontSize: '1vw', color: '#475569' }}>5.5s</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '1.5vh 0' }}>
              <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>Groq</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>190ms</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>620ms</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>1.9s</div>
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(13,148,136,0.08)', borderRadius: '0.8vw', padding: '2vh 2vw', border: '1px solid rgba(13,148,136,0.2)' }}>
          <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t('Values are illustrative. Run your own benchmarks with your production prompt distribution.', 'הערכים הם להמחשה. הרץ את הבנצ\'מרקים שלך עם הפיזור של הפרומפטים שלך בייצור.')}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 10 of 40', 'שקופית 10 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
