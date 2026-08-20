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

export default function RolloutPlan() {
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
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
          {t('Team Rollout', 'גלגול צוות')}
        </div>
        <h1
          style={{
            fontSize: '3.4vw',
            fontWeight: 800,
            margin: '0 0 2.5vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('A 90-Day Rollout Plan', 'תוכנית גלגול של 90 יום')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Start with one pilot team, prove value, then expand. Trying to roll out to all teams simultaneously is the single most common rollout failure mode.',
            'התחל עם צוות פיילוט אחד, הוכח ערך, ואז הרחב. ניסיון לגלגל לכל הצוותים בו זמנית הוא אופן הכישלון הנפוץ ביותר בגלגול.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              gap: '1.5vw',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: '#0D9488',
                color: '#fff',
                borderRadius: '0.4vw',
                padding: '0.5vh 1vw',
                fontSize: '0.9vw',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {t('Days 1–30', 'ימים 1–30')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
              {t(
                'Pilot team: unit tests + integration golden set. Establish baseline scores.',
                'צוות פיילוט: בדיקות יחידה + ערכה זהובה אינטגרציה. בסס ציוני בסיס.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              gap: '1.5vw',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: '#38BDF8',
                color: '#fff',
                borderRadius: '0.4vw',
                padding: '0.5vh 1vw',
                fontSize: '0.9vw',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {t('Days 31–60', 'ימים 31–60')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
              {t(
                'Add system tests and the quality scorecard. Present results to stakeholders.',
                'הוסף בדיקות מערכת וכרטיס ניקוד האיכות. הצג תוצאות לבעלי עניין.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              gap: '1.5vw',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: '#FBBF24',
                color: '#fff',
                borderRadius: '0.4vw',
                padding: '0.5vh 1vw',
                fontSize: '0.9vw',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {t('Days 61–90', 'ימים 61–90')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
              {t(
                'Roll out to all teams. Enable production monitoring. First quarterly retro.',
                'גלגל לכל הצוותים. הפעל ניטור ייצור. רטרו רבעוני ראשון.',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Rollout success criteria', 'קריטריוני הצלחת גלגול')}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.8vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.2vw',
                  height: '1.2vw',
                  border: '2px solid #0D9488',
                  borderRadius: '0.3vw',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
                {t(
                  'Pilot team scorecard stable for 3 consecutive releases',
                  'כרטיס ניקוד צוות הפיילוט יציב ל-3 גרסאות עוקבות',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.2vw',
                  height: '1.2vw',
                  border: '2px solid #0D9488',
                  borderRadius: '0.3vw',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
                {t(
                  'Stakeholders can self-serve from the dashboard',
                  'בעלי עניין יכולים לשרת עצמאית מלוח המחוונים',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.2vw',
                  height: '1.2vw',
                  border: '2px solid #0D9488',
                  borderRadius: '0.3vw',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
                {t(
                  'CI pipeline blocking at least one regression per sprint',
                  'צינור CI חוסם לפחות רגרסיה אחת לספרינט',
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div
                style={{
                  width: '1.2vw',
                  height: '1.2vw',
                  border: '2px solid #0D9488',
                  borderRadius: '0.3vw',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>
                {t('Each team has a named AI quality owner', 'לכל צוות יש בעל איכות AI ממונה')}
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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 30 of 40', 'שקופית 30 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
