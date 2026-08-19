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

export default function RedundancyPruning() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Quality Control', 'בקרת איכות')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 0.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Redundancy Pruning', 'גיזום יתירות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Why AI over-generates', 'למה AI מייצר יתר על המידה')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.6 }}>
              {t(
                'LLMs optimize for thoroughness. Without explicit constraints, they produce 10 tests where 3 would suffice — including near-duplicate cases that differ only by variable name.',
                'מודלי שפה מייעלים לאחוזיות. ללא אילוצים מפורשים, הם מייצרים 10 בדיקות כשיספיקו 3 — כולל מקרים כמעט-כפולים שנבדלים רק בשם המשתנה.',
              )}
            </div>
            <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '1vw', padding: '2.5vh 2vw' }}>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#DC2626', marginBottom: '1vh' }}>
                {t('Cost of redundant tests', 'עלות בדיקות מיותרות')}
              </div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
                {t('Longer CI, maintenance burden, and false confidence that "600 tests" means good coverage when 200 test the same path.', 'CI ארוך יותר, נטל תחזוקה, וביטחון שגוי ש-"600 בדיקות" פירושן כיסוי טוב כשאר 200 בודקות את אותו הנתיב.')}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Pruning strategies', 'אסטרטגיות גיזום')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.8vw', padding: '2vh 1.5vw', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.04)' }}>
                <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh', textTransform: 'uppercase' }}>{t('Coverage diff', 'diff כיסוי')}</div>
                <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Run coverage before and after each generated test. Reject tests that add zero new lines.', 'הרץ כיסוי לפני ואחרי כל בדיקה שנוצרה. דחה בדיקות שלא מוסיפות שורות חדשות.')}</div>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.8vw', padding: '2vh 1.5vw', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.04)' }}>
                <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh', textTransform: 'uppercase' }}>{t('Semantic similarity', 'דמיון סמנטי')}</div>
                <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Embed test descriptions; cluster by cosine similarity. Flag pairs above 0.9 threshold.', 'הטמע תיאורי בדיקות; קבץ לפי דמיון קוסינוס. סמן זוגות מעל סף 0.9.')}</div>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.8vw', padding: '2vh 1.5vw', boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.04)' }}>
                <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh', textTransform: 'uppercase' }}>{t('Mutation testing', 'בדיקת מוטציה')}</div>
                <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Mutants that are not killed by any generated test reveal gaps; tests that kill no mutants are candidates for removal.', 'מוטנטים שלא נהרגים על ידי אף בדיקה שנוצרה חושפים פערים; בדיקות שלא הורגות מוטנטים הן מועמדות להסרה.')}</div>
              </div>
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
          <span>{t('Slide 23 of 40', 'שקופית 23 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
