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

export default function RethinkingTestingPyramid() {
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
          <div>{t('TESTING STRATEGY', 'אסטרטגיית בדיקות')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
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
          {t('A New Shape', 'צורה חדשה')}
        </div>
        <h1
          style={{
            fontSize: '3.6vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Rethinking the Testing Pyramid', 'חשיבה מחודשת על פירמידת הבדיקות')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '38vw',
          }}
        >
          {t(
            'The old pyramid assumed deterministic layers \u2014 unit, integration, UI. AI systems need a different balance: fewer sharp pass/fail checks at the base, more judged evaluation in the middle, and human review at the top.',
            'הפירמידה הישנה הניחה שכבות דטרמיניסטיות — יחידה, אינטגרציה, UI. מערכות AI דורשות איזון שונה: פחות בדיקות עובר/נכשל חדות בבסיס, יותר הערכה שיפוטית באמצע, ובחינה אנושית בראש.',
          )}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1vh',
        }}
      >
        <div
          style={{
            width: '22vw',
            padding: '2vh 1.5vw',
            backgroundColor: '#0D9488',
            color: '#FFFFFF',
            borderRadius: '0.6vw',
            textAlign: 'center',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.1)',
          }}
        >
          <div style={{ fontSize: '1.1vw', fontWeight: 700 }}>
            {t('Human Review', 'סקירה אנושית')}
          </div>
          <div style={{ fontSize: '0.85vw', marginTop: '0.6vh', opacity: 0.9 }}>
            {t(
              'Spot checks on high-stakes or novel cases',
              'בדיקות מדגמיות על מקרים בעלי סיכון גבוה או חדשניים',
            )}
          </div>
        </div>
        <div
          style={{
            width: '30vw',
            padding: '2.2vh 1.5vw',
            backgroundColor: 'rgba(13, 148, 136, 0.55)',
            color: '#FFFFFF',
            borderRadius: '0.6vw',
            textAlign: 'center',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.08)',
          }}
        >
          <div style={{ fontSize: '1.15vw', fontWeight: 700 }}>
            {t('Evaluated Behavior', 'התנהגות מוערכת')}
          </div>
          <div style={{ fontSize: '0.9vw', marginTop: '0.6vh' }}>
            {t(
              'Golden sets, LLM-as-judge, similarity scoring',
              'מערכי נתוני ייחוס, LLM-as-judge, ניקוד דמיון',
            )}
          </div>
        </div>
        <div
          style={{
            width: '38vw',
            padding: '2.4vh 1.5vw',
            backgroundColor: 'rgba(13, 148, 136, 0.18)',
            color: '#1E3A5F',
            borderRadius: '0.6vw',
            textAlign: 'center',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: '1.2vw', fontWeight: 700 }}>
            {t('Deterministic Checks', 'בדיקות דטרמיניסטיות')}
          </div>
          <div style={{ fontSize: '0.95vw', marginTop: '0.6vh', color: '#475569' }}>
            {t('Schema, format, and safety-filter validation', 'אימות סכמה, פורמט ומסנני בטיחות')}
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
        <div>{t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 8 of 19', 'שקופית 8 מתוך 19')}</span>
        </div>
      </div>
    </div>
  );
}
