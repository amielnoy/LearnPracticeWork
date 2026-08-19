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
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

export default function TestPyramid() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('The Adapted AI Test Pyramid', 'פירמידת בדיקות ה-AI המותאמת')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Four Test Layers', 'ארבע שכבות בדיקה')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8vh' }}>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', borderLeft: '4px solid #0D9488' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488' }}>{t('Unit (most tests)', 'יחידה (רוב הבדיקות)')}</div>
            <div style={{ fontSize: '1vw', color: '#475569', marginTop: '0.4vh' }}>{t('Prompt template correctness, parser logic, token-budget guards. Fast and cheap.', 'נכונות תבנית פרומפט, לוגיקת מנתח, שמירת תקציב אסימון. מהיר וזול.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', borderLeft: '4px solid #38BDF8' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0369A1' }}>{t('Integration', 'אינטגרציה')}</div>
            <div style={{ fontSize: '1vw', color: '#475569', marginTop: '0.4vh' }}>{t('LLM output quality on a small golden set. Runs per PR. LLM-as-judge scoring.', 'איכות פלט LLM על ערכה זהובה קטנה. רץ לכל PR. ניקוד LLM-as-judge.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', borderLeft: '4px solid #FBBF24' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#92400E' }}>{t('System (nightly)', 'מערכת (לילי)')}</div>
            <div style={{ fontSize: '1vw', color: '#475569', marginTop: '0.4vh' }}>{t('Full eval suite, adversarial inputs, security scans, cost and latency benchmarks.', 'חבילת הערכה מלאה, קלטים אדברסריאליים, סריקות אבטחה, עלות ובסיסי זמן אחזור.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', borderLeft: '4px solid #F87171' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#991B1B' }}>{t('Production monitoring (fewest)', 'ניטור ייצור (המעטים ביותר)')}</div>
            <div style={{ fontSize: '1vw', color: '#475569', marginTop: '0.4vh' }}>{t('Shadow evals on live traffic samples, drift detection, cost and error-rate alerting.', 'הערכות צל על דגימות תנועה חיה, זיהוי סחף, התראות עלות ושיעור שגיאות.')}</div>
          </div>
        </div>
      </div>

      {/* Right — visual pyramid */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', gap: '0.8vh' }}>
          <div style={{ width: '20%', background: '#F87171', borderRadius: '0.5vw', padding: '1.5vh 0', textAlign: 'center', fontSize: '0.9vw', fontWeight: 700, color: '#FFFFFF' }}>{t('Prod', 'ייצור')}</div>
          <div style={{ width: '45%', background: '#FBBF24', borderRadius: '0.5vw', padding: '1.5vh 0', textAlign: 'center', fontSize: '0.9vw', fontWeight: 700, color: '#FFFFFF' }}>{t('System', 'מערכת')}</div>
          <div style={{ width: '70%', background: '#38BDF8', borderRadius: '0.5vw', padding: '1.5vh 0', textAlign: 'center', fontSize: '0.9vw', fontWeight: 700, color: '#FFFFFF' }}>{t('Integration', 'אינטגרציה')}</div>
          <div style={{ width: '100%', background: '#0D9488', borderRadius: '0.5vw', padding: '2.5vh 0', textAlign: 'center', fontSize: '1vw', fontWeight: 700, color: '#FFFFFF' }}>{t('Unit', 'יחידה')}</div>
          <div style={{ marginTop: '2vh', fontSize: '1vw', color: '#64748B', textAlign: 'center' }}>{t('More tests, lower cost per test', 'יותר בדיקות, עלות נמוכה יותר לבדיקה')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 7 of 40', 'שקופית 7 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
