import React from 'react';
import useInitAuth from 'hooks/useInitAuth';
import Routes from 'routes/routes';
import ErrorBoundary from 'components/errors/ErrorBoundary';

function App() {
  useInitAuth();

  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
}

export default App;
