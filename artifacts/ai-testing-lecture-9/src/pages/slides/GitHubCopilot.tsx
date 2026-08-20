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

export default function GitHubCopilot() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

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
          {t('Tool', 'כלי')}
        </div>
        <h1
          style={{
            fontSize: '2.8vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {t('GitHub Copilot for Tests', 'GitHub Copilot לבדיקות')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Copilot Chat: /tests command', 'Copilot Chat: פקודת /tests')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Select a function, open Copilot Chat, type /tests. Gets context from your open files automatically.',
                'בחר פונקציה, פתח Copilot Chat, הקלד /tests. מקבל הקשר מהקבצים הפתוחים אוטומטית.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Inline completion for test files', 'השלמה inline לקבצי בדיקות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Open a *.test.ts file next to the source file. Copilot reads the import and generates completions that match your test framework.',
                'פתח קובץ *.test.ts לצד קובץ המקור. Copilot קורא את ה-import ומייצר השלמות שמתאימות לפריימוורק הבדיקות שלך.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Workspace context matters', 'ההקשר של ה-workspace חשוב')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Copilot reads your existing tests to mimic conventions. Keep a few high-quality examples open to bias output toward your patterns.',
                'Copilot קורא את הבדיקות הקיימות שלך כדי לחקות מוסכמות. שמור כמה דוגמאות איכותיות פתוחות להטיית הפלט לתבניות שלך.',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            height: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5vh',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div
            style={{
              fontSize: '1.3vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
            }}
          >
            {t('Limitations', 'מגבלות')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '0.6vw',
                  height: '0.6vw',
                  minWidth: '0.6vw',
                  borderRadius: '50%',
                  backgroundColor: '#DC2626',
                  marginTop: '0.7vw',
                }}
              />
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
                {t(
                  'Cannot see files outside the active workspace — no cross-repo context',
                  'לא יכול לראות קבצים מחוץ ל-workspace הפעיל — אין הקשר בין-ריפוזיטורי',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '0.6vw',
                  height: '0.6vw',
                  minWidth: '0.6vw',
                  borderRadius: '50%',
                  backgroundColor: '#DC2626',
                  marginTop: '0.7vw',
                }}
              />
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
                {t(
                  'Generated mocks often use incorrect method signatures — always verify against actual library APIs',
                  'Mock-ים שנוצרו לעיתים קרובות משתמשים בחתימות מתודה שגויות — תמיד אמת מול ממשקי API אמיתיים של הספרייה',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '0.6vw',
                  height: '0.6vw',
                  minWidth: '0.6vw',
                  borderRadius: '50%',
                  backgroundColor: '#DC2626',
                  marginTop: '0.7vw',
                }}
              />
              <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
                {t(
                  'Inline completions lack review workflow — integrate with generated_tests table review process',
                  'השלמות inline חסרות תהליך סקירה — שלב עם תהליך סקירת טבלת generated_tests',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 14 of 40', 'שקופית 14 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
