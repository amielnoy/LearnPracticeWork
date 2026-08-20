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

const bulletRow: React.CSSProperties = {
  display: 'flex',
  gap: '1.2vw',
  alignItems: 'flex-start',
};

const dot: React.CSSProperties = {
  width: '0.6vw',
  height: '0.6vw',
  minWidth: '0.6vw',
  borderRadius: '50%',
  backgroundColor: '#0D9488',
  marginTop: '0.7vw',
};

export default function WhyItMattersForTesters() {
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
          <div>{t('FOUNDATIONS', 'יסודות')}</div>
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
          {t('Foundations', 'יסודות')}
        </div>
        <h1
          style={{
            fontSize: '3.6vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Why Prompt Engineering Matters for Testers', 'למה הנדסת פרומפטים חשובה לבודקים')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'The prompt is the interface you\u2019re testing against \u2014 sloppy prompts make flaky, untestable features',
                'הפרומפט הוא הממשק שמולו בודקים \u2014 פרומפטים רשלניים יוצרים פיצ\u2019רים לא יציבים ובלתי ניתנים לבדיקה',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Small wording changes can silently change behavior across a whole test suite',
                'שינויי ניסוח קטנים יכולים לשנות בשקט את ההתנהגות בכל חבילת הבדיקות',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Testers who understand prompts can fix root causes, not just file \u201cAI gave a weird answer\u201d bugs',
                'בודקים שמבינים פרומפטים יכולים לתקן שורש הבעיה, לא רק לדווח על באג מסוג \u201cה-AI ענה מוזר\u201d',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Treating prompts as a first-class, reviewable artifact is what makes AI features testable at all',
                'התייחסות לפרומפטים כאל חפץ מרכזי הניתן לסקירה היא מה שהופך פיצ\u2019רי AI לניתנים לבדיקה בכלל',
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
            alignItems: 'center',
            gap: '2vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              width: '7vw',
              height: '7vw',
              borderRadius: '50%',
              backgroundColor: 'rgba(13, 148, 136, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                borderRadius: '0.6vw',
                backgroundColor: '#0D9488',
              }}
            />
          </div>
          <div
            style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', textAlign: 'center' }}
          >
            {t('The Prompt Is the Interface', 'הפרומפט הוא הממשק')}
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: '#64748B',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: '18vw',
            }}
          >
            {t('What you test is what you wrote', 'מה שבודקים הוא מה שנכתב')}
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
          <span>{t('Slide 3 of 21', 'שקופית 3 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
