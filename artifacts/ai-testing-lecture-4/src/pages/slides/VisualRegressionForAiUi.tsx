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

export default function VisualRegressionForAiUi() {
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
          {t('Visual Testing', 'בדיקה ויזואלית')}
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
          {t('Visual Regression on Dynamic UIs', 'רגרסיה ויזואלית על UIs דינמיים')}
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
            'Pixel-perfect snapshots fail on AI UIs because generated text changes every run. The key is masking dynamic regions while still catching real layout regressions.',
            'צילומי מצב פיקסל-מושלמים נכשלים ב-UIs של AI כי הטקסט המיוצר משתנה בכל הרצה. המפתח הוא הסתרת אזורים דינמיים תוך כדי זיהוי רגרסיות פריסה אמיתיות.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Mask Dynamic Text Regions', 'הסתרת אזורי טקסט דינמיים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Use the screenshot mask option to cover the AI response text area with a solid block. The snapshot then only checks chrome, layout, and static UI elements.',
                'השתמשו באפשרות מסכת צילום מסך כדי לכסות את אזור טקסט תגובת ה-AI בבלוק מוצק. ה-snapshot בודק אז רק chrome, פריסה ואלמנטי UI סטטיים.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t(
                'Use Fixture Responses for Stable Snapshots',
                'שימוש בתגובות Fixture ל-Snapshots יציבים',
              )}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Combine model mocking with visual snapshots: feed the same fixture response every time so the rendered text is identical and the snapshot is stable.',
                'שלבו הדמיית מודל עם snapshots ויזואליים: הזינו את אותה תגובת fixture בכל פעם כדי שהטקסט המרונדר יהיה זהה וה-snapshot יציב.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('What Visual Tests Should Catch', 'מה בדיקות ויזואליות אמורות לזהות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Layout shifts, missing UI chrome (headers, footers, avatars), broken markdown rendering, and unexpected overflow — not the specific words the model produced.',
                'שינויי פריסה, chrome UI חסר (headers, footers, אוואטרים), רינדור markdown שבור, וגלישה בלתי צפויה — לא המילים הספציפיות שהמודל ייצר.',
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
            {t('Stable vs. Unstable Snapshot Targets', 'מטרות Snapshot יציבות לעומת לא יציבות')}
          </div>
          {[
            { label: t('Page chrome & navigation', 'Chrome ניווט ועמוד'), stable: true },
            {
              label: t('Message bubble layout & spacing', 'פריסה ורווח של בועת הודעה'),
              stable: true,
            },
            { label: t('Input area & send button', 'אזור קלט וכפתור שליחה'), stable: true },
            { label: t('AI-generated response text', 'טקסט תגובה מיוצר AI'), stable: false },
            {
              label: t('Streaming cursor / typing dots', 'סמן סטרימינג / נקודות הקלדה'),
              stable: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1.5vw',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                  minWidth: '1.5vw',
                  backgroundColor: item.stable ? 'rgba(13,148,136,0.15)' : 'rgba(239,68,68,0.12)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8vw',
                  fontWeight: 700,
                  color: item.stable ? '#0D9488' : '#EF4444',
                }}
              >
                {item.stable ? '✓' : '✗'}
              </div>
              <div
                style={{
                  fontSize: '1.05vw',
                  fontWeight: 500,
                  color: '#1E3A5F',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: isHe ? 'auto' : undefined,
                  fontSize: '0.85vw',
                  fontWeight: 600,
                  color: item.stable ? '#0D9488' : '#EF4444',
                  backgroundColor: item.stable ? 'rgba(13,148,136,0.1)' : 'rgba(239,68,68,0.1)',
                  padding: '0.2vh 0.6vw',
                  borderRadius: '2vw',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.stable ? t('Snapshot', 'Snapshot') : t('Mask', 'הסתר')}
              </div>
            </div>
          ))}
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
          <span>{t('Slide 21 of 30', 'שקופית 21 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
