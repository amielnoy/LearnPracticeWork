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
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

export default function SecurityTestingTeaser() {
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
          <div>{t('SECURITY PREVIEW', 'תצוגה מקדימה — אבטחה')}</div>
          <div>{t('LECTURE 01', 'הרצאה 01')}</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '2vh',
            textTransform: isHe ? 'none' : 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('Coming in the Security Track', 'בקרוב במסלול האבטחה')}
        </div>
        <h1
          style={{
            fontSize: '4vw',
            fontWeight: 800,
            margin: '0 0 2.5vh 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '55vw',
          }}
        >
          {t("Testing Isn't Just About Correctness", 'בדיקות הן לא רק עניין של נכונות')}
        </h1>
        <p
          style={{
            fontSize: '1.4vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 5vh 0',
            lineHeight: 1.5,
            maxWidth: '48vw',
          }}
        >
          {t(
            'Prompt injection, data leakage, and jailbreaks are their own testing discipline — with their own tools and failure modes.',
            'הזרקת פרומפטים, דליפת מידע ו-jailbreaks הם תחום בדיקות בפני עצמו — עם כלים ודפוסי כשל ייחודיים.',
          )}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '4vw',
            padding: '4vh 6vw',
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ textAlign: isHe ? 'right' : 'left' }}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '0.5vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Covered In', 'מכוסה ב')}
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('AI-Powered Basic Cybersecurity', 'אבטחת סייבר בסיסית מבוססת AI')}
            </div>
          </div>
          <div style={{ width: '1px', backgroundColor: '#E2E8F0' }} />
          <div style={{ textAlign: isHe ? 'right' : 'left' }}>
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 600,
                color: '#64748B',
                marginBottom: '0.5vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {t('Starts At', 'מתחיל ב')}
            </div>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>
              {t('Lecture 7', 'הרצאה 7')}
            </div>
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
        <div>{t('Introduction to AI Testing', 'מבוא לבדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 17 of 22', 'שקופית 17 מתוך 22')}</span>
        </div>
      </div>
    </div>
  );
}
