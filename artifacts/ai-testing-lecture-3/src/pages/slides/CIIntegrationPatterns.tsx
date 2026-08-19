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
const card: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

export default function CIIntegrationPatterns() {
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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
        </div>
      </div>

      {/* Left column */}
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
          {t('CI / CD Integration', 'אינטגרציית CI / CD')}
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
          {t('Running the Pipeline in CI', 'הרצת הצינור ב-CI')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2.5vh 0', lineHeight: 1.6 }}>
          {t(
            'The composite test suite runs as a CI job on every pull request and deployment. Failing tests gate the pipeline just as unit tests do.',
            'חבילת הבדיקות המורכבת פועלת כמשימת CI בכל בקשת משיכה ופריסה. בדיקות נכשלות עוצרות את הצינור בדיוק כמו בדיקות יחידה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Blocking Checks', 'בדיקות חוסמות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Safety classifier failures and schema validation failures always block — a single violation is enough to halt deployment.',
                'כישלונות מסווג הבטיחות וכישלונות אימות הסכמה תמיד חוסמים — הפרה אחת מספיקה לעצור פריסה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Warning Checks', 'בדיקות אזהרה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Similarity score drops below the threshold on ≤ 5% of the test suite — warn but do not block, to allow measured regression.',
                'ירידת ציון הדמיון מתחת לסף על ≤ 5% מחבילת הבדיקות — אזהרה ללא חסימה, לאפשר נסיגה מדודה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Pass / Fail Threshold', 'סף עבר / נכשל')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Define a minimum pass-rate per technique (e.g. 95% similarity pass, 100% safety pass, 100% schema pass). Thresholds are versioned alongside the prompt.',
                'הגדר שיעור מינימלי של עבר לכל טכניקה (לדוג. 95% עבור דמיון, 100% עבור בטיחות, 100% עבור סכמה). הספים מגורסאים לצד ההנחיה.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '3vh 2.5vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('CI Job Summary', 'סיכום משימת CI')}
          </div>

          {/* CI output mock */}
          <div
            style={{
              background: '#0D1B2A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.9vw',
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#94A3B8' }}>$ pnpm run test:llm-outputs</div>
            <div style={{ color: '#E2E8F0', marginTop: '0.5vh' }}>Running 120 test cases...</div>
            <div style={{ color: '#0D9488' }}>✔ Similarity   116/120 (96.7%)  PASS</div>
            <div style={{ color: '#0D9488' }}>✔ Factuality   118/120 (98.3%)  PASS</div>
            <div style={{ color: '#0D9488' }}>✔ Safety       120/120 (100%)   PASS</div>
            <div style={{ color: '#DC2626' }}>✘ Schema        114/120 (95.0%)  FAIL</div>
            <div style={{ color: '#E2E8F0', marginTop: '0.5vh' }}>
              {t('─────────────────────────────', '─────────────────────────────')}
            </div>
            <div style={{ color: '#DC2626', fontWeight: 700 }}>
              {t('PIPELINE: BLOCKED', 'צינור: חסום')}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh', textAlign: isHe ? 'right' : 'left' }}>
            {[
              t('Schema threshold: 100% required, 95% actual', 'סף סכמה: נדרש 100%, בפועל 95%'),
              t('6 cases missing required "currency" field', '6 מקרים חסרים שדה "currency" נדרש'),
              t('Merge blocked until schema fixes land', 'מיזוג חסום עד שתיקון הסכמה מיושם'),
            ].map((note, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8vw', alignItems: 'flex-start', fontSize: '0.95vw', color: '#64748B' }}>
                <span style={{ color: '#D97706', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span>{note}</span>
              </div>
            ))}
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 23 of 30', 'שקופית 23 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
