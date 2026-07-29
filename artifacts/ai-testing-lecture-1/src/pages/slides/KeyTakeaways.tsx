import { t, dir, isHe } from '@/lib/i18n';

const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};
const statCard: React.CSSProperties = {
  background: '#FFFFFF', padding: '3vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)', textAlign: 'center',
};

export default function KeyTakeaways() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('COURSE RECAP', 'סיכום הקורס')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Course Recap', 'סיכום הקורס')}</div>
          <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('Key Takeaways', 'נקודות מפתח')}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div style={statCard}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('The Challenge', 'האתגר')}</div>
            <div style={{ fontSize: '2.4vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Non-Determinism', 'אי-דטרמיניזם')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>{t('Same input, valid but different outputs.', 'אותו קלט, פלטים שונים אך תקפים.')}</div>
          </div>
          <div style={statCard}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('The Method', 'השיטה')}</div>
            <div style={{ fontSize: '2.4vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Judged Evaluation', 'הערכה על-ידי שופט')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>{t('Golden sets, LLM-as-judge, similarity scoring.', 'סטי זהב, LLM כשופט, ציון דמיון.')}</div>
          </div>
          <div style={statCard}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase' }}>{t('The Discipline', 'המשמעת')}</div>
            <div style={{ fontSize: '2.4vw', fontWeight: 700, color: '#1E3A5F' }}>{t('Continuous Checking', 'בדיקה מתמשכת')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>{t("Testing doesn\u2019t stop at release.", 'הבדיקות לא נעצרות בשחרור.')}</div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '4vh 4vw', borderRadius: '1vw', border: '1px solid #E2E8F0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ fontSize: '1.3vw', color: '#475569', lineHeight: 1.6, maxWidth: '55vw' }}>
            {t(
              "None of this replaces good judgment \u2014 it gives you a repeatable way to apply it.",
              'כל זה אינו מחליף שיקול דעת טוב — הוא מעניק לכם דרך חוזרת ומסודרת ליישם אותו.'
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 18 of 19', 'שקופית 18 מתוך 19')}</span>
        </div>
      </div>
    </div>
  );
}
