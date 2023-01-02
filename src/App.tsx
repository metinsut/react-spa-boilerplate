import useInitAuth from 'hooks/useInitAuth';
import React from 'react';
import useMock from 'mocks/useMock';
import Routes from 'routes/Routes';
import ErrorBoundary from 'components/Errors/ErrorBoundary';

function App() {
  useMock();
  useInitAuth();

  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
}

export default App;
