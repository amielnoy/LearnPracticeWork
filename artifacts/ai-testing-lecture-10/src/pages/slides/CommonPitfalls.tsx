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

export default function CommonPitfalls() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Why Teams Fail Without Strategy', 'מדוע צוותים נכשלים ללא אסטרטגיה')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Common Pitfalls', 'מלכודות נפוצות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(220,38,38,0.2)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#DC2626', marginBottom: '1vh' }}>
              {t('No coverage map', 'אין מפת כיסוי')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t("Teams add tests reactively — only after a production incident reveals a gap. Coverage is a map of past failures, not a plan.", "צוותים מוסיפים בדיקות בתגובה — רק לאחר שתקרית ייצור מגלה פער. הכיסוי הוא מפה של כשלים עבר, לא תוכנית.")}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(217,119,6,0.2)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>
              {t('Accuracy-only view', 'תצוגה של דיוק בלבד')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('A model that passes all accuracy tests but doubles API cost per release will still sink the product. Cost and latency must be first-class metrics.', 'מודל שעובר את כל בדיקות הדיוק אך מכפיל את עלות ה-API לכל גרסה עדיין ישקיע את המוצר.')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(13,148,136,0.2)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
              {t('Static eval sets', 'ערכות הערכה סטטיות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('A golden dataset from 18 months ago does not reflect current user behavior. Eval sets rot — they need a maintenance schedule like any other code.', 'ערכת נתונים זהובה מלפני 18 חודשים לא משקפת את ההתנהגות הנוכחית של המשתמשים. ערכות הערכה נרקבות.')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(30,58,95,0.15)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>
              {t('Lone-team ownership', 'בעלות של צוות יחיד')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t("When only one team owns AI quality, their absence creates a single point of failure. Strategy must distribute ownership.", "כאשר רק צוות אחד הוא הבעלים של איכות AI, היעדרותם יוצרת נקודת כשל אחת.")}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(30,58,95,0.15)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>
              {t('No stakeholder visibility', 'אין נראות לבעלי עניין')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('Test results live in CI logs. PMs and execs cannot see quality trends. Dashboards and scorecards translate test data into decisions.', 'תוצאות בדיקות נמצאות ביומני CI. מנהלי מוצר ומנהלים לא יכולים לראות מגמות איכות.')}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(30,58,95,0.15)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>
              {t('No retro cadence', 'אין קצב רטרוספקטיבה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('Without a regular review cycle, strategy documents become outdated and the team drifts back to ad-hoc testing.', 'ללא מחזור בדיקה סדיר, מסמכי האסטרטגיה מתיישנים והצוות חוזר לבדיקות אד-הוק.')}
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
          <span>{t('Slide 4 of 40', 'שקופית 4 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
