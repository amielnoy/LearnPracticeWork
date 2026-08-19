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

const card: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '1vw',
  padding: '2.5vh 2vw',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1vh',
};

export default function CommonFailureModes() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('LESSONS LEARNED', 'לקחים')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
            {t('Lessons Learned', 'לקחים')}
          </div>
          <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t('Common Prompt Failure Modes', 'תבניות כשל נפוצות בפרומפטים')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw' }}>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Ambiguous instructions', 'הנחיות מעורפלות')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('the model guesses at what you meant, and guesses differently each time', 'המודל מנחש את כוונתכם, ומנחש אחרת בכל פעם')}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Contradictory constraints', 'אילוצים סותרים')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('buried conflicting rules that only surface under specific inputs', 'כללים סותרים קבורים שצפים רק בקלטים ספציפיים')}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Format drift', 'סחיפת פורמט')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('the model slowly wanders from the requested schema over a long conversation', 'המודל נודד בהדרגה מהסכימה המבוקשת לאורך שיחה ארוכה')}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
              {t('Context overload', 'עומס הקשר')}
            </div>
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t('burying the actual instruction under too much reference material', 'קבירת ההנחיה בפועל תחת יותר מדי חומר רקע')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Prompt Engineering for Testers', 'הנדסת פרומפטים לבודקים')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 11 of 18', 'שקופית 11 מתוך 18')}</span>
        </div>
      </div>
    </div>
  );
}
