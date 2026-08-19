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

export default function CheckYourUnderstanding() {
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
          {t('Discussion', 'דיון')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Check Your Understanding', 'בדוק את ההבנה שלך')}
        </h1>
      </div>

      {/* Q1 */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', letterSpacing: '0.05em', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Question 1', 'שאלה 1')}</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
          {t('A RAG-powered chatbot retrieves user emails from a CRM. A malicious document instructs the model to forward them. What vulnerability class is this, and which test would catch it?', 'צ\'אטבוט המופעל על ידי RAG שולף אימיילים של משתמשים מ-CRM. מסמך זדוני מורה למודל להעביר אותם. לאיזה סוג פגיעות זה שייך, ואיזה בדיקה תתפוס אותו?')}
        </div>
      </div>

      {/* Q2 */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #0D9488', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', letterSpacing: '0.05em', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Question 2', 'שאלה 2')}</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
          {t('Your jailbreak-resistance score drops from 95% to 78% after a fine-tuning run. What is your first action, and how do you decide whether to roll back?', 'ציון העמידות ל-jailbreak שלך יורד מ-95% ל-78% לאחר fine-tuning. מה הפעולה הראשונה שלך, וכיצד תחליט האם לבצע rollback?')}
        </div>
      </div>

      {/* Q3 */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #D97706', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1vw', fontWeight: 700, color: '#D97706', letterSpacing: '0.05em', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Question 3', 'שאלה 3')}</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
          {t('A user reports your AI assistant outputs their phone number to other users. Walk through your incident response steps using the Supabase tables from this lecture.', 'משתמש מדווח שהעוזר AI שלך מוציא את מספר הטלפון שלו למשתמשים אחרים. עבור על שלבי תגובת האירוע שלך תוך שימוש בטבלאות Supabase מהרצאה זו.')}
        </div>
      </div>

      {/* Q4 */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', borderTop: '4px solid #D97706', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1vw', fontWeight: 700, color: '#D97706', letterSpacing: '0.05em', textTransform: isHe ? 'none' : 'uppercase' }}>{t('Question 4', 'שאלה 4')}</div>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', lineHeight: 1.4 }}>
          {t('Design a rate-limiting strategy for a public AI chatbot that must block denial-of-wallet attacks without degrading the experience for legitimate power users.', 'עצב אסטרטגיית rate-limiting לצ\'אטבוט AI ציבורי שחייב לחסום מתקפות denial-of-wallet מבלי לפגוע בחוויה של משתמשי כוח לגיטימיים.')}
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 37 of 40', 'שקופית 37 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
