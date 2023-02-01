import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import './utils/i18n';
import './assets/scss/index.scss';

const env = import.meta.env.MODE;
const mock = JSON.parse(localStorage.getItem('mock') as any);

if (mock && env === 'development') {
  // eslint-disable-next-line
  const { worker } = require('./mocks/browser');

  worker.start({ onUnhandledRequest: 'bypass', quiet: true });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
