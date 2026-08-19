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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

const items = [
  { num: 'LLM01', en: 'Prompt Injection', he: 'הזרקת הנחיות', color: '#DC2626' },
  { num: 'LLM02', en: 'Insecure Output Handling', he: 'טיפול לא בטוח בפלט', color: '#D97706' },
  { num: 'LLM03', en: 'Training Data Poisoning', he: 'הרעלת נתוני אימון', color: '#D97706' },
  { num: 'LLM04', en: 'Model Denial of Service', he: 'מניעת שירות מהמודל', color: '#D97706' },
  {
    num: 'LLM05',
    en: 'Supply Chain Vulnerabilities',
    he: 'פגיעויות שרשרת האספקה',
    color: '#64748B',
  },
  { num: 'LLM06', en: 'Sensitive Information Disclosure', he: 'חשיפת מידע רגיש', color: '#DC2626' },
  { num: 'LLM07', en: 'Insecure Plugin Design', he: 'תכנון לא בטוח של תוספים', color: '#64748B' },
  { num: 'LLM08', en: 'Excessive Agency', he: 'סמכות יתר', color: '#D97706' },
  { num: 'LLM09', en: 'Overreliance', he: 'הסתמכות יתר', color: '#64748B' },
  { num: 'LLM10', en: 'Model Theft', he: 'גניבת מודל', color: '#64748B' },
];

export default function OWASPTop10() {
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
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: isHe ? 'right' : 'left' }}>
        <div
          style={{
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '0.8vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('OWASP LLM Top 10', 'OWASP LLM Top 10')}
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
          {t('The Canonical Vulnerability List', 'רשימת הפגיעויות הקנונית')}
        </h1>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5vh 1.5vw' }}>
        {items.map(item => (
          <div
            key={item.num}
            style={{
              background: '#FFFFFF',
              borderRadius: '0.8vw',
              border: `1px solid #E2E8F0`,
              borderTop: `3px solid ${item.color}`,
              padding: '1.5vh 1.5vw',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: item.color,
                marginBottom: '0.6vh',
                letterSpacing: '0.05em',
              }}
            >
              {item.num}
            </div>
            <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.3 }}>
              {t(item.en, item.he)}
            </div>
          </div>
        ))}
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
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 4 of 40', 'שקופית 4 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
