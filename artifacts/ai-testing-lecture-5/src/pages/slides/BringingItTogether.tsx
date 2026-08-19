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
  display: 'flex',
  gap: '1.5vw',
  alignItems: 'flex-start',
  background: '#FFFFFF',
  padding: '2vh 2vw',
  borderRadius: '1vw',
  border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};
const badge: React.CSSProperties = {
  fontSize: '1.2vw',
  fontWeight: 700,
  color: '#0D9488',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  width: '3vw',
  height: '3vw',
  minWidth: '3vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
};

export default function BringingItTogether() {
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
          {t('Putting It Together', 'איחוד הכל יחד')}
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
          {t('A Full Test Suite for One Endpoint', 'חבילת בדיקות מלאה לנקודת קצה אחת')}
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
            'Layer all three checks together — schema, semantic, and latency/cost — running in CI before every merge.',
            'שכבו את שלוש הבדיקות יחד — סכמה, סמנטיקה, זמן תגובה/עלות — ומריצים ב-CI לפני כל מיזוג.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6vh' }}>
          <div style={card}>
            <div style={badge}>1</div>
            <div>
              <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
                {t('Schema Check', 'בדיקת סכמה')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Gate: jsonschema.validate() passes. Catches missing fields, wrong types, and extra keys.',
                  'שער: jsonschema.validate() עובר. תופס שדות חסרים, סוגים שגויים ומפתחות נוספים.',
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>2</div>
            <div>
              <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
                {t('Semantic / Judge Check', 'בדיקת סמנטיקה / שופט')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Gate: cosine similarity >= threshold or judge score >= threshold. Catches quality and meaning drift.',
                  'שער: דמיון קוסינוס >= סף או ציון שופט >= סף. תופס סחיפת איכות ומשמעות.',
                )}
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>3</div>
            <div>
              <div style={{ fontSize: '1.15vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
                {t('Latency and Cost Check', 'בדיקת זמן תגובה ועלות')}
              </div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
                {t(
                  'Gate: elapsed_ms <= LATENCY_BUDGET and total_tokens <= TOKEN_BUDGET. Protects SLA and spend.',
                  'שער: elapsed_ms <= LATENCY_BUDGET ו-total_tokens <= TOKEN_BUDGET. מגן על SLA והוצאות.',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column — CI summary */}
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
            {t('CI Run Summary', 'סיכום הרצת CI')}
          </div>
          <div
            style={{
              background: '#0D1B2A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.9vw',
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#94A3B8' }}>$ pytest tests/api/test_summarize_endpoint.py</div>
            <div style={{ color: '#E2E8F0', marginTop: '0.5vh' }}>{t('Running 48 test cases...', 'מריץ 48 מקרי בדיקה...')}</div>
            <div style={{ color: '#0D9488' }}>{t('\u2714 Schema        48/48 (100%)   PASS', '\u2714 סכמה          48/48 (100%)   עבר')}</div>
            <div style={{ color: '#0D9488' }}>{t('\u2714 Semantic       46/48 (95.8%)  PASS', '\u2714 סמנטי          46/48 (95.8%)  עבר')}</div>
            <div style={{ color: '#DC2626' }}>{t('\u2718 Latency        38/48 (79.2%)  FAIL', '\u2718 זמן תגובה       38/48 (79.2%)  נכשל')}</div>
            <div style={{ color: '#E2E8F0', marginTop: '0.5vh' }}>{'─'.repeat(30)}</div>
            <div style={{ color: '#DC2626', fontWeight: 700 }}>{t('PIPELINE: BLOCKED', 'צינור: חסום')}</div>
          </div>
          <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.5, textAlign: isHe ? 'right' : 'left' }}>
            {t(
              'The latency check blocked the merge. 10 cases exceeded the 3s budget — traced to a new prompt template added in this PR.',
              'בדיקת זמן התגובה חסמה את המיזוג. 10 מקרים חרגו מתקציב 3s — אותר לתבנית הנחיה חדשה שנוספה ב-PR זה.',
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
          <span>{t('Slide 24 of 30', 'שקופית 24 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
