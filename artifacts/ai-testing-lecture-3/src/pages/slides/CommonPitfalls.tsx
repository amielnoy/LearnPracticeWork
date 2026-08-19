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

export default function CommonPitfalls() {
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
          {t('Lessons Learned', 'לקחים שנלמדו')}
        </div>
        <h1
          style={{
            fontSize: '3.6vw',
            fontWeight: 800,
            margin: '0 0 2vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Common Pitfalls to Avoid', 'מלכודות נפוצות שכדאי להימנע מהן')}
        </h1>
        <p
          style={{
            fontSize: '1.3vw',
            fontWeight: 400,
            color: '#475569',
            margin: '0 0 4vh 0',
            lineHeight: 1.6,
            maxWidth: '40vw',
          }}
        >
          {t(
            'Each testing technique carries its own failure mode. Knowing these in advance saves debugging time and prevents false confidence in your test results.',
            'כל טכניקת בדיקה נושאת את כשל המצב שלה. ידיעת אלה מראש חוסכת זמן איתור באגים ומונעת ביטחון כוזב בתוצאות הבדיקות שלכם.',
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
              {t('Over-Trusting Similarity Thresholds', 'אמון יתר בסף דמיון')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A high cosine similarity score does not guarantee semantic equivalence — a wrong number embedded in a fluent sentence can still score well above your threshold.',
                'ציון דמיון קוסינוס גבוה אינו מבטיח שקילות סמנטית — מספר שגוי המוטמע במשפט שוטף יכול עדיין לקבל ציון גבוה מעל הסף שלכם.',
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
              {t('Treating the Factuality Checker as Ground Truth', 'התייחסות לבודק העובדתיות כאמת מוחלטת')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'An NLI model or verifier LLM is itself fallible. Without periodic human spot-checks, its errors accumulate and silently corrupt your accuracy metrics.',
                'מודל NLI או LLM מאמת הם עצמם עלולים לטעות. ללא בדיקות מדגם אנושיות תקופתיות, שגיאותיהם מצטברות ופוגמות בשקט במדדי הדיוק שלכם.',
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
              {t('Schema Valid but Semantically Wrong Values', 'ערכים תקפים מבחינת סכמה אך שגויים סמנטית')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'A schema that passes does not mean the values inside it are correct. A valid price field set to 0.0 or a valid status field set to "pending" when "completed" is expected will not fail schema validation.',
                'סכמה שעוברת אינה אומרת שהערכים בתוכה נכונים. שדה מחיר תקף שמוגדר ל-0.0 או שדה סטטוס תקף שמוגדר ל-"pending" כאשר "completed" צפוי לא ייכשל באימות סכמה.',
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
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '3vh',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '1.5vw',
              fontWeight: 700,
              color: '#1E3A5F',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '2vh',
              textAlign: isHe ? 'right' : 'left',
            }}
          >
            {t('A Quick Self-Check', 'בדיקה עצמית מהירה')}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0.5vw',
                top: '2vh',
                bottom: '2vh',
                width: '2px',
                backgroundColor: '#E2E8F0',
              }}
            />
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Have you calibrated your similarity threshold on real failure cases?',
                  'האם כיילתם את סף הדמיון שלכם על מקרי כשל אמיתיים?',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  "When did someone last spot-check the factuality checker\u2019s verdicts?",
                  'מתי מישהו עשה לאחרונה בדיקת מדגם של פסיקות בודק העובדתיות?',
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '2vw',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '1vw',
                  height: '1vw',
                  backgroundColor: '#0D9488',
                  borderRadius: '50%',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 0 0 1px #E2E8F0',
                }}
              />
              <div style={{ fontSize: '1.1vw', fontWeight: 500, color: '#1E3A5F' }}>
                {t(
                  'Does your schema test also assert sensible value ranges, not just field types?',
                  'האם בדיקת הסכמה שלכם גם מאמתת טווחי ערכים הגיוניים, לא רק סוגי שדות?',
                )}
              </div>
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
          <span>{t('Slide 29 of 30', 'שקופית 29 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
