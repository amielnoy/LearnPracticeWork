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

export default function SeriesRecap() {
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Lectures 1–9 in Brief', 'הרצאות 1–9 בקצרה')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('What We Have Built So Far', 'מה בנינו עד כה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Nine lectures of individual skills. Now we connect them into a strategy that covers every layer of your AI product.',
            'תשע הרצאות של מיומנויות פרטניות. עכשיו אנו מחברים אותן לאסטרטגיה המכסה כל שכבה של מוצר ה-AI שלכם.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={{ background: '#FFFFFF', padding: '1.5vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', fontSize: '1.1vw', color: '#1E3A5F' }}>
            {t('L1–L3: Foundations — what, why, and how to evaluate LLM outputs', 'הרצאות 1–3: יסודות — מה, מדוע וכיצד להעריך פלטי LLM')}
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.5vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', fontSize: '1.1vw', color: '#1E3A5F' }}>
            {t('L4–L5: Automation — Playwright, API testing, and harness design', 'הרצאות 4–5: אוטומציה — Playwright, בדיקות API ועיצוב רתמה')}
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.5vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', fontSize: '1.1vw', color: '#1E3A5F' }}>
            {t('L6: CI/CD pipelines for AI test suites', 'הרצאה 6: צינורות CI/CD לחבילות בדיקות AI')}
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.5vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', fontSize: '1.1vw', color: '#1E3A5F' }}>
            {t('L7–L8: Security and performance testing for AI features', 'הרצאות 7–8: בדיקות אבטחה וביצועים לתכונות AI')}
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.5vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', fontSize: '1.1vw', color: '#1E3A5F' }}>
            {t('L9: AI-assisted test generation', 'הרצאה 9: יצירת בדיקות בסיוע AI')}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#1E3A5F', padding: '4vh 3vw', borderRadius: '1vw', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#FAFBFC', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('The gap without a strategy', 'הפער ללא אסטרטגיה')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', backgroundColor: '#F87171', flexShrink: 0, marginTop: '0.4vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>
                {t('Tests exist but no one knows which ones matter', 'בדיקות קיימות אבל אף אחד לא יודע אילו חשובות')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', backgroundColor: '#F87171', flexShrink: 0, marginTop: '0.4vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>
                {t('Coverage is accidental — gaps appear at the worst moments', 'כיסוי מקרי — פערים מופיעים ברגעים הגרועים ביותר')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', backgroundColor: '#F87171', flexShrink: 0, marginTop: '0.4vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>
                {t('Metrics exist in silos — no single view of quality', 'מדדים קיימים בבידוד — אין תצוגה אחת של איכות')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', backgroundColor: '#F87171', flexShrink: 0, marginTop: '0.4vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>
                {t('Model upgrades break things invisibly', 'שדרוגי מודל שוברים דברים באופן בלתי נראה')}
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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 3 of 40', 'שקופית 3 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
