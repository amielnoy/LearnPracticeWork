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

export default function SectionWrapSchema() {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', justifyContent: 'center' }}>
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
            {t('Section 1 Recap', 'סיכום חלק 1')}
          </div>
          <h1
            style={{
              fontSize: '3.6vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Schema & Contract Testing', 'בדיקות סכמה וחוזה')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2.5vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.5vw', fontWeight: 700, color: '#0D9488', marginBottom: '1.5vh' }}>
              {t('Key insight', 'תובנה מרכזית')}
            </div>
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.6 }}>
              {t(
                'Schema validation catches structural drift before it reaches your frontend or downstream consumers. A 200 status is necessary but not sufficient.',
                'אימות סכמה תופס סחיפה מבנית לפני שהיא מגיעה לצד הלקוח או לצרכנים במורד הזרם. סטטוס 200 הוא הכרחי אך לא מספיק.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2.5vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.5vw', fontWeight: 700, color: '#0D9488', marginBottom: '1.5vh' }}>
              {t('The practice', 'הפרקטיקה')}
            </div>
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.6 }}>
              {t(
                'Version the contract — keep it in source control, require a PR for any change, and treat schema drift the same as any other breaking API change.',
                'גרסאו את החוזה — שמרו אותו בבקרת מקור, דרשו PR לכל שינוי, והתייחסו לסחיפת סכמה כמו לכל שינוי API שובר אחר.',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(13, 148, 136, 0.06)',
            border: '1px solid rgba(13, 148, 136, 0.2)',
            borderRadius: '1vw',
            padding: '2.5vh 3vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.6, fontWeight: 500 }}>
            {t(
              "Don\u2019t just eyeball it. A schema file that lives in your repo, validated in every CI run, is the only way to know your AI endpoint\u2019s contract has not silently changed.",
              'אל תסתכלו בלבד. קובץ סכמה שנמצא ב-repo שלכם, מאומת בכל הרצת CI, הוא הדרך היחידה לדעת שחוזה נקודת הקצה ה-AI שלכם לא השתנה בשקט.',
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
          <span>{t('Slide 11 of 30', 'שקופית 11 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
