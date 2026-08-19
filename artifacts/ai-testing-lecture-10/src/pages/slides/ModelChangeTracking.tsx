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

export default function ModelChangeTracking() {
  return (
    <div style={wrap} dir={dir}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI TESTING STRATEGY', 'אסטרטגיית בדיקות AI')}</div>
          <div>{t('LECTURE 10', 'הרצאה 10')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Staying Current', 'הישארות עדכנית')}
        </div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {t('Tracking Model Changes', 'מעקב אחר שינויי מודל')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, margin: '0 0 3vh 0' }}>
          {t(
            'Model providers push updates without warning. A silent model change can shift your scorecard overnight. Build an automatic detection layer.',
            'ספקי מודלים דוחפים עדכונים ללא אזהרה. שינוי מודל שקט יכול לשנות את כרטיס הניקוד שלך בין לילה. בנה שכבת זיהוי אוטומטית.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>{t('Version fingerprint test', 'בדיקת טביעת אצבע גרסה')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('Probe the model with a fixed input daily. Store the response hash in Supabase. Alert on hash change.', 'בדוק את המודל עם קלט קבוע מדי יום. אחסן את hash התגובה ב-Supabase. התרה על שינוי hash.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>{t('Canary eval on model upgrade', 'הערכת קנרי על שדרוג מודל')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('When a version change is detected, immediately trigger the full nightly suite against the new model version before promoting it.', 'כאשר מזוהה שינוי גרסה, הפעל מיד את החבילה המלאה הלילית מול גרסת המודל החדשה לפני קידומה.')}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '1.8vh 1.5vw', borderRadius: '0.8vw', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '1.05vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.4vh' }}>{t('Regression policy', 'מדיניות רגרסיה')}</div>
            <div style={{ fontSize: '1vw', color: '#475569' }}>{t('If the new model version causes a scorecard drop > 5%, pin to the old version and open a team review ticket.', 'אם גרסת המודל החדשה גורמת לירידת כרטיס ניקוד > 5%, נעל לגרסה הישנה ופתח כרטיס סקירת צוות.')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5vh', boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh', textAlign: isHe ? 'right' : 'left' }}>
            {t('Model change detection flow', 'זרימת זיהוי שינוי מודל')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', position: 'relative' }}>
            <div style={{ position: 'absolute', [isHe ? 'right' : 'left']: '0.5vw', top: '2vh', bottom: '2vh', width: '2px', backgroundColor: '#E2E8F0' } as React.CSSProperties} />
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Daily cron probes the model', 'קרון יומי בודק את המודל')}</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Response hash compared to last stored value', 'hash תגובה מושווה לערך האחרון שאוחסן')}</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#FBBF24', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Hash differs: trigger canary eval', 'hash שונה: הפעל הערכת קנרי')}</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Canary passes: promote to production, log change', 'קנרי עובר: קדם לייצור, רשום שינוי')}</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#DC2626', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.1vw', color: '#1E3A5F' }}>{t('Canary fails: pin old version, open review ticket', 'קנרי נכשל: נעל גרסה ישנה, פתח כרטיס סקירה')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>{t('Building an AI Testing Strategy', 'בניית אסטרטגיית בדיקות AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 26 of 40', 'שקופית 26 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
