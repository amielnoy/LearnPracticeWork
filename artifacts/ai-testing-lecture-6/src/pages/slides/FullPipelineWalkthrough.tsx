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

export default function FullPipelineWalkthrough() {
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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}
        >
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.6vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Bringing It Together', 'מרכז הכל יחד')}
          </div>
          <h1
            style={{
              fontSize: '2.8vw',
              fontWeight: 800,
              margin: '0 0 1vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('A Full Pipeline Walkthrough', 'מעבר מלא על הצינור')}
          </h1>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '1vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2vh 1.5vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                backgroundColor: 'rgba(13,148,136,0.12)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2vw',
                fontWeight: 800,
                color: '#0D9488',
                margin: '0 auto',
              }}
            >
              1
            </div>
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('PR Opens', 'PR נפתח')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Developer pushes; GitHub Actions triggers the ai-tests job.', 'מפתח דוחף; GitHub Actions מפעיל את משימת ai-tests.')}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(13,148,136,0.04)',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: '1vw',
              padding: '2vh 1.5vw',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                backgroundColor: 'rgba(13,148,136,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2vw',
                fontWeight: 800,
                color: '#0D9488',
                margin: '0 auto',
              }}
            >
              2
            </div>
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Sharded + Cached', 'מפוצל + שמור')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('4 runners split the @smoke tests; cached responses used where prompt is unchanged.', '4 runners מפצלים את בדיקות ה-@smoke; תגובות שמורות בשימוש שם שה-prompt לא השתנה.')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2vh 1.5vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                backgroundColor: 'rgba(30,58,95,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2vw',
                fontWeight: 800,
                color: '#1E3A5F',
                margin: '0 auto',
              }}
            >
              3
            </div>
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Retry + Budget', 'ניסיון חוזר + תקציב')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Max 2 retries; outcomes logged; cost gate enforced at $0.50.', 'מקסימום 2 ניסיונות חוזרים; תוצאות מתועדות; שער עלות נאכף ב-$0.50.')}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(13,148,136,0.04)',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: '1vw',
              padding: '2vh 1.5vw',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                backgroundColor: 'rgba(13,148,136,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2vw',
                fontWeight: 800,
                color: '#0D9488',
                margin: '0 auto',
              }}
            >
              4
            </div>
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Judge Gate', 'שער השופט')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('LLM scores each response against rubric. avg_score >= 4.0 required to pass.', 'LLM מדרג כל תגובה מול רובריקה. avg_score >= 4.0 נדרש לעבור.')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2vh 1.5vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                backgroundColor: 'rgba(13,148,136,0.12)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2vw',
                fontWeight: 800,
                color: '#0D9488',
                margin: '0 auto',
              }}
            >
              5
            </div>
            <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Merge / Block', 'מיזוג / חסימה')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Pass: merge enabled. Block: reviewer sees judge reasoning before override. Full suite runs overnight.', 'עבר: מיזוג מאופשר. חסום: סוקר רואה נימוק שופט לפני עקיפה. חבילה מלאה מופעלת בלילה.')}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '0.8vw',
            padding: '1.5vh 2vw',
            fontSize: '1vw',
            color: '#475569',
            fontWeight: 500,
            textAlign: isHe ? 'right' : 'left',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          {t(
            'End-to-end wall time for a typical PR: under 8 minutes. Cost per run: under $0.50. Coverage confirmed overnight by the full nightly suite.',
            'זמן ריצה מקצה לקצה ל-PR טיפוסי: פחות מ-8 דקות. עלות לריצה: פחות מ-$0.50. כיסוי מאושר בלילה על ידי החבילה הלילית המלאה.',
          )}
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 24 of 30', 'שקופית 24 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
