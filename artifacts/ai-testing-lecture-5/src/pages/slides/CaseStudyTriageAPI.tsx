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

export default function CaseStudyTriageAPI() {
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
          {t('Case Study', 'מקרה בוחן')}
        </div>
        <h1
          style={{
            fontSize: '3vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Support-Ticket Triage API', 'API לטריאז כרטיסי תמיכה')}
        </h1>
        <p
          style={{
            fontSize: '1.2vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 2vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'A team built an API that calls an LLM to categorize incoming support tickets. Three failures reached production that tests would have caught.',
            'צוות בנה API הקורא ל-LLM לסיווג כרטיסי תמיכה נכנסים. שלוש כשלות הגיעו לייצור שבדיקות היו תופסות.',
          )}
        </p>
        <div
          style={{
            background: '#0F172A',
            borderRadius: '0.8vw',
            padding: '2vh 2vw',
            fontFamily: 'monospace',
            fontSize: '0.9vw',
            lineHeight: 1.7,
            color: '#E2E8F0',
          }}
        >
          <div style={{ color: '#64748B' }}># the endpoint</div>
          <div style={{ color: '#38BDF8' }}>POST /api/triage</div>
          <div style={{ color: '#38BDF8' }}>{'{'} <span style={{ color: '#4ADE80' }}>"ticket_text"</span>: <span style={{ color: '#FBBF24' }}>str</span> {'}'}</div>
          <div style={{ color: '#64748B', marginTop: '0.5vh' }}># expected response</div>
          <div style={{ color: '#38BDF8' }}>{'{'}</div>
          <div style={{ color: '#38BDF8' }}>&nbsp;&nbsp;<span style={{ color: '#4ADE80' }}>"category"</span>: <span style={{ color: '#FBBF24' }}>str</span>,</div>
          <div style={{ color: '#38BDF8' }}>&nbsp;&nbsp;<span style={{ color: '#4ADE80' }}>"priority"</span>: <span style={{ color: '#FBBF24' }}>"high" | "medium" | "low"</span>,</div>
          <div style={{ color: '#38BDF8' }}>&nbsp;&nbsp;<span style={{ color: '#4ADE80' }}>"summary"</span>: <span style={{ color: '#FBBF24' }}>str</span></div>
          <div style={{ color: '#38BDF8' }}>{'}'}</div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}>
        <div
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '1vw',
            padding: '2vh 2vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#DC2626', marginBottom: '0.8vh', textTransform: 'uppercase' }}>
            {t('Failure 1 \u2014 Missing Schema Field', 'כשל 1 \u2014 שדה סכמה חסר')}
          </div>
          <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
            {t(
              'The model occasionally omitted "priority." The frontend read it as undefined and crashed. A required-field schema check on the response would have blocked the deploy.',
              'המודל לעיתים השמיט "priority." הצד הלקוח קרא אותו כ-undefined וקרס. בדיקת שדה נדרש בסכמה על התגובה הייתה חוסמת את הפריסה.',
            )}
          </div>
        </div>
        <div
          style={{
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '1vw',
            padding: '2vh 2vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#D97706', marginBottom: '0.8vh', textTransform: 'uppercase' }}>
            {t('Failure 2 \u2014 Hallucinated Category', 'כשל 2 \u2014 קטגוריה מהלוצינציה')}
          </div>
          <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
            {t(
              'The model invented a category not in the supported enum. Agents routed to it found no queue. An enum check on "category" would have caught this on day one.',
              'המודל המציא קטגוריה שאינה ב-enum הנתמך. סוכנים שהופנו אליה לא מצאו תור. בדיקת enum על "category" הייתה תופסת זאת ביום הראשון.',
            )}
          </div>
        </div>
        <div
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '1vw',
            padding: '2vh 2vw',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '0.9vw', fontWeight: 700, color: '#DC2626', marginBottom: '0.8vh', textTransform: 'uppercase' }}>
            {t('Failure 3 \u2014 Unbudgeted Retry Loop', 'כשל 3 \u2014 לולאת ניסיון חוזר ללא תקציב')}
          </div>
          <div style={{ fontSize: '1vw', color: '#475569', lineHeight: 1.5 }}>
            {t(
              'A 429 triggered an immediate retry loop with no cap. 48 hours of retries cost $2,400 in tokens before anyone noticed. A token budget assertion and retry cap test would have prevented this.',
              '429 הפעיל לולאת ניסיון חוזר מיידי ללא מגבלה. 48 שעות של ניסיונות חוזרים עלו $2,400 בטוקנים לפני שמישהו שם לב. קביעת תקציב טוקן ובדיקת מגבלת ניסיון חוזר היו מונעים זאת.',
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
          <span>{t('Slide 25 of 30', 'שקופית 25 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
