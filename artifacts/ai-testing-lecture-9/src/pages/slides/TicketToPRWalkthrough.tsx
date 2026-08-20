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

export default function TicketToPRWalkthrough() {
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
            {t('Full Walkthrough', 'הדגמה מלאה')}
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
            {t('Ticket to PR: Step by Step', 'מכרטיס ל-PR: שלב אחר שלב')}
          </h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1vw',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              background: '#1E3A5F',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              color: '#FAFBFC',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              01
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 700, marginBottom: '0.5vh' }}>
              {t('Ticket closed', 'כרטיס נסגר')}
            </div>
            <div style={{ fontSize: '0.9vw', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
              {t(
                'Jira/Linear webhook fires pipeline trigger',
                'webhook Jira/Linear מפעיל טריגר צינור',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '3vh',
            }}
          >
            <div style={{ fontSize: '1.5vw', color: '#0D9488', fontWeight: 700 }}>
              {isHe ? '\u2192' : '\u2192'}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              textAlign: isHe ? 'right' : 'left',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              02
            </div>
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Context fetch', 'שליפת הקשר')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Diff, coverage gaps, existing test patterns',
                'Diff, פערי כיסוי, תבניות בדיקות קיימות',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '3vh',
            }}
          >
            <div style={{ fontSize: '1.5vw', color: '#0D9488', fontWeight: 700 }}>{'\u2192'}</div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              textAlign: isHe ? 'right' : 'left',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              03
            </div>
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('AI generates', 'AI מייצר')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'LLM call, JSON output, tests written to branch',
                'קריאת LLM, פלט JSON, בדיקות נכתבות לענף',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '3vh',
            }}
          >
            <div style={{ fontSize: '1.5vw', color: '#0D9488', fontWeight: 700 }}>{'\u2192'}</div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid rgba(13,148,136,0.3)',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              textAlign: isHe ? 'right' : 'left',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              04
            </div>
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Human review', 'סקירה אנושית')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Approve/reject in Supabase dashboard, regen if needed',
                'אשר/דחה בלוח Supabase, יצור מחדש אם נדרש',
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1vw',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              textAlign: isHe ? 'right' : 'left',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              05
            </div>
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('CI runs approved tests', 'CI מריץ בדיקות מאושרות')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                '3x flakiness check, coverage delta computed',
                'בדיקת חוסר יציבות 3x, delta כיסוי מחושב',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '3vh',
            }}
          >
            <div style={{ fontSize: '1.5vw', color: '#0D9488', fontWeight: 700 }}>{'\u2192'}</div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              textAlign: isHe ? 'right' : 'left',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              06
            </div>
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Coverage delta stored', 'delta כיסוי מאוחסן')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Supabase coverage_snapshots row per sprint',
                'שורת coverage_snapshots ב-Supabase לכל ספרינט',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '3vh',
            }}
          >
            <div style={{ fontSize: '1.5vw', color: '#0D9488', fontWeight: 700 }}>{'\u2192'}</div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              textAlign: isHe ? 'right' : 'left',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              07
            </div>
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Merge gate passes', 'שער מיזוג עובר')}
            </div>
            <div style={{ fontSize: '0.9vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Coverage must not regress; all approved tests green',
                'כיסוי לא חייב לרדת; כל בדיקות מאושרות ירוקות',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '3vh',
            }}
          >
            <div style={{ fontSize: '1.5vw', color: '#0D9488', fontWeight: 700 }}>{'\u2192'}</div>
          </div>
          <div
            style={{
              background: '#1E3A5F',
              borderRadius: '0.8vw',
              padding: '2vh 1.2vw',
              color: '#FAFBFC',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '1.8vw',
                fontWeight: 800,
                color: '#0D9488',
                marginBottom: '0.5vh',
              }}
            >
              08
            </div>
            <div style={{ fontSize: '1vw', fontWeight: 700, marginBottom: '0.5vh' }}>
              {t('PR merged', 'PR מוזג')}
            </div>
            <div style={{ fontSize: '0.9vw', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
              {t('Tests permanently part of the suite', 'בדיקות הן חלק קבוע מהחבילה')}
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
          <span>{t('Slide 28 of 40', 'שקופית 28 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
