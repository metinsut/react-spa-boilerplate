import { useEffect } from 'react';
import useSessionStore from 'store/sessionStore';
import useAuthStore from 'store/authStore';
import { Auth } from 'types/auth';
import { Session } from 'types/session';
import altogic from '../helpers/altogic';

const useInitAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    const userFromStorage = altogic.auth.getUser() as Auth;
    setAuth(userFromStorage);

    const sessionFromStorage = altogic.auth.getSession() as Session;
    setSession(sessionFromStorage);
  }, [setAuth, setSession]);
};

export default useInitAuth;
