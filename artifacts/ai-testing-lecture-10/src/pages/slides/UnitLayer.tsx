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

export default function UnitLayer() {
  return (
    <div style={wrap} dir={dir}>
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
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

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
          {t('Layer 1', 'שכבה 1')}
        </div>
        <h1
          style={{
            fontSize: '3.4vw',
            fontWeight: 800,
            margin: '0 0 2.5vh 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t('Unit Testing AI Features', 'בדיקות יחידה לתכונות AI')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Unit tests for AI components do not call the live model. They verify the deterministic code around the AI: prompt builders, parsers, validators, and routing logic.',
            'בדיקות יחידה לרכיבי AI לא קוראות למודל החי. הן מאמתות את הקוד הדטרמיניסטי סביב ה-AI: בוני פרומפט, מנתחים, מאמתים ולוגיקת ניתוב.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                flexShrink: 0,
                marginTop: '0.5vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Prompt template renders correctly for all input types',
                'תבנית פרומפט מוצגת נכון לכל סוגי הקלט',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                flexShrink: 0,
                marginTop: '0.5vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Output parser rejects malformed JSON and raises a typed error',
                'מנתח הפלט דוחה JSON פגום ומעלה שגיאה מסוגת',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                flexShrink: 0,
                marginTop: '0.5vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Token-budget guard truncates context before the API limit',
                'שמירת תקציב האסימון קוטעת הקשר לפני מגבלת ה-API',
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                flexShrink: 0,
                marginTop: '0.5vw',
              }}
            />
            <div style={{ fontSize: '1.1vw', color: '#475569', lineHeight: 1.5 }}>
              {t(
                'Retry logic backs off correctly on 429 responses',
                'לוגיקת ניסיון חוזר מאטה נכון בתגובות 429',
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#0F172A',
            borderRadius: '1vw',
            border: '1px solid #1E293B',
            padding: '3vh 2.4vw',
            fontFamily: "'SFMono-Regular', Menlo, Consolas, monospace",
            color: '#E2E8F0',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8vh',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#38BDF8',
            }}
          >
            PYTHON — test_prompt_builder.py
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ fontSize: '1.05vw', lineHeight: 1.7, color: '#94A3B8' }}>
            <span style={{ color: '#7DD3FC' }}>def</span>
            <span style={{ color: '#E2E8F0' }}> test_system_prompt_includes_persona</span>
            <span style={{ color: '#94A3B8' }}>():</span>
          </div>
          <div
            style={{ fontSize: '1.05vw', lineHeight: 1.6, color: '#E2E8F0', paddingLeft: '2vw' }}
          >
            <div>
              <span style={{ color: '#94A3B8' }}> </span>
              <span style={{ color: '#E2E8F0' }}>prompt </span>
              <span style={{ color: '#7DD3FC' }}>=</span>
              <span style={{ color: '#E2E8F0' }}> build_system_prompt(persona</span>
              <span style={{ color: '#7DD3FC' }}>=</span>
              <span style={{ color: '#FCD34D' }}>"support"</span>
              <span style={{ color: '#E2E8F0' }}>)</span>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}> </span>
              <span style={{ color: '#7DD3FC' }}>assert</span>
              <span style={{ color: '#E2E8F0' }}> </span>
              <span style={{ color: '#FCD34D' }}>"customer support"</span>
              <span style={{ color: '#E2E8F0' }}> in prompt.lower()</span>
            </div>
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ fontSize: '1.05vw', lineHeight: 1.7, color: '#94A3B8' }}>
            <span style={{ color: '#7DD3FC' }}>def</span>
            <span style={{ color: '#E2E8F0' }}> test_token_guard_truncates</span>
            <span style={{ color: '#94A3B8' }}>():</span>
          </div>
          <div
            style={{ fontSize: '1.05vw', lineHeight: 1.6, color: '#E2E8F0', paddingLeft: '2vw' }}
          >
            <div>
              <span style={{ color: '#E2E8F0' }}> long_ctx </span>
              <span style={{ color: '#7DD3FC' }}>=</span>
              <span style={{ color: '#FCD34D' }}> "x" </span>
              <span style={{ color: '#7DD3FC' }}>*</span>
              <span style={{ color: '#FBBF24' }}> 10_000</span>
            </div>
            <div>
              <span style={{ color: '#E2E8F0' }}> safe </span>
              <span style={{ color: '#7DD3FC' }}>=</span>
              <span style={{ color: '#E2E8F0' }}> truncate_to_budget(long_ctx, max_tokens</span>
              <span style={{ color: '#7DD3FC' }}>=</span>
              <span style={{ color: '#FBBF24' }}>4096</span>
              <span style={{ color: '#E2E8F0' }}>)</span>
            </div>
            <div>
              <span style={{ color: '#7DD3FC' }}> assert</span>
              <span style={{ color: '#E2E8F0' }}> count_tokens(safe) </span>
              <span style={{ color: '#7DD3FC' }}>&lt;=</span>
              <span style={{ color: '#FBBF24' }}> 4096</span>
            </div>
          </div>
          <div style={{ height: '1px', background: '#1E293B' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
            <span
              style={{
                background: '#059669',
                color: '#fff',
                borderRadius: '0.4vw',
                padding: '0.5vh 1vw',
                fontSize: '0.95vw',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              PASS
            </span>
            <span style={{ fontSize: '0.95vw', color: '#94A3B8' }}>
              {t('No API calls — runs in milliseconds', 'אין קריאות API — רץ במילישניות')}
            </span>
          </div>
        </div>
      </div>

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
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 8 of 40', 'שקופית 8 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
