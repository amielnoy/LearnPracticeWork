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

export default function NonDeterminismContracts() {
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
          {t('Handling Non-Determinism in Contract Tests', 'טיפול באי-דטרמיניזם בבדיקות חוזה')}
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
            'Assert on field presence, types, and ranges rather than exact string equality. Use regex or enum checks for fields the model phrases differently on each call.',
            'קבעו על נוכחות שדות, סוגים וטווחים במקום שוויון מחרוזות מדויק. השתמשו בבדיקות regex או enum עבור שדות שהמודל מנסח אחרת בכל קריאה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Assert on Shape, Not Value', 'קבעו על צורה, לא על ערך')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Check that a "status" field exists and is a string. Do not check that it equals "completed" — the model may phrase it as "done" or "finished."',
                'בדקו שקיים שדה "status" והוא מחרוזת. אל תבדקו שהוא שווה ל-"completed" — המודל עשוי לנסח אותו כ-"done" או "finished."',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Enum Checks for Categorical Fields', 'בדיקות enum עבור שדות קטגוריים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'When the field must be one of a fixed set, use "enum" in the schema. This tolerates case variation but rejects truly unexpected values.',
                'כאשר השדה חייב להיות אחד מקבוצה קבועה, השתמשו ב-"enum" בסכמה. זה מתיר שינוי רישיות אך דוחה ערכים בלתי צפויים לחלוטין.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Range Assertions for Numeric Fields', 'קביעות טווח עבור שדות מספריים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Instead of asserting an exact price, assert minimum: 0 and maximum: 10000. This survives model variation while blocking clearly wrong values.',
                'במקום לקבוע מחיר מדויק, קבעו minimum: 0 ו-maximum: 10000. זה שורד שינויים במודל תוך חסימת ערכים שגויים בבירור.',
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
            padding: '3vh 2.5vw',
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
            {t('Brittle vs. Resilient Assertions', 'קביעות שבירות לעומת חסינות')}
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
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#DC2626', marginBottom: '0.8vh', textTransform: 'uppercase' }}>
              {t('Brittle', 'שבירה')}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.95vw', color: '#475569', lineHeight: 1.7 }}>
              <div>{t('assert body["summary"] ==', 'assert body["summary"] ==')}</div>
              <div>&nbsp;&nbsp;{t('"Customer requests refund"', '"Customer requests refund"')}</div>
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
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#059669', marginBottom: '0.8vh', textTransform: 'uppercase' }}>
              {t('Resilient', 'חסינה')}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.95vw', color: '#475569', lineHeight: 1.7 }}>
              <div>{t('assert isinstance(body["summary"], str)', 'assert isinstance(body["summary"], str)')}</div>
              <div>{t('assert len(body["summary"]) > 10', 'assert len(body["summary"]) > 10')}</div>
              <div>{t('assert body["category"] in VALID_CATEGORIES', 'assert body["category"] in VALID_CATEGORIES')}</div>
            </div>
          </div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5, textAlign: isHe ? 'right' : 'left' }}>
            {t(
              'Resilient assertions survive model variation while still catching genuine breakage.',
              'קביעות חסינות שורדות שינויים במודל תוך תפיסת תקלות אמיתיות.',
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
          <span>{t('Slide 9 of 30', 'שקופית 9 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
