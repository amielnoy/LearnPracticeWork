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
  gridTemplateColumns: '2fr 3fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

const codePanel: React.CSSProperties = {
  background: '#0F172A',
  borderRadius: '1vw',
  border: '1px solid #1E293B',
  padding: '3vh 2.4vw',
  fontFamily: "'SFMono-Regular', Menlo, Consolas, monospace",
  color: '#E2E8F0',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.8vh',
  boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
  justifyContent: 'center',
};

export default function CursorForTests() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Tool', 'כלי')}
        </div>
        <h1 style={{ fontSize: '2.8vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {t('Cursor for Test Generation', 'Cursor ליצירת בדיקות')}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('@file references pull multiple source files into the prompt simultaneously', 'הפניות @file מושכות מספר קבצי מקור לפרומפט בו-זמנית')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Composer mode generates complete test files, not just snippets', 'מצב Composer מייצר קבצי בדיקות מלאים, לא רק קטעים')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('@codebase lets Cursor retrieve relevant context from the entire repo', '@codebase מאפשר ל-Cursor לאחזר הקשר רלוונטי מכל ה-repo')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#0D9488', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
              {t('Use .cursorrules to define project-wide test conventions once', 'השתמש ב-.cursorrules כדי להגדיר מוסכמות בדיקות רחבות-פרויקט פעם אחת')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={codePanel}>
          <div style={{ fontSize: '0.85vw', fontWeight: 700, letterSpacing: '0.08em', color: '#38BDF8' }}>.cursorrules SNIPPET</div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ fontSize: '1.05vw', lineHeight: 1.65, color: '#94A3B8' }}>
            {'# Test generation rules'}
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.65, color: '#E2E8F0' }}>
            {'- Use vitest with @testing-library/react'}
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.65, color: '#E2E8F0' }}>
            {'- Mock external services at the module level'}
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.65, color: '#E2E8F0' }}>
            {'- Use describe/it blocks, not test()'}
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.65, color: '#E2E8F0' }}>
            {'- Generate one test file per source file'}
          </div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.65, color: '#E2E8F0' }}>
            {'- Add data-testid to any new element'}
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ fontSize: '0.85vw', fontWeight: 700, letterSpacing: '0.08em', color: '#FBBF24' }}>WHY THIS MATTERS</div>
          <div style={{ fontSize: '1.05vw', lineHeight: 1.65, color: '#E2E8F0' }}>
            {t('Rules are injected into every test-generation prompt, eliminating framework drift across 50+ generated files.', 'כללים מוזרקים לכל פרומפט יצירת בדיקות, ומבטלים סטייה בפריימוורק בין 50+ קבצים שנוצרו.')}
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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 15 of 40', 'שקופית 15 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
