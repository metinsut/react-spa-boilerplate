import { Route, useNavigate, useStore } from '@tanstack/react-router';
import ErrorPage from 'components/errors/error';
import altogic from 'helpers/altogic';
import React, { useCallback, useEffect } from 'react';
import { rootRoute } from 'routes/routes';
import useAuthStore from 'store/authStore';
import useSessionStore from 'store/sessionStore';
import { z } from 'zod';

export const authRedirectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth-redirect',
  component: AuthRedirect,
  validateSearch: z.object({
    access_token: z.string().optional()
  }),
  errorComponent: ErrorPage
});

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
      navigate({ to: '/profile' });
    } else {
      navigate({ to: '/login' });
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
