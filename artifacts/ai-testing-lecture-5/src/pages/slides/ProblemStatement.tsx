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
  gap: '4vh 4vw',
  color: '#1E3A5F',
};
const card: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

export default function ProblemStatement() {
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Left column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
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
          {t('Why This Matters', 'מדוע זה חשוב')}
        </div>
        <h1
          style={{
            fontSize: '3.6vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('The Problem with AI Endpoints', 'הבעיה עם נקודות קצה AI')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'Traditional API testing checks status codes and field presence. An endpoint that calls an LLM can return a 200 with garbage content, drift in format between calls, or quietly balloon your API bill.',
            'בדיקות API מסורתיות בודקות קודי סטטוס ונוכחות שדות. נקודת קצה הקוראת ל-LLM עלולה להחזיר 200 עם תוכן גרוע, לסטות בפורמט בין קריאות, או לנפח את חשבון ה-API בשקט.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#DC2626', marginBottom: '0.5vh' }}>
              {t('Status 200 Is Not Success', 'סטטוס 200 אינו הצלחה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'The HTTP layer can succeed while the AI-generated payload is structurally wrong, semantically empty, or factually incorrect.',
                'שכבת ה-HTTP יכולה להצליח בעוד המטען שנוצר על ידי ה-AI שגוי מבנית, ריק סמנטית, או לא נכון עובדתית.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#D97706', marginBottom: '0.5vh' }}>
              {t('Format Drift Between Calls', 'סחיפת פורמט בין קריאות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A model can change its output structure across calls without any code change on your side, silently breaking downstream consumers.',
                'מודל יכול לשנות את מבנה הפלט שלו בין קריאות ללא שינוי קוד מצדכם, ולשבור בשקט צרכנים במורד הזרם.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#DC2626', marginBottom: '0.5vh' }}>
              {t('Unchecked Cost Growth', 'גידול עלויות לא מבוקר')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A retry loop or an oversized prompt can multiply your token spend by 10x before anyone notices.',
                'לולאת ניסיון חוזר או הנחיה גדולה מדי יכולים להכפיל את הוצאות הטוקן שלכם ב-10x לפני שמישהו שם לב.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.5vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('The Gap', 'הפער')}
          </div>
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#DC2626', marginBottom: '1vh' }}>
              {t('What teams actually test', 'מה צוותים בפועל בודקים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5, fontFamily: 'monospace' }}>
              {t('assert response.status_code == 200', 'assert response.status_code == 200')}
            </div>
          </div>
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#059669', marginBottom: '1vh' }}>
              {t('What they should also test', 'מה הם גם צריכים לבדוק')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.8, fontFamily: 'monospace' }}>
              <div>{t('jsonschema.validate(body, schema)', 'jsonschema.validate(body, schema)')}</div>
              <div>{t('assert cosine_sim(body, ref) >= 0.85', 'assert cosine_sim(body, ref) >= 0.85')}</div>
              <div>{t('assert elapsed_ms <= LATENCY_BUDGET', 'assert elapsed_ms <= LATENCY_BUDGET')}</div>
            </div>
          </div>
          <div
            style={{
              fontSize: '1.1vw',
              color: '#64748B',
              lineHeight: 1.5,
              fontStyle: 'italic',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t(
              'Testing "it responded" is not the same as testing "it responded correctly."',
              'בדיקת "זה הגיב" אינה זהה לבדיקת "זה הגיב נכון."',
            )}
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 3 of 30', 'שקופית 3 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
