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
  gap: '1.2vw',
  alignItems: 'flex-start',
  background: '#FFFFFF',
  padding: '1.5vh 1.6vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

const badge: React.CSSProperties = {
  fontSize: '1.05vw',
  fontWeight: 700,
  color: '#0D9488',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  width: '2.4vw',
  height: '2.4vw',
  minWidth: '2.4vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
};

export default function LearningObjectives() {
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
          <div>{t('COURSE OVERVIEW', 'סקירת הקורס')}</div>
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
          {t('Learning Objectives', 'מטרות הלמידה')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('What You\u2019ll Be Able To Do', 'מה תוכלו לעשות בסיום')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={card}>
            <div style={badge}>1</div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.4, fontWeight: 500 }}>
              {t(
                'Break any prompt into its structural parts and explain what each one controls',
                'לפרק כל פרומפט לחלקיו המבניים ולהסביר מה כל חלק שולט בו',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={badge}>2</div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.4, fontWeight: 500 }}>
              {t(
                'Choose system messages and sampling settings that reduce output variance',
                'לבחור הודעות מערכת והגדרות דגימה שמצמצמות שונות בפלט',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={badge}>3</div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.4, fontWeight: 500 }}>
              {t(
                'Design prompts whose outputs can be checked automatically, not just eyeballed',
                'לעצב פרומפטים שאת הפלט שלהם אפשר לבדוק אוטומטית, לא רק להעריך במבט',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={badge}>4</div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.4, fontWeight: 500 }}>
              {t(
                'Recognize prompt injection and apply basic defenses',
                'לזהות הזרקת פרומפטים וליישם הגנות בסיסיות',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={badge}>5</div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.4, fontWeight: 500 }}>
              {t(
                'Turn a prompt into a versioned artifact with its own regression tests',
                'להפוך פרומפט לחפץ בעל גרסאות ובדיקות רגרסיה משלו',
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
            {t('This Lecture\u2019s Path', 'מסלול ההרצאה')}
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0.5vw',
                top: '2vh',
                bottom: '2vh',
                width: '2px',
                backgroundColor: '#E2E8F0',
              }}
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
              <div>
                <div
                  style={{
                    fontSize: '0.9vw',
                    fontWeight: 600,
                    color: '#0D9488',
                    textTransform: isHe ? 'none' : 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t('Foundations', 'יסודות')}
                </div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                  {t('Anatomy of a prompt, part by part', 'אנטומיה של פרומפט, חלק אחר חלק')}
                </div>
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
              <div>
                <div
                  style={{
                    fontSize: '0.9vw',
                    fontWeight: 600,
                    color: '#0D9488',
                    textTransform: isHe ? 'none' : 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t('Core Techniques', 'טכניקות ליבה')}
                </div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                  {t('Sampling, structure, and few-shot examples', 'דגימה, מבנה ודוגמאות few-shot')}
                </div>
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
              <div>
                <div
                  style={{
                    fontSize: '0.9vw',
                    fontWeight: 600,
                    color: '#0D9488',
                    textTransform: isHe ? 'none' : 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t('Safety & Security', 'בטיחות ואבטחה')}
                </div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                  {t('Prompt injection risks and defenses', 'סיכוני הזרקת פרומפטים והגנות')}
                </div>
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
              <div>
                <div
                  style={{
                    fontSize: '0.9vw',
                    fontWeight: 600,
                    color: '#0D9488',
                    textTransform: isHe ? 'none' : 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t('Practical Toolkit', 'ערכת כלים מעשית')}
                </div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                  {t(
                    'Building a testable prompt regression suite',
                    'בניית חבילת רגרסיה לפרומפטים הניתנת לבדיקה',
                  )}
                </div>
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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 2 of 21', 'שקופית 2 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
