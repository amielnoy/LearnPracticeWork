import { t, dir, isHe } from '@/lib/i18n';

const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};
const card: React.CSSProperties = {
  background: '#FFFFFF', padding: '2vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

export default function LlmBasics() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('FOUNDATIONS', 'יסודות')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('A Quick Primer', 'מבוא קצר')}</div>
        <h1 style={{ fontSize: '3.6vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('How Large Language Models Work', 'כיצד עובדים מודלי שפה גדולים (LLM)')}</h1>
        <p style={{ fontSize: '1.3vw', fontWeight: 400, color: '#475569', margin: '0 0 4vh 0', lineHeight: 1.6, maxWidth: '40vw' }}>
          {t(
            'A large language model predicts the next token in a sequence, one step at a time, based on patterns learned from training data. It doesn\u2019t \u201cknow\u201d facts \u2014 it generates statistically likely continuations.',
            'מודל שפה גדול (LLM) מנבא את ה-token הבא ברצף, צעד אחר צעד, על בסיס דפוסים שנלמדו מנתוני האימון. הוא אינו \u201cיודע\u201d עובדות \u2014 הוא מייצר המשכים סטטיסטיים סבירים.'
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Tokens', 'טוקנים')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('Text is broken into sub-word units before the model ever sees it.', 'הטקסט מפוצל ליחידות תת-מילוניות לפני שהמודל בכלל רואה אותו.')}</div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Next-Token Prediction', 'ניבוי ה-Token הבא')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('Each output token is a probability guess, not a lookup.', 'כל token בפלט הוא ניחוש הסתברותי, לא חיפוש בטבלה.')}</div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Context Window', 'חלון ההקשר')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>{t('The model only \u201cremembers\u201d what fits inside its current input.', 'המודל \u201cזוכר\u201d רק את מה שנכנס לתוך הקלט הנוכחי שלו.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3vh', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ fontSize: '1.5vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>{t('Why This Matters for Testing', 'מדוע זה חשוב לבדיקות')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '0.5vw', top: '2vh', bottom: '2vh', width: '2px', backgroundColor: '#E2E8F0' }} />
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>{t('The same prompt, sampled twice, can choose different tokens', 'אותו פרומפט, כשנדגם פעמיים, עשוי לבחור tokens שונים')}</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>{t('Longer context means more ways to drift off-topic', 'הקשר ארוך יותר פירושו יותר דרכים לסטות מהנושא')}</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>{t('Temperature settings control how random those choices are', 'הגדרות הטמפרטורה קובעות עד כמה הבחירות אקראיות')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 6 of 19', 'שקופית 6 מתוך 19')}</span>
        </div>
      </div>
    </div>
  );
}
