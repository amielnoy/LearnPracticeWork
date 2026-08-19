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

export default function CIIntegration() {
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
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Pipeline Integration', 'אינטגרציית צינור')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Wiring Security Tests into CI', 'חיבור בדיקות אבטחה ל-CI')}
        </h1>
      </div>

      {/* Left: PR vs Nightly */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('PR vs. Nightly Split', 'פיצול PR לעומת לילי')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={{ padding: '1.5vh 1.5vw', background: 'rgba(13,148,136,0.07)', borderRadius: '0.6vw', borderLeft: '3px solid #0D9488' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh' }}>{t('Every PR (fast)', 'כל PR (מהיר)')}</div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Critical severity tests only: ~50 prompts, LLM judge assertions on injection and PII', 'רק בדיקות חומרה קריטית: ~50 prompts, LLM judge על הזרקה ו-PII')}</div>
          </div>
          <div style={{ padding: '1.5vh 1.5vw', background: 'rgba(30,58,95,0.05)', borderRadius: '0.6vw', borderLeft: '3px solid #1E3A5F' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Nightly (full)', 'לילי (מלא)')}</div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('All severities, paraphrase variants, adversarial perturbations, canary extraction tests', 'כל החומרות, גרסאות paraphrase, שיבושים עוינים, בדיקות חילוץ מלכודות')}</div>
          </div>
        </div>
      </div>

      {/* Right: Pipeline stages */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('CI Stage Sequence', 'רצף שלבי CI')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2vw', height: '2vw', background: '#0D9488', borderRadius: '0.4vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9vw', fontWeight: 700, color: '#fff' }}>1</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Unit tests (no LLM calls)', 'בדיקות יחידה (ללא קריאות LLM)')}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2vw', height: '2vw', background: '#0D9488', borderRadius: '0.4vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9vw', fontWeight: 700, color: '#fff' }}>2</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Functional AI tests (evaluation suite)', 'בדיקות AI פונקציונאליות (חבילת הערכה)')}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2vw', height: '2vw', background: '#DC2626', borderRadius: '0.4vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9vw', fontWeight: 700, color: '#fff' }}>3</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', fontWeight: 600 }}>{t('Security red-team tests (this lecture)', 'בדיקות red-team אבטחה (הרצאה זו)')}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2vw', height: '2vw', background: '#0D9488', borderRadius: '0.4vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9vw', fontWeight: 700, color: '#fff' }}>4</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Composite score gate: block merge if score < 90', 'שער ציון מורכב: חסום מיזוג אם ציון < 90')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 32 of 40', 'שקופית 32 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
