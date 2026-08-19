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
          <div>{t('EVALUATION FRAMEWORKS', 'מסגרות הערכה')}</div>
          <div>{t('LECTURE 03', 'הרצאה 03')}</div>
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
          {t('Semantic Similarity', 'דמיון סמנטי')}
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
          {t('How Semantic Similarity Scoring Works', 'כיצד פועל ציון הדמיון הסמנטי')}
        </h1>
        <p
          style={{
            fontSize: '1.2vw',
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
          }}
        >
          {t(
            'Embeddings convert text into a high-dimensional vector. Cosine similarity then measures the angle between two vectors — texts with similar meaning cluster close together.',
            'הטמעות ממירות טקסט לוקטור רב-ממדי. דמיון קוסינוס מודד את הזווית בין שני וקטורים — טקסטים בעלי משמעות דומה מקובצים זה לצד זה.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Step 1 — Embed', 'שלב 1 — הטמעה')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Pass both the model output and the reference answer through an embedding model. Each becomes a dense float vector.',
                'העבר גם את פלט המודל וגם את התשובה הייחוסית דרך מודל הטמעה. כל אחת הופכת לוקטור צף צפוף.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Step 2 — Measure Cosine Distance', 'שלב 2 — מדידת מרחק קוסינוס')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'cos(θ) = (A · B) / (‖A‖ · ‖B‖). Score range: −1 to 1. In practice, semantically related texts score above 0.8.',
                'cos(θ) = (A · B) / (‖A‖ · ‖B‖). טווח ציון: −1 עד 1. בפועל, טקסטים קשורים סמנטית מקבלים מעל 0.8.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('Step 3 — Apply a Threshold', 'שלב 3 — החלת סף')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Score ≥ threshold → PASS. Score < threshold → FAIL. The threshold is a tunable hyperparameter, not a universal constant.',
                'ציון ≥ סף ← עבר. ציון < סף ← נכשל. הסף הוא היפר-פרמטר כוונן, לא קבוע אוניברסלי.',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — diagram */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
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
              fontSize: '1.3vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '1.5vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('Conceptual Vector Space', 'מרחב וקטורי רעיוני')}
          </div>

          {/* Vector space diagram */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '22vh',
              background: 'rgba(13,148,136,0.04)',
              borderRadius: '0.8vw',
              border: '1px solid #E2E8F0',
            }}
          >
            {/* Origin */}
            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                left: isHe ? 'auto' : '10%',
                right: isHe ? '10%' : 'auto',
                width: '1vw',
                height: '1vw',
                borderRadius: '50%',
                background: '#CBD5E1',
              }}
            />
            {/* Vector A */}
            <div
              style={{
                position: 'absolute',
                bottom: '25%',
                left: isHe ? 'auto' : '28%',
                right: isHe ? '28%' : 'auto',
                width: '2.5vw',
                height: '2.5vw',
                borderRadius: '50%',
                background: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75vw',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              A
            </div>
            {/* Vector B (close) */}
            <div
              style={{
                position: 'absolute',
                bottom: '45%',
                left: isHe ? 'auto' : '38%',
                right: isHe ? '38%' : 'auto',
                width: '2.5vw',
                height: '2.5vw',
                borderRadius: '50%',
                background: '#0D9488',
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75vw',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              B
            </div>
            {/* Vector C (far) */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                right: isHe ? 'auto' : '15%',
                left: isHe ? '15%' : 'auto',
                width: '2.5vw',
                height: '2.5vw',
                borderRadius: '50%',
                background: '#DC2626',
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75vw',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              C
            </div>
            {/* Labels */}
            <div style={{ position: 'absolute', bottom: '5%', left: isHe ? 'auto' : '5%', right: isHe ? '5%' : 'auto', fontSize: '0.8vw', color: '#64748B' }}>
              {t('A & B: similar meaning (cos ≈ 0.92)', 'A ו-B: משמעות דומה (cos ≈ 0.92)')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1vw', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                fontSize: '0.95vw',
                color: '#0D9488',
                fontWeight: 600,
              }}
            >
              <div style={{ width: '1vw', height: '1vw', borderRadius: '50%', background: '#0D9488' }} />
              {t('High similarity (PASS)', 'דמיון גבוה (עבר)')}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                fontSize: '0.95vw',
                color: '#DC2626',
                fontWeight: 600,
              }}
            >
              <div style={{ width: '1vw', height: '1vw', borderRadius: '50%', background: '#DC2626' }} />
              {t('Low similarity (FAIL)', 'דמיון נמוך (נכשל)')}
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
        <div>{t('Testing LLM Outputs', 'בדיקת פלטי LLM')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 7 of 30', 'שקופית 7 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
