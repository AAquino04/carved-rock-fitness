import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true };
  }

  render() {
    const { props, state } = this;
    if (state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return props.children;
  }
}