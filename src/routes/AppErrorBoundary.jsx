import { Component } from 'react';
import toast from 'react-hot-toast';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('React error boundary caught:', error, info);
    toast.error('Something went wrong. Please refresh the page.');
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-8 text-center space-y-4">
          <h1 className="text-4xl font-bold text-error">Something went wrong</h1>
          <p className="text-gray-600 max-w-md">
            We hit an unexpected issue while rendering this page. Please try refreshing or return to the homepage.
          </p>
          <div className="flex gap-4">
            <button className="btn btn-primary" onClick={() => (window.location.href = '/')}>
              Go Home
            </button>
            <button className="btn btn-outline" onClick={this.handleReload}>
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;