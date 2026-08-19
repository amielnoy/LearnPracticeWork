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

export default function FullStrategyWalkthrough() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
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
            {t('End-to-End', 'מקצה לקצה')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: '0 0 1vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('A Full Strategy Walkthrough', 'סקירה מלאה של האסטרטגיה')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: 'uppercase',
              }}
            >
              {t('On every commit', 'בכל commit')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#0D9488',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Unit tests run', 'בדיקות יחידה רצות')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#0D9488',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Linting and prompt validation', 'לינטינג ואימות פרומפט')}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: 'uppercase',
              }}
            >
              {t('On every PR', 'בכל PR')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#38BDF8',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Integration golden-set eval', 'הערכת ערכה זהובה לאינטגרציה')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#38BDF8',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('LLM-judge merge gate', 'שער מיזוג שופט LLM')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#38BDF8',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Cost estimate vs. budget', 'אומדן עלות מול תקציב')}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: 'uppercase',
              }}
            >
              {t('Nightly', 'לילי')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#FBBF24',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Full eval suite (all 2000+ items)', 'חבילת הערכה מלאה (2000+ פריטים)')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#FBBF24',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Security probes + latency benchmarks', 'בדיקות אבטחה + בסיסי זמן אחזור')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#FBBF24',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Scorecard written to Supabase', 'כרטיס ניקוד נכתב ל-Supabase')}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: 'uppercase',
              }}
            >
              {t('Post-deploy', 'לאחר פריסה')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#F87171',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Shadow evals on 2% live traffic', 'הערכות צל על 2% תנועה חיה')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#F87171',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Drift + cost alert monitoring', 'ניטור התראות סחף + עלות')}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: 'uppercase',
              }}
            >
              {t('Sprint retro', 'רטרו ספרינט')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#0D9488',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Review scorecard trend', 'סקור מגמת כרטיס ניקוד')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#0D9488',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Flaky tests and false gates', 'בדיקות לא יציבות ושערים שגויים')}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: 'uppercase',
              }}
            >
              {t('Quarterly', 'רבעוני')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#0D9488',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Strategy doc update', 'עדכון מסמך אסטרטגיה')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8vw', alignItems: 'center' }}>
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    backgroundColor: '#0D9488',
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1vw', color: '#475569' }}>
                  {t('Maturity assessment and roadmap', 'הערכת בגרות ומפת דרכים')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 35 of 40', 'שקופית 35 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
