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
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function ToolkitOverview() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
      <div
        style={{
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

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('The Testing Stack', 'ערכת הבדיקות')}
          </div>
          <h1
            style={{
              fontSize: '3.2vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Toolkit Overview', 'סקירת ערכת כלים')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 1.5vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                width: '2.5vw',
                height: '2.5vw',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                borderRadius: '0.5vw',
                marginBottom: '1.5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '1.2vw',
                  height: '1.2vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '0.2vw',
                }}
              />
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>
              {t('Schema Validation', 'אימות סכמה')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('JSON Schema, Pydantic, Zod', 'JSON Schema, Pydantic, Zod')}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 1.5vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                width: '2.5vw',
                height: '2.5vw',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                borderRadius: '0.5vw',
                marginBottom: '1.5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '1.2vw',
                  height: '1.2vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>
              {t('Semantic Assertions', 'קביעות סמנטיות')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Embedding similarity, LLM-as-judge', 'דמיון הטמעה, LLM כשופט')}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 1.5vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                width: '2.5vw',
                height: '2.5vw',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                borderRadius: '0.5vw',
                marginBottom: '1.5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '0.7vw solid transparent',
                  borderRight: '0.7vw solid transparent',
                  borderBottom: '1.2vw solid #0D9488',
                }}
              />
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>
              {t('Load and Latency', 'עומס וזמן תגובה')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('k6, Locust, p95 budgets', 'k6, Locust, תקציבי p95')}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 1.5vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                width: '2.5vw',
                height: '2.5vw',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                borderRadius: '0.5vw',
                marginBottom: '1.5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '1.2vw',
                  height: '0.8vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '0.2vw',
                }}
              />
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>
              {t('Mocking', 'הדמייה')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('responses, VCR, WireMock', 'responses, VCR, WireMock')}
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 1.5vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                width: '2.5vw',
                height: '2.5vw',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                borderRadius: '0.5vw',
                marginBottom: '1.5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '1.2vw',
                  height: '1.2vw',
                  border: '3px solid #0D9488',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.8vh' }}>
              {t('Cost Tracking', 'מעקב עלויות')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Token counters, budget assertions', 'מוני טוקן, קביעות תקציב')}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '2.5vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6 }}>
            {t(
              'Each layer catches a different failure mode. Schema validation catches structural drift. Semantic assertions catch quality drift. Load tooling catches performance drift. Mocking removes the live dependency. Cost tracking prevents budget overruns.',
              'כל שכבה תופסת כשל מסוג שונה. אימות סכמה תופס סחיפה מבנית. קביעות סמנטיות תופסות סחיפת איכות. כלי עומס תופסים סחיפת ביצועים. הדמייה מסירה את התלות החיה. מעקב עלויות מונע חריגות תקציב.',
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
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
          <span>{t('Slide 4 of 30', 'שקופית 4 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
