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
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 2.5vw',
  color: '#1E3A5F',
};

export default function IncidentResponseBasics() {
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
          {t('When Tests Find Real Issues', 'כאשר הבדיקות מוצאות בעיות אמיתיות')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Incident Response for AI Security Findings', 'תגובה לאירועים עבור ממצאי אבטחת AI')}
        </h1>
      </div>

      {/* Four steps */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #DC2626', padding: '2.5vh 2vw', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#DC2626' }}>01</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Contain', 'הכל')}</div>
        <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.4 }}>
          {t('Rate-limit or disable the affected endpoint immediately. Do not wait for a fix.', 'הגבל קצב או השבת את נקודת הקצה המושפעת מיד. אל תמתין לתיקון.')}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #D97706', padding: '2.5vh 2vw', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#D97706' }}>02</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Assess', 'הערך')}</div>
        <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.4 }}>
          {t('Query Supabase for all users who hit the vulnerable endpoint during the exposure window.', 'שאל את Supabase לגבי כל המשתמשים שפגעו בנקודת הקצה הפגיעה במהלך חלון החשיפה.')}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '2.5vh 2vw', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#0D9488' }}>03</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Remediate', 'תקן')}</div>
        <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.4 }}>
          {t('Patch the guardrail, add the attack variant to the regression test suite, and re-run the full security suite.', 'תקן את ה-guardrail, הוסף את גרסת המתקפה לחבילת בדיקות הרגרסיה, והרץ מחדש את כל חבילת האבטחה.')}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #1E3A5F', padding: '2.5vh 2vw', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '2.5vw', fontWeight: 800, color: '#1E3A5F' }}>04</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Disclose', 'גלה')}</div>
        <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.4 }}>
          {t('If PII was accessed, follow your jurisdiction\'s breach notification timeline. Silence is not a strategy.', 'אם PII נגש, עקוב אחר לוח הזמנים של הודעת הפרצה בתחום השיפוט שלך. שתיקה אינה אסטרטגיה.')}
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 33 of 40', 'שקופית 33 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
