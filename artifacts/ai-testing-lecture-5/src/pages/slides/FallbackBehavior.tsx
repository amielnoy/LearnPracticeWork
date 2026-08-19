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

export default function FallbackBehavior() {
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
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
          {t('Section 3 \u2014 Performance & Cost', 'חלק 3 \u2014 ביצועים ועלות')}
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
          {t('Fallback Behavior When the AI Provider Fails', 'התנהגות נסיגה כאשר ספק ה-AI נכשל')}
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
            'Test that your endpoint degrades gracefully — cached response, simpler non-AI path, or a clear error — rather than returning a bare 500 to the client.',
            'בדקו שנקודת הקצה שלכם פוחתת בצניעות — תגובה במטמון, נתיב פשוט ללא AI, או שגיאה ברורה — במקום להחזיר 500 גולמי ללקוח.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Cached Response Fallback', 'נסיגה לתגובה במטמון')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Return the last cached result for the same request when the AI call fails. Assert the response is flagged as "stale" so downstream consumers know it is not fresh.',
                'החזירו את התוצאה האחרונה במטמון עבור אותה בקשה כאשר קריאת ה-AI נכשלת. בדקו שהתגובה מסומנת כ-"stale" כך שצרכנים במורד הזרם יודעים שהיא אינה טרייה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Simpler Non-AI Path', 'נתיב פשוט ללא AI')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Route to a rule-based or keyword fallback when the model is unavailable. Test that the fallback path still produces a valid response that passes schema validation.',
                'הפנו לנסיגה מבוססת-כללים או מילות מפתח כאשר המודל אינו זמין. בדקו שנתיב הנסיגה עדיין מייצר תגובה תקפה שעוברת אימות סכמה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Clear Error Instead of a Bare 500', 'שגיאה ברורה במקום 500 גולמי')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'When no fallback is available, return a structured error with a meaningful code and message rather than a raw traceback or an opaque 500.',
                'כאשר אין נסיגה זמינה, החזירו שגיאה מובנית עם קוד והודעה משמעותיים במקום traceback גולמי או 500 אטום.',
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
            gap: '2.5vh',
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
            {t('Fallback Test Pattern', 'תבנית בדיקת נסיגה')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.9vw',
              lineHeight: 1.8,
              color: '#E2E8F0',
              flex: 1,
            }}
          >
            <div style={{ color: '#64748B' }}># mock the AI provider as unavailable</div>
            <div style={{ color: '#38BDF8' }}>responses.add(</div>
            <div style={{ color: '#38BDF8' }}>&nbsp;&nbsp;method=<span style={{ color: '#4ADE80' }}>"POST"</span>, url=<span style={{ color: '#4ADE80' }}>ENDPOINT</span>,</div>
            <div style={{ color: '#38BDF8' }}>&nbsp;&nbsp;status=<span style={{ color: '#F87171' }}>503</span>,</div>
            <div style={{ color: '#38BDF8' }}>)</div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}># call your service</div>
            <div style={{ color: '#FBBF24' }}>response = client.summarize(ticket)</div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}># assert graceful degradation</div>
            <div style={{ color: '#FBBF24' }}>assert response.status_code != <span style={{ color: '#F87171' }}>500</span></div>
            <div style={{ color: '#FBBF24' }}>assert <span style={{ color: '#4ADE80' }}>"error"</span> in response.json()</div>
            <div style={{ color: '#FBBF24' }}>assert response.json()[<span style={{ color: '#4ADE80' }}>"error"</span>][<span style={{ color: '#4ADE80' }}>"code"</span>] == <span style={{ color: '#4ADE80' }}>"AI_UNAVAILABLE"</span></div>
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 22 of 30', 'שקופית 22 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
