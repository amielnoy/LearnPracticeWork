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

export default function EdgeCaseDiscovery() {
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
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
          {t('Technique', 'טכניקה')}
        </div>
        <h1
          style={{
            fontSize: '2.8vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Edge-Case Discovery', 'גילוי מקרי קצה')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'AI excels at systematically enumerating edge cases that humans routinely overlook. Ask explicitly and it will surface them.',
            'AI מצטיין בסימום שיטתי של מקרי קצה שבני אדם בדרך כלל מתעלמים מהם. שאל במפורש והוא יחשוף אותם.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Boundary values: INT_MAX, INT_MIN, 0, -1, empty string, whitespace-only',
                'ערכי גבול: INT_MAX, INT_MIN, 0, -1, מחרוזת ריקה, רק רווחים',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Concurrency: simultaneous writes, double-submit, race conditions',
                'מקביליות: כתיבות בו-זמנית, שליחה כפולה, תנאי מרוץ',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                minWidth: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                marginTop: '0.7vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Unicode edge cases: RTL text, emoji in names, zero-width joiners',
                'מקרי קצה Unicode: טקסט RTL, emoji בשמות, מחברים ברוחב אפס',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            height: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5vh',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div
            style={{
              fontSize: '1.3vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
            }}
          >
            {t('Edge-Case Prompt Pattern', 'תבנית פרומפט למקרי קצה')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div
              style={{
                background: '#0F172A',
                borderRadius: '0.8vw',
                padding: '2.5vh 2vw',
                fontFamily: "'SFMono-Regular', Menlo, Consolas, monospace",
                fontSize: '1.05vw',
                lineHeight: 1.6,
                color: '#E2E8F0',
              }}
            >
              <div style={{ color: '#7DD3FC', marginBottom: '1vh' }}>
                {t(
                  '# After generating happy-path tests, ask:',
                  '# לאחר יצירת בדיקות הנתיב הרגיל, שאל:',
                )}
              </div>
              <div style={{ color: '#94A3B8' }}>
                {t(
                  '"Now list every edge case and boundary condition not yet covered. For each, write one test."',
                  '"כעת פרט כל מקרה קצה ותנאי גבול שעדיין לא מכוסה. לכל אחד, כתוב בדיקה אחת."',
                )}
              </div>
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Why this works', 'למה זה עובד')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Separating "happy path" and "edge case" requests produces better results than asking for everything at once. The model focuses on what is already covered and explicitly seeks gaps.',
                'הפרדת בקשות "נתיב רגיל" ו"מקרי קצה" מניבה תוצאות טובות יותר מאשר לבקש הכל בבת אחת. המודל מתמקד במה שכבר מכוסה ומחפש פערים במפורש.',
              )}
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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 10 of 40', 'שקופית 10 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
