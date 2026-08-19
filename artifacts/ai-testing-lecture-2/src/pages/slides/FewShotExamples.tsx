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

const bulletRow: React.CSSProperties = { display: 'flex', gap: '1.2vw', alignItems: 'flex-start' };
const dot: React.CSSProperties = {
  width: '0.6vw',
  height: '0.6vw',
  minWidth: '0.6vw',
  borderRadius: '50%',
  backgroundColor: '#0D9488',
  marginTop: '0.7vw',
};

export default function FewShotExamples() {
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
          <div>{t('CORE TECHNIQUES', 'טכניקות ליבה')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
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
          {t('Core Techniques', 'טכניקות ליבה')}
        </div>
        <h1
          style={{
            fontSize: '3.2vw',
            fontWeight: 800,
            margin: '0 0 3vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Few-Shot Examples: Anchoring Behavior', 'דוגמאות Few-Shot: עיגון ההתנהגות')}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.6vh' }}>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'One or two well-chosen examples do more to stabilize format than paragraphs of instructions',
                'דוגמה אחת או שתיים שנבחרו היטב יציבות את הפורמט יותר מפסקאות של הנחיות',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Show an edge case, not just the easy case \u2014 the model imitates the pattern you show it',
                'הראו מקרה קצה, לא רק את המקרה הקל \u2014 המודל מחקה את הדפוס שאתם מציגים לו',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Keep examples in the same format you expect back, including field names and casing',
                'שמרו על הדוגמאות באותו הפורמט שאתם מצפים לקבל בחזרה, כולל שמות שדות ורישיות',
              )}
            </div>
          </div>
          <div style={bulletRow}>
            <div style={dot} />
            <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t(
                'Version your examples with the prompt \u2014 a changed example is a changed contract',
                'נהלו גרסאות לדוגמאות יחד עם הפרומפט \u2014 דוגמה שהשתנתה היא חוזה שהשתנה',
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.6vh' }}
      >
        <div
          style={{
            background: '#FFFFFF',
            padding: '2.5vh 2vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '0.9vw',
              fontWeight: 600,
              color: '#64748B',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('Example 1', 'דוגמה 1')}
          </div>
        </div>
        <div
          style={{
            background: '#FFFFFF',
            padding: '2.5vh 2vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '0.9vw',
              fontWeight: 600,
              color: '#64748B',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('Example 2 (edge case)', 'דוגמה 2 (מקרה קצה)')}
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
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 10 of 21', 'שקופית 10 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
