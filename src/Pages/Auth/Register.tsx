import { Link, useRouter } from '@tanstack/react-router';
import altogic from 'helpers/altogic';
import React, { useState } from 'react';
import useAuthStore from 'store/authStore';
import useSessionStore from 'store/sessionStore';

export default function Register() {
  const { navigate } = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState<any>(null);

  const setAuth = useAuthStore((state) => state.setAuth);
  const setSession = useSessionStore((state) => state.setSession);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { user, session, errors } = await altogic.auth.signUpWithEmail(
        'metindir@gmail.com',
        '123456'
      );

      if (errors) {
        throw errors;
      }

      if (session) {
        setAuth(user);
        setSession(session);
        navigate({ to: '/profile' });
      } else {
        setSuccess(`We sent a verification link to your email`);
        setError(null);
        setLoading(false);
      }
    } catch (err: any) {
      setSuccess('');
      setError(err.items);
      setLoading(false);
    }
  };

  return (
    <div className="grid w-screen h-screen items-center justify-center bg-slate-200">
      <div className="grid min-w-[300px] gap-5">
        <h3 className="text-4xl">Sign Up</h3>
        {error?.map(({ message }: any) => (
          <div key={message} className="bg-red-600 text-white text-[13px] p-2">
            <p>{message}</p>
          </div>
        ))}
        {success && <div className="bg-green-600 text-white text-[13px] p-2">{success}</div>}
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
          disabled={loading}
          type="submit"
          onClick={handleSignUp}
          className="bg-gray-400 rounded-lg text-white p-2">
          Sign Up
        </button>
        <Link className="text-indigo-600" to="/login">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
