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
  gap: '1.8vh',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  justifyContent: 'center',
  overflowY: 'hidden',
};

export default function WorkedExampleInjectionLog() {
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
          {t('Logging Injection Attempts to Supabase', 'תיעוד ניסיונות הזרקה ב-Supabase')}
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
                'Each red-team prompt is inserted into a Supabase table with its verdict',
                'כל prompt אדום מוכנס לטבלת Supabase עם פסיקתו',
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
                'Query the table to compute a jailbreak-resistance score over time',
                'שאל את הטבלה לחישוב ציון עמידות ל-jailbreak לאורך זמן',
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
                'Score = (blocked_count / total_count) * 100',
                'ציון = (ספירת_חסום / סה"כ_ספירה) * 100',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right - Code */}
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
            TABLE: red_team_attempts
          </div>
          <div style={{ fontSize: '1.05vw', color: '#94A3B8', lineHeight: 1.5 }}>
            {'id | prompt_text | category | verdict | created_at'}
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
            INSERT: log attempt
          </div>
          <div style={{ fontSize: '1.05vw', color: '#E2E8F0', lineHeight: 1.6 }}>
            {'const { error } = await supabase'}
            <br />
            {'  .from("red_team_attempts")'}
            <br />
            {'  .insert({'}
            <br />
            {'    prompt_text: prompt,'}
            <br />
            {'    category: "direct_injection",'}
            <br />
            {'    verdict: blocked ? "BLOCKED" : "LEAKED"'}
            <br />
            {'  });'}
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
            QUERY: resistance score
          </div>
          <div style={{ fontSize: '1.05vw', color: '#E2E8F0', lineHeight: 1.6 }}>
            {'const { data } = await supabase'}
            <br />
            {'  .from("red_team_attempts")'}
            <br />
            {'  .select("verdict")'}
            <br />
            {'  .eq("category", "direct_injection");'}
            <br />
            {'const score = data.filter('}
            <br />
            {'  r => r.verdict === "BLOCKED"'}
            <br />
            {').length / data.length * 100;'}
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
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
              SCORE: 87%
            </span>
            <span style={{ fontSize: '0.95vw', color: '#94A3B8' }}>
              {t('87 of 100 injection prompts blocked', '87 מתוך 100 prompts של הזרקה נחסמו')}
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
          <span>{t('Slide 8 of 40', 'שקופית 8 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
