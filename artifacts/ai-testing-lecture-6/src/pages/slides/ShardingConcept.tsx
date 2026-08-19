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

export default function ShardingConcept() {
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
          {t('Parallelizing Without Rate-Limiting', 'מקביליות ללא פגיעה בהגבלות קצב')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'Split the AI test suite across shards, cap concurrent shards, and stagger requests so ten runners do not all hit the API in the same second.',
            'פצל את חבילת בדיקות ה-AI לשברים, הגבל את מספר ה-shards המקבילים ופזר בקשות כדי ש-10 runners לא יגיעו ל-API באותה שנייה.',
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
              {t('Split by test file or tag', 'פיצול לפי קובץ בדיקה או תג')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Assign each shard a non-overlapping slice of the test collection so every test runs exactly once.',
                'הקצה לכל shard פרוסה שאינה חופפת מאוסף הבדיקות כדי שכל בדיקה תרוץ בדיוק פעם אחת.',
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
              {t('Cap concurrent shards', 'הגבלת shards מקבילים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                "Keep the shard count at or below the provider's concurrent-request limit to avoid 429 rate-limit errors.",
                'שמור את מספר ה-shards ב- או מתחת למגבלת הבקשות המקבילות של הספק כדי להימנע משגיאות 429.',
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
              {t('Stagger requests between shards', 'פיזור בקשות בין shards')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Add a small random jitter between requests on each shard so burst peaks do not coincide across runners.',
                'הוסף jitter אקראי קטן בין בקשות בכל shard כדי שפסגות burst לא יחפפו בין runners.',
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
            {t('4-Shard Matrix', 'מטריקס של 4 shards')}
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
            <div style={{ color: '#94A3B8' }}>strategy:</div>
            <div style={{ color: '#E2E8F0', paddingLeft: '1.5vw' }}>matrix:</div>
            <div style={{ color: '#38BDF8', paddingLeft: '3vw' }}>shard: [1, 2, 3, 4]</div>
            <div style={{ color: '#E2E8F0', marginTop: '0.5vh' }}>steps:</div>
            <div style={{ color: '#94A3B8', paddingLeft: '1.5vw' }}>- name: Run shard</div>
            <div style={{ color: '#FBBF24', paddingLeft: '3vw' }}>run: pytest tests/ai</div>
            <div style={{ color: '#2DD4BF', paddingLeft: '4.5vw' }}>
              --shard-id=${'${{matrix.shard}}'}
            </div>
            <div style={{ color: '#2DD4BF', paddingLeft: '4.5vw' }}>--num-shards=4</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.8vw',
                alignItems: 'flex-start',
                fontSize: '1vw',
                color: '#64748B',
              }}
            >
              <span style={{ color: '#0D9488', fontWeight: 700, flexShrink: 0 }}>&#x2192;</span>
              <span>{t('4 runners start simultaneously', '4 runners מתחילים בו זמנית')}</span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.8vw',
                alignItems: 'flex-start',
                fontSize: '1vw',
                color: '#64748B',
              }}
            >
              <span style={{ color: '#0D9488', fontWeight: 700, flexShrink: 0 }}>&#x2192;</span>
              <span>
                {t('Each runner handles one quarter of the tests', 'כל runner מטפל ברבע מהבדיקות')}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.8vw',
                alignItems: 'flex-start',
                fontSize: '1vw',
                color: '#64748B',
              }}
            >
              <span style={{ color: '#0D9488', fontWeight: 700, flexShrink: 0 }}>&#x2192;</span>
              <span>
                {t(
                  'Wall-clock time is roughly quarter of serial time',
                  'זמן הריצה בערך רבע מהזמן הסדרתי',
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
          <span>{t('Slide 7 of 30', 'שקופית 7 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
