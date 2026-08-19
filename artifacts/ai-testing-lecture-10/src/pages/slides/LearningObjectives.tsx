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

export default function LearningObjectives() {
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
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
          {t('Learning Outcomes', 'תוצאות למידה')}
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
          {t("What You'll Be Able To Do", 'מה תוכלו לעשות')}
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
            'By the end of this lecture you can design and roll out a full AI testing strategy — from unit tests to production monitoring — across your entire team.',
            'בסיום ההרצאה תוכלו לתכנן ולפרוס אסטרטגיית בדיקות AI מלאה — מבדיקות יחידה ועד ניטור ייצור — בכל הצוות שלכם.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Design a layered testing strategy', 'תכנון אסטרטגיית בדיקות בשכבות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Map each AI feature to the right test layer — unit, integration, system, or production.',
                'מיפוי כל תכונת AI לשכבת הבדיקה הנכונה — יחידה, אינטגרציה, מערכת או ייצור.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Build a quality scorecard', 'בניית כרטיס ניקוד איכות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Combine accuracy, cost, latency, and security into one actionable number per release.',
                'שילוב דיוק, עלות, זמן אחזור ואבטחה למספר פעיל אחד לכל גרסה.',
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
            gap: '2.8vh',
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
            {t('Also in this lecture', 'גם בהרצאה זו')}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh', position: 'relative' }}
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
              <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Create a team-wide rollout plan', 'יצירת תוכנית גלגול לכל הצוות')}
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
              <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Operate dashboards for stakeholders', 'הפעלת לוחות מחוונים לבעלי עניין')}
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
              <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Assess and advance team maturity', 'הערכת בגרות הצוות והתקדמותה')}
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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 2 of 40', 'שקופית 2 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
