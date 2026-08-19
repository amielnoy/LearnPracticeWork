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

const card: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '1vw',
  padding: '2.5vh 2vw',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1vh',
  borderTop: '4px solid #B45309',
};

export default function InjectionAttackPatterns() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('SAFETY & SECURITY', 'בטיחות ואבטחה')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh' }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#B45309',
              marginBottom: '1vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Safety & Security', 'בטיחות ואבטחה')}
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
            {t('Prompt Injection Attack Patterns', 'תבניות התקפה של הזרקת פרומפטים')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Direct injection', 'הזרקה ישירה')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'a user types \u201cignore previous instructions and\u2026\u201d straight into the input',
                'משתמש מקליד \u201cהתעלם מההנחיות הקודמות ו...\u201d ישירות לתוך הקלט',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Indirect injection', 'הזרקה עקיפה')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'malicious instructions hidden in a document, webpage, or email the model reads',
                'הנחיות זדוניות מוסתרות במסמך, בדף אינטרנט או באימייל שהמודל קורא',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Goal hijacking', 'חטיפת מטרה')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'redirecting the model to a different task than the one it was asked to do',
                'הפניית המודל למשימה שונה מזו שהתבקש לבצע',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Data exfiltration', 'הדלפת נתונים')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'tricking the model into repeating back system prompts or hidden context',
                'הטעיית המודל לחזור על הודעות המערכת או ההקשר הנסתר',
              )}
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 15 of 21', 'שקופית 15 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
