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

export default function HumanInTheLoopReview() {
  const triggers = [
    t('Factuality confidence below threshold', 'ביטחון עובדתיות מתחת לסף'),
    t('Similarity score near the pass/fail boundary (± 0.05)', 'ציון דמיון קרוב לגבול עבר/נכשל (± 0.05)'),
    t('Safety classifier flags a borderline case', 'מסווג הבטיחות מסמן מקרה גבולי'),
    t('Novel topic not covered by the golden dataset', 'נושא חדש שאינו מכוסה במערך הנתונים הזהוב'),
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
          {t('Human Oversight', 'פיקוח אנושי')}
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
          {t('The Human-in-the-Loop Safety Net', 'רשת הבטיחות של אדם בלולאה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'Automation handles the clear cases. Humans handle the uncertain edge cases — and their decisions feed back into the system as new labelled data.',
            'אוטומציה מטפלת במקרים הברורים. בני אדם מטפלים במקרי הקצה הלא ודאיים — והחלטותיהם מוזנות בחזרה למערכת כנתונים מתויגים חדשים.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}>
            {t('What Triggers Human Review', 'מה מפעיל סקירה אנושית')}
          </div>
          {triggers.map((item, i) => (
            <div
              key={i}
              style={{
                ...card,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1vw',
                padding: '1.5vh 1.5vw',
              }}
            >
              <div
                style={{
                  width: '0.8vw',
                  height: '0.8vw',
                  minWidth: '0.8vw',
                  borderRadius: '50%',
                  backgroundColor: '#D97706',
                  marginTop: '0.4vh',
                }}
              />
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — queue flow */}
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
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Review Queue Flow', 'זרימת תור הסקירה')}
          </div>

          {[
            {
              step: t('1. Flagged output enters queue', '1. פלט מסומן נכנס לתור'),
              note: t('Includes checker scores, prompt, and context', 'כולל ציוני בודק, הנחיה והקשר'),
              color: '#D97706',
            },
            {
              step: t('2. Reviewer inspects and labels', '2. סוקר בוחן ומתייג'),
              note: t('Verdict: CORRECT / INCORRECT / EDGE-CASE', 'פסיקה: נכון / שגוי / מקרה-קצה'),
              color: '#0D9488',
            },
            {
              step: t('3. Label feeds back into test suite', '3. תיוג חוזר לחבילת הבדיקות'),
              note: t('Expands golden dataset, improves future automation', 'מרחיב מערך נתונים זהוב, משפר אוטומציה עתידית'),
              color: '#1E3A5F',
            },
            {
              step: t('4. Monitor queue volume over time', '4. עקוב אחר נפח התור לאורך זמן'),
              note: t('Rising queue = model or threshold needs recalibration', 'תור גדל = מודל או סף צריך כיול מחדש'),
              color: '#64748B',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1.5vw',
                alignItems: 'flex-start',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  width: '0.6vw',
                  minWidth: '0.6vw',
                  height: '0.6vw',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  marginTop: '0.5vh',
                }}
              />
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.3vh' }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{item.note}</div>
              </div>
            </div>
          ))}
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
          <span>{t('Slide 25 of 30', 'שקופית 25 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
