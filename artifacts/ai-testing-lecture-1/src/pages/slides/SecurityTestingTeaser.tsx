const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};

export default function SecurityTestingTeaser() {
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>SECURITY PREVIEW</div>
          <div>LECTURE 01</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '2vh', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coming in the Security Track</div>
        <h1 style={{ fontSize: '4vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: '55vw' }}>
          Testing Isn&apos;t Just About Correctness
        </h1>
        <p style={{ fontSize: '1.4vw', fontWeight: 400, color: '#475569', margin: '0 0 5vh 0', lineHeight: 1.5, maxWidth: '48vw' }}>
          Prompt injection, data leakage, and jailbreaks are their own testing discipline &mdash; with their own tools and failure modes.
        </p>

        <div style={{ display: 'flex', gap: '4vw', padding: '4vh 6vw', background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#64748B', marginBottom: '0.5vh', textTransform: 'uppercase' }}>Covered In</div>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>AI-Powered Basic Cybersecurity</div>
          </div>
          <div style={{ width: '1px', backgroundColor: '#E2E8F0' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#64748B', marginBottom: '0.5vh', textTransform: 'uppercase' }}>Starts At</div>
            <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>Lecture 7</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>Introduction to AI Testing</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>Slide 14 of 19</span>
        </div>
      </div>
    </div>
  );
}
