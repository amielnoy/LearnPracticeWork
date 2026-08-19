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
  gridTemplateRows: 'auto auto 1fr auto',
  gap: '3vh 4vw',
  color: '#1E3A5F',
};

export default function OutputFiltering() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('SECURITY TESTING', 'בדיקות אבטחה')}</div>
          <div>{t('LECTURE 07', 'הרצאה 07')}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn: '1 / -1', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '0.8vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Output Safety', 'בטיחות פלט')}
        </div>
        <h1 style={{ fontSize: '3vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Testing Output Filtering Layers', 'בדיקת שכבות סינון פלט')}
        </h1>
      </div>

      {/* Left: Pipeline */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Filtering Pipeline', 'צינור סינון')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2.5vw', height: '2.5vw', background: '#1E3A5F', borderRadius: '0.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw', fontWeight: 700, color: '#fff' }}>1</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('LLM generates raw response', 'LLM יוצר תגובה גולמית')}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '0.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw', fontWeight: 700, color: '#fff' }}>2</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Regex PII scrubber removes emails, phones, SSNs', 'מסנן PII של Regex מסיר אימיילים, טלפונים, מספרי ביטוח לאומי')}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '0.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw', fontWeight: 700, color: '#fff' }}>3</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Content moderation API checks for policy violations', 'API לבקרת תוכן בודק הפרות מדיניות')}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <div style={{ minWidth: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '0.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw', fontWeight: 700, color: '#fff' }}>4</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Filtered response returned to user', 'תגובה מסוננת מוחזרת למשתמש')}</div>
          </div>
        </div>
      </div>

      {/* Right: Test matrix */}
      <div style={{ background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', padding: '3vh 2.5vw', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)', display: 'flex', flexDirection: 'column', gap: '2vh', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh' }}>
          {t('Filter Test Matrix', 'מטריצת בדיקת סינון')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1vh 1vw', alignItems: 'center' }}>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B' }}>{t('Input', 'קלט')}</div>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B' }}>{t('Expected', 'צפוי')}</div>
          <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B' }}>{t('Check', 'בדיקה')}</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('Response with email', 'תגובה עם אימייל')}</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('[REDACTED]', '[מוסתר]')}</div>
          <div style={{ fontSize: '1vw', color: '#059669', fontWeight: 600 }}>PASS</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('Response with phone', 'תגובה עם טלפון')}</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('[REDACTED]', '[מוסתר]')}</div>
          <div style={{ fontSize: '1vw', color: '#059669', fontWeight: 600 }}>PASS</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('Clean response', 'תגובה נקייה')}</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('Unchanged', 'ללא שינוי')}</div>
          <div style={{ fontSize: '1vw', color: '#059669', fontWeight: 600 }}>PASS</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('Encoded PII (base64)', 'PII מקודד (base64)')}</div>
          <div style={{ fontSize: '1vw', color: '#1E3A5F' }}>{t('[REDACTED]', '[מוסתר]')}</div>
          <div style={{ fontSize: '1vw', color: '#DC2626', fontWeight: 600 }}>FAIL</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 18 of 40', 'שקופית 18 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
