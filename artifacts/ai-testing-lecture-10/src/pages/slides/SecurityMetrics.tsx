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

export default function SecurityMetrics() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Metric Category 4', 'קטגוריית מדד 4')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Security Posture', 'עמדת אבטחה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Security metrics from your AI features belong in the same scorecard as accuracy and cost. A secure score of 100 should be non-negotiable for every production release.',
            'מדדי אבטחה מתכונות ה-AI שלך שייכים לאותו כרטיס ניקוד כמו דיוק ועלות. ציון אבטחה של 100 צריך להיות בלתי ניתן למשא ומתן לכל גרסת ייצור.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Prompt injection resistance', 'עמידות להזרקת פרומפט')}</div>
            <div style={{ fontSize: '1vw', color: '#DC2626', fontWeight: 600 }}>{t('Must be 100%', 'חייב להיות 100%')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('PII leak rate in outputs', 'שיעור דליפת PII בפלטים')}</div>
            <div style={{ fontSize: '1vw', color: '#DC2626', fontWeight: 600 }}>{t('Must be 0%', 'חייב להיות 0%')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Harmful content block rate', 'שיעור חסימת תוכן מזיק')}</div>
            <div style={{ fontSize: '1vw', color: '#DC2626', fontWeight: 600 }}>{t('Must be 100%', 'חייב להיות 100%')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Critical security findings', 'ממצאי אבטחה קריטיים')}</div>
            <div style={{ fontSize: '1vw', color: '#DC2626', fontWeight: 600 }}>{t('Must be 0', 'חייב להיות 0')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('Security in the scorecard', 'אבטחה בכרטיס הניקוד')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#DC2626', marginBottom: '0.5vh' }}>{t('Binary gate, not a score', 'שער בינארי, לא ציון')}</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('A single critical security finding sets the security column to 0 regardless of all other scores. No averaging past a hard stop.', 'ממצא אבטחה קריטי אחד מגדיר את עמודת האבטחה ל-0 ללא קשר לכל הציונים האחרים.')}</div>
            </div>
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Store findings in Supabase', 'שמור ממצאים ב-Supabase')}</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Each security probe result is written to a security_findings table for audit trail and trend analysis.', 'כל תוצאת בדיקת אבטחה נכתבת לטבלת security_findings לנתיב ביקורת וניתוח מגמות.')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 18 of 40', 'שקופית 18 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
