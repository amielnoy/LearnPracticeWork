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

export default function NonDeterminismInPractice() {
  const responses = [
    {
      label: t('Response A', 'תגובה א׳'),
      text: t(
        '"The Eiffel Tower stands 330 metres tall and was completed in 1889."',
        '"מגדל אייפל עומד על גובה 330 מטר והושלם בשנת 1889."',
      ),
    },
    {
      label: t('Response B', 'תגובה ב׳'),
      text: t(
        '"At 330 m, the Eiffel Tower was finished in 1889 and remains a Parisian landmark."',
        '"בגובה 330 מ׳, מגדל אייפל הושלם ב-1889 ונשאר אתר תיירותי פריזאי."',
      ),
    },
    {
      label: t('Response C', 'תגובה ג׳'),
      text: t(
        '"Gustave Eiffel\'s tower, opened in 1889, reaches a height of approximately 330 metres."',
        '"המגדל של גוסטב אייפל, שנפתח ב-1889, מגיע לגובה של כ-330 מטר."',
      ),
    },
  ];

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
          {t('The Non-Determinism Problem', 'בעיית האי-דטרמיניזם')}
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
          {t('Same Prompt, Different Words', 'אותה הנחיה, מילים שונות')}
        </h1>
        <p
          style={{
            fontSize: '1.2vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 3vh 0',
            lineHeight: 1.6,
          }}
        >
          {t(
            'Ask the same question three times and you get three perfectly correct — yet differently worded — answers. Exact-string comparison would fail two of them.',
            'שאל אותה שאלה שלוש פעמים ותקבל שלוש תשובות נכונות לחלוטין — אך מנוסחות שונות. השוואת מחרוזות מדויקת תיכשל בשתיים מהן.',
          )}
        </p>

        {/* Prompt box */}
        <div
          style={{
            background: '#0D1B2A',
            borderRadius: '0.8vw',
            padding: '2vh 2vw',
            marginBottom: '2vh',
          }}
        >
          <div
            style={{ fontSize: '0.9vw', color: '#64748B', marginBottom: '0.8vh', fontWeight: 600 }}
          >
            {t('PROMPT', 'הנחיה')}
          </div>
          <div
            style={{
              fontSize: '1.1vw',
              color: '#E2E8F0',
              fontFamily: 'monospace',
              direction: 'ltr',
              textAlign: 'left',
              lineHeight: 1.5,
            }}
          >
            {t(
              '"How tall is the Eiffel Tower and when was it built?"',
              '"מה גובה מגדל אייפל ומתי הוא נבנה?"',
            )}
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '1vw',
            padding: '2vh 2vw',
            fontSize: '1vw',
            color: '#64748B',
            lineHeight: 1.5,
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
          }}
        >
          💡{' '}
          {t(
            'All three responses are factually correct. String matching passes only 1 of 3. Semantic similarity passes all 3.',
            'כל שלוש התגובות נכונות עובדתית. התאמת מחרוזות עוברת רק 1 מתוך 3. דמיון סמנטי עובר את כל 3.',
          )}
        </div>
      </div>

      {/* Right column */}
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2vh' }}
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
          {t('Three Valid Responses', 'שלוש תגובות תקפות')}
        </div>
        {responses.map((r, i) => (
          <div
            key={i}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '1vw',
              padding: '2vh 2vw',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontSize: '0.9vw',
                fontWeight: 700,
                color: '#0D9488',
                marginBottom: '1vh',
                textTransform: isHe ? 'none' : 'uppercase',
              }}
            >
              {r.label}
            </div>
            <div
              style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.5, fontStyle: 'italic' }}
            >
              {r.text}
            </div>
            <div style={{ display: 'flex', gap: '1vw', marginTop: '1vh', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.85vw',
                  color: '#DC2626',
                  backgroundColor: 'rgba(220,38,38,0.08)',
                  padding: '0.3vh 0.7vw',
                  borderRadius: '0.4vw',
                  fontWeight: 600,
                }}
              >
                {i === 0
                  ? t('✔ Exact match passes', '✔ התאמה מדויקת עוברת')
                  : t('✘ Exact match fails', '✘ התאמה מדויקת נכשלת')}
              </span>
              <span
                style={{
                  fontSize: '0.85vw',
                  color: '#0D9488',
                  backgroundColor: 'rgba(13,148,136,0.1)',
                  padding: '0.3vh 0.7vw',
                  borderRadius: '0.4vw',
                  fontWeight: 600,
                }}
              >
                {t('✔ Semantic passes', '✔ סמנטי עובר')}
              </span>
            </div>
          </div>
        ))}
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
          <span>{t('Slide 6 of 30', 'שקופית 6 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
