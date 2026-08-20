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
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function MaturityModel() {
  return (
    <div style={wrap} dir={dir}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '2vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div
            style={{
              width: '2vw',
              height: '2vw',
              backgroundColor: '#0D9488',
              borderRadius: '0.4vw',
            }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2vw',
            fontSize: '1vw',
            fontWeight: 500,
            color: '#64748B',
          }}
        >
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.8vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Where Are You Now?', 'איפה אתם עכשיו?')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: '0 0 1.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('AI Testing Maturity Model', 'מודל בגרות בדיקות AI')}
          </h1>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2vw', flex: 1 }}
        >
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderTop: '4px solid #CBD5E1',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div style={{ fontSize: '2vw', fontWeight: 800, color: '#94A3B8' }}>L1</div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Ad Hoc', 'אד הוק')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Tests exist only where a developer chose to add them. No golden set, no scorecard, no retro.',
                'בדיקות קיימות רק היכן שמפתח בחר להוסיף אותן. אין ערכה זהובה, אין כרטיס ניקוד, אין רטרו.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderTop: '4px solid #38BDF8',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div style={{ fontSize: '2vw', fontWeight: 800, color: '#0369A1' }}>L2</div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Defined', 'מוגדר')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'A golden set exists. Integration tests run in CI. Accuracy is tracked per release.',
                'ערכה זהובה קיימת. בדיקות אינטגרציה רצות ב-CI. דיוק עוקב לכל גרסה.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderTop: '4px solid #FBBF24',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div style={{ fontSize: '2vw', fontWeight: 800, color: '#92400E' }}>L3</div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Measured', 'נמדד')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Full scorecard (accuracy, cost, latency, security). Dashboards exist. Retro cadence established.',
                'כרטיס ניקוד מלא (דיוק, עלות, זמן אחזור, אבטחה). לוחות מחוונים קיימים. קצב רטרו הוקם.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderTop: '4px solid #0D9488',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div style={{ fontSize: '2vw', fontWeight: 800, color: '#0D9488' }}>L4</div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Optimized', 'מותאם')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Production monitoring live. Model change detection automated. Every team has an AI quality owner. Eval set updated on schedule.',
                'ניטור ייצור פעיל. זיהוי שינוי מודל אוטומטי. לכל צוות יש בעל איכות AI.',
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
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
          <span>{t('Slide 32 of 40', 'שקופית 32 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
