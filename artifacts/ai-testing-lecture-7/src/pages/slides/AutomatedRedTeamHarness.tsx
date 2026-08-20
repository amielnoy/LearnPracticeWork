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

export default function AutomatedRedTeamHarness() {
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
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
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
          {t('Test Infrastructure', 'תשתית בדיקות')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Automated Red-Team Harness Architecture', 'ארכיטקטורת מסגרת Red-Team אוטומטית')}
        </h1>
      </div>

      {/* Left: Components */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1vw',
          border: '1px solid #E2E8F0',
          padding: '3vh 2.5vw',
          boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          textAlign: isHe ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: '1.3vw',
            fontWeight: 700,
            color: '#1E3A5F',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '1.5vh',
          }}
        >
          {t('Harness Components', 'רכיבי מסגרת הבדיקה')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
            <div
              style={{
                minWidth: '2vw',
                height: '2vw',
                background: 'rgba(13,148,136,0.1)',
                borderRadius: '0.4vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1vw',
                fontWeight: 700,
                color: '#0D9488',
              }}
            >
              1
            </div>
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Prompt library loader', 'טוען ספריית prompts')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B' }}>
                {t(
                  'Reads YAML test case files by category and severity',
                  'קורא קבצי מקרה בדיקה YAML לפי קטגוריה וחומרה',
                )}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
            <div
              style={{
                minWidth: '2vw',
                height: '2vw',
                background: 'rgba(13,148,136,0.1)',
                borderRadius: '0.4vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1vw',
                fontWeight: 700,
                color: '#0D9488',
              }}
            >
              2
            </div>
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Model caller', 'מתקשר מודל')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B' }}>
                {t(
                  'Sends each prompt to the target endpoint with retry logic',
                  'שולח כל prompt לנקודת הקצה היעד עם לוגיקת ניסיון חוזר',
                )}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
            <div
              style={{
                minWidth: '2vw',
                height: '2vw',
                background: 'rgba(13,148,136,0.1)',
                borderRadius: '0.4vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1vw',
                fontWeight: 700,
                color: '#0D9488',
              }}
            >
              3
            </div>
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Assertion engine', 'מנוע בדיקות')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B' }}>
                {t(
                  'Evaluates responses via regex, deny-list, or LLM judge',
                  'מעריך תגובות דרך regex, רשימת-מניעה, או LLM judge',
                )}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
            <div
              style={{
                minWidth: '2vw',
                height: '2vw',
                background: 'rgba(13,148,136,0.1)',
                borderRadius: '0.4vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1vw',
                fontWeight: 700,
                color: '#0D9488',
              }}
            >
              4
            </div>
            <div>
              <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
                {t('Result persister', 'שומר תוצאות')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B' }}>
                {t(
                  'Writes pass/fail verdicts to Supabase for dashboards',
                  'כותב פסיקות עבר/נכשל ל-Supabase ללוחות מחוונים',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Code */}
      <div
        style={{
          background: '#0F172A',
          borderRadius: '1vw',
          padding: '3vh 2.5vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.8vh',
          justifyContent: 'center',
        }}
      >
        <div
          style={{ fontSize: '0.9vw', fontWeight: 700, color: '#38BDF8', letterSpacing: '0.08em' }}
        >
          RED-TEAM HARNESS (pseudocode)
        </div>
        <div
          style={{
            fontFamily: "'SFMono-Regular', Consolas, monospace",
            direction: 'ltr',
            textAlign: 'left',
            fontSize: '1.05vw',
            color: '#E2E8F0',
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: '#FBBF24' }}>for</span> testCase{' '}
          <span style={{ color: '#FBBF24' }}>in</span> loadLibrary():
          <br />
          {'  '}
          <span style={{ color: '#94A3B8' }}>// 1. Call the model</span>
          <br />
          {'  '}response = callModel(testCase.prompt)
          <br />
          {'  '}
          <br />
          {'  '}
          <span style={{ color: '#94A3B8' }}>// 2. Evaluate verdict</span>
          <br />
          {'  '}verdict = evaluate(
          <br />
          {'    '}response,
          <br />
          {'    '}testCase.assertion,
          <br />
          {'    '}testCase.expected
          <br />
          {'  '})<br />
          {'  '}
          <br />
          {'  '}
          <span style={{ color: '#94A3B8' }}>// 3. Persist to Supabase</span>
          <br />
          {'  '}supabase.from(<span style={{ color: '#2DD4BF' }}>"red_team_attempts"</span>)<br />
          {'    '}.insert(&#123; ...testCase, verdict &#125;)
          <br />
          {'  '}
          <br />
          {'  '}
          <span style={{ color: '#FBBF24' }}>if</span> verdict != testCase.expected:
          <br />
          {'    '}
          <span style={{ color: '#F87171' }}>fail(testCase.id)</span>
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
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 28 of 40', 'שקופית 28 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
