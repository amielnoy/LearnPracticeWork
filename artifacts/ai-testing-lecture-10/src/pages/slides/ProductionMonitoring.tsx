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

export default function ProductionMonitoring() {
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
          {t('Layer 4', 'שכבה 4')}
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
          {t('Production Monitoring', 'ניטור ייצור')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Production monitoring runs shadow evals on live traffic samples. It catches model drift, unexpected cost spikes, and latency regressions that only appear at real scale.',
            'ניטור ייצור מריץ הערכות צל על דגימות תנועה חיה. הוא תופס סחף מודל, קפיצות עלות בלתי צפויות ורגרסיות זמן אחזור שמופיעות רק בקנה מידה אמיתי.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                flexShrink: 0,
                marginTop: '0.5vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Sample 1–5% of live requests for shadow evaluation',
                'דגום 1–5% מהבקשות החיות להערכת צל',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                flexShrink: 0,
                marginTop: '0.5vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Alert when rolling 24h accuracy drops 5% below the nightly baseline',
                'התראה כאשר הדיוק הנגלל של 24 שעות יורד 5% מקו הבסיס הלילי',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                flexShrink: 0,
                marginTop: '0.5vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Store sampled evals to Supabase for trend analysis and manual review',
                'אחסן הערכות דגומות ב-Supabase לניתוח מגמות ובדיקה ידנית',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#1E3A5F',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#FAFBFC',
              borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Production signals to track', 'אותות ייצור למעקב')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Shadow eval pass rate', 'שיעור הצלחת הערכת צל')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488' }}>&gt; 90%</div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('p95 latency (live)', 'זמן אחזור p95 (חי)')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488' }}>&lt; 4s</div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Error rate', 'שיעור שגיאות')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488' }}>&lt; 1%</div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1vw', color: 'rgba(255,255,255,0.8)' }}>
                {t('Cost / 1k requests', 'עלות / 1k בקשות')}
              </div>
              <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0D9488' }}>
                {t('vs. budget', 'מול תקציב')}
              </div>
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
          <span>{t('Slide 11 of 40', 'שקופית 11 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
