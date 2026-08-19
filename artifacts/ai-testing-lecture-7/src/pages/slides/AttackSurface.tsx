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

export default function AttackSurface() {
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

      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('The Attack Surface', 'משטח המתקפה')}
        </div>
        <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('LLM Features Expand Your Risk Profile', 'תכונות LLM מרחיבות את פרופיל הסיכון שלכם')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, marginBottom: '3vh' }}>
          {t(
            'Every new LLM endpoint is a new attack vector. The prompt is user-controlled input — and most apps treat it like a trusted configuration file.',
            'כל נקודת קצה חדשה של LLM היא וקטור מתקפה חדש. ה-prompt הוא קלט בשליטת המשתמש — ורוב האפליקציות מתייחסות אליו כמו לקובץ תצורה מהימן.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vh' }}>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('Prompt injection via user messages or tool results', 'הזרקת הנחיות דרך הודעות משתמש או תוצאות כלים')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('PII leakage from training data or RAG retrieval', 'דליפת PII מנתוני אימון או שליפת RAG')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('Over-permissioned tool calls executing unsafe actions', 'קריאות כלים בעלות הרשאת יתר המבצעות פעולות לא בטוחות')}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.2vw', alignItems: 'flex-start' }}>
            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '0.6vw', borderRadius: '50%', backgroundColor: '#DC2626', marginTop: '0.7vw' }} />
            <div style={{ fontSize: '1.2vw', color: '#1E3A5F', lineHeight: 1.5 }}>{t('Unlimited API token spend via crafted inputs', 'הוצאות בלתי מוגבלות של API tokens דרך קלטים מכוונים')}</div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2vh',
          }}
        >
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('Traditional App vs. LLM App', 'אפליקציה מסורתית לעומת אפליקציית LLM')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5vh 2vw' }}>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#64748B', textAlign: isHe ? 'right' : 'left' }}>{t('Traditional', 'מסורתית')}</div>
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0D9488', textAlign: isHe ? 'right' : 'left' }}>{t('LLM-powered', 'מבוססת LLM')}</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Fixed SQL queries', 'שאילתות SQL קבועות')}</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Dynamic prompt construction', 'בניית prompt דינמית')}</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Static output schemas', 'סכמות פלט סטטיות')}</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Unpredictable free text', 'טקסט חופשי בלתי צפוי')}</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Known code paths', 'נתיבי קוד ידועים')}</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Emergent reasoning paths', 'נתיבי הסקה אמרגנטיים')}</div>
            <div style={{ fontSize: '1.1vw', color: '#1E3A5F', lineHeight: 1.4 }}>{t('Bounded resource cost', 'עלות משאבים חסומה')}</div>
            <div style={{ fontSize: '1.1vw', color: '#DC2626', lineHeight: 1.4 }}>{t('Unbounded token spend', 'הוצאות tokens בלתי מוגבלות')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Security Testing for AI', 'בדיקות אבטחה ל-AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 3 of 40', 'שקופית 3 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
