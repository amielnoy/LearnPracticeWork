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
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

export default function HandlingPartialAndAbortedStreams() {
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
          <div>{t('TESTING TOOLS', 'כלי בדיקה')}</div>
          <div>{t('LECTURE 04', 'הרצאה 04')}</div>
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
          {t('Edge Cases', 'מקרי קצה')}
        </div>
        <h1
          style={{
            fontSize: '3.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Testing Cancelled and Interrupted Streams', 'בדיקת סטרימים שבוטלו ונקטעו')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'Not every stream reaches completion. User cancellations and network drops mid-stream are real scenarios that deserve explicit test coverage.',
            'לא כל סטרים מגיע לסיום. ביטולי משתמש ונפילות רשת באמצע סטרים הם תרחישים אמיתיים הראויים לכיסוי בדיקה מפורש.',
          )}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('User-Cancelled Generation', 'ביטול יצירה על ידי משתמש')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Click a "Stop" button mid-stream and assert the typing indicator disappears, partial content is preserved in the message container, and the input field becomes enabled again.',
                'לחצו על כפתור "עצור" באמצע סטרים ואמתו שמחוון ההקלדה נעלם, תוכן חלקי נשמר במכיל ההודעות, ושדה הקלט מופעל שוב.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Network Drop Mid-Stream', 'נפילת רשת באמצע סטרים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Use page.route() to abort a streaming request after a few chunks. Assert that the UI shows an error or recovery message rather than freezing silently.',
                'השתמשו ב-page.route() לניתוק בקשת סטרימינג לאחר כמה chunks. אמתו שה-UI מציג הודעת שגיאה או התאוששות במקום להקפא בשקט.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Re-generation After Cancel', 'יצירה מחדש לאחר ביטול')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'After cancelling, verify the user can still submit a new message and receive a complete response. Cancellation must not leave the UI in a broken state.',
                'לאחר ביטול, אמתו שהמשתמש עדיין יכול לשלוח הודעה חדשה ולקבל תגובה מלאה. ביטול לא חייב להשאיר את ה-UI במצב שבור.',
              )}
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
            {t('What to Assert', 'מה לאמת')}
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
            {[
              t('Typing indicator gone after cancel/abort', 'מחוון הקלדה נעלם לאחר ביטול/קטיעה'),
              t('Partial content visible, not blank', 'תוכן חלקי גלוי, לא ריק'),
              t('Error or recovery message shown on network drop', 'הודעת שגיאה או התאוששות מוצגת בנפילת רשת'),
              t('Input re-enabled — no frozen UI', 'הקלט מופעל מחדש — ללא UI קפוא'),
              t('Subsequent request succeeds normally', 'בקשה הבאה מצליחה כרגיל'),
            ].map((item, i) => (
              <div
                key={i}
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
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>{item}</div>
              </div>
            ))}
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
        <div>{t('Playwright for AI Applications', 'Playwright לאפליקציות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 12 of 30', 'שקופית 12 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
