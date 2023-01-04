import { useEffect } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import { worker } from './browser';

export default function useMock() {
  const mock = useReadLocalStorage('mock');

  const env = import.meta.env.MODE;

  useEffect(() => {
    if (mock === true && env === 'development') {
      worker.start({ onUnhandledRequest: 'bypass', quiet: true });
    }
  }, [env, mock]);

  return mock;
}
