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
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(13,148,136,0.25)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Q1', 'ש1')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                "Your team's nightly system test suite costs $80 per run. The team wants to cut this by 50%. What is the safest way to do it without losing coverage?",
                'חבילת בדיקות המערכת הלילית של צוותך עולה 80$ לריצה. הצוות רוצה לחתוך זאת ב-50%. מה הדרך הבטוחה ביותר לעשות זאת מבלי לאבד כיסוי?',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(217,119,6,0.25)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#D97706',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Q2', 'ש2')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'A model upgrade improves the accuracy score from 82 to 91 but the latency score drops from 88 to 61. Should you ship the upgrade? What is your decision process?',
                'שדרוג מודל משפר את ציון הדיוק מ-82 ל-91 אך ציון זמן האחזור יורד מ-88 ל-61. האם עליך לשלוח את השדרוג? מה תהליך ההחלטה שלך?',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(220,38,38,0.25)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Q3', 'ש3')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'You are at Maturity Level 1. You have 3 months and one engineer to invest. Which components of the strategy should you build first, and in what order?',
                'אתם ברמת בגרות 1. יש לכם 3 חודשים ומהנדס אחד להשקיע. אילו רכיבי האסטרטגיה עליכם לבנות תחילה, ובאיזה סדר?',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(30,58,95,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#1E3A5F',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Q4', 'ש4')}
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                'Your daily model fingerprint probe detects a hash change. The canary eval shows accuracy drops from 88 to 85 — a 3.4% drop. Your policy threshold is 5%. What do you do?',
                'בדיקת טביעת האצבע היומית שלך מזהה שינוי hash. הערכת הקנרי מראה שהדיוק יורד מ-88 ל-85 — ירידה של 3.4%. סף המדיניות שלך הוא 5%. מה אתה עושה?',
              )}
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 38 of 40', 'שקופית 38 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
