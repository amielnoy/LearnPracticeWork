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
  gap: '3vh',
  color: '#1E3A5F',
};

export default function Section1Recap() {
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
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
            {t('Section 1 Recap', 'סיכום חלק 1')}
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
            {t('AI Agents Generating Tests', 'סוכני AI מייצרים בדיקות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '2px solid rgba(13,148,136,0.3)',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              1
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Source matters', 'המקור חשוב')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Code, specs, and user stories each yield different test quality. Use all three for full coverage.',
                'קוד, מפרטים וסיפורי משתמש מניבים איכות בדיקות שונה. השתמש בשלושתם לכיסוי מלא.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '2px solid rgba(13,148,136,0.3)',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              2
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Ask in two passes', 'שאל בשני מעברים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'First happy paths, then a dedicated edge-case pass. Asking once produces incomplete coverage.',
                'תחילה נתיבים רגילים, ואז מעבר ייעודי למקרי קצה. שאילה פעם אחת מייצרת כיסוי לא שלם.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '2px solid rgba(13,148,136,0.3)',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              3
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Store in Supabase', 'אחסן ב-Supabase')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Every generated test enters the generated_tests table as "pending" before any CI run.',
                'כל בדיקה שנוצרה נכנסת לטבלת generated_tests כ-"pending" לפני כל ריצת CI.',
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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 12 of 40', 'שקופית 12 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
