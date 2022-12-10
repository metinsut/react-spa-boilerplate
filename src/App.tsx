import React from 'react';
import ErrorBoundary from './Components/Errors/ErrorBoundry';
import useMock from './mocks/useMock';
import Routes from './Routes/Routes';

function App() {
  useMock();

  return (
    <ErrorBoundary>
      <main className="grid">
        <Routes />
      </main>
    </ErrorBoundary>
  );
}

export default App;
