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

export default function CostBudget() {
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
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
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
          {t('Section 3', 'חלק 3')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Setting a Per-PR Cost Budget', 'קביעת תקציב עלות לכל PR')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            "Track token and dollar spend per pipeline run, and fail the build (or alert) if a single PR's test run exceeds its budget.",
            'עקוב אחר צריכת tokens ודולרים לכל ריצת צינור, והכשל את ה-build (או שלח התראה) אם ריצת בדיקה של PR אחד חורגת מתקציבה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Instrument every API call', 'מדוד כל קריאת API')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Capture prompt_tokens and completion_tokens from each API response. Accumulate the total across all test calls in the run.',
                'לכוד prompt_tokens ו-completion_tokens מכל תגובת API. צבור את הסכום על פני כל קריאות הבדיקה בריצה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Set a per-run budget threshold', 'קבע סף תקציב לכל ריצה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Define the maximum acceptable spend for the fast PR path (e.g. $0.50). Exceed it and the pipeline fails with a budget violation message.',
                'הגדר את ההוצאה המקסימלית המקובלת עבור נתיב ה-PR המהיר (לדוג. $0.50). חרוג ממנו והצינור נכשל עם הודעת הפרת תקציב.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Persist spend per run for trending', 'שמור הוצאות לכל ריצה לזיהוי מגמות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Write the token count and estimated cost to a CI artifact or metrics store after each run so you can graph spend over time.',
                'כתוב את ספירת ה-tokens והעלות המשוערת ל-CI artifact או מאגר מדדים לאחר כל ריצה כדי שתוכל לתרשם הוצאות לאורך זמן.',
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
            gap: '2vh',
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
            {t('Budget Gate in CI', 'שער תקציב ב-CI')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.9vw',
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#94A3B8' }}>total_tokens = sum(run_tokens)</div>
            <div style={{ color: '#E2E8F0' }}>cost = total_tokens * PRICE_PER_1K / 1000</div>
            <div style={{ color: '#38BDF8', marginTop: '0.5vh' }}>BUDGET = 0.50 # USD</div>
            <div style={{ color: '#FBBF24', marginTop: '0.5vh' }}>if cost {'>'} BUDGET:</div>
            <div style={{ color: '#DC2626', paddingLeft: '1.5vw' }}>sys.exit(1) # fail CI</div>
            <div style={{ color: '#2DD4BF', marginTop: '0.5vh' }}>
              print(f"Cost: ${'{'}cost:.4f{'}'}") # log
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#0D9488', fontWeight: 700 }}>&#x2192;</span>
              <span>
                {t(
                  'Budget exceeded: build fails with clear message',
                  'תקציב חרג: build נכשל עם הודעה ברורה',
                )}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#0D9488', fontWeight: 700 }}>&#x2192;</span>
              <span>{t('Cost always logged for trending', 'עלות תמיד מתועדת לזיהוי מגמות')}</span>
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 30', 'שקופית 19 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
