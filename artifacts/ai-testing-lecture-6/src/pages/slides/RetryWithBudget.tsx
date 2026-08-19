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

export default function RetryWithBudget() {
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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}
        >
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
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
          {t('Section 2', 'חלק 2')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Retry-with-Budget Strategies', 'אסטרטגיות ניסיון חוזר עם תקציב')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'A bounded number of retries with logged outcomes, so a test that only passes on retry gets flagged for review instead of quietly reported green.',
            'מספר מוגבל של ניסיונות חוזרים עם תוצאות מתועדות, כדי שבדיקה שעוברת רק בניסיון חוזר תסומן לסקירה במקום לדווח בשקט כירוק.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Bound the retry count', 'הגבל את מספר הניסיונות החוזרים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Two to three retries is typically enough to distinguish a transient network error from a real failure. More than that delays signal rather than improving it.',
                'שניים עד שלושה ניסיונות חוזרים הם בדרך כלל מספיק להבחין בין שגיאת רשת חולפת לכשל אמיתי. יותר מכך מעכב את האות במקום לשפר אותו.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Log every attempt outcome', 'תעד כל תוצאת ניסיון')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Record pass, fail, and error for each attempt number. This creates the audit trail needed to decide whether a test is genuinely flaky.',
                'תעד עבר, נכשל ושגיאה לכל מספר ניסיון. זה יוצר את מסלול הביקורת הנדרש להחליט האם בדיקה היא באמת לא יציבה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Flag, do not hide, a retry-only pass', 'סמן, אל תסתיר, מעבר בניסיון חוזר בלבד')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A test that needs a retry to pass is a signal to track, not a green checkmark to silently accept.',
                'בדיקה שצריכה ניסיון חוזר כדי לעבור היא אות למעקב, לא סימון ירוק לקבלה שקטה.',
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
            {t('Retry Outcome Table', 'טבלת תוצאות ניסיונות חוזרים')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1vw',
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#94A3B8',
                textTransform: isHe ? 'none' : 'uppercase',
                textAlign: 'center',
              }}
            >
              <div>{t('Pattern', 'תבנית')}</div>
              <div>{t('CI Result', 'תוצאת CI')}</div>
              <div>{t('Action', 'פעולה')}</div>
            </div>
            <div style={{ height: '1px', background: '#E2E8F0' }} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1vw',
                fontSize: '1vw',
                color: '#1E3A5F',
                textAlign: 'center',
              }}
            >
              <div>{t('PASS PASS PASS', 'עבר עבר עבר')}</div>
              <div style={{ color: '#059669', fontWeight: 600 }}>{t('Green', 'ירוק')}</div>
              <div style={{ color: '#64748B' }}>{t('None', 'ללא')}</div>
            </div>
            <div style={{ height: '1px', background: '#E2E8F0' }} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1vw',
                fontSize: '1vw',
                color: '#1E3A5F',
                textAlign: 'center',
              }}
            >
              <div>{t('FAIL PASS', 'נכשל עבר')}</div>
              <div style={{ color: '#D97706', fontWeight: 600 }}>{t('Flagged', 'מסומן')}</div>
              <div style={{ color: '#64748B' }}>{t('Flakiness review', 'סקירת חוסר יציבות')}</div>
            </div>
            <div style={{ height: '1px', background: '#E2E8F0' }} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1vw',
                fontSize: '1vw',
                color: '#1E3A5F',
                textAlign: 'center',
              }}
            >
              <div>{t('FAIL FAIL FAIL', 'נכשל נכשל נכשל')}</div>
              <div style={{ color: '#DC2626', fontWeight: 600 }}>{t('Red', 'אדום')}</div>
              <div style={{ color: '#64748B' }}>{t('Fix the test', 'תקן את הבדיקה')}</div>
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 13 of 30', 'שקופית 13 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
