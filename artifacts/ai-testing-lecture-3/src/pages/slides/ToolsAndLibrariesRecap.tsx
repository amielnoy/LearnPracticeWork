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

export default function ToolsAndLibrariesRecap() {
  const categories = [
    {
      technique: t('Semantic Similarity', 'דמיון סמנטי'),
      icon: '🔍',
      tools: [
        {
          cat: t('Embedding APIs', 'API הטמעה'),
          desc: t(
            'Cloud or local embedding model endpoints that convert text to dense vectors. Any provider offering text-embedding endpoints works here.',
            'נקודות קצה של מודל הטמעה בענן או מקומי הממירות טקסט לוקטורים צפופים. כל ספק המציע נקודות קצה להטמעת טקסט מתאים.',
          ),
        },
        {
          cat: t('Vector Similarity Libraries', 'ספריות דמיון וקטורי'),
          desc: t(
            'Any numerical / linear-algebra library that implements cosine similarity. Widely available in every major language ecosystem.',
            'כל ספרייה מספרית / אלגברה ליניארית המיישמת דמיון קוסינוס. זמינה באופן נרחב בכל מערכת שפה מרכזית.',
          ),
        },
      ],
      bg: 'rgba(13,148,136,0.06)',
      border: 'rgba(13,148,136,0.2)',
      accent: '#0D9488',
    },
    {
      technique: t('Factuality Checking', 'בדיקת עובדתיות'),
      icon: '✅',
      tools: [
        {
          cat: t('NLI / Entailment Models', 'מודלי NLI / גרירה'),
          desc: t(
            'Pre-trained natural-language inference models that classify (premise, hypothesis) pairs as ENTAIL / NEUTRAL / CONTRADICT.',
            'מודלי הסקה בשפה טבעית מאומנים מראש המסווגים זוגות (הנחה, היפותזה) כגרירה / ניטרלי / סתירה.',
          ),
        },
        {
          cat: t('LLM-as-Judge Frameworks', 'מסגרות LLM כשופט'),
          desc: t(
            'Frameworks that prompt a second LLM to evaluate the first model\'s output against a rubric. Useful when no structured NLI model is available.',
            'מסגרות הגורמות ל-LLM שני להעריך את פלט המודל הראשון מול רובריקה. שימושי כשאין מודל NLI מובנה זמין.',
          ),
        },
      ],
      bg: 'rgba(30,58,95,0.06)',
      border: 'rgba(30,58,95,0.15)',
      accent: '#1E3A5F',
    },
    {
      technique: t('Schema Validation', 'אימות סכמה'),
      icon: '📋',
      tools: [
        {
          cat: t('JSON Schema Validators', 'מאמתי סכמת JSON'),
          desc: t(
            'Libraries implementing the JSON Schema specification. Validate objects against declared types, required fields, enums, and constraints.',
            'ספריות המיישמות את מפרט JSON Schema. מאמתות אובייקטים מול סוגים מוצהרים, שדות חובה, enums ואילוצים.',
          ),
        },
        {
          cat: t('Runtime Type Validators', 'מאמתי סוגים בזמן ריצה'),
          desc: t(
            'Library-specific schema definition tools (e.g. struct or schema libraries in your language) that enforce type correctness at runtime.',
            'כלי הגדרת סכמה ספציפיים לספרייה (לדוג. ספריות struct או schema בשפה שלך) הכופים נכונות סוגים בזמן ריצה.',
          ),
        },
      ],
      bg: 'rgba(245,158,11,0.06)',
      border: 'rgba(245,158,11,0.2)',
      accent: '#D97706',
    },
    {
      technique: t('CI Test Runners', 'מריצי בדיקות CI'),
      icon: '⚙️',
      tools: [
        {
          cat: t('Test Frameworks', 'מסגרות בדיקה'),
          desc: t(
            'Standard test framework in your language stack (Jest, pytest, JUnit, etc.). Wrap each evaluation technique as a test case.',
            'מסגרת בדיקה סטנדרטית בסטק השפה שלך (Jest, pytest, JUnit, וכו\'). עטוף כל טכניקת הערכה כמקרה בדיקה.',
          ),
        },
        {
          cat: t('CI Orchestration', 'תזמור CI'),
          desc: t(
            'Any CI platform (GitHub Actions, GitLab CI, Bitbucket Pipelines, etc.) can run LLM evaluation jobs as pipeline steps with pass/fail gates.',
            'כל פלטפורמת CI (GitHub Actions, GitLab CI, Bitbucket Pipelines, וכו׳) יכולה להריץ משימות הערכת LLM כצעדי צינור עם שערי עבר/נכשל.',
          ),
        },
      ],
      bg: 'rgba(100,116,139,0.06)',
      border: 'rgba(100,116,139,0.15)',
      accent: '#64748B',
    },
  ];

  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
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
          <div
            style={{
              width: '2vw',
              height: '2vw',
              backgroundColor: '#0D9488',
              borderRadius: '0.4vw',
            }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2vw',
            fontSize: '1vw',
            fontWeight: 500,
            color: '#64748B',
          }}
        >
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.8vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Tooling Landscape', 'נוף הכלים')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Tools You Can Use Today', 'כלים שאפשר להשתמש בהם היום')}
          </h1>
          <p style={{ fontSize: '1.1vw', color: '#475569', margin: 0, lineHeight: 1.5 }}>
            {t(
              'Each evaluation technique maps to a category of tooling. The ecosystem is technology-neutral — pick the best-fit tools for your language and infrastructure.',
              'כל טכניקת הערכה ממופה לקטגוריית כלים. המערכת אינה תלוית טכנולוגיה — בחר את הכלים המתאימים ביותר לשפה ולתשתית שלך.',
            )}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.5vw' }}>
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{
                background: cat.bg,
                border: `1.5px solid ${cat.border}`,
                borderRadius: '1vw',
                padding: '2.5vh 1.5vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5vh',
                textAlign: isHe ? 'right' : 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
                <span style={{ fontSize: '1.5vw' }}>{cat.icon}</span>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: cat.accent }}>{cat.technique}</div>
              </div>
              {cat.tools.map((tool, j) => (
                <div key={j} style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
                  <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#1E3A5F' }}>{tool.cat}</div>
                  <div style={{ fontSize: '0.85vw', color: '#64748B', lineHeight: 1.4 }}>{tool.desc}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '0.8vw',
            padding: '1.5vh 2vw',
            fontSize: '1vw',
            color: '#64748B',
            fontWeight: 500,
            textAlign: isHe ? 'right' : 'left',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          💡 {t(
            'Start with the simplest tool in each category. A basic cosine similarity check and a JSON schema validator get you most of the way there before reaching for more complex frameworks.',
            'התחל בכלי הפשוט ביותר בכל קטגוריה. בדיקת דמיון קוסינוס בסיסית ומאמת JSON schema יכניסו אותך רחוק לפני שתגיע למסגרות מורכבות יותר.',
          )}
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 28 of 30', 'שקופית 28 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
