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
  gap: '3vh',
  color: '#1E3A5F',
};

export default function Section2Recap() {
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
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: isHe ? 'right' : 'left' }}>
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
            {t('Section 2 Recap', 'סיכום חלק 2')}
          </div>
          <h1
            style={{
              fontSize: '3vw',
              fontWeight: 800,
              margin: '0 0 0.5vh 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('Tooling in Practice', 'כלים בפועל')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '2px solid rgba(13,148,136,0.3)',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              1
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Pick the right tool', 'בחר את הכלי הנכון')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Copilot for inline, Cursor for multi-file, custom pipelines for repo-wide automation.',
                'Copilot ל-inline, Cursor לרב-קבצים, צינורות מותאמים אישית לאוטומציה ברמת ה-repo.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '2px solid rgba(13,148,136,0.3)',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              2
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Structured prompts', 'פרומפטים מובנים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Role, framework constraint, output contract, negative constraints — all four per prompt.',
                'תפקיד, אילוץ פריימוורק, חוזה פלט, אילוצים שליליים — כל ארבעה לכל פרומפט.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '3vh 2vw',
              borderRadius: '1vw',
              border: '2px solid rgba(13,148,136,0.3)',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{ fontSize: '3vw', fontWeight: 800, color: '#0D9488', marginBottom: '1vh' }}
            >
              3
            </div>
            <div
              style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '1vh' }}
            >
              {t('Measure acceptance rate', 'מדוד שיעור קבלה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Query Supabase weekly. Declining rate signals a prompt quality or reviewer problem.',
                'שאל Supabase שבועית. ירידה בשיעור מסמנת בעיית איכות פרומפט או בעיה אצל הסוקרים.',
              )}
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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 19 of 40', 'שקופית 19 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
