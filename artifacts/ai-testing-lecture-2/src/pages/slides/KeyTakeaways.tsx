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

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5vw',
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '1vw',
  padding: '2.2vh 2vw',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

const num: React.CSSProperties = {
  width: '2.4vw',
  height: '2.4vw',
  minWidth: '2.4vw',
  borderRadius: '50%',
  backgroundColor: '#0D9488',
  color: '#FFFFFF',
  fontWeight: 700,
  fontSize: '1.1vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function KeyTakeaways() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('COURSE RECAP', 'סיכום')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '2.2vh', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '0.5vh' }}>
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
            {t('Course Recap', 'סיכום')}
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
            {t('Key Takeaways', 'נקודות מפתח')}
          </h1>
        </div>

        <div style={row}>
          <div style={num}>1</div>
          <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t(
              'A prompt is a spec \u2014 write it, review it, and version it like one',
              'פרומפט הוא מפרט \u2014 כתבו אותו, סקרו אותו ונהלו לו גרסאות כמו למפרט',
            )}
          </div>
        </div>
        <div style={row}>
          <div style={num}>2</div>
          <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t(
              'System messages carry the rules; sampling settings carry the variability',
              'הודעות המערכת נושאות את הכללים; הגדרות הדגימה נושאות את השונות',
            )}
          </div>
        </div>
        <div style={row}>
          <div style={num}>3</div>
          <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t(
              'Structured output turns \u201cdoes this look right?\u201d into an automatable check',
              'פלט מובנה הופך \u201cהאם זה נראה נכון?\u201d לבדיקה שניתן להפוך לאוטומטית',
            )}
          </div>
        </div>
        <div style={row}>
          <div style={num}>4</div>
          <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t(
              'Prompt injection is a real, testable security concern \u2014 not an edge case to ignore',
              'הזרקת פרומפטים היא חשש אבטחה אמיתי וניתן לבדיקה \u2014 לא מקרה קצה להתעלם ממנו',
            )}
          </div>
        </div>
      </div>

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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 20 of 21', 'שקופית 20 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
