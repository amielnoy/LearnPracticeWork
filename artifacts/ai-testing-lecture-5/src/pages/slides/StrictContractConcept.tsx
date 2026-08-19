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

export default function StrictContractConcept() {
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
          {t('Section 1 \u2014 Schema Testing', 'חלק 1 \u2014 בדיקות סכמה')}
        </div>
        <h1
          style={{
            fontSize: '3.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('AI Endpoints Need Stricter Contracts', 'נקודות קצה AI צריכות חוזים קפדניים יותר')}
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
            'A model can produce technically-valid JSON that is still the wrong shape — missing optional-looking-but-required fields, extra keys, or wrong types. Define the contract once, validate on every response, not just in a manual review.',
            'מודל יכול לייצר JSON תקני טכנית שעדיין יש לו צורה שגויה — שדות חסרים שנראים אופציונליים אך נדרשים, מפתחות מיותרים, או סוגים שגויים. הגדירו את החוזה פעם אחת, אמתו בכל תגובה, לא רק בסקירה ידנית.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Optional-Looking Required Fields', 'שדות נדרשים הנראים אופציונליים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'The model sometimes omits fields your code treats as guaranteed. A schema catches the omission; a status 200 check does not.',
                'המודל לפעמים משמיט שדות שהקוד שלכם מתייחס אליהם כמובטחים. סכמה תופסת את ההשמטה; בדיקת סטטוס 200 לא.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Extra Keys in the Payload', 'מפתחות נוספים במטען')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'An undeclared extra field today can become a field your downstream consumer depends on tomorrow, locking you into an unversioned contract.',
                'מפתח נוסף לא מוצהר היום יכול להפוך למחר לשדה שצרכן במורד הזרם תלוי בו, ולנעול אתכם בחוזה לא מגורסא.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Type Drift Across Model Versions', 'סחיפת סוג בגרסאות מודל')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A field that was always a number can become a string or null when the provider updates the model, crashing runtime type coercions silently.',
                'שדה שהיה תמיד מספר יכול להפוך למחרוזת או null כאשר הספק מעדכן את המודל, ולשבור המרות סוג בזמן ריצה בשקט.',
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
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('A Minimal Recipe Schema', 'סכמה מינימלית למתכון')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.95vw',
              lineHeight: 1.7,
              color: '#E2E8F0',
              flex: 1,
            }}
          >
            <div style={{ color: '#64748B' }}>{'{'}  <span style={{ color: '#38BDF8' }}>"type"</span>: <span style={{ color: '#FBBF24' }}>"object"</span>,</div>
            <div style={{ color: '#64748B', paddingLeft: '1vw' }}><span style={{ color: '#38BDF8' }}>"required"</span>: [<span style={{ color: '#4ADE80' }}>"title"</span>, <span style={{ color: '#4ADE80' }}>"steps"</span>, <span style={{ color: '#4ADE80' }}>"prep_minutes"</span>],</div>
            <div style={{ color: '#64748B', paddingLeft: '1vw' }}><span style={{ color: '#38BDF8' }}>"properties"</span>: {'{'}</div>
            <div style={{ color: '#64748B', paddingLeft: '2vw' }}><span style={{ color: '#4ADE80' }}>"title"</span>: {'{'} <span style={{ color: '#38BDF8' }}>"type"</span>: <span style={{ color: '#FBBF24' }}>"string"</span> {'}'},</div>
            <div style={{ color: '#64748B', paddingLeft: '2vw' }}><span style={{ color: '#4ADE80' }}>"steps"</span>: {'{'} <span style={{ color: '#38BDF8' }}>"type"</span>: <span style={{ color: '#FBBF24' }}>"array"</span>, <span style={{ color: '#38BDF8' }}>"minItems"</span>: 1 {'}'},</div>
            <div style={{ color: '#64748B', paddingLeft: '2vw' }}><span style={{ color: '#4ADE80' }}>"prep_minutes"</span>: {'{'} <span style={{ color: '#38BDF8' }}>"type"</span>: <span style={{ color: '#FBBF24' }}>"integer"</span>, <span style={{ color: '#38BDF8' }}>"minimum"</span>: 0 {'}'}</div>
            <div style={{ color: '#64748B', paddingLeft: '1vw' }}>{'}'}</div>
            <div style={{ color: '#64748B' }}>{'}'}</div>
          </div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5, textAlign: isHe ? 'right' : 'left' }}>
            {t(
              'prep_minutes is in "required" — a model that omits it will fail validation immediately, before your code ever tries to read it.',
              'prep_minutes נמצא ב-"required" — מודל שמשמיט אותו ייכשל באימות מיידית, לפני שהקוד שלכם ינסה לקרוא אותו.',
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
          <span>{t('Slide 7 of 30', 'שקופית 7 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
