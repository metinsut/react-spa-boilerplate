import { useEffect } from 'react';
import React from 'react';
import { useRouter } from '@tanstack/react-router';
import useAuthStore from 'store/authStore';

type Props = {
  children: JSX.Element;
};

export default function AuthGuard(props: Props) {
  const { children } = props;
  const auth = useAuthStore((state) => state._id);
  console.log('auth', auth);
  const { navigate } = useRouter();

  useEffect(() => {
    if (!auth) {
      navigate({ to: '/login' });
    }
  }, [navigate, auth]);

  return <>{children}</>;
}
