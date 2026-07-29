const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};
const card: React.CSSProperties = {
  display: 'flex', gap: '1.5vw', alignItems: 'flex-start', background: '#FFFFFF', padding: '2vh 2vw',
  borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
};
const badge: React.CSSProperties = {
  fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', backgroundColor: 'rgba(13, 148, 136, 0.1)',
  width: '3vw', height: '3vw', minWidth: '3vw', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
};

export default function BuildingFirstTestSuite() {
  return (
    <div style={wrap}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>PRACTICAL TOOLKIT</div>
          <div>LECTURE 01</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hands-On</div>
        <h1 style={{ fontSize: '3.4vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Building Your First AI Test Suite</h1>
        <p style={{ fontSize: '1.3vw', fontWeight: 400, color: '#475569', margin: '0 0 4vh 0', lineHeight: 1.6, maxWidth: '40vw' }}>
          You don&apos;t need a mature pipeline to start. A few deliberate steps get a first, useful test suite running this week.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div style={card}>
            <div style={badge}>1</div>
            <div>
              <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>Define Expected Behavior</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>Write down what a &quot;good&quot; answer looks like before automating anything.</div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>2</div>
            <div>
              <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>Assemble a Small Golden Set</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>Ten to twenty real examples beat a hundred synthetic ones.</div>
            </div>
          </div>
          <div style={card}>
            <div style={badge}>3</div>
            <div>
              <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '0.5vh' }}>Automate the First Pass</div>
              <div style={{ fontSize: '1vw', color: '#64748B', lineHeight: 1.4 }}>Wire up similarity or rule-based checks before reaching for an LLM judge.</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '4vh 3vw', borderRadius: '1vw', border: '1px solid #E2E8F0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3vh', boxSizing: 'border-box', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ fontSize: '1.5vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>Then Keep Going</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '0.5vw', top: '2vh', bottom: '2vh', width: '2px', backgroundColor: '#E2E8F0' }} />
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>Add LLM-as-judge for nuance</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>Wire results into CI</div>
            </div>
            <div style={{ display: 'flex', gap: '2vw', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#0D9488', borderRadius: '50%', border: '4px solid #FFFFFF', boxShadow: '0 0 0 1px #E2E8F0' }} />
              <div style={{ fontSize: '1.15vw', fontWeight: 500, color: '#1E3A5F' }}>Review failures weekly, not just at launch</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>Introduction to AI Testing</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>Slide 16 of 19</span>
        </div>
      </div>
    </div>
  );
}
