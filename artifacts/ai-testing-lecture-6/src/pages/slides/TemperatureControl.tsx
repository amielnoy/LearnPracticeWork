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

export default function TemperatureControl() {
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
          {t('Section 2', 'חלק 2')}
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
          {t('Seeding for Reproducibility', 'זריעת seed לשחזוריות')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            "Set the model's temperature near zero and fix any random seed in test fixtures so the same input produces the same output run to run.",
            'הגדר את טמפרטורת המודל קרוב לאפס וקבע כל seed אקראי בקובעי הבדיקה כך שאותו קלט מייצר אותו פלט מריצה לריצה.',
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
              {t('Temperature near zero', 'טמפרטורה קרובה לאפס')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'temperature=0.0 or temperature=0.1 minimises token-sampling variance. The greedy decoding path becomes nearly deterministic across runs.',
                'temperature=0.0 או temperature=0.1 ממזערים שונות בדגימת tokens. מסלול הפענוח החמדני הופך לכמעט דטרמיניסטי בין ריצות.',
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
              {t('Fix random seeds in fixtures', 'קיבוע seeds אקראיים בקובעים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Any sampling in test fixture generation should use a fixed seed. Version-control the seed value alongside the fixture.',
                'כל דגימה בייצור קובעי הבדיקה צריכה להשתמש ב-seed קבוע. שמור את ערך ה-seed בבקרת גרסאות לצד הקובע.',
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
              {t('Provider seeds where available', 'seeds ספק כשזמינים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Some APIs expose a seed parameter. Pass it explicitly in every test call. Combine with temperature=0 for maximum reproducibility.',
                'חלק מ-APIs חושפים פרמטר seed. העבר אותו במפורש בכל קריאת בדיקה. שלב עם temperature=0 לשחזוריות מרבית.',
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
            {t('Fixture Call Pattern', 'תבנית קריאת קובע')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              direction: 'ltr',
              textAlign: 'left',
              fontSize: '0.9vw',
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#94A3B8' }}>def call_for_test(prompt):</div>
            <div style={{ color: '#E2E8F0', paddingLeft: '1.5vw' }}>
              return client.chat.completions.create(
            </div>
            <div style={{ color: '#38BDF8', paddingLeft: '3vw' }}>model="gpt-4o-mini",</div>
            <div style={{ color: '#FBBF24', paddingLeft: '3vw' }}>
              messages=[&#123;"role":"user",
            </div>
            <div style={{ color: '#FBBF24', paddingLeft: '4.5vw' }}>"content": prompt&#125;],</div>
            <div style={{ color: '#2DD4BF', paddingLeft: '3vw' }}>temperature=0.0,</div>
            <div style={{ color: '#2DD4BF', paddingLeft: '3vw' }}>seed=42,</div>
            <div style={{ color: '#E2E8F0', paddingLeft: '1.5vw' }}>)</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#0D9488', fontWeight: 700 }}>&#x2192;</span>
              <span>
                {t(
                  'temperature=0.0 minimises sampling variance',
                  'temperature=0.0 ממזערת שונות דגימה',
                )}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#0D9488', fontWeight: 700 }}>&#x2192;</span>
              <span>{t('seed=42 pinned in version control', 'seed=42 מוצמד בבקרת גרסאות')}</span>
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
          <span>{t('Slide 16 of 30', 'שקופית 16 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
