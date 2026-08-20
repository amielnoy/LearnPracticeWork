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
  direction: 'ltr',
  textAlign: 'left',
  color: '#E2E8F0',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.8vh',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  justifyContent: 'center',
};

export default function WorkedExampleGuardrailCI() {
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
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Left */}
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
          {t('Worked Example', 'דוגמה מעשית')}
        </div>
        <h1
          style={{
            fontSize: '2.4vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Guardrail Outcomes to a CI Dashboard', 'תוצאות Guardrail ללוח מחוונים CI')}
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
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Write blocked vs. allowed counts per guardrail category to Supabase',
                'כתוב ספירות חסום לעומת מותר לכל קטגוריית guardrail ל-Supabase',
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
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Query the dashboard to verify all critical tests are still BLOCKED',
                'שאל את לוח המחוונים לאמת שכל הבדיקות הקריטיות עדיין BLOCKED',
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
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Fail the CI step if any critical test verdict changes from prior build',
                'עצור את שלב CI אם פסיקת בדיקה קריטית משתנה מה-build הקודם',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codePanel}>
          <div
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              color: '#38BDF8',
              letterSpacing: '0.08em',
            }}
          >
            TABLE: guardrail_ci_results
          </div>
          <div style={{ fontSize: '1.05vw', color: '#94A3B8', lineHeight: 1.5 }}>
            {'build_id | category | blocked | allowed | run_date'}
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              color: '#FBBF24',
              letterSpacing: '0.08em',
            }}
          >
            WRITE: upsert this build's results
          </div>
          <div style={{ fontSize: '1.05vw', color: '#E2E8F0', lineHeight: 1.7 }}>
            {'await supabase'}
            <br />
            {'  .from("guardrail_ci_results")'}
            <br />
            {'  .upsert({'}
            <br />
            {'    build_id: process.env.BUILD_SHA,'}
            <br />
            {'    category: "prompt_injection",'}
            <br />
            {'    blocked: 47,'}
            <br />
            {'    allowed: 3,'}
            <br />
            {'    run_date: new Date().toISOString()'}
            <br />
            {'  }, { onConflict: "build_id,category" });'}
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              color: '#2DD4BF',
              letterSpacing: '0.08em',
            }}
          >
            READ: compare to prior build
          </div>
          <div style={{ fontSize: '1.05vw', color: '#E2E8F0', lineHeight: 1.6 }}>
            {'const { data } = await supabase'}
            <br />
            {'  .from("guardrail_ci_results")'}
            <br />
            {'  .select("blocked")'}
            <br />
            {'  .eq("category", "prompt_injection")'}
            <br />
            {'  .order("run_date", { ascending: false })'}
            <br />
            {'  .limit(2);'}
            <br />
            {'// Fail if blocked count dropped'}
            <br />
            {'if (data[0].blocked < data[1].blocked)'}
            <br />
            {'  process.exit(1);'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
            <span
              style={{
                background: '#059669',
                color: '#fff',
                borderRadius: '0.4vw',
                padding: '0.5vh 1vw',
                fontSize: '0.95vw',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              PASS
            </span>
            <span style={{ fontSize: '0.95vw', color: '#94A3B8' }}>
              {t('Blocked count stable: 47 (prev: 47)', 'ספירה חסומה יציבה: 47 (קודם: 47)')}
            </span>
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
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 29 of 40', 'שקופית 29 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
