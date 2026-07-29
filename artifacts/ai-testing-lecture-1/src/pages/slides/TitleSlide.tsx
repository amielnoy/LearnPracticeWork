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
  gridTemplateColumns: '3fr 2fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: '4vh 4vw',
  color: '#1E3A5F',
};

export default function TitleSlide() {
  return (
    <div style={wrap}>
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
          <div>COURSE OVERVIEW</div>
          <div>LECTURE 01</div>
        </div>
      </div>

      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            fontSize: '1.2vw',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '1vh',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Lecture Series &mdash; AI Testing Track
        </div>
        <h1 style={{ fontSize: '4.6vw', fontWeight: 800, margin: '0 0 2vh 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Introduction to AI Testing
        </h1>
        <p style={{ fontSize: '1.5vw', fontWeight: 400, color: '#475569', margin: '0 0 4vh 0', lineHeight: 1.5, maxWidth: '38vw' }}>
          How do you test software that gives a different answer every time you ask it the same question?
        </p>

        {/* Info cards */}
        <div style={{ display: 'flex', gap: '2vw' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              flex: 1,
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
            }}
          >
            <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: 'uppercase' }}>
              Lecture Number
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#1E3A5F' }}>01</div>
              <div
                style={{
                  fontSize: '1vw',
                  fontWeight: 600,
                  color: '#0D9488',
                  backgroundColor: 'rgba(13, 148, 136, 0.1)',
                  padding: '0.5vh 0.8vw',
                  borderRadius: '2vw',
                }}
              >
                of 10
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              padding: '2.5vh 2vw',
              borderRadius: '1vw',
              border: '1px solid #E2E8F0',
              flex: 1,
              boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
            }}
          >
            <div style={{ fontSize: '0.9vw', fontWeight: 600, color: '#64748B', marginBottom: '1vh', textTransform: 'uppercase' }}>
              Run Time
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1vw' }}>
              <div style={{ fontSize: '3.5vw', fontWeight: 700, color: '#1E3A5F' }}>45</div>
              <div
                style={{
                  fontSize: '1vw',
                  fontWeight: 600,
                  color: '#0D9488',
                  backgroundColor: 'rgba(13, 148, 136, 0.1)',
                  padding: '0.5vh 0.8vw',
                  borderRadius: '2vw',
                }}
              >
                minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column - roadmap panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '4vh 3vw',
            borderRadius: '1vw',
            border: '1px solid #E2E8F0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            boxShadow: '0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)',
          }}
        >
          <div style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1E3A5F' }}>Today&apos;s Roadmap</div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '1.5vw',
              height: '20vh',
              marginTop: '4vh',
              borderBottom: '2px solid #E2E8F0',
              paddingBottom: '1vh',
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh' }}>
              <div style={{ width: '100%', height: '7vh', backgroundColor: 'rgba(13, 148, 136, 0.2)', borderRadius: '0.4vw 0.4vw 0 0' }} />
              <div style={{ fontSize: '0.85vw', color: '#64748B', fontWeight: 500, textAlign: 'center' }}>Foundations</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh' }}>
              <div style={{ width: '100%', height: '11vh', backgroundColor: 'rgba(13, 148, 136, 0.4)', borderRadius: '0.4vw 0.4vw 0 0' }} />
              <div style={{ fontSize: '0.85vw', color: '#64748B', fontWeight: 500, textAlign: 'center' }}>Core Challenge</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh' }}>
              <div style={{ width: '100%', height: '15vh', backgroundColor: 'rgba(13, 148, 136, 0.7)', borderRadius: '0.4vw 0.4vw 0 0' }} />
              <div style={{ fontSize: '0.85vw', color: '#64748B', fontWeight: 500, textAlign: 'center' }}>Evaluation</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh' }}>
              <div style={{ width: '100%', height: '19vh', backgroundColor: '#0D9488', borderRadius: '0.4vw 0.4vw 0 0' }} />
              <div style={{ fontSize: '0.85vw', color: '#64748B', fontWeight: 500, textAlign: 'center' }}>Practice</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
        <div>Introduction to AI Testing</div>
        <div style={{ display: 'flex', gap: '1vw' }}>
          <span>AI Testing Academy</span>
          <span>&bull;</span>
          <span>Slide 1 of 19</span>
        </div>
      </div>
    </div>
  );
}
