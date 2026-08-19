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
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function RateLimitsAndQueuing() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('The Invisible Ceiling', 'התקרה הבלתי נראית')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Rate Limits & Queuing Behavior', 'מגבלות קצב והתנהגות תור')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'LLM APIs enforce rate limits in tokens per minute (TPM) and requests per minute (RPM). Once you hit them, responses queue or fail — test this explicitly before production.',
            'APIs של LLM אוכפות מגבלות קצב בטוקנים לדקה (TPM) ובקשות לדקה (RPM). ברגע שפוגעים בהם, תגובות מתקבלות בתור או נכשלות — בדוק זאת במפורש לפני ייצור.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('RPM — Requests per minute', 'RPM — בקשות לדקה')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('Hard limit on call frequency. Exceeding it returns HTTP 429.', 'מגבלה קשה על תדירות קריאות. חריגה ממנה מחזירה HTTP 429.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('TPM — Tokens per minute', 'TPM — טוקנים לדקה')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('Accounts for prompt + completion tokens combined. Long prompts consume it fast.', 'מחשב טוקני פרומפט + השלמה יחד. פרומפטים ארוכים צורכים אותם מהר.')}</div>
          </div>
          <div style={{ background: '#FEF2F2', padding: '2vh 2vw', borderRadius: '0.8vw', border: '1px solid #FECACA' }}>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#DC2626', marginBottom: '0.5vh' }}>{t('Queuing failure mode', 'מצב כשל של תור')}</div>
            <div style={{ fontSize: '1vw', color: '#7F1D1D', lineHeight: 1.4 }}>{t('At high concurrency, requests queue server-side. Latency rises silently before 429s appear.', 'עם מקביליות גבוהה, בקשות מתקבלות בתור בצד השרת. זמן האחזור עולה בשקט לפני שמופיעות 429s.')}</div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B', marginBottom: '2vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Handling Rate Limits in Tests', 'טיפול במגבלות קצב בבדיקות')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5vw', fontWeight: 800, color: '#0D9488', minWidth: '2vw' }}>1</div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Implement exponential backoff', 'יישם backoff אקספוננציאלי')}</div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('Retry after 429 with jitter: 1s, 2s, 4s, 8s.', 'נסה שוב לאחר 429 עם jitter: 1s, 2s, 4s, 8s.')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5vw', fontWeight: 800, color: '#0D9488', minWidth: '2vw' }}>2</div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Track 429 rate in test metrics', 'עקוב אחר שיעור 429 במדדי הבדיקה')}</div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('Flag tests where backoff retries exceed 10% of requests.', 'סמן בדיקות שבהן ניסיונות חוזרים של backoff עולים על 10% מהבקשות.')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5vw', fontWeight: 800, color: '#0D9488', minWidth: '2vw' }}>3</div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Test with Tier 1 limits, target Tier 2+', 'בדוק עם מגבלות Tier 1, כוון ל-Tier 2+')}</div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{t('Use your actual tier limits, not theoretical maximums.', 'השתמש במגבלות הרמה האמיתית שלך, לא בתיאורטיות.')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 14 of 40', 'שקופית 14 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
