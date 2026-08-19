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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function PIILeakageInOutputs() {
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
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
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
          {t('Data Leakage', 'דליפת נתונים')}
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
          {t('PII Leakage in Model Outputs', 'דליפת PII בפלטי מודל')}
        </h1>
      </div>

      {/* Left */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.3vw',
            fontWeight: 700,
            color: '#1E3A5F',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '1.5vh',
          }}
        >
          {t('PII Categories to Test', 'קטגוריות PII לבדיקה')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Email addresses and phone numbers from training data',
                'כתובות אימייל ומספרי טלפון מנתוני האימון',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Partial credit card or SSN patterns surfaced in responses',
                'תבניות חלקיות של כרטיס אשראי או מספר ביטוח לאומי בתגובות',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Other users\u2019 data surfacing via RAG retrieval',
                'נתוני משתמשים אחרים שמגיחים דרך שליפת RAG',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'API keys and internal endpoints from context documents',
                'מפתחות API ונקודות קצה פנימיות ממסמכי ההקשר',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.3vw',
            fontWeight: 700,
            color: '#1E3A5F',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '1.5vh',
          }}
        >
          {t('Detection Approaches', 'גישות גילוי')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Regex patterns for email, phone, SSN, credit card formats',
                'תבניות Regex לאימייל, טלפון, ביטוח לאומי, פורמטי כרטיס אשראי',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Named entity recognition (NER) to flag person and org names',
                'זיהוי ישויות בשמות (NER) לסימון שמות אנשים וארגונים',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Canary tokens: embed unique sentinel strings in training data and query for them',
                'טוקנים מלכודת: הטמע מחרוזות ייחודיות בנתוני האימון ושאל לגביהן',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Output filtering layer that scrubs PII before returning to the user',
                'שכבת סינון פלט שמסירה PII לפני החזרה למשתמש',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 14 of 40', 'שקופית 14 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
