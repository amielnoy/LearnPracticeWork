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
  gridTemplateColumns: '3fr 2fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

export default function TitleSlide() {
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
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
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
          {t('Lecture Series \u2014 AI Testing Track', 'סדרת הרצאות \u2014 מסלול בדיקות AI')}
        </div>
        <h1
          style={{
            fontSize: '4.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}
        </h1>
        <p
          style={{
            fontSize: '1.4vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 4vh 0',
            lineHeight: 1.5,
            maxWidth: '38vw',
          }}
        >
          {t(
            'Latency benchmarking, throughput load testing, token-cost optimization, and regression monitoring for production AI systems.',
            "בנצ'מרקינג זמן אחזור, בדיקות עומס, אופטימיזציית עלות טוקנים וניטור רגרסיה למערכות AI בייצור.",
          )}
        </p>

        <div style={{ display: 'flex', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              flex: 1,
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Lecture Number', 'מספר הרצאה')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#1E3A5F' }}>08</div>
              <div style={{ fontSize: '1vw', color: '#64748B' }}>{t('of 10', 'מתוך 10')}</div>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              flex: 1,
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Slides', 'שקופיות')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#1E3A5F' }}>40</div>
              <div style={{ fontSize: '1vw', color: '#64748B' }}>{t('slides', 'שקופיות')}</div>
            </div>
          </div>
          <div
            style={{
              background: '#0D9488',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Focus', 'מיקוד')}
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>
              {t('Perf + Cost', 'ביצועים + עלות')}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — visual */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2vh',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1vw',
              fontWeight: 700,
              color: '#64748B',
              marginBottom: '2vh',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('Topics Covered', 'נושאים מכוסים')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <div
                style={{
                  width: '0.5vw',
                  height: '0.5vw',
                  borderRadius: '50%',
                  backgroundColor: '#0D9488',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Why AI perf differs', 'מדוע ביצועי AI שונים')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <div
                style={{
                  width: '0.5vw',
                  height: '0.5vw',
                  borderRadius: '50%',
                  backgroundColor: '#0D9488',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Latency benchmarking', "בנצ'מרקינג זמן אחזור")}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <div
                style={{
                  width: '0.5vw',
                  height: '0.5vw',
                  borderRadius: '50%',
                  backgroundColor: '#0D9488',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Throughput & load testing', 'עומס ורוחב פס')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <div
                style={{
                  width: '0.5vw',
                  height: '0.5vw',
                  borderRadius: '50%',
                  backgroundColor: '#0D9488',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Token-cost optimization', 'אופטימיזציית עלות טוקנים')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <div
                style={{
                  width: '0.5vw',
                  height: '0.5vw',
                  borderRadius: '50%',
                  backgroundColor: '#0D9488',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t('Baselines & monitoring', 'בסיסים וניטור')}
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
          <span>{t('Slide 1 of 40', 'שקופית 1 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
