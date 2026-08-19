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

export default function AdversarialInputs() {
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
          {t('Robustness Testing', 'בדיקות עמידות')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Adversarial Inputs', 'קלטים עוינים')}
        </h1>
      </div>

      {/* Left */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Input Perturbation Classes', 'מחלקות שיבוש קלט')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#D97706', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Typos and misspellings designed to evade filters ("c0nt3nt")', 'שגיאות כתיב שנועדו להתחמק ממסנני ("c0nt3nt")')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#D97706', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Unicode homoglyphs that look identical but have different code points', 'הומוגליפים ב-Unicode שנראים זהים אך בעלי נקודות קוד שונות')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#D97706', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Excessive whitespace or zero-width characters to fragment keywords', 'רווחים מופרזים או תווי אפס-רוחב לפיצול מילות מפתח')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#D97706', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Multilingual switching mid-sentence to confuse single-language classifiers', 'מעבר רב-לשוני באמצע משפט לבלבול מסווגים חד-לשוניים')}</div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Robustness Metrics', 'מדדי עמידות')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Evasion Rate', 'שיעור התחמקות')}</div>
            <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.4 }}>{t('% of perturbed malicious inputs that bypass the guardrail', '% מהקלטים הזדוניים המשובשים שעוקפים את ה-guardrail')}</div>
          </div>
          <div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('False Positive Rate', 'שיעור חיובי שגוי')}</div>
            <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.4 }}>{t('% of legitimate inputs incorrectly blocked by over-aggressive filters', '% מהקלטים הלגיטימיים שנחסמו בטעות על ידי מסנני יתר')}</div>
          </div>
          <div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Semantic Consistency', 'עקביות סמנטית')}</div>
            <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.4 }}>{t('Same intent phrased 10 different ways should produce equivalent outcomes', 'אותה כוונה מנוסחת ב-10 דרכים שונות צריכה לייצר תוצאות שוות')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 21 of 40', 'שקופית 21 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
