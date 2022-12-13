import { useRouter } from '@tanstack/react-router';
import altogic from 'helpers/altogic';
import React from 'react';
import useSessionStore from 'store/sessionStore';
import useAuthStore from 'store/authStore';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

export default function Profile() {
  const { navigate } = useRouter();

  const [_, setMock] = useLocalStorage('mock', false);
  const mock = useReadLocalStorage<boolean | undefined>('mock');

  const setAuth = useAuthStore((state) => state.setAuth);
  const setSession = useSessionStore((state) => state.setSession);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setMock(true);
    } else {
      setMock(false);
    }
  };

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
    <div className="grid justify-start">
      <label className="relative grid grid-flow-col gap-2 justify-start items-center border border-slate-400 p-2 rounded-lg">
        Toggle Mock
        <input
          defaultChecked={mock ?? false}
          onChange={handleChange}
          type="checkbox"
          className="peer appearance-none"
        />
        <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
      </label>

      <button
        onClick={handleSignOut}
        className="bg-purple-400 shadow-2xl text-white p-2 rounded-lg">
        Sign Out
      </button>
    </div>
  );
}
