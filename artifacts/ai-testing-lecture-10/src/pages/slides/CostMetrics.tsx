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

export default function CostMetrics() {
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
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
          {t('Metric Category 2', 'קטגוריית מדד 2')}
        </div>
        <h1
          style={{
            fontSize: '3.4vw',
            fontWeight: 800,
            margin: '0 0 2.5vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Cost Metrics', 'מדדי עלות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Cost metrics prevent a quality win from becoming a budget disaster. A model upgrade that improves accuracy by 3% but doubles API spend needs a cost review before shipping.',
            'מדדי עלות מונעים מניצחון איכות להפוך לאסון תקציבי. שדרוג מודל שמשפר דיוק ב-3% אבל מכפיל הוצאות API זקוק לסקירת עלות לפני משלוח.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Cost per 1,000 tokens (input + output)', 'עלות לכל 1,000 אסימונים (קלט + פלט)')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t(
                'The atomic unit. Track separately for input and output tokens.',
                'היחידה האטומית. עקוב בנפרד עבור אסימוני קלט ופלט.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Cost per feature invocation', 'עלות לכל הפעלת תכונה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t(
                'Aggregates input + output + retries. The number product managers understand.',
                'מאגד קלט + פלט + ניסיונות חוזרים. המספר שמנהלי מוצר מבינים.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                fontSize: '1.05vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Monthly projected spend vs. budget', 'הוצאה חזויה חודשית לעומת תקציב')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>
              {t(
                'Extrapolate from daily test-run spend to warn before the month ends.',
                'חשב לפי הוצאת ריצת בדיקה יומית כדי להזהיר לפני שהחודש נגמר.',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#1E3A5F',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#FAFBFC',
              borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Cost scorecard column', 'עמודת כרטיס ניקוד עלות')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Within 5% of budget', 'בתוך 5% מהתקציב')}
              </div>
              <div
                style={{
                  background: '#059669',
                  color: '#fff',
                  borderRadius: '0.4vw',
                  padding: '0.3vh 0.8vw',
                  fontSize: '0.9vw',
                  fontWeight: 700,
                }}
              >
                100
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('5–15% over budget', '5–15% מעל התקציב')}
              </div>
              <div
                style={{
                  background: '#D97706',
                  color: '#fff',
                  borderRadius: '0.4vw',
                  padding: '0.3vh 0.8vw',
                  fontSize: '0.9vw',
                  fontWeight: 700,
                }}
              >
                70
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('> 15% over budget', '> 15% מעל התקציב')}
              </div>
              <div
                style={{
                  background: '#DC2626',
                  color: '#fff',
                  borderRadius: '0.4vw',
                  padding: '0.3vh 0.8vw',
                  fontSize: '0.9vw',
                  fontWeight: 700,
                }}
              >
                0
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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 16 of 40', 'שקופית 16 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
