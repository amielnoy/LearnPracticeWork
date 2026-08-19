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
  gridTemplateColumns: '3fr 2fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

const bulletRow: React.CSSProperties = { display: 'flex', gap: '1.2vw', alignItems: 'flex-start' };
const dot: React.CSSProperties = {
  width: '0.6vw',
  height: '0.6vw',
  minWidth: '0.6vw',
  borderRadius: '50%',
  backgroundColor: '#0D9488',
  marginTop: '0.7vw',
};

export default function DeterminismVsVariability() {
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
          <div>{t('CORE TECHNIQUES', 'טכניקות ליבה')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
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
          {t('Core Techniques', 'טכניקות ליבה')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t(
            'Determinism vs. Variability: The Testing Trade-off',
            'דטרמיניזם מול שונות: הפשרה בבדיקות',
          )}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.25vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Even temperature 0 doesn\u2019t guarantee identical output across calls or model versions',
                'גם טמפרטורה 0 אינה מבטיחה פלט זהה בין קריאות או גרסאות מודל שונות',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.25vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Don\u2019t test for an exact string match \u2014 test for structure, required fields, and semantic properties',
                'אין לבדוק התאמת מחרוזת מדויקת \u2014 יש לבדוק מבנה, שדות חובה ותכונות סמנטיות',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.25vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Decide upfront: does this feature need consistency (a form-filler) or does it benefit from variety (a brainstorming tool)?',
                'החליטו מראש: האם הפיצ\u2019ר זקוק לעקביות (ממלא טפסים) או נהנה מגיוון (כלי לסיעור מוחות)?',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.25vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Pick sampling settings to match that decision, then write tests that match the settings',
                'בחרו הגדרות דגימה בהתאם להחלטה זו, ולאחר מכן כתבו בדיקות שמתאימות להגדרות',
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}
      >
        <div
          style={{
            background: '#FFFFFF',
            padding: '2.5vh 2vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '0.9vw',
              fontWeight: 600,
              color: '#64748B',
              textTransform: isHe ? 'none' : 'uppercase',
              marginBottom: '1vh',
            }}
          >
            {t('Needs Consistency', 'זקוק לעקביות')}
          </div>
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
            {t('a form-filler', 'ממלא טפסים')}
          </div>
        </div>
        <div
          style={{
            background: '#FFFFFF',
            padding: '2.5vh 2vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '0.9vw',
              fontWeight: 600,
              color: '#64748B',
              textTransform: isHe ? 'none' : 'uppercase',
              marginBottom: '1vh',
            }}
          >
            {t('Benefits From Variety', 'נהנה מגיוון')}
          </div>
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
            {t('a brainstorming tool', 'כלי לסיעור מוחות')}
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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 8 of 21', 'שקופית 8 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
