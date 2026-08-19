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

export default function KeyTakeaways() {
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
          {t('Lecture 10 Summary', 'סיכום הרצאה 10')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 3vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Key Takeaways', 'נקודות מפתח')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={{ background: '#FFFFFF', padding: '2.5vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Layers, not just tests', 'שכבות, לא רק בדיקות')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Unit, integration, system, and production monitoring each serve a distinct purpose — they are not substitutes for each other.', 'יחידה, אינטגרציה, מערכת וניטור ייצור כל אחד משרת מטרה ייחודית — הם לא תחליפים אחד לשני.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2.5vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Scorecard beats a single metric', 'כרטיס ניקוד עוקף מדד יחיד')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Accuracy, cost, latency, and security must all be green before shipping. Security is a hard gate.', 'דיוק, עלות, זמן אחזור ואבטחה חייבים להיות ירוקים לפני משלוח. אבטחה היא שער קשיח.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#1E3A5F', padding: '4vh 3vw', borderRadius: '1vw', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#FAFBFC', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('Three things to do this week', 'שלושה דברים לעשות השבוע')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1vw', fontWeight: 800, color: '#fff' }}>1</span>
              </div>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{t('Audit your existing tests: which layer does each one belong to?', 'בדוק את הבדיקות הקיימות שלך: לאיזו שכבה כל אחת שייכת?')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1vw', fontWeight: 800, color: '#fff' }}>2</span>
              </div>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{t('Draft your first quality scorecard row for the current release.', 'צייר את שורת כרטיס הניקוד הראשונה שלך לגרסה הנוכחית.')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1vw', fontWeight: 800, color: '#fff' }}>3</span>
              </div>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{t('Schedule the first sprint retro for your team.', 'תזמן את הרטרו הראשון של ספרינט לצוות שלך.')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 37 of 40', 'שקופית 37 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
