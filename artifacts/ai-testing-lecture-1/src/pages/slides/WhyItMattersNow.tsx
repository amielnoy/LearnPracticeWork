const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};
const statCard: React.CSSProperties = {
  background: '#FFFFFF', padding: '3vh 2vw', borderRadius: '1vw', border: '1px solid #E2E8F0',
  boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)', textAlign: 'center',
};

export default function WhyItMattersNow() {
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '1vh', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Why It Matters Now</div>
          <h1 style={{ fontSize: '3.2vw', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Three Signals You Can&apos;t Ignore</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
          <div style={statCard}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: 'uppercase' }}>Adoption</div>
            <div style={{ fontSize: '3vw', fontWeight: 700, color: '#1E3A5F' }}>Everywhere</div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>LLMs sit inside products, support flows, and internal tools.</div>
          </div>
          <div style={statCard}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: 'uppercase' }}>Risk Profile</div>
            <div style={{ fontSize: '3vw', fontWeight: 700, color: '#1E3A5F' }}>Different</div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>Failures are subtle and plausible, not obvious crashes.</div>
          </div>
          <div style={statCard}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: 'uppercase' }}>Stakes</div>
            <div style={{ fontSize: '3vw', fontWeight: 700, color: '#1E3A5F' }}>Higher</div>
            <div style={{ fontSize: '1vw', fontWeight: 500, color: '#64748B', marginTop: '1vh' }}>A wrong answer can look confident and still be wrong.</div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '4vh 4vw', borderRadius: '1vw', border: '1px solid #E2E8F0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)' }}>
          <div style={{ fontSize: '1.3vw', fontWeight: 600, color: '#1E3A5F', marginBottom: '1.5vh' }}>Why Traditional QA Falls Short Here</div>
          <div style={{ fontSize: '1.2vw', color: '#475569', lineHeight: 1.6, maxWidth: '55vw' }}>
            Traditional QA checks whether the code ran correctly. AI testing has to check whether the answer was <em>right</em> &mdash; a judgment call that shifts with context, phrasing, and intent, and one that a fixed set of assertions can&apos;t make alone.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>Introduction to AI Testing</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>Slide 4 of 19</span>
        </div>
      </div>
    </div>
  );
}
