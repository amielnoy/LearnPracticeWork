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

export default function RetroCadence() {
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
          {t('Continuous Improvement', 'שיפור מתמיד')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('The Retro Cadence', 'קצב הרטרוספקטיבה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Without a regular review cycle, strategy documents drift out of date and the team reverts to ad-hoc testing. Three retro meetings cover the full loop.',
            'ללא מחזור סקירה סדיר, מסמכי האסטרטגיה מתיישנים והצוות חוזר לבדיקות אד-הוק. שלושה מפגשי רטרו מכסים את הלולאה המלאה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', borderLeft: '4px solid #0D9488' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Sprint retro (2-week)', 'רטרו ספרינט (2 שבועות)')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('Review flaky tests, cost anomalies, and any false-positive gates from the sprint.', 'סקור בדיקות לא יציבות, חריגות עלות ושערי חיובי-שווא מהספרינט.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', borderLeft: '4px solid #38BDF8' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Monthly eval-set review', 'סקירה חודשית של ערכת ההערכה')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('Add new examples from recent production failures. Archive stale items. Log the change.', 'הוסף דוגמאות חדשות מכשלים אחרונים בייצור. ארכב פריטים ישנים. רשום את השינוי.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', borderLeft: '4px solid #FBBF24' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Quarterly strategy review', 'סקירה רבעונית של האסטרטגיה')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('Reassess the test pyramid, scorecard weights, and team maturity level. Update the strategy doc.', 'הערך מחדש את פירמידת הבדיקות, משקלות כרטיס הניקוד ורמת בגרות הצוות. עדכן את מסמך האסטרטגיה.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#1E3A5F', padding: '4vh 3vw', borderRadius: '1vw', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#FAFBFC', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('Retro inputs: what to bring', 'קלטי רטרו: מה להביא')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0, marginTop: '0.5vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>{t('Scorecard trend for the period', 'מגמת כרטיס ניקוד לתקופה')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0, marginTop: '0.5vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>{t('List of tests added, retired, or quarantined', 'רשימת בדיקות שנוספו, פרשו או בודדו')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0, marginTop: '0.5vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>{t('Any model version changes since last retro', 'כל שינויי גרסת מודל מאז הרטרו האחרון')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0, marginTop: '0.5vw' }} />
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>{t('Production incidents linked to AI quality gaps', 'תקריות ייצור הקשורות לפערי איכות AI')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 24 of 40', 'שקופית 24 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
