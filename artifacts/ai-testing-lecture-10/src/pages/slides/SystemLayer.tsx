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

export default function SystemLayer() {
  return (
    <div style={wrap} dir={dir}>
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

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Layer 3', 'שכבה 3')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('System Tests (Nightly)', 'בדיקות מערכת (לילי)')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            "System tests run the full eval suite overnight — thousands of inputs, adversarial probes, security scans, and complete cost and latency benchmarks. They're the deck's last line before production.",
            'בדיקות מערכת מריצות את חבילת הערכה המלאה בלילה — אלפי קלטים, בדיקות אדברסריאליות, סריקות אבטחה ובסיסי עלות וזמן אחזור מלאים.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0, marginTop: '0.5vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>{t('Full eval suite on the canonical golden dataset (1,000–5,000 items)', 'חבילת הערכה מלאה על הערכת הנתונים הזהובה הקנונית (1,000–5,000 פריטים)')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0, marginTop: '0.5vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>{t('Adversarial prompt injection probes (Lectures 7 toolkit)', 'בדיקות הזרקת פרומפט אדברסריאלי (ערכת כלים הרצאות 7)')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0, marginTop: '0.5vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>{t('Latency p50/p95/p99 benchmarks and cost-per-1k-tokens calculation', 'בסיסי זמן אחזור p50/p95/p99 וחישוב עלות-לכל-1k-אסימונים')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', textAlign: isHe ? 'right' : 'left', marginBottom: '1vh' }}>{t('Nightly system-test checklist', 'רשימת בדיקת מערכת לילית')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div style={{ width: '1.2vw', height: '1.2vw', border: '2px solid #0D9488', borderRadius: '0.3vw', flexShrink: 0 }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Full golden dataset accuracy vs. baseline', 'דיוק ערכת נתונים זהובה מלאה מול קו בסיס')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div style={{ width: '1.2vw', height: '1.2vw', border: '2px solid #0D9488', borderRadius: '0.3vw', flexShrink: 0 }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Prompt injection pass rate above 95%', 'שיעור הצלחת הזרקת פרומפט מעל 95%')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div style={{ width: '1.2vw', height: '1.2vw', border: '2px solid #0D9488', borderRadius: '0.3vw', flexShrink: 0 }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('p95 latency under 4 seconds', 'זמן אחזור p95 מתחת ל-4 שניות')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div style={{ width: '1.2vw', height: '1.2vw', border: '2px solid #0D9488', borderRadius: '0.3vw', flexShrink: 0 }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Cost per 1k tokens within 10% of budget', 'עלות לכל 1k אסימונים בתוך 10% מהתקציב')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div style={{ width: '1.2vw', height: '1.2vw', border: '2px solid #0D9488', borderRadius: '0.3vw', flexShrink: 0 }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Zero critical security findings', 'אפס ממצאי אבטחה קריטיים')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 10 of 40', 'שקופית 10 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
