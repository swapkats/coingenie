import React from 'react';

class ErrorBoundary extends React.PureComponent {
  static defaultProps = {
    showError: false,
  };

  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    const Bugsnag = window.Bugsnag || undefined;
    if (!!Bugsnag) {
      Bugsnag.notifyException(error, { react: info })
    }
    this.setState({
      error,
      info,
      hasError: true,
    });
  }

  render() {
    const { hasError, info, error } = this.state;
    const { showError } = this.props;
    return hasError
      ? (
        <div style={{padding: 30, textAlign: 'center'}}>
          Sorry, something went wrong. Please try again later, while we fix this issue.
        </div>)
      : <div>{this.props.children}</div>
  }
}

export default ErrorBoundary;
