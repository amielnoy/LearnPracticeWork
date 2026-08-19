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

export default function TheOutputTestingToolkit() {
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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
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
          {t('The Toolkit', 'ערכת הכלים')}
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
          {t('Three Techniques, One Toolkit', 'שלוש טכניקות, ערכת כלים אחת')}
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
                {t('Semantic Similarity Scoring', 'ציון דמיון סמנטי')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Embed both the model output and a reference answer, then measure vector cosine distance to grade meaning — not word overlap.',
                  'הטמיעו את פלט המודל ואת התשובה הייחוסית, ואז מדדו מרחק קוסינוס וקטורי לדירוג משמעות — לא חפיפת מילים.',
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
                {t('Automated Factuality Checking', 'בדיקת עובדתיות אוטומטית')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Cross-reference each claim in the output against a trusted source — retrieved context, a knowledge base, or a verifier model.',
                  'הצליבו כל טענה בפלט מול מקור מהימן — הקשר שאוחזר, בסיס ידע, או מודל מאמת.',
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
                {t('JSON Schema Validation', 'אימות סכמת JSON')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Parse the output and validate it against a declared schema — catch missing fields, wrong types, and structural violations before they hit production.',
                  'פענחו את הפלט ואמתו אותו מול סכמה מוצהרת — אתרו שדות חסרים, סוגים שגויים והפרות מבניות לפני שהם מגיעים לייצור.',
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
            {t('Choosing the Right Tool', 'בחירת הכלי הנכון')}
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
                  'Use similarity scoring for open-ended, paraphraseable answers',
                  'השתמשו בציון דמיון לתשובות פתוחות וניתנות לפרפרוז',
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
                  'Use factuality checks when grounding context exists',
                  'השתמשו בבדיקות עובדתיות כאשר קיים הקשר עיגון',
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
                  'Use schema validation whenever output feeds downstream code',
                  'השתמשו באימות סכמה בכל פעם שהפלט מזין קוד במורד הזרם',
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 5 of 30', 'שקופית 5 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
