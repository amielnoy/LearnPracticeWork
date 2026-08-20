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

export default function LatencyMetrics() {
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
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
          {t('Metric Category 3', 'קטגוריית מדד 3')}
        </div>
        <h1
          style={{
            fontSize: '3.4vw',
            fontWeight: 800,
            margin: '0 0 2.5vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Latency Metrics', 'מדדי זמן אחזור')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Latency means user experience. Track percentiles, not just averages — the p99 tail is where users abandon your product.',
            'זמן אחזור הוא חוויית משתמש. עקוב אחר אחוזונים, לא רק ממוצעים — זנב ה-p99 הוא המקום שבו משתמשים נוטשים את המוצר שלך.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>p50 (median)</div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: < 2s', 'יעד: < 2 שניות')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>p95</div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: < 4s', 'יעד: < 4 שניות')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>p99</div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: < 8s', 'יעד: < 8 שניות')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1.8vh 1.5vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('TTFT (time-to-first-token)', 'TTFT (זמן לאסימון ראשון)')}
            </div>
            <div style={{ fontSize: '1vw', color: '#0D9488', fontWeight: 600 }}>
              {t('Target: < 800ms', 'יעד: < 800ms')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Latency score formula', 'נוסחת ציון זמן אחזור')}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                background: '#F8FAFC',
                borderRadius: '0.8vw',
                padding: '2vh 2vw',
                fontFamily: "'SFMono-Regular', monospace",
                fontSize: '1.1vw',
                color: '#1E3A5F',
              }}
            >
              <div>score = 100</div>
              <div style={{ color: '#64748B', marginTop: '0.5vh' }}>- 10 if p50 &gt; 2s</div>
              <div style={{ color: '#64748B' }}>- 20 if p95 &gt; 4s</div>
              <div style={{ color: '#64748B' }}>- 30 if p99 &gt; 8s</div>
              <div style={{ color: '#64748B' }}>- 15 if TTFT &gt; 800ms</div>
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'The latency score feeds directly into the overall quality scorecard. A fast-but-inaccurate model and a slow-but-accurate model both lose points.',
                'ציון זמן האחזור מוזן ישירות לכרטיס ניקוד האיכות הכולל. מודל מהיר אך לא מדויק ומודל איטי אך מדויק שניהם מפסידים נקודות.',
              )}
            </div>
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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 17 of 40', 'שקופית 17 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
