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

const statCard: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '3vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  textAlign: 'center',
};

export default function KeyTakeaways() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
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
          <div>{t('TESTING TOOLS', 'כלי בדיקה')}</div>
          <div>{t('LECTURE 04', 'הרצאה 04')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
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
            {t('Lecture Recap', 'סיכום הרצאה')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Key Takeaways', 'נקודות מפתח')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div style={statCard}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Pillar 1', 'עמוד 1')}
            </div>
            <div style={{ fontSize: '2.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Dynamic Assertions', 'אסרציות דינמיות')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Assert on structure and intent, never on the exact words.',
                'בדקו מבנה וכוונה, לא על המילים המדויקות.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Pillar 2', 'עמוד 2')}
            </div>
            <div style={{ fontSize: '2.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Streaming Tests', 'בדיקות סטרימינג')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Wait for real completion signals, not fixed timeouts.',
                'המתינו לאותות השלמה אמיתיים, לא ל-timeout קבוע.',
              )}
            </div>
          </div>
          <div style={statCard}>
            <div
              style={{
                fontSize: '1vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Pillar 3', 'עמוד 3')}
            </div>
            <div style={{ fontSize: '2.2vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Resilient Selectors', 'סלקטורים עמידים')}
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>
              {t(
                'Target stable roles and testids, not volatile generated text.',
                'כוונו ל-roles ו-testids יציבים, לא לטקסט מיוצר תנודתי.',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 4vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#475569', lineHeight: 1.6, maxWidth: '55vw' }}>
            {t(
              'An AI UI that is untested beyond the happy path is a production incident waiting to happen \u2014 own all three states and your suite will hold.',
              'ממשק UI של AI שאינו נבדק מעבר לנתיב המאושר הוא תקרית ייצור ממתינה לקרות \u2014 בעלו על כל שלושת המצבים וסוויטת הבדיקות שלכם תחזיק.',
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 30 of 30', 'שקופית 30 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
