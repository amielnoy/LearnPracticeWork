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

export default function CheckYourUnderstanding() {
  const questions = [
    {
      q: t(
        'Q1: You set a similarity threshold of 0.60 and your test suite is passing 99% of cases. Should you feel confident? Why or why not?',
        'ש1: קבעת סף דמיון של 0.60 וחבילת הבדיקות שלך עוברת 99% מהמקרים. האם כדאי לך להרגיש בטוח? מדוע כן או לא?',
      ),
      a: t(
        'No — 0.60 is too low. At that threshold, meaningfully different (even factually wrong) answers may score above the threshold and pass. A high pass-rate with a weak threshold gives false confidence. Set the threshold empirically using a labelled validation set.',
        'לא — 0.60 נמוך מדי. בסף כזה, תשובות שונות משמעותית (אפילו שגויות עובדתית) עשויות לקבל ציון מעל הסף ולעבור. שיעור עבר גבוה עם סף חלש נותן ביטחון כוזב. קבע את הסף אמפירית באמצעות מערך אימות מתויג.',
      ),
      color: '#0D9488',
    },
    {
      q: t(
        'Q2: The factuality checker returns "SUPPORTED" for every claim in a response, but with confidence scores of 0.51–0.55. What should your pipeline do?',
        'ש2: בודק העובדתיות מחזיר "נתמך" לכל טענה בתגובה, אך עם ציוני ביטחון של 0.51–0.55. מה צריך הצינור שלך לעשות?',
      ),
      a: t(
        'Route the output to human review — do not auto-pass. Confidence just above 0.5 is barely better than random. These cases are genuine ambiguities: the verifier has insufficient evidence, not strong support.',
        'העבר את הפלט לסקירה אנושית — אל תעביר אוטומטית. ביטחון מעט מעל 0.5 בקושי טוב יותר מאקראי. אלו הן אי-ודאויות אמיתיות: למאמת אין ראיות מספיקות, לא תמיכה חזקה.',
      ),
      color: '#D97706',
    },
    {
      q: t(
        'Q3: A response passes schema validation but contains a price field of 0.001. What class of error is this and what technique catches it?',
        'ש3: תגובה עוברת אימות סכמה אך מכילה שדה מחיר של 0.001. מאיזה סוג שגיאה מדובר ואיזו טכניקה תופסת אותה?',
      ),
      a: t(
        'This is a semantic error — structurally valid but contextually wrong. Schema validation cannot catch it (the type and minimum: 0 constraints pass). You need either a semantic similarity check against a reference, a factuality check cross-referencing a price database, or a manual human review trigger on out-of-range values.',
        'זו שגיאה סמנטית — תקינה מבנית אך שגויה הקשרית. אימות סכמה אינו יכול לתפוס אותה (אילוצי הסוג ו-minimum: 0 עוברים). אתה צריך בדיקת דמיון סמנטי מול ייחוס, בדיקת עובדתיות בהצלבה עם מסד נתוני מחירים, או הפעלת סקירה אנושית ידנית על ערכים מחוץ לטווח.',
      ),
      color: '#DC2626',
    },
  ];

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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh' }}
      >
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
            {t('Discussion Questions', 'שאלות לדיון')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Check Your Understanding', 'בדוק את הבנתך')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5vw' }}>
          {questions.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                border: `1.5px solid ${item.color}30`,
                borderRadius: '1vw',
                padding: '2.5vh 2vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5vh',
                boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  fontSize: '1.05vw',
                  fontWeight: 700,
                  color: '#1E3A5F',
                  lineHeight: 1.4,
                }}
              >
                {item.q}
              </div>
              <div
                style={{
                  borderTop: `2px solid ${item.color}30`,
                  paddingTop: '1.2vh',
                }}
              >
                <div
                  style={{
                    fontSize: '0.85vw',
                    fontWeight: 600,
                    color: item.color,
                    marginBottom: '0.6vh',
                    textTransform: isHe ? 'none' : 'uppercase',
                  }}
                >
                  {t('Answer', 'תשובה')}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#475569', lineHeight: 1.5 }}>{item.a}</div>
              </div>
            </div>
          ))}
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 27 of 30', 'שקופית 27 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
