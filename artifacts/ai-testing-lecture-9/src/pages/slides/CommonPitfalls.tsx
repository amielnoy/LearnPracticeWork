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

export default function CommonPitfalls() {
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
            {t('Watch Out', 'שימו לב')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 0.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Common Pitfalls to Avoid', 'מלכודות נפוצות להימנע מהן')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '1vw', padding: '2.5vh 2vw', textAlign: isHe ? 'right' : 'left' }}>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>{t('Merging without review', 'מיזוג ללא סקירה')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>{t('Auto-merge of generated tests produces a false sense of coverage. Always require at least one approval before any generated test enters the suite.', 'מיזוג אוטומטי של בדיקות שנוצרו מייצר תחושת כיסוי שגויה. תמיד דרוש לפחות אישור אחד לפני שכל בדיקה שנוצרה נכנסת לחבילה.')}</div>
            </div>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '1vw', padding: '2.5vh 2vw', textAlign: isHe ? 'right' : 'left' }}>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>{t('Treating coverage as quality', 'טיפול בכיסוי כאיכות')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>{t('AI can push coverage to 95% with trivially passing tests. Coverage is necessary but not sufficient — bugs-found and acceptance rate matter more.', 'AI יכול לדחוף כיסוי ל-95% עם בדיקות עוברות טריוויאלית. כיסוי הכרחי אך לא מספיק — באגים שנמצאו ושיעור קבלה חשובים יותר.')}</div>
            </div>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '1vw', padding: '2.5vh 2vw', textAlign: isHe ? 'right' : 'left' }}>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>{t('No prompt versioning', 'אין גרסאות פרומפט')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>{t('Changing prompts without tracking which tests were generated with which version makes debugging quality regressions impossible.', 'שינוי פרומפטים ללא מעקב אחר אילו בדיקות נוצרו עם איזו גרסה הופך ניפוי רגרסיות איכות לבלתי אפשרי.')}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '1vw', padding: '2.5vh 2vw', textAlign: isHe ? 'right' : 'left' }}>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>{t('Skipping flakiness pre-check', 'דילוג על בדיקת חוסר יציבות מקדמת')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>{t('Running generated tests only once before merging lets flaky tests into CI where they erode team trust in the entire suite.', 'הרצת בדיקות שנוצרו פעם אחת בלבד לפני מיזוג מאפשרת לבדיקות לא-יציבות להיכנס ל-CI שם הן שוחקות את אמון הצוות בכל החבילה.')}</div>
            </div>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '1vw', padding: '2.5vh 2vw', textAlign: isHe ? 'right' : 'left' }}>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#D97706', marginBottom: '1vh' }}>{t('Generating without business context', 'יצירה ללא הקשר עסקי')}</div>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>{t('AI produces syntactically valid tests that do not reflect product requirements. Include acceptance criteria and domain rules in every generation prompt.', 'AI מייצר בדיקות תקניות סינטקטית שאינן משקפות דרישות מוצר. כלול קריטריוני קבלה וכללי דומיין בכל פרומפט יצירה.')}</div>
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
          <span>{t('Slide 34 of 40', 'שקופית 34 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
