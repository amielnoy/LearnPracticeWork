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
  gap: '4vh 4vw',
  color: '#1E3A5F',
};
const statCard: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '3vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  textAlign: 'center',
};

export default function KeyTakeaways() {
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '1vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Lecture Recap', 'סיכום הרצאה')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Key Takeaways', 'נקודות מפתח')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2vw' }}>
          <div style={statCard}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 1', 'נקודה 1')}
            </div>
            <div style={{ fontSize: '2vw', fontWeight: 700, color: '#DC2626', marginBottom: '1vh' }}>
              {t('200 Is Not Success', '200 אינו הצלחה')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Status 200 is necessary but not sufficient for an AI endpoint. Check the payload.',
                'סטטוס 200 הכרחי אך לא מספיק לנקודת קצה AI. בדקו את המטען.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 2', 'נקודה 2')}
            </div>
            <div style={{ fontSize: '2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>
              {t('Structure Then Meaning', 'מבנה ואז משמעות')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Validate structure and meaning separately. Schema first, semantic/judge second.',
                'אמתו מבנה ומשמעות בנפרד. סכמה ראשונה, סמנטי/שופט שנייה.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 3', 'נקודה 3')}
            </div>
            <div style={{ fontSize: '2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>
              {t('Budget Everything', 'תקצבו הכל')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Latency and cost are SLAs like any other. Set budgets, fail the test when they are exceeded.',
                'זמן תגובה ועלות הם SLAs כמו כל אחר. הגדירו תקציבים, כשלו את הבדיקה כשהם חורגים.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 4', 'נקודה 4')}
            </div>
            <div style={{ fontSize: '2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}>
              {t('Test Failure Paths', 'בדקו נתיבי כשל')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Always test the fallback and retry paths. Provider failures are not edge cases — they happen.',
                'תמיד בדקו את נתיבי הנסיגה והניסיון החוזר. כשלי ספקים אינם מקרי קצה — הם קורים.',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '3vh 4vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#475569', lineHeight: 1.6, maxWidth: '60vw' }}>
            {t(
              'A complete test suite for an AI-backed endpoint layers schema, semantic, and latency checks together \u2014 running in CI before every merge, protecting correctness, quality, and budget at once.',
              'חבילת בדיקות מלאה לנקודת קצה המגובה ב-AI שוכבת בדיקות סכמה, סמנטיות וזמן תגובה יחד \u2014 ומריצה ב-CI לפני כל מיזוג, ומגינה על נכונות, איכות ותקציב בו-זמנית.',
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 29 of 30', 'שקופית 29 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
