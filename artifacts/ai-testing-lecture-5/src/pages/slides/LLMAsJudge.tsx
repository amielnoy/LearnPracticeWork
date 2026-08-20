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
  gap: '4vh 4vw',
  color: '#1E3A5F',
};
const card: React.CSSProperties = {
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};

export default function LLMAsJudge() {
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
          <div>{t('API TESTING TRACK', 'מסלול בדיקות API')}</div>
          <div>{t('LECTURE 05', 'הרצאה 05')}</div>
        </div>
      </div>

      {/* Left column */}
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
          {t('Section 2 \u2014 Semantic Assertions', 'חלק 2 \u2014 קביעות סמנטיות')}
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
          {t('LLM-as-Judge for API Responses', 'LLM כשופט לתגובות API')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'Send the response plus a rubric to a second model call, get back a numeric score and reasoning, and gate the test on a threshold.',
            'שלחו את התגובה ורובריקה לקריאת מודל שניה, קבלו בחזרה ציון מספרי ונימוק, ועצרו את הבדיקה בסף.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Why a Second Model', 'מדוע מודל שני')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Embedding similarity measures distance in vector space but cannot evaluate rubric criteria like "Is the tone professional?" or "Does this answer the question asked?"',
                'דמיון הטמעה מודד מרחק במרחב ווקטורי אך אינו יכול להעריך קריטריוני רובריקה כמו "האם הטון מקצועי?" או "האם זה עונה על השאלה שנשאלה?"',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('The Rubric Is the Test', 'הרובריקה היא הבדיקה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Write the rubric as a system prompt. Ask the judge to return a JSON object with a score (0–10) and a one-sentence reason. Parse it with a schema validator.',
                'כתבו את הרובריקה כהנחיית מערכת. בקשו מהשופט להחזיר אובייקט JSON עם ציון (0–10) ונימוק של משפט אחד. נתחו אותו עם מאמת סכמה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div
              style={{
                fontSize: '1.15vw',
                fontWeight: 600,
                color: '#1E3A5F',
                marginBottom: '0.5vh',
              }}
            >
              {t('Cost and Speed Tradeoffs', 'פשרות עלות ומהירות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'LLM-as-judge is slow and expensive. Run it as a nightly check or on a sampled 10% of requests — not on every call in the hot path.',
                'LLM כשופט הוא איטי ויקר. הריצו אותו כבדיקה לילית או על מדגם של 10% מהבקשות — לא על כל קריאה בנתיב החם.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '3vh 2.5vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.2vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Judge Prompt Pattern', 'תבנית הנחיית שופט')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              direction: 'ltr',
              textAlign: 'left',
              fontSize: '0.9vw',
              lineHeight: 1.7,
              color: '#E2E8F0',
              flex: 1,
            }}
          >
            <div style={{ color: '#64748B' }}># system prompt</div>
            <div style={{ color: '#4ADE80' }}>"Rate this support reply on tone (0-10).</div>
            <div style={{ color: '#4ADE80' }}>
              Return JSON: {'{'}\"score\": int, \"reason\": str{'}'}"
            </div>
            <div style={{ color: '#64748B', marginTop: '1vh' }}># user message</div>
            <div style={{ color: '#E2E8F0' }}>
              f"Reply: {'{'}response['reply']{'}'}"
            </div>
            <div style={{ color: '#64748B', marginTop: '1vh' }}># assert on result</div>
            <div style={{ color: '#FBBF24' }}>result = call_judge(system, user)</div>
            <div style={{ color: '#FBBF24' }}>
              assert result[<span style={{ color: '#4ADE80' }}>"score"</span>] &gt;= 7
            </div>
          </div>
          <div
            style={{
              fontSize: '1vw',
              color: '#64748B',
              lineHeight: 1.5,
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t(
              'The judge output itself must be schema-validated before you read the score — a judge that returns unexpected keys or the wrong type will crash the test harness.',
              'פלט השופט עצמו חייב לעבור אימות סכמה לפני שאתם קוראים את הציון — שופט שמחזיר מפתחות בלתי צפויים או סוג שגוי ישבור את מסגרת הבדיקה.',
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
        <div>{t('API Testing with AI Features', 'בדיקות API עם תכונות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 15 of 30', 'שקופית 15 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
