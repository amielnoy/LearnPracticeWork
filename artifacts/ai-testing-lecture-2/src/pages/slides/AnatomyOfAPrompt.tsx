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
  gap: '2vw',
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '1vw',
  padding: '2vh 2vw',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

const num: React.CSSProperties = {
  width: '2.6vw',
  height: '2.6vw',
  minWidth: '2.6vw',
  borderRadius: '50%',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  color: '#0D9488',
  fontWeight: 700,
  fontSize: '1.1vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function AnatomyOfAPrompt() {
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
          <div>{t('FOUNDATIONS', 'יסודות')}</div>
          <div>{t('LECTURE 02', 'הרצאה 02')}</div>
        </div>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh', justifyContent: 'center' }}
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
            {t('Foundations', 'יסודות')}
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
            {t('Anatomy of a Prompt', 'האנטומיה של פרומפט')}
          </h1>
        </div>

        <div style={row}>
          <div style={num}>1</div>
          <div style={{ minWidth: '16vw', fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
            {t('System message', 'הודעת מערכת')}
          </div>
          <div style={{ fontSize: '1.15vw', color: '#475569' }}>
            {t('sets role, tone, and hard rules', 'קובעת תפקיד, טון וכללים נוקשים')}
          </div>
        </div>
        <div style={row}>
          <div style={num}>2</div>
          <div style={{ minWidth: '16vw', fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
            {t('Context', 'הקשר')}
          </div>
          <div style={{ fontSize: '1.15vw', color: '#475569' }}>
            {t(
              'the facts and documents the model should use',
              'העובדות והמסמכים שהמודל אמור להשתמש בהם',
            )}
          </div>
        </div>
        <div style={row}>
          <div style={num}>3</div>
          <div style={{ minWidth: '16vw', fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
            {t('Instruction', 'הנחיה')}
          </div>
          <div style={{ fontSize: '1.15vw', color: '#475569' }}>
            {t('the actual task, stated unambiguously', 'המשימה בפועל, מנוסחת חד-משמעית')}
          </div>
        </div>
        <div style={row}>
          <div style={num}>4</div>
          <div style={{ minWidth: '16vw', fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
            {t('Output format spec', 'מפרט פורמט הפלט')}
          </div>
          <div style={{ fontSize: '1.15vw', color: '#475569' }}>
            {t('exact shape of the expected response', 'הצורה המדויקת של התשובה הצפויה')}
          </div>
        </div>
        <div style={row}>
          <div style={num}>5</div>
          <div style={{ minWidth: '16vw', fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>
            {t('Examples (optional)', 'דוגמאות (אופציונלי)')}
          </div>
          <div style={{ fontSize: '1.15vw', color: '#475569' }}>
            {t('show, don\u2019t just tell', 'להראות, לא רק לספר')}
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
          <span>{t('Slide 4 of 21', 'שקופית 4 מתוך 21')}</span>
        </div>
      </div>
    </div>
  );
}
