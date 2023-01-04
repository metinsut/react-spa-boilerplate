import useInitAuth from 'hooks/useInitAuth';
import React from 'react';
import Routes from 'routes/Routes';
import ErrorBoundary from 'components/Errors/ErrorBoundary';
import Mock from 'mocks/Mock';

function App() {
  useInitAuth();

  return (
    <>
      <Mock />
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </>
  );
}

export default App;
