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
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function ToolsRecap() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Strategy Toolkit', 'ערכת כלים אסטרטגיה')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 1.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Tools You Can Use Today', 'כלים שתוכלו להשתמש בהם היום')}
          </h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}>{t('Test pyramid template', 'תבנית פירמידת בדיקות')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('The four-layer framework from this lecture, ready to adapt to your features.', 'מסגרת ארבע-השכבות מהרצאה זו, מוכנה להתאמה לתכונות שלך.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}>{t('Supabase scorecard schema', 'סכמת כרטיס ניקוד Supabase')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('ai_quality_scorecard, security_findings, latency_benchmarks, eval_set_audit_log tables.', 'טבלאות ai_quality_scorecard, security_findings, latency_benchmarks, eval_set_audit_log.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}>{t('Golden-set starter kit', 'ערכת התחלה זהובה')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('20-item curated eval set format and LLM-judge rubric for integration tests.', 'פורמט ערכת הערכה מקצועית בת 20 פריטים ורוברק שופט LLM לבדיקות אינטגרציה.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}>{t('Model fingerprint probe script', 'סקריפט בדיקת טביעת אצבע מודל')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Daily cron + hash comparison + Supabase alert row for model version drift detection.', 'קרון יומי + השוואת hash + שורת התראה ב-Supabase לזיהוי סחף גרסת מודל.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}>{t('Retro agenda template', 'תבנית סדר יום רטרו')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('Sprint, monthly, and quarterly retro agendas with specific input checklists.', 'סדר יום רטרו לספרינט, חודשי ורבעוני עם רשימות קלט ספציפיות.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '2.5vh 2vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.8vh' }}>{t('Maturity self-assessment form', 'טופס הערכת בגרות עצמית')}</div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>{t('5-dimension scorecard to assess your team against the L1–L4 maturity model quarterly.', 'כרטיס ניקוד 5 ממדים להערכת הצוות מול מודל הבגרות L1–L4 רבעונית.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 39 of 40', 'שקופית 39 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
