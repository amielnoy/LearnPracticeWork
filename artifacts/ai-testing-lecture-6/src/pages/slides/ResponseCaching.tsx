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

export default function ResponseCaching() {
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
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
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
          {t('Section 1', 'חלק 1')}
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
          {t('Caching LLM Responses Between Runs', 'מטמון תגובות LLM בין ריצות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'For tests whose input has not changed, replay a cached recorded response instead of a live API call. Only re-record when the prompt or fixture changes.',
            'עבור בדיקות שהקלט שלהן לא השתנה, נגן תגובה מוקלטת במטמון במקום קריאת API חיה. הקלט מחדש רק כאשר ה-prompt או הקובע משתנה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Cache key = hash of prompt + fixture', 'מפתח מטמון = hash של prompt + קובע')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A deterministic hash of the full input means two identical calls share one cached response automatically.',
                'hash דטרמיניסטי של הקלט המלא אומר ששתי קריאות זהות חולקות תגובה שמורה אחת אוטומטית.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t('Invalidate on prompt change', 'ביטול תוקף בשינוי prompt')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'When a prompt or fixture changes, the hash changes and the cache misses, forcing a fresh live call and recording the new response.',
                'כשה-prompt או הקובע משתנים, ה-hash משתנה והמטמון מפספס, ומאלץ קריאה חיה רעננה ומקליט את התגובה החדשה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.1vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.4vh',
              }}
            >
              {t(
                'Store cache in CI artifact or object storage',
                'אחסון מטמון ב-CI artifact או אחסון אובייקטים',
              )}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Persist the cache between runs so parallel shards and subsequent PRs can all share the same pool of recorded responses.',
                'שמור את המטמון בין ריצות כדי שכל shards מקבילים ו-PRs עוקבים יוכלו לחלוק את אותה בריכה של תגובות מוקלטות.',
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
            padding: '3vh 2.5vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Cache Decision Flow', 'זרימת החלטת מטמון')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.9vw',
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#94A3B8' }}>def call_model(prompt, fixture):</div>
            <div style={{ color: '#E2E8F0', paddingLeft: '1.5vw' }}>
              key = hash(prompt + fixture)
            </div>
            <div style={{ color: '#38BDF8', paddingLeft: '1.5vw' }}>if cache.exists(key):</div>
            <div style={{ color: '#0D9488', paddingLeft: '3vw' }}>
              return cache.get(key) # replay
            </div>
            <div style={{ color: '#FBBF24', paddingLeft: '1.5vw' }}>
              response = api.call(prompt)
            </div>
            <div style={{ color: '#2DD4BF', paddingLeft: '1.5vw' }}>cache.set(key, response)</div>
            <div style={{ color: '#E2E8F0', paddingLeft: '1.5vw' }}>return response</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#0D9488', fontWeight: 700 }}>&#x2192;</span>
              <span>
                {t(
                  'Cache hit: zero API cost, near-instant',
                  'פגיעה במטמון: אפס עלות API, כמעט מיידי',
                )}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#D97706', fontWeight: 700 }}>&#x2192;</span>
              <span>
                {t(
                  'Cache miss: live call, response recorded',
                  'החטאת מטמון: קריאה חיה, תגובה מוקלטת',
                )}
              </span>
            </div>
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 9 of 30', 'שקופית 9 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
