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
  const categories = [
    {
      name: t('GitHub Actions Matrix / Sharding', 'GitHub Actions matrix / sharding'),
      desc: t(
        'Distribute AI tests across parallel runners with a matrix strategy. Add shard-id and num-shards parameters to split the collection evenly.',
        'פזר בדיקות AI על פני runners מקבילים עם אסטרטגיית matrix. הוסף פרמטרי shard-id ו-num-shards לפיצול אחיד של האוסף.',
      ),
      bg: 'rgba(13,148,136,0.06)',
      border: 'rgba(13,148,136,0.2)',
      accent: '#0D9488',
    },
    {
      name: t('Encrypted Secrets', 'סודות מוצפנים'),
      desc: t(
        'GitHub repository secrets store API keys encrypted at rest. Scope them per step in the env block to avoid over-sharing.',
        'סודות repository של GitHub מאחסנים מפתחות API מוצפנים בזמן מנוחה. הגבל scope לפי צעד בבלוק env כדי להימנע משיתוף יתר.',
      ),
      bg: 'rgba(30,58,95,0.05)',
      border: 'rgba(30,58,95,0.15)',
      accent: '#1E3A5F',
    },
    {
      name: t('Response-Caching Layer', 'שכבת מטמון תגובות'),
      desc: t(
        'Hash-keyed cache that replays recorded LLM responses for unchanged inputs. Invalidates automatically when prompt or fixture changes.',
        'מטמון עם מפתח hash שמשחזר תגובות LLM מוקלטות עבור קלטים שלא השתנו. מתבטל אוטומטית כשה-prompt או הקובע משתנים.',
      ),
      bg: 'rgba(13,148,136,0.06)',
      border: 'rgba(13,148,136,0.2)',
      accent: '#0D9488',
    },
    {
      name: t('Retry-and-Log Wrapper', 'עטיפת ניסיון חוזר ורישום'),
      desc: t(
        'A decorator or context manager that bounds retries to 2-3 attempts, records each attempt outcome, and flags tests that needed a retry to pass.',
        'decorator או context manager שמגביל ניסיונות חוזרים ל-2-3 ניסיונות, מתעד כל תוצאת ניסיון ומסמן בדיקות שצריכות ניסיון חוזר כדי לעבור.',
      ),
      bg: 'rgba(30,58,95,0.05)',
      border: 'rgba(30,58,95,0.15)',
      accent: '#1E3A5F',
    },
    {
      name: t('LLM-as-Judge Harness', 'רתמת LLM כשופט'),
      desc: t(
        'A wrapper that sends each candidate response to a judge model with a rubric. Returns a score and reasoning. Gate logic compares score to threshold.',
        'עטיפה ששולחת כל תגובת מועמד למודל שופט עם רובריקה. מחזירה ציון ונימוק. לוגיקת השער משווה ציון לסף.',
      ),
      bg: 'rgba(13,148,136,0.06)',
      border: 'rgba(13,148,136,0.2)',
      accent: '#0D9488',
    },
    {
      name: t('Cost / Latency Dashboard', 'לוח בקרה עלות / זמן אחזור'),
      desc: t(
        'Collects token count and wall time per run into a time series. Computes rolling baseline and alerts on statistical deviation.',
        'אוסף ספירת tokens וזמן ריצה לכל ריצה לסדרה זמנית. מחשב קו בסיס מתגלגל ומתריע על סטייה סטטיסטית.',
      ),
      bg: 'rgba(30,58,95,0.05)',
      border: 'rgba(30,58,95,0.15)',
      accent: '#1E3A5F',
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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}
        >
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
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
              'Each technique in this lecture maps to a concrete tool or pattern. All are technology-neutral.',
              'כל טכניקה בהרצאה זו ממופה לכלי או תבנית קונקרטיים. כולם אינם תלויי טכנולוגיה.',
            )}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5vw' }}>
          <div
            style={{
              background: categories[0].bg,
              border: `1.5px solid ${categories[0].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: categories[0].accent, marginBottom: '0.8vh' }}>{categories[0].name}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{categories[0].desc}</div>
          </div>
          <div
            style={{
              background: categories[1].bg,
              border: `1.5px solid ${categories[1].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: categories[1].accent, marginBottom: '0.8vh' }}>{categories[1].name}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{categories[1].desc}</div>
          </div>
          <div
            style={{
              background: categories[2].bg,
              border: `1.5px solid ${categories[2].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: categories[2].accent, marginBottom: '0.8vh' }}>{categories[2].name}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{categories[2].desc}</div>
          </div>
          <div
            style={{
              background: categories[3].bg,
              border: `1.5px solid ${categories[3].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: categories[3].accent, marginBottom: '0.8vh' }}>{categories[3].name}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{categories[3].desc}</div>
          </div>
          <div
            style={{
              background: categories[4].bg,
              border: `1.5px solid ${categories[4].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: categories[4].accent, marginBottom: '0.8vh' }}>{categories[4].name}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{categories[4].desc}</div>
          </div>
          <div
            style={{
              background: categories[5].bg,
              border: `1.5px solid ${categories[5].border}`,
              borderRadius: '1vw',
              padding: '2.5vh 1.5vw',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: categories[5].accent, marginBottom: '0.8vh' }}>{categories[5].name}</div>
            <div style={{ fontSize: '0.95vw', color: '#64748B', lineHeight: 1.4 }}>{categories[5].desc}</div>
          </div>
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 28 of 30', 'שקופית 28 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
