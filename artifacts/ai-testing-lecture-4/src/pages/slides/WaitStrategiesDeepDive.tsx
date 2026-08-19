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

export default function WaitStrategiesDeepDive() {
  const strategies = [
    {
      title: t('waitForResponse()', 'waitForResponse()'),
      verdict: t('Reliable', 'אמין'),
      good: true,
      points: [
        t('Resolves when a specific HTTP response arrives', 'נפתר כשמגיעה תגובת HTTP ספציפית'),
        t('Synchronises at the network level, not the DOM', 'מסתנכרן ברמת הרשת, לא ה-DOM'),
        t(
          'Use it to gate assertions on the AI response payload',
          'השתמשו בו לשערות אסרציות על מטען תגובת AI',
        ),
      ],
      code: "await page.waitForResponse(r => r.url().includes('/api/chat'))",
    },
    {
      title: t('waitForFunction() / Custom Polling', 'waitForFunction() / סקירה מותאמת'),
      verdict: t('Reliable', 'אמין'),
      good: true,
      points: [
        t('Polls a JS predicate in the page context', 'סוקר פרדיקט JS בהקשר הדף'),
        t(
          'Use it to wait for a DOM attribute or text length threshold',
          'השתמשו בו להמתנה ל-attribute DOM או לסף אורך טקסט',
        ),
        t(
          'Respects the configured timeout — no indefinite hangs',
          'מכבד את ה-timeout שהוגדר — ללא תליות בלתי מוגבלות',
        ),
      ],
      code: "await page.waitForFunction(() => document.querySelector('[data-stream]')?.dataset.stream === 'done')",
    },
    {
      title: t('sleep() / waitForTimeout()', 'sleep() / waitForTimeout()'),
      verdict: t('Unreliable', 'לא אמין'),
      good: false,
      points: [
        t('Fixed pause: either too short or too long', 'השהייה קבועה: קצרה מדי או ארוכה מדי'),
        t(
          'Causes false failures on slow model responses',
          'גורם לכשלים שגויים על תגובות מודל איטיות',
        ),
        t(
          'Inflates suite duration needlessly on fast responses',
          'מנפח את משך הסוויטה ללא צורך על תגובות מהירות',
        ),
      ],
      code: 'await page.waitForTimeout(3000) // ✗ avoid',
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

      {/* Left column — title & intro */}
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
          {t('Timing Deep Dive', 'צלילה עמוקה לתזמון')}
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
          {t('Waiting for the Right Signal', 'המתנה לאות הנכון')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
          }}
        >
          {t(
            'The strategy you use to synchronise your test with an AI response determines whether your suite is reliable or flaky.',
            'האסטרטגיה שבה אתם משתמשים לסנכרון הבדיקה עם תגובת AI קובעת אם הסוויטה שלכם אמינה או רגישה.',
          )}
        </p>

        {/* Summary rule box */}
        <div
          style={{
            background: 'rgba(13,148,136,0.08)',
            border: '1px solid rgba(13,148,136,0.25)',
            borderRadius: '0.8vw',
            padding: '2vh 1.5vw',
          }}
        >
          <div
            style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}
          >
            {t('The Rule', 'הכלל')}
          </div>
          <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
            {t(
              'Always synchronise on an observable event — a DOM attribute change, element appearance/disappearance, or network response — never on elapsed time.',
              'תמיד סנכרנו על אירוע נצפה — שינוי attribute ב-DOM, הופעה/היעלמות אלמנט, או תגובת רשת — לא על זמן שחלף.',
            )}
          </div>
        </div>
      </div>

      {/* Right column — comparison cards */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}
      >
        {strategies.map((s, i) => (
          <div
            key={i}
            style={{
              background: '#FFFFFF',
              borderRadius: '0.8vw',
              border: `1px solid ${s.good ? '#E2E8F0' : 'rgba(239,68,68,0.35)'}`,
              padding: '1.5vh 1.5vw',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1vh',
              }}
            >
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F' }}>{s.title}</div>
              <div
                style={{
                  fontSize: '0.8vw',
                  fontWeight: 700,
                  color: s.good ? '#0D9488' : '#EF4444',
                  backgroundColor: s.good ? 'rgba(13,148,136,0.1)' : 'rgba(239,68,68,0.1)',
                  padding: '0.3vh 0.7vw',
                  borderRadius: '2vw',
                }}
              >
                {s.verdict}
              </div>
            </div>
            <ul
              style={{
                margin: '0 0 1vh 0',
                padding: isHe ? '0 1.2vw 0 0' : '0 0 0 1.2vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4vh',
              }}
            >
              {s.points.map((pt, j) => (
                <li key={j} style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
                  {pt}
                </li>
              ))}
            </ul>
            <div
              style={{
                background: '#1E3A5F',
                borderRadius: '0.4vw',
                padding: '0.8vh 1vw',
                fontFamily: 'monospace',
                fontSize: '0.82vw',
                color: '#7DD3C8',
                wordBreak: 'break-all',
              }}
            >
              {s.code}
            </div>
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
          <span>{t('Slide 10 of 30', 'שקופית 10 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
