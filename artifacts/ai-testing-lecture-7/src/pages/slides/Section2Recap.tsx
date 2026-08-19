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
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 3vw',
  color: '#1E3A5F',
};

export default function Section2Recap() {
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
          {t('Section 3 Recap', 'סיכום חלק 3')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Data Leakage: Three Principles', 'דליפת נתונים: שלושה עקרונות')}
        </h1>
      </div>

      {/* Cards */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488' }}>01</div>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
          {t('Filter outputs, not just inputs', 'סנן פלטים, לא רק קלטים')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t('Input guardrails block known attack patterns. Output filters catch what slips through — including data the model memorised.', 'guardrail לקלטים חוסמים תבניות מתקפה ידועות. מסנני פלט תופסים מה שחולק — כולל נתונים שהמודל שינן.')}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488' }}>02</div>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
          {t('Use canary tokens in fine-tuning data', 'השתמש בטוקני מלכודת בנתוני fine-tuning')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t('Canary strings give you a measurable memorisation rate. If the rate creeps up after a re-train, stop and investigate before deploying.', 'מחרוזות מלכודת נותנות לך שיעור שינון מדיד. אם השיעור עולה לאחר re-train, עצור וחקור לפני פריסה.')}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488' }}>03</div>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
          {t('Enforce least privilege on tools', 'אכוף הרשאה מינימלית על כלים')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t('Audit tool scopes as part of every security review. An injected prompt can only cause damage if the tool it hijacks has the power to do harm.', 'בצע ביקורת על היקפי כלים כחלק מכל סקירת אבטחה. prompt מוזרק יכול לגרום נזק רק אם לכלי שהוא חוטף יש כוח לגרום נזק.')}
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 40', 'שקופית 19 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
