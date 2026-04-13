import { Component } from 'react';
import PropTypes from 'prop-types';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className='min-h-screen flex items-center justify-center px-4 bg-background text-textMain'>
          <div className='max-w-xl text-center space-y-4 p-6 rounded-2xl border border-surfaceMuted bg-surface'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Something went wrong</h1>
            <p className='text-gray-300'>
              The application hit an unexpected error. Reload the page or try again later.
            </p>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold'
            >
              Reload page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

AppErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppErrorBoundary;
