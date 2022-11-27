import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

type Props = {
  children: JSX.Element;
};

export default function AuthGuard(props: Props) {
  const { children } = props;
  const userLoggedIn = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/login');
    }
  }, [navigate, userLoggedIn]);

  return <>{children}</>;
}
