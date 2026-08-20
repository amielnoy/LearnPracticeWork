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

export default function AccessibilityFirstSelectors() {
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
          {t('Resilience Strategy', 'אסטרטגיית עמידות')}
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
          {t('Accessibility as a Resilience Strategy', 'נגישות כאסטרטגיית עמידות')}
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
            'Semantic HTML roles and labels are stable anchors that survive AI output changes. Using accessibility-driven selectors improves both test resilience and product accessibility.',
            'תפקידי HTML סמנטיים ותוויות הם עוגנים יציבים שמחזיקים מעמד מול שינויי פלט AI. שימוש בסלקטורים מונעי נגישות משפר גם את עמידות הבדיקות וגם את נגישות המוצר.',
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
              {t('getByRole() — semantic and stable', 'getByRole() — סמנטי ויציב')}
            </div>
            <div
              style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4, marginBottom: '1vh' }}
            >
              {t(
                'Targets elements by their ARIA role. Survives visual redesigns and text rewrites because it describes what the element does, not what it says.',
                'מכוון לאלמנטים לפי תפקיד ARIA שלהם. שורד עיצובים מחדש ויזואליים וכתיבות טקסט מחדש כי הוא מתאר מה האלמנט עושה, לא מה הוא אומר.',
              )}
            </div>
            <div
              style={{
                background: '#1E3A5F',
                borderRadius: '0.5vw',
                padding: '1vh 1vw',
                fontFamily: 'monospace',
                direction: 'ltr',
                textAlign: 'left',
                fontSize: '0.9vw',
                color: '#7DD3C8',
              }}
            >
              {"page.getByRole('button', { name: /send/i })"}
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
              {t('getByLabel() — form inputs', 'getByLabel() — שדות טופס')}
            </div>
            <div
              style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4, marginBottom: '1vh' }}
            >
              {t(
                'Finds the input associated with a visible label. Works even when the AI rephrases label text — as long as the label element is semantically linked.',
                'מוצא את הקלט המשויך לתווית גלויה. עובד גם כשה-AI מנסח מחדש את טקסט התווית — כל עוד אלמנט התווית מקושר סמנטית.',
              )}
            </div>
            <div
              style={{
                background: '#1E3A5F',
                borderRadius: '0.5vw',
                padding: '1vh 1vw',
                fontFamily: 'monospace',
                direction: 'ltr',
                textAlign: 'left',
                fontSize: '0.9vw',
                color: '#7DD3C8',
              }}
            >
              {"page.getByLabel('Your message')"}
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
            {t('Selector Priority Order', 'סדר עדיפות סלקטורים')}
          </div>
          {(
            [
              {
                rank: '1',
                label: t('getByRole()', 'getByRole()'),
                note: t('Semantic + a11y', 'סמנטי + a11y'),
              },
              {
                rank: '2',
                label: t('getByLabel()', 'getByLabel()'),
                note: t('Form inputs', 'שדות טופס'),
              },
              {
                rank: '3',
                label: t('getByTestId()', 'getByTestId()'),
                note: t('Explicit hook', 'עוגן מפורש'),
              },
              {
                rank: '4',
                label: t('getByPlaceholder()', 'getByPlaceholder()'),
                note: t('Last resort', 'מוצא אחרון'),
              },
              {
                rank: '✗',
                label: t('getByText() on AI content', 'getByText() על תוכן AI'),
                note: t('Avoid', 'הימנעו'),
                bad: true,
              },
            ] as Array<{ rank: string; label: string; note: string; bad?: boolean }>
          ).map((item, i) => (
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
                  width: '2.4vw',
                  height: '2.4vw',
                  minWidth: '2.4vw',
                  backgroundColor: item.bad ? 'rgba(239,68,68,0.1)' : 'rgba(13,148,136,0.1)',
                  color: item.bad ? '#EF4444' : '#0D9488',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1vw',
                  fontWeight: 700,
                }}
              >
                {item.rank}
              </div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B' }}>{item.note}</div>
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
          <span>{t('Slide 16 of 30', 'שקופית 16 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
