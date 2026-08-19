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

export default function AnatomyDiagram() {
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
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Where Each Test Type Attaches', 'היכן כל סוג בדיקה מתחבר')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Request Lifecycle Anatomy', 'אנטומיית מחזור חיי הבקשה')}
          </h1>
        </div>

        {/* Pipeline diagram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '0',
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '3vh 2vw',
              borderRight: '1px solid #E2E8F0',
              textAlign: 'center',
              background: 'rgba(13, 148, 136, 0.04)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Client', 'לקוח')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Request', 'בקשה')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 0.5vw',
              color: '#94A3B8',
              fontSize: '1.5vw',
            }}
          >
            {isHe ? '\u2190' : '\u2192'}
          </div>
          <div
            style={{
              flex: 1,
              padding: '3vh 2vw',
              borderRight: '1px solid #E2E8F0',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Your API', 'ה-API שלכם')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Business Logic', 'לוגיקה עסקית')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 0.5vw',
              color: '#94A3B8',
              fontSize: '1.5vw',
            }}
          >
            {isHe ? '\u2190' : '\u2192'}
          </div>
          <div
            style={{
              flex: 1,
              padding: '3vh 2vw',
              borderRight: '1px solid #E2E8F0',
              textAlign: 'center',
              position: 'relative',
              background: 'rgba(220, 38, 38, 0.03)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '1vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('AI Provider', 'ספק AI')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('LLM / Retrieval Call', 'קריאת LLM / אחזור')}
            </div>
            <div
              style={{
                marginTop: '1.5vh',
                fontSize: '0.85vw',
                color: '#DC2626',
                background: 'rgba(220,38,38,0.08)',
                borderRadius: '0.4vw',
                padding: '0.5vh 0.8vw',
              }}
            >
              {t('Latency budget here', 'תקציב זמן תגובה כאן')}
            </div>
            <div
              style={{
                marginTop: '0.5vh',
                fontSize: '0.85vw',
                color: '#DC2626',
                background: 'rgba(220,38,38,0.08)',
                borderRadius: '0.4vw',
                padding: '0.5vh 0.8vw',
              }}
            >
              {t('Mock injection here', 'הזרקת הדמייה כאן')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 0.5vw',
              color: '#94A3B8',
              fontSize: '1.5vw',
            }}
          >
            {isHe ? '\u2190' : '\u2192'}
          </div>
          <div
            style={{
              flex: 1,
              padding: '3vh 2vw',
              borderRight: '1px solid #E2E8F0',
              textAlign: 'center',
              position: 'relative',
              background: 'rgba(13, 148, 136, 0.04)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Assembly', 'הרכבה')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Response Assembly', 'הרכבת תגובה')}
            </div>
            <div
              style={{
                marginTop: '1.5vh',
                fontSize: '0.85vw',
                color: '#0D9488',
                background: 'rgba(13,148,136,0.1)',
                borderRadius: '0.4vw',
                padding: '0.5vh 0.8vw',
              }}
            >
              {t('Schema check here', 'בדיקת סכמה כאן')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 0.5vw',
              color: '#94A3B8',
              fontSize: '1.5vw',
            }}
          >
            {isHe ? '\u2190' : '\u2192'}
          </div>
          <div
            style={{
              flex: 1,
              padding: '3vh 2vw',
              textAlign: 'center',
              background: 'rgba(13, 148, 136, 0.04)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Client', 'לקוח')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Response', 'תגובה')}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '0.8vh',
                textTransform: 'uppercase',
              }}
            >
              {t('Schema Check', 'בדיקת סכמה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Runs at response assembly — validates the payload shape before it leaves your service.',
                'רץ בהרכבת התגובה — מאמת את צורת המטען לפני שהוא עוזב את השירות שלכם.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '0.8vh',
                textTransform: 'uppercase',
              }}
            >
              {t('Latency Budget', 'תקציב זמן תגובה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Wraps the AI provider call — measures wall-clock time for the external request only.',
                'עוטף את קריאת ספק ה-AI — מודד זמן שעון קיר לבקשה החיצונית בלבד.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#D97706',
                marginBottom: '0.8vh',
                textTransform: 'uppercase',
              }}
            >
              {t('Mock Injection', 'הזרקת הדמייה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Intercepts at the provider boundary — replaces the live HTTP call with a fixed fixture.',
                'מיירט בגבול הספק — מחליף את קריאת ה-HTTP החיה בנקודת קיבוע קבועה.',
              )}
            </div>
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
          <span>{t('Slide 5 of 30', 'שקופית 5 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
