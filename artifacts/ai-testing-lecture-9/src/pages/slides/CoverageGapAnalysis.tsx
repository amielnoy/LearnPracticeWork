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

export default function CoverageGapAnalysis() {
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
            {t('Coverage Analysis', 'ניתוח כיסוי')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 0.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Identifying Where Tests Are Missing', 'זיהוי היכן חסרות בדיקות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1.5vh', textTransform: isHe ? 'none' : 'uppercase' }}>
              {t('Step 1: Analyze', 'שלב 1: ניתוח')}
            </div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', fontWeight: 600, marginBottom: '1vh' }}>
              {t('Run coverage tool on CI', 'הרצת כלי כיסוי ב-CI')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('Collect line, branch, and function coverage. Export a JSON report that AI agents can read.', 'אסוף כיסוי שורות, ענפים ופונקציות. ייצא דוח JSON שסוכני AI יכולים לקרוא.')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1.5vh', textTransform: isHe ? 'none' : 'uppercase' }}>
              {t('Step 2: Prioritize', 'שלב 2: תעדוף')}
            </div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', fontWeight: 600, marginBottom: '1vh' }}>
              {t('Score uncovered code paths', 'ניקוד נתיבי קוד לא מכוסים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('Weight by file change frequency and bug history. High-churn uncovered paths come first.', 'משקל לפי תדירות שינויים בקובץ והיסטוריית באגים. נתיבים לא מכוסים בתדירות גבוהה קודמים.')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1.5vh', textTransform: isHe ? 'none' : 'uppercase' }}>
              {t('Step 3: Generate', 'שלב 3: יצירה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', fontWeight: 600, marginBottom: '1vh' }}>
              {t('Pass gaps to AI for test creation', 'העברת פערים ל-AI ליצירת בדיקות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('AI agent receives the source file, coverage gaps, and existing test patterns to produce new tests.', 'סוכן AI מקבל את קובץ המקור, פערי הכיסוי ותבניות בדיקות קיימות ליצירת בדיקות חדשות.')}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(13,148,136,0.06)',
            border: '1px solid rgba(13,148,136,0.2)',
            borderRadius: '1vw',
            padding: '2vh 2.5vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.5vh' }}>
            {t('Key Insight', 'תובנה מרכזית')}
          </div>
          <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t(
              'AI does not know which paths matter to the business — you need to provide that signal. A raw coverage gap list without business context produces low-value tests.',
              'AI אינו יודע אילו נתיבים חשובים לעסק — עליך לספק את האות הזה. רשימת פערי כיסוי גולמית ללא הקשר עסקי מייצרת בדיקות בעלות ערך נמוך.',
            )}
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
          <span>{t('Slide 4 of 40', 'שקופית 4 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
