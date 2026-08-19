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

export default function StakeholderDashboard() {
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
          {t('Reporting', 'דיווח')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Stakeholder Dashboards', 'לוחות מחוונים לבעלי עניין')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Test results live in CI logs. Dashboards translate them into the language executives and product managers understand: trends, risks, and go/no-go signals.',
            'תוצאות בדיקות נמצאות ביומני CI. לוחות מחוונים מתרגמים אותם לשפה שמנהלים ומנהלי מוצר מבינים: מגמות, סיכונים ואותות לגו/לא-גו.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>{t('Executive view', 'תצוגת מנהל')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('Scorecard trend over last 6 releases. Traffic light per dimension. Overall SHIP/BLOCK status.', 'מגמת כרטיס ניקוד על 6 הגרסאות האחרונות. רמזור לכל ממד. סטטוס SHIP/BLOCK כולל.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>{t('Engineering view', 'תצוגת הנדסה')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('Per-test failure breakdown, flaky test registry, cost per pipeline run, latency percentile chart.', 'פירוט כשלון לכל בדיקה, רישום בדיקות לא יציבות, עלות לריצת צינור, תרשים אחוזון זמן אחזור.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>{t('Security view', 'תצוגת אבטחה')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('Open findings by severity, time-to-fix trend, probe pass rates by category.', 'ממצאים פתוחים לפי חומרה, מגמת זמן לתיקון, שיעורי הצלחת בדיקה לפי קטגוריה.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('Dashboard refresh cadence', 'קצב רענון לוח מחוונים')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F', fontWeight: 500 }}>{t('CI merge gate result', 'תוצאת שער מיזוג CI')}</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>{t('Real-time', 'בזמן אמת')}</div>
            </div>
            <div style={{ height: '1px', background: '#F1F5F9' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F', fontWeight: 500 }}>{t('Nightly scorecard roll-up', 'קיפול כרטיס ניקוד לילי')}</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>{t('Daily', 'יומי')}</div>
            </div>
            <div style={{ height: '1px', background: '#F1F5F9' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F', fontWeight: 500 }}>{t('Executive trend report', 'דוח מגמת מנהל')}</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>{t('Weekly', 'שבועי')}</div>
            </div>
            <div style={{ height: '1px', background: '#F1F5F9' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F', fontWeight: 500 }}>{t('Eval set health review', 'סקירת בריאות ערכת הערכה')}</div>
              <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>{t('Monthly', 'חודשי')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 23 of 40', 'שקופית 23 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
