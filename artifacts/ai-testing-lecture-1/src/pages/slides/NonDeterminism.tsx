const wrap: React.CSSProperties = {
  width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#FAFBFC',
  fontFamily: "'Inter', sans-serif", padding: '4vh 4vw', boxSizing: 'border-box', position: 'relative',
  display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr auto', gap: '4vh 4vw', color: '#1E3A5F',
};
const pair: React.CSSProperties = {
  background: '#FFFFFF', borderRadius: '1vw', border: '1px solid #E2E8F0', boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
  padding: '3vh 2vw', textAlign: 'center', flex: 1,
};

export default function NonDeterminism() {
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '2vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2vw', height: '2vw', backgroundColor: '#0D9488', borderRadius: '0.4vw' }} />
          <div style={{ fontSize: '1.2vw', fontWeight: 700, letterSpacing: '0.02em' }}>AI Testing Academy</div>
        </div>
        <div style={{ display: 'flex', gap: '2vw', fontSize: '1vw', fontWeight: 500, color: '#64748B' }}>
          <div>THE CORE CHALLENGE</div>
          <div>LECTURE 01</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '4vh' }}>
        <div>
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#0D9488', marginBottom: '2vh', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Core Challenge</div>
          <h1 style={{ fontSize: '3.6vw', fontWeight: 800, margin: '0 0 2.5vh 0', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '60vw' }}>
            Ask the same question twice. Get two different, both-defensible answers.
          </h1>
          <p style={{ fontSize: '1.4vw', fontWeight: 400, color: '#475569', margin: 0, lineHeight: 1.5, maxWidth: '48vw' }}>
            That&apos;s not a bug to fix &mdash; it&apos;s the operating condition every AI test has to design around.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2vw', width: '70vw' }}>
          <div style={pair}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Same Prompt</div>
            <div style={{ fontSize: '1.6vw', fontWeight: 700, color: '#1E3A5F', margin: '1vh 0' }}>&rarr;</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488' }}>Different Output</div>
          </div>
          <div style={pair}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Same Model</div>
            <div style={{ fontSize: '1.6vw', fontWeight: 700, color: '#1E3A5F', margin: '1vh 0' }}>&rarr;</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488' }}>Different Day</div>
          </div>
          <div style={pair}>
            <div style={{ fontSize: '1vw', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Same Data</div>
            <div style={{ fontSize: '1.6vw', fontWeight: 700, color: '#1E3A5F', margin: '1vh 0' }}>&rarr;</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 600, color: '#0D9488' }}>Different Ranking</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2vh', fontSize: '0.9vw', color: '#94A3B8', fontWeight: 500 }}>
        <div>Introduction to AI Testing</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>Slide 7 of 19</span>
        </div>
      </div>
    </div>
  );
}
