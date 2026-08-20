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

export default function TriagingFailuresWithAI() {
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
          {t('Quality Control', 'בקרת איכות')}
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
          {t('Triaging Failures with AI', 'סיווג כשלים בסיוע AI')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 2vh 0', lineHeight: 1.6 }}>
          {t(
            'When an AI-generated test fails, the failure could be a real bug, a flaky test, an environment issue, or the test itself being wrong. AI can help classify.',
            'כאשר בדיקה שנוצרה על ידי AI נכשלת, הכשל יכול להיות באג אמיתי, בדיקה לא-יציבה, בעיית סביבה, או שהבדיקה עצמה שגויה. AI יכול לעזור בסיווג.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Feed failure message, stack trace, and test body to an LLM',
                'הזן הודעת כשל, stack trace וגוף בדיקה ל-LLM',
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
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Ask for structured verdict: real_bug | flaky | env_issue | bad_test',
                'בקש פסיקה מובנית: real_bug | flaky | env_issue | bad_test',
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
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Log verdict + confidence to Supabase triage_verdicts table',
                'רשום פסיקה + ביטחון לטבלת triage_verdicts ב-Supabase',
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
              paddingBottom: '2vh',
            }}
          >
            {t('Verdict Categories', 'קטגוריות פסיקה')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#FEE2E2',
                  color: '#DC2626',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 0.8vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '9vw',
                  textAlign: 'center',
                }}
              >
                real_bug
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'File a ticket, block merge, notify author',
                  'פתח כרטיס, חסום מיזוג, הודע למחבר',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#FEF9C3',
                  color: '#D97706',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 0.8vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '9vw',
                  textAlign: 'center',
                }}
              >
                flaky
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Move to quarantine, re-run 3x to confirm, then fix or delete',
                  'העבר להסגר, הרץ 3 פעמים לאישור, ואז תקן או מחק',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#EDE9FE',
                  color: '#6366F1',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 0.8vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '9vw',
                  textAlign: 'center',
                }}
              >
                env_issue
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Check infra, re-run after environment fix, do not merge',
                  'בדוק תשתית, הרץ שוב לאחר תיקון סביבה, אל תמזג',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <span
                style={{
                  background: '#F1F5F9',
                  color: '#475569',
                  borderRadius: '0.4vw',
                  padding: '0.4vh 0.8vw',
                  fontSize: '0.95vw',
                  fontWeight: 700,
                  minWidth: '9vw',
                  textAlign: 'center',
                }}
              >
                bad_test
              </span>
              <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.4 }}>
                {t(
                  'Reject from suite, add rejection_reason to generated_tests row',
                  'דחה מהחבילה, הוסף rejection_reason לשורת generated_tests',
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
          <span>{t('Slide 24 of 40', 'שקופית 24 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
