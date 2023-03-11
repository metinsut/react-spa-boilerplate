import altogic from 'helpers/altogic';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store/authStore';
import useSessionStore from 'store/sessionStore';

function AuthRedirect() {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);
  const setSession = useSessionStore((state) => state.setSession);

  const handleToken = useCallback(async () => {
    // const { user, session } = await altogic.auth.getAuthGrant(search.access_token);
    const { user, session } = await altogic.auth.getAuthGrant();

    if (user) {
      setAuth(user);
      setSession(session);
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [navigate, setAuth, setSession]);

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <div>
      <div>Redirecting...</div>
    </div>
  );
}

export default AuthRedirect;
