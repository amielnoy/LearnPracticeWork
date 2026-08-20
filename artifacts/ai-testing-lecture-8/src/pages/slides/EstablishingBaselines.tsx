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
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function EstablishingBaselines() {
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
          {t('The Reference Point', 'נקודת הייחוס')}
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
          {t('Establishing Performance Baselines', 'קביעת בסיסי ביצועים')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            "A baseline is the known-good performance profile of a release. Without it, you cannot tell if today's numbers represent a regression or normal variance.",
            'בסיס הוא פרופיל הביצועים הידוע-כטוב של גרסה. בלעדיו, לא ניתן לדעת אם המספרים של היום מייצגים רגרסיה או שונות רגילה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('What goes in a baseline', 'מה נכנס לבסיס')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'p50, p95, p99 latency | cost/request | error rate | throughput ceiling — per feature, per model.',
                'זמן אחזור p50, p95, p99 | עלות/בקשה | שיעור שגיאות | תקרת רוחב פס — לכל תכונה, לכל מודל.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('When to take a new baseline', 'מתי לקחת בסיס חדש')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'New model version, significant prompt change, provider upgrade, or after intentional cost-reduction work.',
                'גרסת מודל חדשה, שינוי פרומפט משמעותי, שדרוג ספק, או לאחר עבודת הפחתת עלות מכוונת.',
              )}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(13,148,136,0.08)',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid rgba(13,148,136,0.2)',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', marginBottom: '0.5vh' }}
            >
              {t('Storage', 'אחסון')}
            </div>
            <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.4 }}>
              {t(
                "Store baselines in Supabase's perf_baselines table, tagged with git SHA and model version.",
                'שמור בסיסים בטבלת perf_baselines של Supabase, מתויגת עם git SHA וגרסת מודל.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}
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
            {t('Baseline Lifecycle', 'מחזור חיים של בסיס')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                [isHe ? 'right' : 'left']: '1vw',
                top: '2vh',
                bottom: '2vh',
                width: '2px',
                backgroundColor: '#E2E8F0',
              }}
            />
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'flex-start',
                paddingBottom: '2vh',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '2.2vw',
                  height: '2.2vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #0D9488',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontSize: '0.85vw', fontWeight: 800, color: '#FFFFFF' }}>1</div>
              </div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('Run benchmark suite', "הרץ חבילת בנצ'מרק")}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
                  {t('300+ samples per feature at steady state', '300+ דגימות לכל תכונה במצב יציב')}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'flex-start',
                paddingBottom: '2vh',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '2.2vw',
                  height: '2.2vw',
                  backgroundColor: '#1E3A5F',
                  borderRadius: '50%',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #1E3A5F',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontSize: '0.85vw', fontWeight: 800, color: '#FFFFFF' }}>2</div>
              </div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('Compute percentiles and cost', 'חשב אחוזונים ועלות')}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
                  {t(
                    'p50, p95, p99, mean cost, error rate',
                    'p50, p95, p99, עלות ממוצעת, שיעור שגיאות',
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'flex-start',
                paddingBottom: '2vh',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '2.2vw',
                  height: '2.2vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #0D9488',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontSize: '0.85vw', fontWeight: 800, color: '#FFFFFF' }}>3</div>
              </div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('Tag and store in Supabase', 'תייג ושמור ב-Supabase')}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
                  {t('Include git SHA, model, provider, date', 'כלול git SHA, מודל, ספק, תאריך')}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '2.2vw',
                  height: '2.2vw',
                  backgroundColor: '#1E3A5F',
                  borderRadius: '50%',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #1E3A5F',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontSize: '0.85vw', fontWeight: 800, color: '#FFFFFF' }}>4</div>
              </div>
              <div>
                <div style={{ fontSize: '1.05vw', fontWeight: 700, color: '#1E3A5F' }}>
                  {t('CI compares future runs to this baseline', 'CI משווה ריצות עתידיות לבסיס זה')}
                </div>
                <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
                  {t(
                    'Alert if p99 grows +20% or cost grows +15%',
                    'התריע אם p99 גדל ב-+20% או עלות ב-+15%',
                  )}
                </div>
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
          <span>{t('Slide 26 of 40', 'שקופית 26 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
