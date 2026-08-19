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

export default function HumanInTheLoop() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Design Principle', 'עיקרון עיצוב')}
        </div>
        <h1 style={{ fontSize: '2.8vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {t('Human-in-the-Loop Review', 'סקירה עם אדם בלולאה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'Full automation sounds appealing but creates accountability gaps. Every AI-generated test that enters production must have a named human reviewer on record.',
            'אוטומציה מלאה נשמעת מפתה אך יוצרת פערי אחריות. לכל בדיקה שנוצרה על ידי AI שנכנסת לפרודקשן חייב להיות סוקר אנושי בשם ברשומות.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Reviewer assignment', 'הקצאת סוקר')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('Auto-assign the PR author as reviewer. They know the code change and can assess test intent quickly.', 'הקצה אוטומטית את מחבר ה-PR כסוקר. הוא מכיר את שינוי הקוד ויכול להעריך את כוונת הבדיקה במהירות.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('SLA on review', 'SLA על סקירה')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('If a test is not reviewed within 2 business days, auto-expire it back to pending and notify team lead.', 'אם בדיקה לא נסקרה תוך 2 ימי עסקים, החזר אותה אוטומטית ל-pending והודע למנהל הצוות.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            height: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5vh',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
            {t('What the reviewer is accountable for', 'מה הסוקר אחראי לו')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>{t('Verifying the test actually tests what it claims to test', 'אימות שהבדיקה אכן בודקת את מה שהיא טוענת לבדוק')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>{t('Confirming no PII, secrets, or production data in fixtures', 'אישור שאין PII, סודות, או נתוני פרודקשן ב-fixtures')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>{t('Providing a rejection_reason if declining, so prompt quality improves', 'מתן rejection_reason אם דוחה, כדי שאיכות הפרומפט תשתפר')}</div>
            </div>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>{t('Approving only tests they would be comfortable owning in production', 'אישור רק בדיקות שהם מרגישים בנוח לבעלות עליהן בפרודקשן')}</div>
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 29 of 40', 'שקופית 29 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
