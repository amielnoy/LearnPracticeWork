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
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function CachingStrategies() {
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
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '1vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('Reducing Redundant Spend', 'הפחתת הוצאה מיותרת')}
        </div>
        <h1
          style={{
            fontSize: '3.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Caching Strategies', 'אסטרטגיות מטמון')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Identical or near-identical prompts can be cached to skip the API call entirely. Providers also offer prompt caching that reduces billing on repeated context prefixes.',
            'פרומפטים זהים או כמעט זהים ניתן לאחסן במטמון כדי לדלג לחלוטין על קריאת ה-API. ספקים גם מציעים מטמון פרומפטים המפחית חיוב על קידומות הקשר חוזרות.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('Exact-match response cache', 'מטמון תגובות התאמה מדויקת')}
                </div>
                <div
                  style={{
                    fontSize: '0.95vw',
                    color: '#64748B',
                    lineHeight: 1.4,
                    marginTop: '0.3vh',
                  }}
                >
                  {t(
                    'SHA-256 hash of prompt → stored response. Zero API cost on hit.',
                    'גיבוב SHA-256 של פרומפט → תגובה שמורה. אפס עלות API בפגיעה.',
                  )}
                </div>
              </div>
              <div
                style={{
                  fontSize: '1.3vw',
                  fontWeight: 700,
                  color: '#0D9488',
                  marginLeft: '2vw',
                  flexShrink: 0,
                }}
              >
                100%
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('Provider prompt cache', 'מטמון פרומפטים של ספק')}
                </div>
                <div
                  style={{
                    fontSize: '0.95vw',
                    color: '#64748B',
                    lineHeight: 1.4,
                    marginTop: '0.3vh',
                  }}
                >
                  {t(
                    'Repeated prefix (system prompt) cached server-side. Typically 50–75% input discount.',
                    'קידומת חוזרת (פרומפט מערכת) נשמרת בצד השרת. בדרך כלל הנחה של 50–75% על קלט.',
                  )}
                </div>
              </div>
              <div
                style={{
                  fontSize: '1.3vw',
                  fontWeight: 700,
                  color: '#0D9488',
                  marginLeft: '2vw',
                  flexShrink: 0,
                }}
              >
                50–75%
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('Semantic cache (embeddings)', 'מטמון סמנטי (embeddings)')}
                </div>
                <div
                  style={{
                    fontSize: '0.95vw',
                    color: '#64748B',
                    lineHeight: 1.4,
                    marginTop: '0.3vh',
                  }}
                >
                  {t(
                    'Return cached answer for semantically similar query above threshold. Complex to tune.',
                    'החזר תשובה שמורה לשאילתה דומה סמנטית מעל סף. מורכב לכוונון.',
                  )}
                </div>
              </div>
              <div
                style={{
                  fontSize: '1.3vw',
                  fontWeight: 700,
                  color: '#D97706',
                  marginLeft: '2vw',
                  flexShrink: 0,
                }}
              >
                ~30%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1vw',
              fontWeight: 700,
              color: '#64748B',
              marginBottom: '2vh',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('When to Use Each', 'מתי להשתמש בכל אחד')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ paddingBottom: '2vh', borderBottom: '1px solid #E2E8F0' }}>
              <div
                style={{
                  fontSize: '1.05vw',
                  fontWeight: 700,
                  color: '#0D9488',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Exact cache', 'מטמון מדויק')}
              </div>
              <div style={{ fontSize: '0.95vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Test suites, templates, FAQ bots with fixed questions, bulk jobs with repeated prompts.',
                  'ערכות בדיקות, תבניות, בוטים של שאלות נפוצות עם שאלות קבועות, עבודות batch עם פרומפטים חוזרים.',
                )}
              </div>
            </div>
            <div style={{ paddingBottom: '2vh', borderBottom: '1px solid #E2E8F0' }}>
              <div
                style={{
                  fontSize: '1.05vw',
                  fontWeight: 700,
                  color: '#1E3A5F',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Provider cache', 'מטמון ספק')}
              </div>
              <div style={{ fontSize: '0.95vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Any workload with a long, stable system prompt. Enable it at the API level — no code changes.',
                  'כל עומס עבודה עם פרומפט מערכת ארוך ויציב. אפשר אותו ברמת ה-API — ללא שינויי קוד.',
                )}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.05vw',
                  fontWeight: 700,
                  color: '#D97706',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Semantic cache', 'מטמון סמנטי')}
              </div>
              <div style={{ fontSize: '0.95vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Customer support chatbots, search features. Validate that semantically-close results are actually equivalent before deploying.',
                  'בוטים לתמיכת לקוחות, תכונות חיפוש. אמת שתוצאות קרובות סמנטית אכן שוות לפני פריסה.',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          gridColumn: '1 / -1',
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
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 22 of 40', 'שקופית 22 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
