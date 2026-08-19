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

export default function SemanticSimilarityConcept() {
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
          {t('Semantic Similarity Assertions', 'קביעות דמיון סמנטי')}
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
            'When the response is natural-language text, compare its meaning to a reference answer via embedding cosine similarity rather than exact string match.',
            'כאשר התגובה היא טקסט בשפה טבעית, השוו את משמעותה לתשובת ייחוס באמצעות דמיון קוסינוס של הטמעה במקום התאמת מחרוזות מדויקת.',
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
              {t('Why Cosine Similarity', 'מדוע דמיון קוסינוס')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Two responses that say the same thing in different words will produce embeddings that are close in vector space, giving a high cosine similarity score even with zero string overlap.',
                'שתי תגובות שאומרות אותו דבר במילים שונות יפיקו הטמעות קרובות במרחב הווקטורי, ויניבו ציון דמיון קוסינוס גבוה גם ללא חפיפת מחרוזות.',
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
              {t('When to Use This Technique', 'מתי להשתמש בטכניקה זו')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Use semantic similarity for free-text fields: summaries, reply drafts, explanations, and descriptions. Use schema validation for structured data.',
                'השתמשו בדמיון סמנטי עבור שדות טקסט חופשי: סיכומים, טיוטות תגובה, הסברים ותיאורים. השתמשו באימות סכמה עבור נתונים מובנים.',
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
              {t('Setting the Threshold', 'הגדרת הסף')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Calibrate on a labelled set of known-good and known-bad responses. A common starting point is 0.82–0.88 depending on the embedding model.',
                'כיילו על מערך מתויג של תגובות ידועות-טובות וידועות-רעות. נקודת התחלה נפוצה היא 0.82–0.88 בהתאם למודל ההטמעה.',
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
            {t('How It Works', 'כיצד זה עובד')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.95vw',
              lineHeight: 1.8,
              color: '#E2E8F0',
            }}
          >
            <div style={{ color: '#64748B' }}># embed both texts</div>
            <div>
              <span style={{ color: '#38BDF8' }}>ref_vec</span> = embed(
              <span style={{ color: '#4ADE80' }}>"Customer wants a refund"</span>)
            </div>
            <div>
              <span style={{ color: '#38BDF8' }}>got_vec</span> = embed(response[
              <span style={{ color: '#4ADE80' }}>"summary"</span>])
            </div>
            <div style={{ marginTop: '0.5vh', color: '#64748B' }}># compute similarity</div>
            <div>
              <span style={{ color: '#38BDF8' }}>score</span> = cosine_similarity(ref_vec, got_vec)
            </div>
            <div style={{ marginTop: '0.5vh', color: '#64748B' }}># assert above threshold</div>
            <div>
              <span style={{ color: '#FBBF24' }}>assert</span> score &gt;={' '}
              <span style={{ color: '#F87171' }}>0.85</span>
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
              'This test passes whether the model writes "Customer requests refund" or "Client is asking for their money back" — both mean the same thing.',
              'בדיקה זו עוברת בין אם המודל כותב "Customer requests refund" או "Client is asking for their money back" — שניהם אומרים אותו דבר.',
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
          <span>{t('Slide 13 of 30', 'שקופית 13 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
