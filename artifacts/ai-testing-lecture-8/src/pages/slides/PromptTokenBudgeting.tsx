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
  gridTemplateRows: 'auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function PromptTokenBudgeting() {
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
          <div>{t('PERFORMANCE TESTING', 'בדיקות ביצועים')}</div>
          <div>{t('LECTURE 08', 'הרצאה 08')}</div>
        </div>
      </div>

      {/* Left */}
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
          {t('Controlling Input Cost', 'שליטה בעלות קלט')}
        </div>
        <h1
          style={{
            fontSize: '3.2vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Prompt Token Budgeting', 'תקצוב טוקני פרומפט')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 2.5vh 0' }}>
          {t(
            'Your system prompt runs on every single request. A 500-token system prompt at 10,000 daily calls costs the same as 5 million output tokens. Audit it.',
            'פרומפט המערכת שלך פועל בכל בקשה בודדת. פרומפט מערכת של 500 טוקנים ב-10,000 קריאות יומיות עולה כמו 5 מיליון טוקני פלט. בדוק אותו.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Set a max_tokens output cap', 'הגדר תקרת max_tokens לפלט')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Prevents runaway completions on ambiguous prompts. Trade off against truncation risk.',
                'מונע השלמות יוצאות משליטה בפרומפטים מעורפלים. פשרה מול סיכון קיצוץ.',
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Truncate context windows deliberately', 'קצץ חלונות הקשר במכוון')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Keep only the last N turns of chat history. Sliding window or summarization.',
                "שמור רק את N הסיבובים האחרונים של היסטוריית הצ'אט. חלון הזזה או סיכום.",
              )}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.3vw 1vw rgba(30,58,95,0.05)',
            }}
          >
            <div
              style={{ fontSize: '1vw', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5vh' }}
            >
              {t('Audit system prompt quarterly', 'בדוק פרומפט מערכת רבעונית')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Stale instructions accumulate. Remove rules that no longer apply.',
                'הוראות מיושנות מצטברות. הסר כללים שאינם חלים עוד.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1vw',
              fontWeight: 700,
              color: '#64748B',
              marginBottom: '2vh',
              textTransform: isHe ? 'none' : 'uppercase',
            }}
          >
            {t('Token Budget Example', 'דוגמת תקציב טוקנים')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '10vw' }}>
                {t('System prompt', 'פרומפט מערכת')}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '30%',
                    height: '100%',
                    background: '#1E3A5F',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#1E3A5F',
                  fontWeight: 600,
                  width: '4vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                480 tk
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '10vw' }}>
                {t('Chat history', "היסטוריית צ'אט")}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '55%',
                    height: '100%',
                    background: '#475569',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#1E3A5F',
                  fontWeight: 600,
                  width: '4vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                880 tk
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.95vw', color: '#64748B', width: '10vw' }}>
                {t('User message', 'הודעת משתמש')}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '8%',
                    height: '100%',
                    background: '#0D9488',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#1E3A5F',
                  fontWeight: 600,
                  width: '4vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                120 tk
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1.5vh',
                borderTop: '2px solid #E2E8F0',
              }}
            >
              <div style={{ fontSize: '0.95vw', fontWeight: 700, color: '#1E3A5F', width: '10vw' }}>
                {t('Total input', 'קלט כולל')}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '2.5vh',
                  background: '#E2E8F0',
                  borderRadius: '0.4vw',
                  position: 'relative',
                  margin: '0 1vw',
                }}
              >
                <div
                  style={{
                    width: '93%',
                    height: '100%',
                    background: '#DC2626',
                    borderRadius: '0.4vw',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.95vw',
                  color: '#DC2626',
                  fontWeight: 700,
                  width: '4vw',
                  textAlign: isHe ? 'left' : 'right',
                }}
              >
                1,480 tk
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            background: 'rgba(13,148,136,0.08)',
            borderRadius: '0.8vw',
            padding: '2vh 2vw',
            border: '1px solid rgba(13,148,136,0.2)',
          }}
        >
          <div style={{ fontSize: '1vw', color: '#1E3A5F', lineHeight: 1.5 }}>
            {t(
              'The system prompt here is 32% of total input cost. A 50% trim saves $0.001 per request — meaningful at scale.',
              'פרומפט המערכת כאן הוא 32% מעלות הקלט הכוללת. קיצוץ של 50% חוסך $0.001 לבקשה — משמעותי בהיקף גדול.',
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
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
        <div>{t('Performance Testing AI Features', 'בדיקות ביצועים לתכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 20 of 40', 'שקופית 20 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
