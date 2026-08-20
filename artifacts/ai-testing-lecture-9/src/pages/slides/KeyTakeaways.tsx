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

export default function KeyTakeaways() {
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

      <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '3vh' }}>
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
            {t('Summary', 'סיכום')}
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
            {t('Key Takeaways', 'תובנות מרכזיות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
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
              style={{ fontSize: '2.8vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              01
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('AI generates, humans decide', 'AI מייצר, בני אדם מחליטים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'AI-generated tests require named human reviewers before entering the suite. No silent automation.',
                'בדיקות שנוצרו על ידי AI דורשות סוקרים אנושיים בשם לפני הכניסה לחבילה. אין אוטומציה שקטה.',
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
              style={{ fontSize: '2.8vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              02
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Source and context drive quality', 'מקור והקשר מניעים איכות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Code, specs, and stories produce different test quality. Structured prompts with examples and constraints produce far better output than vague instructions.',
                'קוד, מפרטים וסיפורים מייצרים איכות בדיקות שונה. פרומפטים מובנים עם דוגמאות ואילוצים מייצרים פלט הרבה יותר טוב מהנחיות עמומות.',
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
              style={{ fontSize: '2.8vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              03
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Prune, detect, triage', 'גזום, זהה, סווג')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Remove redundant tests with coverage diff. Run 3x for flakiness. Use AI to classify failures — but confirm real bugs with humans.',
                'הסר בדיקות מיותרות עם diff כיסוי. הרץ 3x לחוסר יציבות. השתמש ב-AI לסיווג כשלים — אך אשר באגים אמיתיים עם בני אדם.',
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
              style={{ fontSize: '2.8vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              04
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Measure the pipeline, not just coverage', 'מדוד את הצינור, לא רק כיסוי')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Track acceptance rate, flaky rate, and real bugs found per sprint in Supabase. These metrics tell you whether AI-generated tests are actually valuable.',
                'עקוב אחר שיעור קבלה, שיעור חוסר יציבות, וכמות באגים אמיתיים שנמצאו לכל ספרינט ב-Supabase. מדדים אלה אומרים לך אם בדיקות שנוצרו על ידי AI הן בעלות ערך אמיתי.',
              )}
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
          <span>{t('Slide 37 of 40', 'שקופית 37 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
