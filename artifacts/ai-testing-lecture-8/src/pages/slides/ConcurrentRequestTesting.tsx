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

export default function ConcurrentRequestTesting() {
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
          {t('Load Test Strategy', 'אסטרטגיית בדיקת עומס')}
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
          {t('Concurrent Request Testing', 'בדיקת בקשות מקבילות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Ramp up concurrency level-by-level. At each level, collect 100+ samples and record median latency, p95, error rate, and tokens/sec before stepping up.',
            'הגדל רמות מקביליות שלב אחר שלב. בכל רמה, אסוף 100+ דגימות ותעד חציון זמן אחזור, p95, שיעור שגיאות וטוקנים/שניה לפני עלייה לשלב הבא.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              padding: '2vh 2vw',
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
              {t('Step pattern', 'תבנית שלבים')}
            </div>
            <div style={{ fontSize: '1.05vw', color: '#1E3A5F' }}>
              {t(
                '1 → 5 → 10 → 25 → 50 → 100 concurrent users',
                '1 → 5 → 10 → 25 → 50 → 100 משתמשים מקבילים',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              padding: '2vh 2vw',
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
              {t('Stop condition', 'תנאי עצירה')}
            </div>
            <div style={{ fontSize: '1.05vw', color: '#1E3A5F' }}>
              {t(
                'p95 exceeds SLA or error rate exceeds 1%',
                'p95 חורג מ-SLA או שיעור שגיאות עולה על 1%',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              padding: '2vh 2vw',
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
              {t('Watch for', 'שים לב ל')}
            </div>
            <div style={{ fontSize: '1.05vw', color: '#1E3A5F' }}>
              {t(
                'Rate-limit 429s, timeouts, and queue saturation signs',
                'שגיאות 429 מגבלת קצב, פסקי זמן וסימני רוויית תור',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right — degradation curve */}
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
            {t('Latency vs. Concurrency', 'זמן אחזור לעומת מקביליות')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '4vw' }}>c=1</div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '18%',
                    height: '100%',
                    background: '#0D9488',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#0D9488',
                  fontWeight: 600,
                  width: '5vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                620ms
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '4vw' }}>c=5</div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '25%',
                    height: '100%',
                    background: '#0D9488',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#1E3A5F',
                  fontWeight: 600,
                  width: '5vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                840ms
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '4vw' }}>c=10</div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '42%',
                    height: '100%',
                    background: '#1E3A5F',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#1E3A5F',
                  fontWeight: 600,
                  width: '5vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                1.4s
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '4vw' }}>c=25</div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '65%',
                    height: '100%',
                    background: '#D97706',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#D97706',
                  fontWeight: 600,
                  width: '5vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                2.2s
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '4vw' }}>c=50</div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '88%',
                    height: '100%',
                    background: '#DC2626',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#DC2626',
                  fontWeight: 600,
                  width: '5vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                3.8s
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: '2vh', fontSize: '0.9vw', color: '#64748B', fontStyle: 'italic' }}
          >
            {t(
              'p95 latency at increasing concurrency — degradation inflection around c=25',
              'זמן אחזור p95 עם גידול מקביליות — נקודת כפיפה בדגרדציה סביב c=25',
            )}
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
          <span>{t('Slide 13 of 40', 'שקופית 13 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
