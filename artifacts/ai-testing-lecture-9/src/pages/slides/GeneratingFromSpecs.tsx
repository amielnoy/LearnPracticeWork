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

export default function GeneratingFromSpecs() {
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
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>{t('AI-ASSISTED TEST GENERATION', 'יצירת בדיקות בסיוע AI')}</div>
          <div>{t('LECTURE 09', 'הרצאה 09')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isHe ? 'right' : 'left' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: isHe ? 'none' : 'uppercase', letterSpacing: '0.05em' }}>
          {t('Technique', 'טכניקה')}
        </div>
        <h1 style={{ fontSize: '2.6vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {t('Generating Tests from Specs', 'יצירת בדיקות ממפרטים')}
        </h1>
        <p style={{ fontSize: '1.2vw', color: '#475569', margin: '0 0 3vh 0', lineHeight: 1.6 }}>
          {t(
            'OpenAPI, AsyncAPI, JSON Schema, and Markdown specifications are rich sources of test cases. AI can extract input/output contracts and produce parameterized tests automatically.',
            'OpenAPI, AsyncAPI, JSON Schema ומפרטי Markdown הם מקורות עשירים לתיקי בדיקות. AI יכול לחלץ חוזי קלט/פלט ולייצר בדיקות פרמטריות אוטומטית.',
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('OpenAPI: test every status code', 'OpenAPI: בדיקת כל קוד סטטוס')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('Parse the path spec, enumerate defined response codes, generate one test per code asserting the right shape.', 'פרסר את מפרט הנתיב, ספור קודי תגובה מוגדרים, צור בדיקה אחת לכל קוד המאמתת את הצורה הנכונה.')}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            }}
          >
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>
              {t('JSON Schema: enumerate invalid payloads', 'JSON Schema: ספירת מטענים לא תקינים')}
            </div>
            <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>
              {t('For each required field, generate a test that omits it. For each typed field, generate wrong-type inputs. Boundary values come from minLength, minimum, etc.', 'לכל שדה חובה, צור בדיקה שמשמיטה אותו. לכל שדה עם טיפוס, צור קלטים עם טיפוס שגוי.')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            padding: '3vh 2.5vw',
            height: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30,58,95,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5vh',
            textAlign: isHe ? 'right' : 'left',
          }}
        >
          <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
            {t('Spec-to-Test Pipeline', 'צינור ממפרט לבדיקה')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1vw', fontWeight: 700, flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Fetch spec from source control', 'שליפת מפרט ממאגר קוד')}</div>
                <div style={{ fontSize: '1vw', color: '#64748B' }}>{t('openapi.yaml, asyncapi.yaml, schema.json', 'openapi.yaml, asyncapi.yaml, schema.json')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1vw', fontWeight: 700, flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Parse and extract contracts', 'פרסור וחילוץ חוזים')}</div>
                <div style={{ fontSize: '1vw', color: '#64748B' }}>{t('Endpoints, required fields, types, constraints', 'נקודות קצה, שדות חובה, טיפוסים, אילוצים')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1vw', fontWeight: 700, flexShrink: 0 }}>3</div>
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('AI generates parameterized tests', 'AI מייצר בדיקות פרמטריות')}</div>
                <div style={{ fontSize: '1vw', color: '#64748B' }}>{t('One test file per endpoint or schema object', 'קובץ בדיקה אחד לכל נקודת קצה או אובייקט schema')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '2.5vw', height: '2.5vw', background: '#0D9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1vw', fontWeight: 700, flexShrink: 0 }}>4</div>
              <div>
                <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#1E3A5F' }}>{t('Human review and store to Supabase', 'סקירה אנושית ואחסון ב-Supabase')}</div>
                <div style={{ fontSize: '1vw', color: '#64748B' }}>{t('Approve, reject, or request re-generation', 'אישור, דחייה, או בקשת יצירה מחדש')}</div>
              </div>
            </div>
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
        <div>{t('AI-Assisted Test Generation', 'יצירת בדיקות בסיוע AI')}</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>{t('Slide 8 of 40', 'שקופית 8 מתוך 40')}</span>
        </div>
      </div>
    </div>
  );
}
