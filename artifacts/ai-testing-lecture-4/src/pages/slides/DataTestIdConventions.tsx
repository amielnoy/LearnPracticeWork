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

export default function DataTestIdConventions() {
  const conventions = [
    {
      label: t('Name by role + entity', 'שם לפי תפקיד + ישות'),
      example: 'data-testid="chat-message-container"',
      desc: t(
        'Encode what the element is and what entity it belongs to. Avoid generic names like "container" or "wrapper".',
        'קודדו מה האלמנט ולאיזו ישות הוא שייך. הימנעו משמות גנריים כמו "container" או "wrapper".',
      ),
      good: true,
    },
    {
      label: t('Stable containers, not text nodes', 'מכילים יציבים, לא צמתי טקסט'),
      example: 'data-testid="ai-response-body"',
      desc: t(
        'Attach the testid to the wrapper div that holds the AI output, not to a span or text node that changes with every generation.',
        'צרפו את ה-testid ל-div העוטף שמחזיק את פלט ה-AI, לא ל-span או צומת טקסט שמשתנה עם כל יצירה.',
      ),
      good: true,
    },
    {
      label: t('Stream state attributes', 'מאפייני מצב סטרים'),
      example: 'data-stream="idle|streaming|done|error"',
      desc: t(
        'Use a data attribute on the message container to expose the current stream state. Tests can then wait for data-stream="done" rather than a fixed timeout.',
        'השתמשו ב-data attribute על מכיל ההודעות כדי לחשוף את מצב הסטרים הנוכחי. בדיקות יכולות אז להמתין ל-data-stream="done" במקום ל-timeout קבוע.',
      ),
      good: true,
    },
    {
      label: t('Avoid index-based testids', 'הימנעו מ-testids מבוססי אינדקס'),
      example: 'data-testid="message-3" // ✗',
      desc: t(
        'Positional IDs break as soon as the conversation history changes. Prefer semantic or entity-based naming.',
        'IDs מיקומיים נשברים ברגע שהיסטוריית השיחה משתנה. עדיפו שמות סמנטיים או מבוססי ישות.',
      ),
      good: false,
    },
  ];

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

      {/* Left column — title */}
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
          {t('Technique 3 — Selectors', 'טכניקה 3 — סלקטורים')}
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
          {t('Naming Conventions for data-testid', 'מוסכמות שמות עבור data-testid')}
        </h1>
        <p
          style={{
            fontSize: '1.2vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
          }}
        >
          {t(
            'Stable test hooks in the DOM are the foundation of any resilient selector strategy. Where you place them matters as much as what you name them.',
            'עוגני בדיקה יציבים ב-DOM הם הבסיס לכל אסטרטגיית סלקטורים עמידה. היכן שאתם ממקמים אותם חשוב לא פחות ממה שאתם קוראים להם.',
          )}
        </p>

        <div
          style={{
            background: 'rgba(13,148,136,0.08)',
            border: '1px solid rgba(13,148,136,0.25)',
            borderRadius: '0.8vw',
            padding: '2vh 1.5vw',
          }}
        >
          <div
            style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh' }}
          >
            {t('Golden Rule', 'כלל הזהב')}
          </div>
          <div style={{ fontSize: '0.95vw', color: '#475569', lineHeight: 1.5 }}>
            {t(
              'Place testids on stable container elements — never on text nodes or elements whose position, count, or content is generated by the AI model.',
              'מקמו testids על אלמנטים מכילים יציבים — לעולם לא על צמתי טקסט או אלמנטים שמיקומם, כמותם או תוכנם נוצר על ידי מודל ה-AI.',
            )}
          </div>
        </div>
      </div>

      {/* Right column — convention cards */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5vh' }}
      >
        {conventions.map((c, i) => (
          <div
            key={i}
            style={{
              background: '#FFFFFF',
              borderRadius: '0.8vw',
              border: `1px solid ${c.good ? '#E2E8F0' : 'rgba(239,68,68,0.3)'}`,
              padding: '1.5vh 1.5vw',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.8vh',
              }}
            >
              <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>{c.label}</div>
              <div
                style={{
                  fontSize: '0.8vw',
                  fontWeight: 600,
                  color: c.good ? '#0D9488' : '#EF4444',
                  backgroundColor: c.good ? 'rgba(13,148,136,0.1)' : 'rgba(239,68,68,0.1)',
                  padding: '0.2vh 0.6vw',
                  borderRadius: '2vw',
                }}
              >
                {c.good ? t('Do', 'עשו') : t('Avoid', 'הימנעו')}
              </div>
            </div>
            <div
              style={{
                background: '#1E3A5F',
                borderRadius: '0.4vw',
                padding: '0.6vh 0.8vw',
                fontFamily: 'monospace',
                direction: 'ltr',
                textAlign: 'left',
                fontSize: '0.85vw',
                color: '#7DD3C8',
                marginBottom: '0.8vh',
              }}
            >
              {c.example}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>{c.desc}</div>
          </div>
        ))}
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
          <span>{t('Slide 14 of 30', 'שקופית 14 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
