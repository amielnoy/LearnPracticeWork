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

export default function StrategyOverview() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Five Pillars', 'חמישה עמודים')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 1vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('What a Strategy Covers', 'מה אסטרטגיה מכסה')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '1.5vw', flex: 1 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 1.5vw', display: 'flex', flexDirection: 'column', gap: '1.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ width: '3vw', height: '3vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.6vw', fontWeight: 800, color: '#0D9488' }}>1</div>
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Coverage', 'כיסוי')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.45 }}>
              {t('Which features, paths, and risk areas have tests — and which do not.', 'אילו תכונות, נתיבים ואזורי סיכון נבדקים — ואילו לא.')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 1.5vw', display: 'flex', flexDirection: 'column', gap: '1.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ width: '3vw', height: '3vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.6vw', fontWeight: 800, color: '#0D9488' }}>2</div>
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Layers', 'שכבות')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.45 }}>
              {t('Unit, integration, system, and production monitoring — each layer has a distinct job.', 'יחידה, אינטגרציה, מערכת וניטור ייצור — לכל שכבה תפקיד ייחודי.')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 1.5vw', display: 'flex', flexDirection: 'column', gap: '1.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ width: '3vw', height: '3vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.6vw', fontWeight: 800, color: '#0D9488' }}>3</div>
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Metrics', 'מדדים')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.45 }}>
              {t('Accuracy, cost, latency, and security — combined into a single scorecard per release.', 'דיוק, עלות, זמן אחזור ואבטחה — משולבים בכרטיס ניקוד אחד לכל גרסה.')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 1.5vw', display: 'flex', flexDirection: 'column', gap: '1.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ width: '3vw', height: '3vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.6vw', fontWeight: 800, color: '#0D9488' }}>4</div>
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Reporting', 'דיווח')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.45 }}>
              {t('Stakeholder dashboards, retro cadence, and keeping eval sets current with model changes.', 'לוחות מחוונים לבעלי עניין, קצב רטרוספקטיבה ועדכון ערכות הערכה.')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 1.5vw', display: 'flex', flexDirection: 'column', gap: '1.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ width: '3vw', height: '3vw', backgroundColor: 'rgba(13,148,136,0.12)', borderRadius: '0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.6vw', fontWeight: 800, color: '#0D9488' }}>5</div>
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('People', 'אנשים')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.45 }}>
              {t('Roles, responsibilities, and a maturity model to track how the organization grows.', 'תפקידים, אחריות ומודל בגרות למעקב אחר צמיחת הארגון.')}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 5 of 40', 'שקופית 5 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
