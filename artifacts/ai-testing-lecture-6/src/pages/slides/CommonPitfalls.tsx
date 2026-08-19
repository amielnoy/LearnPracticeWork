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

export default function CommonPitfalls() {
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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}
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
          {t('Lessons Learned', 'לקחים שנלמדו')}
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
          {t('Common Pitfalls to Avoid', 'מלכודות נפוצות שכדאי להימנע מהן')}
        </h1>
        <p
          style={{
            fontSize: '1.2vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
          }}
        >
          {t(
            'Each pattern looks like a shortcut but creates a different failure mode. Knowing them in advance saves painful debugging.',
            'כל תבנית נראית כקיצור דרך אבל יוצרת מצב כשל שונה. ידיעתן מראש חוסכת ניפוי באגים כואב.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Running the full AI suite on every commit', 'הרצת חבילת AI מלאה על כל commit')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Costs spiral, PRs block for 40 minutes, and developers start bypassing checks entirely.',
                'עלויות מסתחררות, PRs חוסמים למשך 40 דקות ומפתחים מתחילים לעקוף בדיקות לחלוטין.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Hardcoding API keys in workflow YAML', 'קידוד קשיח של מפתחות API ב-YAML של הצינור')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'The key leaks in the public git history or in CI log lines within minutes of the first run.',
                'המפתח דולף בהיסטוריית git הציבורית או בשורות ה-CI log תוך דקות מהריצה הראשונה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Treating a passing retry as a clean signal', 'התייחסות לניסיון חוזר מצליח כאות נקי')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A test that needed a retry masked two real regressions in a single quarter at one team before they started logging outcomes.',
                'בדיקה שצריכה ניסיון חוזר הסתירה שתי רגרסיות אמיתיות ברבעון אחד בצוות אחד לפני שהתחילו לתעד תוצאות.',
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
              fontSize: '1.3vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Two More to Watch For', 'עוד שניים לשים לב אליהם')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh', position: 'relative' }}>
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
              style={{ display: 'flex', gap: '2vw', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  minWidth: '1vw',
                  backgroundColor: '#DC2626',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                  marginTop: '0.3vw',
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F', lineHeight: 1.5 }}>
                {t(
                  'No visibility into per-PR AI spend means one expensive new test can quadruple the bill before anyone notices.',
                  'אין נראות להוצאות AI לכל PR אומר שבדיקה יקרה חדשה אחת יכולה לרבע את החשבון לפני שמישהו שם לב.',
                )}
              </div>
            </div>
            <div
              style={{ display: 'flex', gap: '2vw', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  minWidth: '1vw',
                  backgroundColor: '#DC2626',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                  marginTop: '0.3vw',
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F', lineHeight: 1.5 }}>
                {t(
                  'Blocking merges on a single non-deterministic run with no retry policy means one flaky response stops the whole team.',
                  'חסימת מיזוגים על ריצה לא-דטרמיניסטית בודדת ללא מדיניות ניסיון חוזר אומר שתגובה אחת לא יציבה עוצרת את כל הצוות.',
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 26 of 30', 'שקופית 26 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
