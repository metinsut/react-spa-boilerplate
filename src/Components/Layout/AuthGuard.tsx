import { useEffect } from 'react';
import React from 'react';
import { useRouter } from '@tanstack/react-router';

type Props = {
  children: JSX.Element;
};

export default function AuthGuard(props: Props) {
  const { children } = props;
  const userLoggedIn = true;
  const { navigate } = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate({ to: '/login' });
    }
  }, [navigate, userLoggedIn]);

  return <>{children}</>;
}
