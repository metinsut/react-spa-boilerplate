import useInitAuth from 'hooks/useInitAuth';
import React from 'react';
import Routes from 'routes/Routes';
import ErrorBoundary from 'components/Errors/ErrorBoundary';

function App() {
  useInitAuth();

  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
}

export default App;
