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
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 3vw',
  color: '#1E3A5F',
};

export default function Section1Recap() {
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
          {t('Section 2 Recap', 'סיכום חלק 2')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Prompt Injection: Three Principles', 'הזרקת הנחיות: שלושה עקרונות')}
        </h1>
      </div>

      {/* Cards */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488' }}>01</div>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
          {t('Cover all injection surfaces', 'כסה את כל משטחי ההזרקה')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t('Test direct, indirect, and system-prompt leakage vectors. Missing one class of attack is the same as testing nothing.', 'בדוק וקטורים של הזרקה ישירה, עקיפה ודליפת system prompt. פספוס סוג אחד של מתקפה שווה לבדיקה של כלום.')}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488' }}>02</div>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
          {t('Structure tests with verdicts', 'מבנה בדיקות עם פסיקות')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t('Every prompt needs an expected outcome: BLOCKED, ALLOWED, or FLAGGED. Without a verdict, you have no pass/fail signal.', 'לכל prompt דרוש תוצאה צפויה: BLOCKED, ALLOWED, או FLAGGED. ללא פסיקה, אין לך אות עבר/נכשל.')}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488' }}>03</div>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
          {t('Log results for trending', 'תעד תוצאות למעקב מגמות')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t('A single score is a snapshot. Trending the jailbreak-resistance score over builds turns security tests into a regression detector.', 'ציון בודד הוא תמונת מצב. מעקב ציון העמידות ל-jailbreak לאורך builds הופך בדיקות אבטחה למזהה רגרסיה.')}
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 12 of 40', 'שקופית 12 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
