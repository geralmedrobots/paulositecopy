import { Component } from "react";
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.error("Unable to render page", error);
  }
  render() {
    return this.state.failed ? (
      <main className="container loading">
        <h1>Unable to load this page.</h1>
        <p>Please reload the page to try again.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
