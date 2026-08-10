export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg, #fbf7f2)',
      }}
    >
      <div style={{ textAlign: 'center', color: 'var(--text, #2e2933)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>404 — Page Not Found</h1>
        <p style={{ color: 'var(--muted, #5a5460)' }}>The page you're looking for doesn't exist.</p>
        <a
          href="/"
          style={{ color: 'var(--accent, #c0392b)', marginTop: '16px', display: 'inline-block' }}
        >
          Go home
        </a>
      </div>
    </div>
  );
}
