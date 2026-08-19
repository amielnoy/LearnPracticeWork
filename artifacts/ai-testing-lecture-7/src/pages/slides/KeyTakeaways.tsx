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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function KeyTakeaways() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
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
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Core Lessons', 'לקחים מרכזיים')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Key Takeaways', 'נקודות מפתח')}
        </h1>
      </div>

      {/* 4 takeaways */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', gap: '2vw', alignItems: 'flex-start', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3.5vw', fontWeight: 800, color: '#0D9488', lineHeight: 1 }}>01</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>{t('Cover all injection surfaces', 'כסה את כל משטחי ההזרקה')}</div>
          <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.5 }}>{t('Direct, indirect, leakage — missing any one class of attack is the same as testing nothing.', 'ישיר, עקיף, דליפה — פספוס כל סוג מתקפה שווה לבדיקה של כלום.')}</div>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', gap: '2vw', alignItems: 'flex-start', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3.5vw', fontWeight: 800, color: '#0D9488', lineHeight: 1 }}>02</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>{t('Filter outputs, not just inputs', 'סנן פלטים, לא רק קלטים')}</div>
          <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.5 }}>{t('Memorised training data and injected RAG content can bypass input guardrails. Always validate the model\'s output too.', 'נתוני אימון שנוננו ותוכן RAG מוזרק יכולים לעקוף guardrails לקלטים. תמיד אמת גם את פלט המודל.')}</div>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', gap: '2vw', alignItems: 'flex-start', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3.5vw', fontWeight: 800, color: '#0D9488', lineHeight: 1 }}>03</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>{t('Persist results for trending', 'שמור תוצאות למעקב מגמות')}</div>
          <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.5 }}>{t('A security score that only exists in a CI log is invisible. Write it to Supabase. Trend it across builds. Treat drops as regressions.', 'ציון אבטחה שקיים רק ב-CI log הוא בלתי נראה. כתוב אותו ל-Supabase. עקוב אחריו על פני builds. התייחס לירידות כרגרסיות.')}</div>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', gap: '2vw', alignItems: 'flex-start', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3.5vw', fontWeight: 800, color: '#0D9488', lineHeight: 1 }}>04</div>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>{t('Cap every resource dimension', 'הגבל כל ממד משאבים')}</div>
          <div style={{ fontSize: '1.05vw', color: '#475569', lineHeight: 1.5 }}>{t('Token output, tool recursion, requests per session, spend per user. The dimension you forget is the one attackers find first.', 'פלט טוקנים, רקורסיה של כלים, בקשות לסשן, הוצאה לכל משתמש. הממד שאתה שוכח הוא זה שהתוקפים מוצאים ראשונים.')}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 38 of 40', 'שקופית 38 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
