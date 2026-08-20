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
  gridTemplateColumns: '2fr 3fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

const codePanel: React.CSSProperties = {
  background: '#0F172A',
  borderRadius: '1vw',
  border: '1px solid #1E293B',
  padding: '3vh 2.4vw',
  fontFamily: "'SFMono-Regular', Menlo, Consolas, monospace",
  color: '#E2E8F0',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5vh',
  boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
  justifyContent: 'center',
};

export default function GeneratingFromCode() {
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
            fontSize: '2.6vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Generating Tests from Source Code', 'יצירת בדיקות מקוד מקור')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
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
                'Provide the function signature, docstring, and implementation as context',
                'ספק את חתימת הפונקציה, docstring והמימוש כהקשר',
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
                'Include 2-3 existing tests as style examples so the AI matches your framework and patterns',
                'כלול 2-3 בדיקות קיימות כדוגמאות סגנון כדי ש-AI יתאים את עצמו לפריימוורק ולתבניות שלך',
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
                'Ask explicitly for null inputs, boundary values, and error paths',
                'בקש במפורש כניסות null, ערכי גבול ונתיבי שגיאה',
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
                'Review each generated assertion — AI may invert expected/actual or use wrong equality operators',
                'סקור כל אסרציה שנוצרה — AI עלול להפוך expected/actual או להשתמש באופרטורי שוויון שגויים',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codePanel}>
          <div
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#38BDF8',
              marginBottom: '0.5vh',
            }}
          >
            PROMPT PATTERN
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.7, color: '#94A3B8' }}>
            <span style={{ color: '#7DD3FC' }}>You are a test engineer. Here is a function:</span>
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.6, color: '#E2E8F0' }}>
            {'def calculate_discount(price, code):'}
          </div>
          <div
            style={{ fontSize: '1.05vw', lineHeight: 1.6, color: '#94A3B8', paddingLeft: '2vw' }}
          >
            {'"""Apply a promo code to a price."""'}
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#FBBF24',
            }}
          >
            INSTRUCTION
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.6, color: '#E2E8F0' }}>
            {t(
              'Generate pytest tests covering: happy path, invalid code, zero price, None inputs. Match the style of the examples provided.',
              'צור בדיקות pytest המכסות: נתיב תקין, קוד לא תקין, מחיר אפס, כניסות None. התאם לסגנון הדוגמאות.',
            )}
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#2DD4BF',
            }}
          >
            OUTPUT CONTRACT
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.6, color: '#E2E8F0' }}>
            {t(
              'Return only code, no explanation. One test function per case.',
              'החזר רק קוד, ללא הסבר. פונקציית בדיקה אחת לכל מקרה.',
            )}
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
          <span>{t('Slide 7 of 40', 'שקופית 7 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
