import { useRouter } from '@tanstack/react-router';
import altogic from 'helpers/altogic';
import React from 'react';
import useSessionStore from 'store/sessionStore';
import useAuthStore from 'store/authStore';
import ToggleMock from './ToggleMock';

export default function Profile() {
  const { navigate } = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);
  const setSession = useSessionStore((state) => state.setSession);

  const handleSignOut = async () => {
    try {
      const { errors } = await altogic.auth.signOut();

      if (errors) {
        throw errors;
      }

      setSession(null);
      setAuth(null);
      navigate({ to: '/login' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between">
      <ToggleMock />
      <div>
        <button
          onClick={handleSignOut}
          className="bg-purple-400 shadow-2xl text-white p-2 rounded-lg hover:bg-purple-700">
          Sign Out
        </button>
      </div>
    </div>
  );
}
