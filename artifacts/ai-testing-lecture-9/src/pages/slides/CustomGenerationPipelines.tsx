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

export default function CustomGenerationPipelines() {
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
            {t('Architecture', 'ארכיטקטורה')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 0.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Custom Generation Pipelines', 'צינורות יצירה מותאמים אישית')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '1.5vw', alignItems: 'stretch' }}>
          <div style={{ background: '#FFFFFF', padding: '2.5vh 1.5vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>{t('Trigger', 'טריגר')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('PR opened or ticket closed', 'PR נפתח או כרטיס נסגר')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('GitHub webhook or Jira automation fires the pipeline', 'GitHub webhook או Jira automation מפעיל את הצינור')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2.5vh 1.5vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>{t('Context', 'הקשר')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Fetch diff + coverage', 'שלוף diff + כיסוי')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('Changed files, current coverage gaps, existing test patterns', 'קבצים שהשתנו, פערי כיסוי נוכחיים, תבניות בדיקות קיימות')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2.5vh 1.5vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>{t('Generate', 'יצור')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('LLM call with structured prompt', 'קריאת LLM עם פרומפט מובנה')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('OpenAI or Anthropic API, JSON-mode output for parseability', 'OpenAI או Anthropic API, פלט JSON-mode לפרסור')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2.5vh 1.5vw', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>{t('Store', 'אחסן')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Write to generated_tests', 'כתוב ל-generated_tests')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('Supabase row per test with status=pending and metadata', 'שורת Supabase לכל בדיקה עם status=pending ומטא-דאטה')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '2.5vh 1.5vw', borderRadius: '1vw', border: '2px solid rgba(13,148,136,0.3)', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', textAlign: isHe ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>{t('Review', 'סקירה')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Human approves or rejects', 'אדם מאשר או דוחה')}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{t('Approved tests merged to PR; rejected logged with reason', 'בדיקות מאושרות ממוזגות ל-PR; דחויות מתועדות עם סיבה')}</div>
          </div>
        </div>

        <div style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.2)', borderRadius: '1vw', padding: '2vh 2.5vw', textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.5vh' }}>{t('Tooling options', 'אפשרויות כלים')}</div>
          <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t('LangChain agents, custom Python scripts, GitHub Actions workflows, or Dagger pipelines all work. The key is structured output and a Supabase-backed review step.', 'סוכני LangChain, סקריפטי Python מותאמים, זרימות GitHub Actions, או צינורות Dagger — כולם עובדים. המפתח הוא פלט מובנה ושלב סקירה מגובה ב-Supabase.')}
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
          <span>{t('Slide 16 of 40', 'שקופית 16 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
