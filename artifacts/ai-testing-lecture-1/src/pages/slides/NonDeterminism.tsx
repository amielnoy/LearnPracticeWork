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
const pair: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  padding: '3vh 2vw',
  textAlign: 'center',
  flex: 1,
};

export default function NonDeterminism() {
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
          <div>{t('THE CORE CHALLENGE', 'האתגר המרכזי')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '4vh',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '2vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('The Core Challenge', 'האתגר המרכזי')}
          </div>
          <h1
            style={{
              fontSize: '3.6vw',
              fontWeight: 800,
              margin: '0 0 2.5vh 0',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: '60vw',
            }}
          >
            {t(
              'Ask the same question twice. Get two different, both-defensible answers.',
              'שאל את אותה שאלה פעמיים. קבל שתי תשובות שונות — שתיהן ניתנות להצדקה.',
            )}
          </h1>
          <p
            style={{
              fontSize: '1.4vw',
              fontWeight: 400,
              color: '#475569',
              margin: 0,
              lineHeight: 1.5,
              maxWidth: '48vw',
            }}
          >
            {t(
              'That\u2019s not a bug to fix \u2014 it\u2019s the operating condition every AI test has to design around.',
              'זו לא באגה לתיקון — זו תנאי ההפעלה שכל בדיקת AI חייבת להתחשב בו.',
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2vw', width: '70vw' }}>
          <div style={pair}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Same Prompt', 'אותו פרומפט')}
            </div>
            <div style={{ fontSize: '1.6vw', fontWeight: 700, color: '#1E3A5F', margin: '1vh 0' }}>
              &rarr;
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488' }}>
              {t('Different Output', 'פלט שונה')}
            </div>
          </div>
          <div style={pair}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Same Model', 'אותו מודל')}
            </div>
            <div style={{ fontSize: '1.6vw', fontWeight: 700, color: '#1E3A5F', margin: '1vh 0' }}>
              &rarr;
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488' }}>
              {t('Different Day', 'יום שונה')}
            </div>
          </div>
          <div style={pair}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Same Data', 'אותם נתונים')}
            </div>
            <div style={{ fontSize: '1.6vw', fontWeight: 700, color: '#1E3A5F', margin: '1vh 0' }}>
              &rarr;
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488' }}>
              {t('Different Ranking', 'דירוג שונה')}
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
        <div>{t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 7 of 19', 'שקופית 7 מתוך 19')}</span>
        </div>
      </div>
    </div>
  );
}
