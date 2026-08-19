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

export default function SectionWrapSemantic() {
  return (
    <div style={wrap} dir={dir}>
      {/* Header */}
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', justifyContent: 'center' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#0D9488',
              marginBottom: '0.5vh',
              textTransform: isHe ? 'none' : 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('Section 2 Recap', 'סיכום חלק 2')}
          </div>
          <h1
            style={{
              fontSize: '3.6vw',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Semantic & Quality Assertions', 'קביעות סמנטיות ואיכות')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
              {t('Cosine Similarity', 'דמיון קוסינוס')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Compares meaning, not words. Catches paraphrase variation without failing on valid rephrasing.',
                'משווה משמעות, לא מילים. תופס שינוי ניסוח ללא כישלון על ניסוח מחדש תקף.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
              {t('LLM-as-Judge', 'LLM כשופט')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Evaluates rubric criteria — tone, completeness, relevance — that embedding distance cannot measure.',
                'מעריך קריטריוני רובריקה — טון, שלמות, רלוונטיות — שמרחק הטמעה אינו יכול למדוד.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', marginBottom: '1vh' }}>
              {t('Reference Checks', 'בדיקות הפניות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5 }}>
              {t(
                'Validates that IDs, URLs, and category values the model invented actually exist in your system.',
                'מאמת שמזהים, URLים וערכי קטגוריה שהמודל המציא אכן קיימים במערכת שלכם.',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(13, 148, 136, 0.06)',
            border: '1px solid rgba(13, 148, 136, 0.2)',
            borderRadius: '1vw',
            padding: '2.5vh 3vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', color: '#1E3A5F', lineHeight: 1.6, fontWeight: 500 }}>
            {t(
              'Semantic and judge-based checks catch quality problems that structural schema checks cannot see. Use them together — schema first, then quality.',
              'בדיקות סמנטיות ומבוססות-שופט תופסות בעיות איכות שבדיקות סכמה מבנית אינן יכולות לראות. השתמשו בהן יחד — סכמה ראשונה, ואז איכות.',
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 17 of 30', 'שקופית 17 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
