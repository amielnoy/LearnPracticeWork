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

export default function QualityScorecard() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Combining Metrics', 'שילוב מדדים')}
          </div>
          <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: '0 0 1vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('The Quality Scorecard', 'כרטיס ניקוד האיכות')}
          </h1>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1vw', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '1.5vh 1vw', alignItems: 'center' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('Release', 'גרסה')}</div>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', textAlign: 'center' }}>{t('Accuracy', 'דיוק')}</div>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', textAlign: 'center' }}>{t('Cost', 'עלות')}</div>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', textAlign: 'center' }}>{t('Latency', 'זמן אחזור')}</div>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', textAlign: 'center' }}>{t('Security', 'אבטחה')}</div>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase', textAlign: 'center' }}>{t('Overall', 'כולל')}</div>
            <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', textAlign: 'center' }}>{t('Status', 'סטטוס')}</div>

            <div style={{ height: '1px', gridColumn: '1 / -1', background: '#E2E8F0' }} />

            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>v2.14.0</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>88</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>92</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#D97706', fontWeight: 600 }}>74</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>100</div>
            <div style={{ fontSize: '1.3vw', textAlign: 'center', color: '#059669', fontWeight: 800 }}>89</div>
            <div style={{ textAlign: 'center' }}><span style={{ background: '#059669', color: '#fff', borderRadius: '0.4vw', padding: '0.3vh 0.8vw', fontSize: '0.85vw', fontWeight: 700 }}>SHIP</span></div>

            <div style={{ height: '1px', gridColumn: '1 / -1', background: '#F1F5F9' }} />

            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>v2.13.0</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>91</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#D97706', fontWeight: 600 }}>71</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>88</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#DC2626', fontWeight: 600 }}>0</div>
            <div style={{ fontSize: '1.3vw', textAlign: 'center', color: '#DC2626', fontWeight: 800 }}>63</div>
            <div style={{ textAlign: 'center' }}><span style={{ background: '#DC2626', color: '#fff', borderRadius: '0.4vw', padding: '0.3vh 0.8vw', fontSize: '0.85vw', fontWeight: 700 }}>BLOCK</span></div>

            <div style={{ height: '1px', gridColumn: '1 / -1', background: '#F1F5F9' }} />

            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>v2.12.0</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>85</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>88</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>82</div>
            <div style={{ fontSize: '1.1vw', textAlign: 'center', color: '#059669', fontWeight: 600 }}>100</div>
            <div style={{ fontSize: '1.3vw', textAlign: 'center', color: '#059669', fontWeight: 800 }}>89</div>
            <div style={{ textAlign: 'center' }}><span style={{ background: '#059669', color: '#fff', borderRadius: '0.4vw', padding: '0.3vh 0.8vw', fontSize: '0.85vw', fontWeight: 700 }}>SHIP</span></div>
          </div>
        </div>

        <div style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.25)', borderRadius: '0.8vw', padding: '2vh 2vw', textAlign: isHe ? 'right' : 'left' }}>
          <div style={{ fontSize: '1.1vw', color: '#0D9488', fontWeight: 600 }}>
            {t('Overall score = weighted average. Security = hard gate — any critical finding sets overall to 0 regardless of other scores.', 'ציון כולל = ממוצע משוקלל. אבטחה = שער קשיח — כל ממצא קריטי מגדיר את הכולל ל-0 ללא קשר לציונים אחרים.')}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 40', 'שקופית 19 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
