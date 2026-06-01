import React from "react";

/**
 * App-level error boundary. Without one, any render error in any component
 * white-screens the whole SPA. This catches it and shows a branded fallback
 * with a reload, so a single broken component degrades gracefully.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Hook a real error tracker here (e.g. Sentry.captureException(error)).
    console.error("Uncaught UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
            background: "#0b1220",
            color: "#e6edf6",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong</h1>
          <p style={{ opacity: 0.8, maxWidth: "32rem" }}>
            We hit an unexpected error. Please reload the page, or email{" "}
            <a href="mailto:export@bluewavemarine.in" style={{ color: "#c9a84c" }}>
              export@bluewavemarine.in
            </a>{" "}
            if it keeps happening.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#c9a84c",
              color: "#0b1220",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
