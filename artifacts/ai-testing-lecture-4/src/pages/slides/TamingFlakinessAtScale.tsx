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
  display: 'flex',
  gap: '1.5vw',
  alignItems: 'flex-start',
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

const badge: React.CSSProperties = {
  fontSize: '1.2vw',
  fontWeight: 700,
  color: '#0D9488',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  width: '3vw',
  height: '3vw',
  minWidth: '3vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
};

export default function TamingFlakinessAtScale() {
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
          <div>{t('TESTING TOOLS', 'כלי בדיקה')}</div>
          <div>{t('LECTURE 04', 'הרצאה 04')}</div>
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
          {t('CI Reliability', 'אמינות CI')}
        </div>
        <h1
          style={{
            fontSize: '3.4vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Taming Flakiness at Scale', 'ריסון רעידות בקנה מידה')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={card}>
            <div style={badge}>1</div>
            <div>
              <div
                style={{
                  fontSize: '1.2vw',
                  fontWeight: 600,
                  color: '#1E3A5F',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Smart Retry Strategy', 'אסטרטגיית ניסיון חוזר חכמה')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Retry on genuine model variability (different but valid output) but not on assertion failures that signal a real regression. Distinguish the two before turning on retries.',
                  'בצעו ניסיון חוזר על שונות מודל אמיתית (פלט שונה אך תקף) אך לא על כשלי אסרציה המסמנים רגרסיה אמיתית. הבחינו בין השניים לפני הפעלת ניסיונות חוזרים.',
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>2</div>
            <div>
              <div
                style={{
                  fontSize: '1.2vw',
                  fontWeight: 600,
                  color: '#1E3A5F',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Mock the Model Layer in CI', 'דמו את שכבת המודל ב-CI')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Replace live model calls with a deterministic fixture server. Tests become fast, cheap, and fully reproducible. Gate every PR with this mocked suite.',
                  'החליפו קריאות מודל חיות בשרת fixture דטרמיניסטי. הבדיקות הופכות למהירות, זולות ומניבות תוצאות זהות. אשרו כל PR עם הסוויטה הממויינת הזו.',
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>3</div>
            <div>
              <div
                style={{
                  fontSize: '1.2vw',
                  fontWeight: 600,
                  color: '#1E3A5F',
                  marginBottom: '0.5vh',
                }}
              >
                {t('Keep a Real-Model Smoke Suite', 'שמרו על סוויטת עשן של מודל אמיתי')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Run a small set of critical paths against the live model on a schedule \u2014 nightly or pre-release. This catches prompt drift and model updates the mocks will never see.',
                  'הריצו קבוצה קטנה של נתיבים קריטיים מול המודל החי על פי לוח זמנים \u2014 לילי או טרום-שחרור. זה תופס ניסוח מחדש של פרומפטים ועדכוני מודל שהמוקים לעולם לא יראו.',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '3vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.5vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Two-Tier CI Model', 'מודל CI דו-שכבתי')}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}
          >
            <div
              style={
                {
                  position: 'absolute',
                  [isHe ? 'right' : 'left']: '0.5vw',
                  top: '2vh',
                  bottom: '2vh',
                  width: '2px',
                  backgroundColor: '#E2E8F0',
                } as React.CSSProperties
              }
            />
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'PR gate \u2014 mocked model, deterministic, fast',
                  'אישור PR \u2014 מודל ממויין, דטרמיניסטי, מהיר',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Nightly run \u2014 live model, small critical suite',
                  'הרצה לילית \u2014 מודל חי, סוויטה קריטית קטנה',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Retries only on model variability, never on logic bugs',
                  'ניסיונות חוזרים רק על שונות מודל, לא על באגים לוגיים',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Track flake rate to detect drift over time',
                  'עקבו אחר שיעור רעידות לזיהוי סחיפה לאורך זמן',
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
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 30', 'שקופית 19 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
