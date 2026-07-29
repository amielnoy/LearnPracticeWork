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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('COURSE OVERVIEW', 'סקירת הקורס')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Learning Objectives', 'מטרות הלמידה')}
        </div>
        <h1 style={{ fontSize: '3.6vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t("What You\u2019ll Be Able To Do", 'מה תוכלו לעשות בסיום')}
        </h1>
        <p style={{ fontSize: '1.3vw', fontWeight: 400, color: '#475569', margin: '0 0 4vh 0', lineHeight: 1.6, maxWidth: '40vw' }}>
          {t(
            "By the end of this lecture, you\u2019ll have a working vocabulary for AI testing and a first framework for putting it into practice.",
            'בסיום ההרצאה יהיה לכם אוצר מילים פעיל לבדיקות AI ומסגרת ראשונה ליישום בפועל.'
          )}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={card}>
            <div style={badge}>1</div>
            <div>
              <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Explain Non-Determinism', 'הסבר אי-דטרמיניזם')}</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  "Describe why the same prompt can produce different outputs, and why that breaks pass/fail testing.",
                  'תאר מדוע אותו פרומפט יכול לייצר פלטים שונים, ומדוע זה שובר מודל בדיקות של עובר/נכשל.'
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>2</div>
            <div>
              <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Choose the Right Evaluation Method', 'בחירת שיטת הערכה מתאימה')}</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  "Match golden datasets, LLM-as-judge, or similarity scoring to the problem you\u2019re testing.",
                  'התאם מערכי נתונים של golden datasets, שיפוט באמצעות LLM, או ניקוד דמיון לבעיה שאתה בודק.'
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>3</div>
            <div>
              <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>{t('Recognize Failure Before Users Do', 'זיהוי כשלים לפני המשתמשים')}</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Spot hallucination, drift, and regression patterns early in a test cycle.',
                  'זהה דפוסי הזיות, סחיפה ורגרסיה בשלב מוקדם של מחזור הבדיקות.'
                )}
              </div>
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
          <div style={{ fontSize: '1.5vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t("This Lecture\u2019s Path", 'מסלול ההרצאה')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '0.5vw', top: '2vh', bottom: '2vh', width: '2px', backgroundColor: '#E2E8F0' }} />

            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div>
                <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#0D9488', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Foundations', 'יסודות')}</div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>{t('What AI testing changes, and why', 'מה בדיקות AI משנות, ולמה')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div>
                <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#0D9488', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('The Core Challenge', 'האתגר המרכזי')}</div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>{t('Non-determinism and a new testing pyramid', 'אי-דטרמיניזם ופירמידת בדיקות חדשה')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div>
                <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#0D9488', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Evaluation Methods', 'שיטות הערכה')}</div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>{t('Golden datasets, judges, and similarity checks', 'Golden datasets, שופטים ובדיקות דמיון')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div>
                <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#0D9488', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>{t('Practical Toolkit', 'ערכת כלים מעשית')}</div>
                <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>{t('Building and running your first test suite', 'בניה והרצה של חבילת הבדיקות הראשונה שלך')}</div>
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
        <div>{t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 2 of 19', 'שקופית 2 מתוך 19')}</span>
        </div>
      </div>
    </div>
  );
}
