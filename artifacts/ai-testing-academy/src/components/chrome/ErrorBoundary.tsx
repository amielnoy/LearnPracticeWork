import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * The last thing between a thrown error and a blank white page.
 *
 * Several things in this app throw on purpose: every `useX must be used within
 * XProvider` guard, and the slide decks' manifest parser. Those are good
 * errors — they name the mistake precisely — but with nothing to catch them
 * they took the whole document with them, and the only thing the visitor saw
 * was white. React said as much in the console during development: "An error
 * occurred in the <HomePage> component. Consider adding an error boundary."
 *
 * This is deliberately not a router-aware or per-section boundary. The failure
 * it exists for is a whole-page failure, and the honest response to one is to
 * say so and offer a reload, not to paper over half a page.
 */

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

const WRAP: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px',
  background: 'var(--bg, #fbf7f2)',
  color: 'var(--text, #2e2933)',
  fontFamily: '"Heebo", "Segoe UI", Arial, sans-serif',
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No telemetry endpoint here, so the console is the record. Keeping the
    // component stack matters: the message alone rarely says which section
    // failed.
    console.error('Unhandled error in the academy app:', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div style={WRAP} role="alert">
        <div style={{ maxWidth: '46ch', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>This page stopped loading</h1>
          <p style={{ color: 'var(--muted, #5a5460)', marginBottom: '20px', lineHeight: 1.6 }}>
            Something failed while rendering the academy. Reloading usually clears it. If it keeps
            happening, the details are in the browser console.
          </p>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '.8rem',
              color: 'var(--muted, #5a5460)',
              marginBottom: '20px',
              wordBreak: 'break-word',
            }}
          >
            {error.message}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 22px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              color: '#fff',
              background:
                'linear-gradient(135deg, var(--accent, #c0392b), var(--accent2, #e07b28))',
            }}
          >
            Reload the page
          </button>
        </div>
      </div>
    );
  }
}
