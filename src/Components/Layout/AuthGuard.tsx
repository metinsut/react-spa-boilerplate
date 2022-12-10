import { useEffect } from 'react';
import React from 'react';
import { useRouter } from '@tanstack/react-router';
import { useReadLocalStorage } from 'usehooks-ts';

type Props = {
  children: JSX.Element;
};

export default function AuthGuard(props: Props) {
  const { children } = props;
  const isAuthorized = useReadLocalStorage('auth');
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      navigate({ to: '/login' });
    }
  }, [navigate, isAuthorized]);

  return <>{children}</>;
}
