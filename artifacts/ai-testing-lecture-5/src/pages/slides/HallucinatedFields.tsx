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

export default function HallucinatedFields() {
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
          {t('Guarding Against Hallucinated Fields', 'הגנה מפני שדות מהלוצינציות')}
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
            'Test that any URL, ID, or reference the model includes in a response actually exists in your system before trusting it downstream.',
            'בדקו שכל URL, ID או הפניה שהמודל כולל בתגובה אכן קיימים במערכת שלכם לפני שסומכים עליהם במורד הזרם.',
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
              {t('URL Validation', 'אימות URL')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'If the model returns a documentation link or a product URL, send a HEAD request to confirm the resource exists before passing the response on.',
                'אם המודל מחזיר קישור לתיעוד או URL מוצר, שלחו בקשת HEAD כדי לאשר שהמשאב קיים לפני העברת התגובה.',
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
              {t('ID and Reference Cross-Checks', 'בדיקות הצלבה של ID והפניות')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'When the model references a ticket ID, order number, or user ID, assert that it exists in your database before the response leaves your service.',
                'כאשר המודל מפנה ל-ID כרטיס, מספר הזמנה או ID משתמש, קבעו שהוא קיים במסד הנתונים שלכם לפני שהתגובה עוזבת את השירות.',
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
              {t('Sample-Based Spot Checks', 'בדיקות מדגם מבוססות-מדגם')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Run hallucination checks on a sampled percentage of live traffic and alert when the hallucination rate exceeds a threshold rather than blocking every request.',
                'הריצו בדיקות הלוצינציה על אחוז מדגם של תעבורה חיה והתריעו כשקצב ההלוצינציה חורג מסף במקום לחסום כל בקשה.',
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
            {t('A Reference Existence Check', 'בדיקת קיום הפניה')}
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
              lineHeight: 1.8,
              color: '#E2E8F0',
              flex: 1,
            }}
          >
            <div style={{ color: '#64748B' }}># model returned a category ID</div>
            <div style={{ color: '#38BDF8' }}>
              category_id = response[<span style={{ color: '#4ADE80' }}>"category_id"</span>]
            </div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}># assert it really exists</div>
            <div style={{ color: '#FBBF24' }}>exists = db.categories.find_by_id(category_id)</div>
            <div style={{ color: '#FBBF24' }}>
              assert exists <span style={{ color: '#F87171' }}>is not None</span>, \
            </div>
            <div style={{ color: '#4ADE80' }}>
              &nbsp;&nbsp;f"Hallucinated category: {'{'}category_id{'}'}"
            </div>
            <div style={{ color: '#64748B', marginTop: '0.5vh' }}>
              # also check the URL if present
            </div>
            <div style={{ color: '#FBBF24' }}>
              if <span style={{ color: '#38BDF8' }}>"docs_url"</span> in response:
            </div>
            <div style={{ color: '#FBBF24' }}>
              &nbsp;&nbsp;r = requests.head(response[
              <span style={{ color: '#38BDF8' }}>"docs_url"</span>])
            </div>
            <div style={{ color: '#FBBF24' }}>
              &nbsp;&nbsp;assert r.status_code == <span style={{ color: '#F87171' }}>200</span>
            </div>
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
          <span>{t('Slide 16 of 30', 'שקופית 16 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
