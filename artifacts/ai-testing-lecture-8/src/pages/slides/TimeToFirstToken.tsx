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

export default function TimeToFirstToken() {
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
          {t('The Primary Metric', 'המדד הראשי')}
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
          {t('Time-to-First-Token (TTFT)', 'זמן לטוקן הראשון (TTFT)')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'TTFT is the wall-clock time between sending the request and receiving the first token of the response. It determines perceived responsiveness — users notice TTFT before total completion time.',
            'TTFT הוא זמן הקיר בין שליחת הבקשה לקבלת הטוקן הראשון של התגובה. הוא קובע את התגובתיות הנתפסת — משתמשים שמים לב ל-TTFT לפני זמן ההשלמה הכולל.',
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
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '0.5vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Good TTFT', 'TTFT טוב')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
              {t(
                'Under 500ms for user-facing chat interfaces',
                "מתחת ל-500ms עבור ממשקי צ'אט למשתמשים",
              )}
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
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 700,
                color: '#D97706',
                marginBottom: '0.5vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Acceptable', 'מקובל')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
              {t('500ms–2s for batch or background tasks', '500ms–2s עבור משימות batch או רקע')}
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
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 700,
                color: '#DC2626',
                marginBottom: '0.5vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Alert threshold', 'סף התראה')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
              {t(
                'Over 2s for streaming UIs; investigate immediately',
                'מעל 2s עבור ממשקי streaming; חקור מיד',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right — timeline diagram */}
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
              marginBottom: '2.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('LLM Request Timeline', 'ציר זמן בקשת LLM')}
          </div>
          <div
            style={{
              position: 'relative',
              paddingLeft: isHe ? '0' : '2vw',
              paddingRight: isHe ? '2vw' : '0',
            }}
          >
            <div
              style={{
                position: 'absolute',
                [isHe ? 'right' : 'left']: '0.8vw',
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: '#E2E8F0',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5vw',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: '1.2vw',
                    height: '1.2vw',
                    backgroundColor: '#1E3A5F',
                    borderRadius: '50%',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 0 0 2px #1E3A5F',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F' }}>
                    {t('t=0: Request sent', 't=0: בקשה נשלחה')}
                  </div>
                  <div style={{ fontSize: '0.9vw', color: '#64748B' }}>
                    {t('Prompt + tokens counted', 'פרומפט + ספירת טוקנים')}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5vw',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: '1.2vw',
                    height: '1.2vw',
                    backgroundColor: '#0D9488',
                    borderRadius: '50%',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 0 0 2px #0D9488',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488' }}>
                    {t('t=TTFT: First token arrives', 't=TTFT: טוקן ראשון הגיע')}
                  </div>
                  <div style={{ fontSize: '0.9vw', color: '#64748B' }}>
                    {t('UI can start rendering', 'ממשק המשתמש יכול להתחיל לרנדר')}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5vw',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: '1.2vw',
                    height: '1.2vw',
                    backgroundColor: '#64748B',
                    borderRadius: '50%',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 0 0 2px #64748B',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B' }}>
                    {t('t=Total: Final token', 't=Total: טוקן אחרון')}
                  </div>
                  <div style={{ fontSize: '0.9vw', color: '#64748B' }}>
                    {t('Completion time = total wall clock', 'זמן השלמה = שעון קיר כולל')}
                  </div>
                </div>
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
          <span>{t('Slide 7 of 40', 'שקופית 7 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
