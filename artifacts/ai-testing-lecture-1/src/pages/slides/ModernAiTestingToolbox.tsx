const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};
const col: React.CSSProperties = {
  background: '#FFFFFF', padding: '3vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)', display: 'flex', flexDirection: 'column', gap: '1.6vh',
};
const num: React.CSSProperties = {
  fontSize: '1.2vw', fontWeight: 700, color: '#0D9488', backgroundColor: 'rgba(13, 148, 136, 0.1)',
  width: '3vw', height: '3vw', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
};

export default function ModernAiTestingToolbox() {
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>PRACTICAL TOOLKIT</div>
          <div>LECTURE 01</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4vh', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Practical Toolkit</div>
          <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>The Modern AI Testing Toolbox</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div style={col}>
            <div style={num}>1</div>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>Evaluation Frameworks</div>
            <div style={{ fontSize: '1.05vw', color: '#64748B', lineHeight: 1.5 }}>Run golden datasets and LLM-as-judge scoring at scale, on a schedule.</div>
          </div>
          <div style={col}>
            <div style={num}>2</div>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>Observability Platforms</div>
            <div style={{ fontSize: '1.05vw', color: '#64748B', lineHeight: 1.5 }}>Trace every prompt, response, and score back to a single request.</div>
          </div>
          <div style={col}>
            <div style={num}>3</div>
            <div style={{ fontSize: '1.3vw', fontWeight: 700, color: '#1E3A5F' }}>CI/CD Integration</div>
            <div style={{ fontSize: '1.05vw', color: '#64748B', lineHeight: 1.5 }}>Block a deploy automatically when evaluation scores drop.</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>Introduction to AI Testing</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>Slide 15 of 19</span>
        </div>
      </div>
    </div>
  );
}
