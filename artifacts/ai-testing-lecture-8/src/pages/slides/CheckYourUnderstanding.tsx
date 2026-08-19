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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '2.5vh',
  color: '#1E3A5F',
};

export default function CheckYourUnderstanding() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Discussion Questions', 'שאלות לדיון')}</div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Check Your Understanding', 'בדוק את הבנתך')}
        </h1>
      </div>

      {/* Questions grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5vw' }}>
        <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(13,148,136,0.25)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q1', 'ש1')}</div>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
            {t(
              'A team switches their chat feature from GPT-4 to GPT-4 mini. What perf metrics must they re-baseline, and why?',
              'צוות מחליף את תכונת הצ\'אט שלהם מ-GPT-4 ל-GPT-4 mini. אילו מדדי ביצועים עליהם לאפס את הבסיס, ומדוע?',
            )}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(217,119,6,0.25)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q2', 'ש2')}</div>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
            {t(
              'Your p50 latency looks fine but your p99 has grown 40% since last release. What are three likely causes?',
              'זמן האחזור p50 שלך נראה בסדר אבל ה-p99 שלך גדל ב-40% מאז הגרסה האחרונה. מהן שלוש סיבות סבירות?',
            )}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(30,58,95,0.15)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q3', 'ש3')}</div>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
            {t(
              'When would you choose semantic caching over exact-match caching, and what quality risk must you validate first?',
              'מתי תבחר מטמון סמנטי על פני מטמון התאמה מדויקת, ואיזו סיכון איכות עליך לאמת תחילה?',
            )}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(13,148,136,0.25)', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Q4', 'ש4')}</div>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
            {t(
              'Design a CI workflow: what runs on every PR vs. nightly, and what gates merge vs. just warns?',
              'עצב זרימת עבודה של CI: מה פועל בכל PR לעומת כל לילה, ומה חוסם מיזוג לעומת רק מזהיר?',
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 36 of 40', 'שקופית 36 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
