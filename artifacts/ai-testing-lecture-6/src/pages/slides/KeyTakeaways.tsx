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
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5vw' }}>
          <div style={statCard}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 1', 'נקודה 1')}
            </div>
            <div style={{ fontSize: '1.8vw', fontWeight: 700, color: '#1E3A5F', lineHeight: 1.2 }}>
              {t('Shard and Cache', 'Shard ומטמון')}
            </div>
            <div
              style={{ fontSize: '0.95vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}
            >
              {t(
                'Keep AI tests fast and affordable enough for every PR.',
                'שמור על בדיקות AI מהירות ומשתלמות מספיק לכל PR.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 2', 'נקודה 2')}
            </div>
            <div style={{ fontSize: '1.8vw', fontWeight: 700, color: '#1E3A5F', lineHeight: 1.2 }}>
              {t('Track Flakiness', 'עקוב אחר חוסר יציבות')}
            </div>
            <div
              style={{ fontSize: '0.95vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}
            >
              {t(
                "Don't silently retry past real regressions.",
                'אל תנסה בשקט חוזר על רגרסיות אמיתיות.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 3', 'נקודה 3')}
            </div>
            <div style={{ fontSize: '1.8vw', fontWeight: 700, color: '#1E3A5F', lineHeight: 1.2 }}>
              {t('Judge Gate', 'שער שופט')}
            </div>
            <div
              style={{ fontSize: '0.95vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}
            >
              {t(
                'Use a rubric and a threshold, not a gut check.',
                'השתמש ברובריקה ובסף, לא בבדיקת תחושת בטן.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Takeaway 4', 'נקודה 4')}
            </div>
            <div style={{ fontSize: '1.8vw', fontWeight: 700, color: '#1E3A5F', lineHeight: 1.2 }}>
              {t('Fast PR, Full Night', 'PR מהיר, לילה מלא')}
            </div>
            <div
              style={{ fontSize: '0.95vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}
            >
              {t(
                'Separate the fast smoke path from the full nightly suite.',
                'הפרד את נתיב ה-smoke המהיר מהחבילה הלילית המלאה.',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '3.5vh 4vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#475569', lineHeight: 1.6, maxWidth: '55vw' }}>
            {t(
              'No AI test suite runs reliably in CI without explicitly addressing cost, flakiness, and gate design. These are engineering problems, not testing problems \u2014 and they have engineering solutions.',
              'אף חבילת בדיקות AI לא פועלת באמינות ב-CI מבלי להתמודד במפורש עם עלות, חוסר יציבות ותכנון שערים. אלה בעיות הנדסיות, לא בעיות בדיקה \u2014 ויש להן פתרונות הנדסיים.',
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 29 of 30', 'שקופית 29 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
