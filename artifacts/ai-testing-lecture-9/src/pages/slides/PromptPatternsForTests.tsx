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

export default function PromptPatternsForTests() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Best Practice', 'שיטה מומלצת')}
        </div>
        <h1 style={{ fontSize: '2.8vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {t('Prompt Patterns for Good Test Generation', 'תבניות פרומפט ליצירת בדיקות טובה')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Role + framework constraint', 'תפקיד + אילוץ פריימוורק')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('"You are a senior engineer using pytest 7. Output only runnable Python 3 code."', '"אתה מהנדס בכיר המשתמש ב-pytest 7. פלט רק קוד Python 3 הניתן להרצה."')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Explicit output contract', 'חוזה פלט מפורש')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('"Return JSON: { test_name, code, covers_case }. No prose. One object per line."', '"החזר JSON: { test_name, code, covers_case }. ללא פרוזה. אובייקט אחד לשורה."')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Negative constraint', 'אילוץ שלילי')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('"Do not use unittest.mock.patch on private methods. Do not test implementation details."', '"אל תשתמש ב-unittest.mock.patch על מתודות פרטיות. אל תבדוק פרטי מימוש."')}</div>
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
            gap: '2.5vh',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
            {t('Anti-Patterns to Avoid', 'אנטי-תבניות להימנע מהן')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#DC2626' }}>{t('Vague instruction', 'הנחיה עמומה')}</div>
                <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('"Write tests for this code" — produces happy paths only, misses all error branches', '"כתוב בדיקות לקוד הזה" — מייצר רק נתיבים רגילים, מחמיץ את כל ענפי השגיאה')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#DC2626' }}>{t('No style examples', 'ללא דוגמאות סגנון')}</div>
                <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('AI invents its own naming, fixture style, and assertion format — produces unreadable test files', 'AI ממציא שמות, סגנון fixtures ופורמט assertion משלו — מייצר קבצי בדיקות לא קריאים')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#DC2626' }}>{t('Too many cases at once', 'יותר מדי מקרים בבת אחת')}</div>
                <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>{t('Asking for 20+ tests in one prompt produces generic filler. Batch in groups of 5-8.', 'בקשת 20+ בדיקות בפרומפט אחד מייצרת מילוי גנרי. אצו בקבוצות של 5-8.')}</div>
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
          <span>{t('Slide 17 of 40', 'שקופית 17 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
