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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Tools Reference', 'עזר כלים')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Tools Recap', 'סיכום כלים')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1.2vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Contract Validation', 'אימות חוזה')}
            </div>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              JSON Schema / Pydantic / Zod
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Define the response contract once. Validate it in tests and at runtime. Pydantic for Python, Zod for TypeScript, JSON Schema for language-agnostic contracts.',
                'הגדירו את חוזה התגובה פעם אחת. אמתו אותו בבדיקות ובזמן ריצה. Pydantic ל-Python, Zod ל-TypeScript, JSON Schema לחוזים ניטרליים לשפה.',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1.2vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Mocking', 'הדמייה')}
            </div>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              responses / VCR / WireMock
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Intercept the HTTP call to the AI provider. responses for pytest (Python), VCR for recorded cassettes, WireMock for Java and container-based stubs.',
                'עצרו את קריאת ה-HTTP לספק ה-AI. responses ל-pytest (Python), VCR להקלטות קסטות, WireMock ל-Java ולסטבים מבוססי-קונטיינר.',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1.2vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Semantic Similarity', 'דמיון סמנטי')}
            </div>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              {t('Embedding Model', 'מודל הטמעה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'text-embedding-ada-002 (OpenAI), all-MiniLM-L6-v2 (sentence-transformers), or any embedder that fits your stack. Compare via cosine similarity.',
                'text-embedding-ada-002 (OpenAI), all-MiniLM-L6-v2 (sentence-transformers), או כל embedder שמתאים לערך שלכם. השוו באמצעות דמיון קוסינוס.',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1.2vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('LLM Judge', 'שופט LLM')}
            </div>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              {t('LLM-as-Judge Harness', 'מסגרת LLM כשופט')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'A lightweight wrapper around any LLM that accepts a rubric prompt, returns a numeric score + reason in structured JSON, and gates the test on a threshold.',
                'עטיפה קלה סביב כל LLM שמקבלת הנחיית רובריקה, מחזירה ציון מספרי + נימוק ב-JSON מובנה, ועוצרת את הבדיקה בסף.',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1.2vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Load and Latency', 'עומס וזמן תגובה')}
            </div>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              k6 / Locust
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'k6 for scripted load tests with JavaScript. Locust for Python-native load tests. Both support p95/p99 thresholds as pass/fail conditions.',
                'k6 לבדיקות עומס בסקריפטים עם JavaScript. Locust לבדיקות עומס Python-native. שניהם תומכים בסף p95/p99 כתנאי עבור/נכשל.',
              )}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1.2vh',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {t('Cost Tracking', 'מעקב עלויות')}
            </div>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.8vh',
              }}
            >
              {t('Token Counters and Budget Assertions', 'מוני טוקן וקביעות תקציב')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Read response.usage.total_tokens after every call. Assert below TOKEN_BUDGET. Log and alert when the rolling sum exceeds a daily or monthly cap.',
                'קראו response.usage.total_tokens לאחר כל קריאה. קבעו מתחת ל-TOKEN_BUDGET. תעדו והתריעו כאשר הסכום המתגלגל חורג מתקרה יומית או חודשית.',
              )}
            </div>
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 28 of 30', 'שקופית 28 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
