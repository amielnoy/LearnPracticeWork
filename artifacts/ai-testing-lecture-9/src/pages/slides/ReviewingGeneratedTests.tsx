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

export default function ReviewingGeneratedTests() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

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
          {t('Quality Gate', 'שער איכות')}
        </div>
        <h1
          style={{
            fontSize: '2.8vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Reviewing AI-Generated Tests', 'סקירת בדיקות שנוצרו על ידי AI')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2vh 0', lineHeight: 1.6 }}>
          {t(
            'Every AI-generated test needs human eyes before it enters the CI pipeline. The review checklist prevents false-confidence coverage.',
            'כל בדיקה שנוצרה על ידי AI זקוקה לעיניים אנושיות לפני שנכנסת לצינור CI. רשימת הסקירה מונעת כיסוי של ביטחון שגוי.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
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
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Does the assertion verify intent, not just that the function ran?',
                'האם האסרציה מאמתת כוונה, לא רק שהפונקציה רצה?',
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
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Is the test name descriptive enough to diagnose a failure without reading the body?',
                'האם שם הבדיקה תיאורי מספיק לאבחון כשל ללא קריאת הגוף?',
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
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Are mock return values realistic, or did the AI fabricate plausible-sounding data?',
                'האם ערכי החזרה של ה-mock ריאליסטיים, או ש-AI בדה נתונים שנשמעים סבירים?',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            height: '100%',
            boxSizing: 'border-box',
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
              paddingBottom: '2vh',
            }}
          >
            {t('Review Status in Supabase', 'סטטוס סקירה ב-Supabase')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#D1FAE5',
                  color: '#059669',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 1vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '8vw',
                  textAlign: 'center',
                }}
              >
                approved
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t('Test merged to PR and added to suite', 'בדיקה ממוזגת ל-PR ומוספת לחבילה')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#FEF9C3',
                  color: '#D97706',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 1vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '8vw',
                  textAlign: 'center',
                }}
              >
                pending
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t('Awaiting reviewer assignment', 'ממתין להקצאת סוקר')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#FEE2E2',
                  color: '#DC2626',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 1vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '8vw',
                  textAlign: 'center',
                }}
              >
                rejected
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Stored with rejection_reason column for prompt tuning',
                  'מאוחסן עם עמודת rejection_reason לכוונון פרומפטים',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#EDE9FE',
                  color: '#6366F1',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 1vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '8vw',
                  textAlign: 'center',
                }}
              >
                regen
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Sent back to the pipeline with reviewer feedback as context',
                  'נשלח בחזרה לצינור עם משוב הסוקר כהקשר',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 21 of 40', 'שקופית 21 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
