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

export default function SchemaDesignBestPractices() {
  const dos = [
    t('Mark required fields explicitly — never infer from absence', 'סמן שדות חובה במפורש — לעולם אל תסיק מהיעדר'),
    t('Use enum for fields with a fixed value set', 'השתמש ב-enum לשדות עם קבוצת ערכים קבועה'),
    t('Add minLength / maxLength to string fields', 'הוסף minLength / maxLength לשדות מחרוזת'),
    t('Use format: "date" / "email" for well-typed strings', 'השתמש ב-format: "date" / "email" למחרוזות מוקלדות'),
    t('Set additionalProperties: false in strict mode', 'הגדר additionalProperties: false במצב קשיח'),
  ];
  const donts = [
    t('Do NOT make every field optional "just in case"', 'אל תהפוך כל שדה לאופציונלי "למקרה הצורך"'),
    t('Do NOT use type: "string" for numeric IDs', 'אל תשתמש ב-type: "string" עבור מזהים מספריים'),
    t('Do NOT omit descriptions — they guide the LLM', 'אל תשמיט תיאורים — הם מנחים את ה-LLM'),
    t('Do NOT hard-code values that may vary by locale', 'אל תשמור ערכים קשיחים שעשויים להשתנות לפי locale'),
  ];

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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
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
          {t('Schema Validation', 'אימות סכמה')}
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
          {t('Designing Schemas for Testability', 'עיצוב סכמות לבדיקות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'A schema that is too loose lets errors through; one that is too strict breaks on perfectly valid variation. Good schema design is a balance.',
            'סכמה שרופפת מדי מאפשרת שגיאות לעבור; סכמה קשיחה מדי נשברת על וריאציה תקפה לחלוטין. עיצוב סכמה טוב הוא איזון.',
          )}
        </p>

        <div
          style={{
            background: '#0D1B2A',
            borderRadius: '0.8vw',
            padding: '2vh 2vw',
            fontFamily: 'monospace',
            fontSize: '0.9vw',
            color: '#E2E8F0',
            lineHeight: 1.7,
          }}
        >
          <div style={{ color: '#64748B', marginBottom: '0.5vh' }}>// {t('Testable schema snippet', 'קטע סכמה הניתן לבדיקה')}</div>
          <div>{'{'}</div>
          <div style={{ paddingLeft: '1.5vw', color: '#0D9488' }}>"type": "object",</div>
          <div style={{ paddingLeft: '1.5vw', color: '#0D9488' }}>"required": ["id", "price", "currency"],</div>
          <div style={{ paddingLeft: '1.5vw', color: '#94A3B8' }}>"additionalProperties": false,</div>
          <div style={{ paddingLeft: '1.5vw' }}>"properties": {'{'}</div>
          <div style={{ paddingLeft: '3vw', color: '#F59E0B' }}>"price": {'{'} "type": "number", "minimum": 0 {'}'},</div>
          <div style={{ paddingLeft: '3vw', color: '#F59E0B' }}>"currency": {'{'} "type": "string", "enum": ["USD","EUR","GBP"] {'}'}</div>
          <div style={{ paddingLeft: '1.5vw' }}>{'}'}</div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '3vh 2.5vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#0D9488',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('DOs', 'מה לעשות')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9vh' }}>
            {dos.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8vw', alignItems: 'flex-start', fontSize: '0.95vw', color: '#1E3A5F', textAlign: isHe ? 'right' : 'left' }}>
                <span style={{ color: '#0D9488', fontWeight: 700, flexShrink: 0, marginTop: '0.1vh' }}>✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#DC2626',
              borderBottom: '1px solid #E2E8F0',
              borderTop: '1px solid #E2E8F0',
              padding: '1.5vh 0',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t("DON'Ts", 'מה לא לעשות')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9vh' }}>
            {donts.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8vw', alignItems: 'flex-start', fontSize: '0.95vw', color: '#1E3A5F', textAlign: isHe ? 'right' : 'left' }}>
                <span style={{ color: '#DC2626', fontWeight: 700, flexShrink: 0, marginTop: '0.1vh' }}>✘</span>
                <span>{item}</span>
              </div>
            ))}
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 30', 'שקופית 19 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
