import React from 'react';
import ErrorBoundary from './Components/Errors/ErrorBoundry';
import Routes from './Routes/Routes';

function App() {
  return (
    <ErrorBoundary>
      <main className="grid">
        <Routes />
      </main>
    </ErrorBoundary>
  );
}

export default App;
