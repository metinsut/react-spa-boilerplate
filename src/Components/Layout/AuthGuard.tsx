import { useEffect } from 'react';
import React from 'react';
import useAuthStore from 'store/authStore';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

export default function AuthGuard(props: Props) {
  const { children } = props;

  const navigate = useNavigate();
  const auth = useAuthStore((state) => state._id);

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [navigate, auth]);

  return <>{children}</>;
}
