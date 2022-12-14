import useInitAuth from 'hooks/useInitAuth';
import React from 'react';
import ErrorBoundary from './components/Errors/ErrorBoundry';
import useMock from './mocks/useMock';
import Routes from './routes/Routes';

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
