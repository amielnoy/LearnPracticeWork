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
  boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
};

export default function LearningObjectives() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
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
          {t('Learning Outcomes', 'תוצאות למידה')}
        </div>
        <h1
          style={{
            fontSize: '3.4vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t("What You'll Be Able To Do", 'מה תוכלו לעשות')}
        </h1>
        <p style={{ fontSize: '1.2vw', fontWeight: 400, color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'By the end of this lecture you can measure, load-test, budget, and monitor production AI systems to catch performance regressions before they reach users.',
            'בסיום ההרצאה תוכלו למדוד, לבצע בדיקות עומס, לתקצב ולנטר מערכות AI בייצור כדי לתפוס רגרסיות ביצועים לפני שהן מגיעות למשתמשים.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Benchmark latency end-to-end', 'בנצ\'מרק זמן אחזור מקצה לקצה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Measure TTFT, p50, p95, p99 and compare across providers.', 'מדידת TTFT, p50, p95, p99 והשוואה בין ספקים.')}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Run concurrency load tests', 'הרצת בדיקות עומס מקבילות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Find the degradation point and understand queuing behavior.', 'מציאת נקודת הדגרדציה והבנת התנהגות התור.')}
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
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.3vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Also in this lecture', 'גם בהרצאה זו')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                [isHe ? 'right' : 'left']: '0.5vw',
                top: '2vh',
                bottom: '2vh',
                width: '2px',
                backgroundColor: '#E2E8F0',
              } as React.CSSProperties}
            />
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Token-cost budgeting and prompt optimization', 'תקצוב עלות טוקנים ואופטימיזציית פרומפטים')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Establishing baselines and regression alerts', 'קביעת בסיסים והתראות רגרסיה')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.2vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Storing perf results in Supabase for trending', 'שמירת תוצאות ביצועים ב-Supabase למגמות')}
              </div>
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
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 2 of 40', 'שקופית 2 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
