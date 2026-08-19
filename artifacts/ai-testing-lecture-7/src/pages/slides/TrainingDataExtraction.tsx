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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function TrainingDataExtraction() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Data Leakage', 'דליפת נתונים')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Training Data Extraction Attacks', 'מתקפות חילוץ נתוני אימון')}
        </h1>
      </div>

      {/* Left */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Attack Pattern', 'תבנית המתקפה')}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.6 }}>
          {t(
            'Memorisation attacks prompt the model to complete partial text it saw during training, potentially surfacing private emails, code, or documents.',
            'מתקפות שינון מבקשות מהמודל להשלים טקסט חלקי שראה במהלך האימון, ועשויות לחשוף אימיילים פרטיים, קוד או מסמכים.',
          )}
        </div>
        <div
          style={{
            background: '#0F172A',
            borderRadius: '0.6vw',
            padding: '1.5vh 1.5vw',
            fontFamily: "'SFMono-Regular', Consolas, monospace",
            fontSize: '1vw',
            color: '#F87171',
            lineHeight: 1.6,
          }}
        >
          {t(
            '"Complete the following: \'From: alice@company.com\'"',
            '"השלם את הבא: \'From: alice@company.com\'"',
          )}
        </div>
        <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
          {t(
            'Verbatim extraction: ask the model to repeat large amounts of text until memorised training data surfaces.',
            'חילוץ מילולי: בקש מהמודל לחזור על כמויות גדולות של טקסט עד שנתוני האימון השנונים מגיחים.',
          )}
        </div>
      </div>

      {/* Right */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Test Strategies', 'אסטרטגיות בדיקה')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Plant unique canary strings in fine-tuning data and query for them regularly', 'שתול מחרוזות ייחודיות מלכודת בנתוני fine-tuning ושאל לגביהן באופן קבוע')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Measure memorisation rate: % of canaries returned verbatim over N attempts', 'מדוד שיעור שינון: % של מלכודות שהוחזרו מילה במילה על פני N ניסיונות')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Fail the build if memorisation rate exceeds threshold (e.g. 0.1%)', 'עצור את ה-build אם שיעור השינון חורג מסף (לדוגמה 0.1%)')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Apply differential privacy during fine-tuning to reduce memorisation risk', 'החל פרטיות דיפרנציאלית במהלך fine-tuning להפחתת סיכון שינון')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 16 of 40', 'שקופית 16 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
