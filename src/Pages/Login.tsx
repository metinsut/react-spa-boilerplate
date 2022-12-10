import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

export default function Login() {
  const [_, setAuthorized] = useLocalStorage('auth', false);
  const { navigate } = useRouter();

  const handleLogin = () => {
    setAuthorized(true);
    navigate({ to: '/home' });
  };

  return (
    <div className="grid w-screen h-screen items-center justify-center bg-slate-200">
      <div className="grid min-w-[300px] gap-5">
        <h3 className="text-4xl">Login</h3>
        <label
          htmlFor="email"
          className="border border-gray-700 border-solid p-2 rounded-lg w-full">
          <p>Email</p>
          <input
            type="text"
            id="email"
            className="border border-solid border-gray-400 rounded-md"
          />
        </label>
        <label
          htmlFor="password"
          className="border border-gray-700 border-solid p-2 rounded-lg w-full">
          <p>Password</p>
          <input
            type="text"
            id="password"
            className="border border-solid border-gray-400 rounded-md"
          />
        </label>
        <button
          type="submit"
          onClick={handleLogin}
          className="bg-gray-400 rounded-lg text-white p-2">
          Login
        </button>
      </div>
    </div>
  );
}
