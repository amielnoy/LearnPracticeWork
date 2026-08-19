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

export default function EnvironmentSecrets() {
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
            style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }}
          />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>
            AI Testing Academy
          </div>
        </div>
        <div
          style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}
        >
          <div>{t('CI/CD PIPELINES', 'צינורות CI/CD')}</div>
          <div>{t('LECTURE 06', 'הרצאה 06')}</div>
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
          {t('Section 1', 'חלק 1')}
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
          {t('API Keys in CI', 'מפתחות API ב-CI')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'Store provider keys as encrypted repository secrets, scope them to the workflow that needs them, and never echo them into logs.',
            'אחסן מפתחות ספק כסודות repository מוצפנים, הגבל scope שלהם לצינור שצריך אותם, ואל תדפיס אותם לעולם ב-logs.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Encrypted repository secrets', 'סודות repository מוצפנים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'GitHub encrypts secrets at rest with Libsodium. The raw value is never written to disk or exposed in workflow logs.',
                'GitHub מצפין סודות בזמן מנוחה עם Libsodium. הערך הגולמי לעולם לא נכתב לדיסק ולא נחשף ב-logs של הצינור.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Scope to the workflow that needs the key', 'הגבל scope לצינור שצריך את המפתח')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'Pass the secret only in the env block of the specific step that needs it, not at the top-level workflow or job level.',
                'העבר את הסוד רק בבלוק env של הצעד הספציפי שצריך אותו, לא ברמת הצינור או המשימה ברמה העליונה.',
              )}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>
              {t('Never echo secrets into logs', 'לעולם לא להדפיס סודות ל-logs')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t(
                'GitHub masks known secrets automatically, but debug log lines can bypass masking if a secret is split across concatenated strings.',
                'GitHub מסתיר סודות ידועים אוטומטית, אך שורות log לניפוי באגים יכולות לעקוף הסתרה אם סוד מפוצל על פני מחרוזות מחוברות.',
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
            gap: '2vh',
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
            {t('Secret Scope Pattern', 'תבנית scope סוד')}
          </div>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '0.8vw',
              padding: '2vh 2vw',
              fontFamily: 'monospace',
              fontSize: '0.85vw',
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#94A3B8' }}>jobs:</div>
            <div style={{ color: '#E2E8F0', paddingLeft: '1.5vw' }}>ai-tests:</div>
            <div style={{ color: '#E2E8F0', paddingLeft: '3vw' }}>steps:</div>
            <div style={{ color: '#94A3B8', paddingLeft: '4.5vw' }}>- name: Run AI test suite</div>
            <div style={{ color: '#FBBF24', paddingLeft: '6vw' }}>env:</div>
            <div style={{ color: '#38BDF8', paddingLeft: '7.5vw' }}>{'OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}'}</div>
            <div style={{ color: '#2DD4BF', paddingLeft: '6vw' }}>run: pytest tests/ai</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh', textAlign: isHe ? 'right' : 'left' }}>
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#0D9488', fontWeight: 700 }}>&#x2192;</span>
              <span>{t('Secret lives only in that step\'s environment', 'הסוד קיים רק בסביבת אותו צעד')}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#64748B' }}>
              <span style={{ color: '#0D9488', fontWeight: 700 }}>&#x2192;</span>
              <span>{t('Other steps in the same job cannot read it', 'צעדים אחרים באותה משימה לא יכולים לקרוא אותו')}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.8vw', fontSize: '1vw', color: '#DC2626' }}>
              <span style={{ fontWeight: 700 }}>&#x2717;</span>
              <span>{t('Never: OPENAI_API_KEY: my-key-here in YAML', 'לעולם לא: OPENAI_API_KEY: my-key-here ב-YAML')}</span>
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
        <div>{t('CI/CD for AI Test Suites', 'CI/CD לחבילות בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 10 of 30', 'שקופית 10 מתוך 30')}</span>
        </div>
      </div>
    </div>
  );
}
