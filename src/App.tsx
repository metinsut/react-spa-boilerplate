import React from 'react';
import useInitAuth from 'hooks/useInitAuth';
import ErrorBoundary from 'components/Errors/ErrorBoundary';
import Routes from 'routes/Routes';

function App() {
  useInitAuth();

  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
}

export default App;
