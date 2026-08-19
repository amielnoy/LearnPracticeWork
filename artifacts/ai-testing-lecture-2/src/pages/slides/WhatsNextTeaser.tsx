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
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

export default function WhatsNextTeaser() {
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
          <div>{t('COMING UP NEXT', 'בהמשך')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '6vw',
            height: '6vw',
            backgroundColor: 'rgba(13, 148, 136, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '4vh',
          }}
        >
          <div
            style={{ width: '3vw', height: '3vw', backgroundColor: '#0D9488', borderRadius: '50%' }}
          />
        </div>

        <h1
          style={{
            fontSize: '4.6vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('What\u2019s Next: Lecture 3', 'מה הלאה: הרצאה 3')}
        </h1>
        <p
          style={{
            fontSize: '1.4vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 6vh 0',
            lineHeight: 1.5,
            maxWidth: '50vw',
          }}
        >
          {t(
            'We\u2019ll dig into evaluation frameworks for testing what LLMs actually output.',
            'נצלול לתוך מסגרות הערכה לבדיקת מה שמודלי שפה בפועל מייצרים כפלט.',
          )}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '4vw',
            padding: '4vh 6vw',
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ textAlign: isHe ? 'right' : 'left' }}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '0.5vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Track', 'מסלול')}
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('AI Testing', 'בדיקות AI')}
            </div>
          </div>
          <div style={{ width: '1px', backgroundColor: '#E2E8F0' }} />
          <div style={{ textAlign: isHe ? 'right' : 'left' }}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '0.5vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Next Lecture', 'הרצאה הבאה')}
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Testing LLM Outputs', 'בדיקת פלטי מודלי שפה')}
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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 21 of 21', 'שקופית 21 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
