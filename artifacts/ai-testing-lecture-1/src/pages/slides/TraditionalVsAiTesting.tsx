const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};
const panel: React.CSSProperties = {
  background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  padding: '4vh 3vw', display: 'flex', flexDirection: 'column', gap: '2.4vh',
};
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '1vw', fontSize: '1.2vw', color: '#334155' };
const dot: React.CSSProperties = { width: '0.7vw', height: '0.7vw', borderRadius: '50%', backgroundColor: '#0D9488', flexShrink: 0 };

export default function TraditionalVsAiTesting() {
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>FOUNDATIONS</div>
          <div>LECTURE 01</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: 'uppercase', letterSpacing: '0.05em' }}>A Different Kind of Testing</div>
          <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Traditional Testing vs. AI Testing</h1>
        </div>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3vw' }}>
          <div style={panel}>
            <div style={{ fontSize: '1.4vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.6vh' }}>Traditional Software Testing</div>
            <div style={row}><span style={dot} />Deterministic inputs map to fixed outputs</div>
            <div style={row}><span style={dot} />Pass/fail assertions decide the result</div>
            <div style={row}><span style={dot} />Coverage is measured in lines of code</div>
          </div>
          <div style={panel}>
            <div style={{ fontSize: '1.4vw', fontWeight: 700, color: '#1E3A5F', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.6vh' }}>AI System Testing</div>
            <div style={row}><span style={dot} />Probabilistic outputs vary between runs</div>
            <div style={row}><span style={dot} />Responses are graded, scored, or judged</div>
            <div style={row}><span style={dot} />Coverage is measured in behaviors and scenarios</div>
          </div>
          <div
            style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: '3.6vw', height: '3.6vw', borderRadius: '50%', backgroundColor: '#1E3A5F',
              color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1vw', fontWeight: 700, boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.2)',
            }}
          >
            VS
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>Introduction to AI Testing</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>Slide 5 of 19</span>
        </div>
      </div>
    </div>
  );
}
