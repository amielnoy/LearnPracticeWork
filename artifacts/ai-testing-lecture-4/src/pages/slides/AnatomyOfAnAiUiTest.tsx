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

export default function AnatomyOfAnAiUiTest() {
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
          {t('Foundations', 'יסודות')}
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
          {t("What's Different About Testing an AI UI", 'מה שונה בבדיקת UI מבוסס AI')}
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
            'Every AI UI test must account for three distinct layers — not just the final rendered output.',
            'כל בדיקת UI מבוסס AI חייבת להתמודד עם שלוש שכבות נפרדות — לא רק עם הפלט המרונדר הסופי.',
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
              {t('Layer 1 — The Request', 'שכבה 1 — הבקשה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Did the UI send the right prompt, auth headers, and parameters? This is testable via network interception before any response arrives.',
                'האם ה-UI שלח את הפרומפט הנכון, כותרות auth ופרמטרים? ניתן לבדוק זאת דרך יירוט רשת לפני שמגיעה תגובה כלשהי.',
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
                'Layer 2 — The Streaming / Incremental Render',
                'שכבה 2 — הרינדור ההדרגתי / הסטרימינג',
              )}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Is the loading indicator shown? Does the response container grow token-by-token? Do typing indicators disappear at the right time?',
                'האם מחוון הטעינה מוצג? האם מכיל התגובה גדל טוקן אחר טוקן? האם מחווני ההקלדה נעלמים בזמן הנכון?',
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
              {t('Layer 3 — The Final Rendered Output', 'שכבה 3 — הפלט המרונדר הסופי')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Is the response container visible? Does the content match the expected structure or intent? Are action buttons or copy controls present?',
                'האם מכיל התגובה גלוי? האם התוכן תואם את המבנה או הכוונה הצפויים? האם כפתורי פעולה או בקרות העתקה קיימים?',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — stack diagram */}
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
            gap: '0',
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
              marginBottom: '3vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('The Three-Layer Stack', 'מחסנית שלוש השכבות')}
          </div>

          {/* Layer 3 — top of stack (rendered last, visible first) */}
          <div
            style={{
              background: '#0D9488',
              borderRadius: '0.8vw 0.8vw 0 0',
              padding: '2.5vh 2vw',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#FFFFFF' }}>
              {t('Layer 3: Final Output', 'שכבה 3: פלט סופי')}
            </div>
            <div style={{ fontSize: '0.9vw', color: 'rgba(255,255,255,0.8)', marginTop: '0.5vh' }}>
              {t('structure · intent · actions', 'מבנה · כוונה · פעולות')}
            </div>
          </div>

          {/* Layer 2 */}
          <div
            style={{
              background: 'rgba(13, 148, 136, 0.55)',
              padding: '2.5vh 2vw',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#FFFFFF' }}>
              {t('Layer 2: Streaming Render', 'שכבה 2: רינדור סטרימינג')}
            </div>
            <div style={{ fontSize: '0.9vw', color: 'rgba(255,255,255,0.85)', marginTop: '0.5vh' }}>
              {t(
                'loading indicator · partial content · completion signal',
                'מחוון טעינה · תוכן חלקי · אות השלמה',
              )}
            </div>
          </div>

          {/* Layer 1 — bottom */}
          <div
            style={{
              background: 'rgba(13, 148, 136, 0.2)',
              borderRadius: '0 0 0.8vw 0.8vw',
              padding: '2.5vh 2vw',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Layer 1: The Request', 'שכבה 1: הבקשה')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', marginTop: '0.5vh' }}>
              {t('prompt · auth · parameters', 'פרומפט · אימות · פרמטרים')}
            </div>
          </div>

          <div
            style={{
              marginTop: '3vh',
              padding: '1.5vh 1.5vw',
              background: 'rgba(13,148,136,0.06)',
              borderRadius: '0.6vw',
              border: '1px solid rgba(13,148,136,0.2)',
              fontSize: '1vw',
              color: '#475569',
              lineHeight: 1.5,
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t(
              'Each layer has different assertion strategies. A good AI test suite covers all three.',
              'לכל שכבה יש אסטרטגיות אסרציה שונות. סוויטת בדיקות AI טובה מכסה את כל השלוש.',
            )}
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
          <span>{t('Slide 4 of 30', 'שקופית 4 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
