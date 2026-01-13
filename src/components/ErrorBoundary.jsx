import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-800 to-teal-950 text-white p-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-lime-400 mb-4">Oops!</h1>
            <p className="text-xl mb-4">Something went wrong.</p>
            <p className="text-gray-300 mb-6">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-lime-500 text-black px-6 py-3 rounded-md shadow-md hover:bg-lime-300 transition duration-300"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
