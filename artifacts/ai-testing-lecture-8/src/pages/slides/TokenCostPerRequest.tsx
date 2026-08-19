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

export default function TokenCostPerRequest() {
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
          {t('Understanding Your Spend', 'הבנת ההוצאה שלך')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Cost Per Request', 'עלות לבקשה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Every LLM call has an input cost (prompt tokens) and an output cost (completion tokens). Completion tokens are typically 2–4x more expensive than input tokens per thousand.',
            'כל קריאת LLM כוללת עלות קלט (טוקני פרומפט) ועלות פלט (טוקני השלמה). טוקני השלמה יקרים בדרך כלל פי 2–4 מטוקני הקלט לאלף.',
          )}
        </p>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B', marginBottom: '2vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Cost Formula', 'נוסחת עלות')}</div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.15vw', color: '#1E3A5F', lineHeight: 1.8, background: '#F8FAFC', padding: '2vh 1.5vw', borderRadius: '0.6vw', border: '1px solid #E2E8F0' }}>
            <div>cost = (input_tokens / 1000)</div>
            <div style={{ paddingLeft: '2vw' }}>* input_price_per_1k</div>
            <div style={{ paddingLeft: '1vw' }}>+ (output_tokens / 1000)</div>
            <div style={{ paddingLeft: '2vw' }}>* output_price_per_1k</div>
          </div>
          <div style={{ marginTop: '2vh', fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
            {t('Track both sides. A verbose system prompt inflates input tokens on every request.', 'עקוב אחר שני הצדדים. פרומפט מערכת מרובה מילים מנפח טוקני קלט בכל בקשה.')}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B', marginBottom: '2vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('What to Measure per Request', 'מה למדוד לכל בקשה')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5vh', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Prompt tokens', 'טוקני פרומפט')}</div>
              <div style={{ fontSize: '1.05vw', color: '#0D9488', fontWeight: 600 }}>{t('Input cost driver', 'מניע עלות קלט')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5vh', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Completion tokens', 'טוקני השלמה')}</div>
              <div style={{ fontSize: '1.05vw', color: '#DC2626', fontWeight: 600 }}>{t('Output cost driver', 'מניע עלות פלט')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5vh', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Total tokens', 'סך הטוקנים')}</div>
              <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Rate limit consumption', 'צריכת מגבלת קצב')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('USD cost per call', 'עלות USD לקריאה')}</div>
              <div style={{ fontSize: '1.05vw', color: '#475569' }}>{t('Aggregate to daily/monthly', 'צבור ליומי/חודשי')}</div>
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(13,148,136,0.08)', borderRadius: '0.8vw', padding: '2vh 2vw', border: '1px solid rgba(13,148,136,0.2)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}>{t('Budget target', 'יעד תקציב')}</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('Set a per-feature cost budget (e.g. $0.003/request) and alert when weekly average exceeds it by 15%.', 'הגדר תקציב עלות לכל תכונה (למשל $0.003/בקשה) והתריע כאשר הממוצע השבועי עולה עליו ב-15%.')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 40', 'שקופית 19 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
