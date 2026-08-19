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

export default function WhySecurityTestingMatters() {
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
          {t('Stakes & Motivation', 'הסיכונים והמוטיבציה')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Why AI Security Testing Cannot Wait', 'למה לא ניתן להמתין עם בדיקות אבטחה ל-AI')}
        </h1>
      </div>

      {/* Cards */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          borderTop: '4px solid #DC2626',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div style={{ fontSize: '1.4vw', fontWeight: 800, color: '#DC2626' }}>
          {t('Financial', 'כלכלי')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t(
            'A single jailbreak exposing a system prompt can trigger unauthorized API calls at scale, running up thousands of dollars in minutes.',
            'jailbreak אחד שחושף system prompt יכול להפעיל קריאות API לא מורשות בהיקף, ולצבור אלפי דולרים תוך דקות.',
          )}
        </div>
      </div>

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          borderTop: '4px solid #D97706',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div style={{ fontSize: '1.4vw', fontWeight: 800, color: '#D97706' }}>
          {t('Regulatory', 'רגולטורי')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t(
            'GDPR, CCPA, and the EU AI Act all impose strict obligations on personal data in model outputs. PII leakage is a reportable breach.',
            'GDPR, CCPA וחוק ה-AI האירופאי מטילים חובות נוקשות על נתונים אישיים בפלטי מודל. דליפת PII היא הפרה הדורשת דיווח.',
          )}
        </div>
      </div>

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          borderTop: '4px solid #0D9488',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div style={{ fontSize: '1.4vw', fontWeight: 800, color: '#0D9488' }}>
          {t('Reputational', 'תדמיתי')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t(
            'A viral screenshot of a jailbroken chatbot can wipe brand trust overnight. Security testing catches exploits before bad actors publish them.',
            'צילום מסך ויראלי של chatbot שעקפו את מגבלותיו יכול למחוק אמון במותג בן לילה. בדיקות אבטחה תופסות ניצולים לפני שגורמים זדוניים מפרסמים אותם.',
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 5 of 40', 'שקופית 5 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
