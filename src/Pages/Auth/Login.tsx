import { useRouter } from '@tanstack/react-router';
import altogic from 'helpers/altogic';
import React, { useState } from 'react';
import useAuthStore from 'store/authStore';
import useSessionStore from 'store/sessionStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

type Inputs = {
  email: string;
  password: string;
};

const schema = zod.object({
  password: zod.string().min(6),
  email: zod.string().email()
});

export default function Login() {
  const { navigate } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(schema)
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const setAuth = useAuthStore((state) => state.setAuth);
  const setSession = useSessionStore((state) => state.setSession);

  const handleLogin: SubmitHandler<Inputs> = async (formValues) => {
    try {
      setLoading(true);
      const { user, session, errors } = await altogic.auth.signInWithEmail(
        formValues.email,
        formValues.password
      );

      if (errors) {
        throw errors;
      }

      setLoading(false);
      setAuth(user);
      setSession(session);
      navigate({ to: '/profile' });
    } catch (err: any) {
      setLoading(false);
      setError(err.items);
    }
  };

  return (
    <div className="grid w-screen h-screen items-center justify-center bg-slate-200">
      <form onSubmit={handleSubmit(handleLogin)} className="grid min-w-[300px] gap-5">
        <h3 className="text-4xl">Login</h3>
        {error?.map(({ message }: any) => (
          <div key={message} className="bg-red-600 text-white text-[13px] p-2">
            <p>{message}</p>
          </div>
        ))}
        {errors && Object.keys(errors).length > 0 && (
          <div className="bg-red-600 text-white text-[13px] p-2">
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
          </div>
        )}
        <label
          htmlFor="email"
          className="border border-gray-700 border-solid p-2 rounded-lg w-full">
          <p>Email</p>
          <input
            id="email"
            {...register('email')}
            className="border border-solid border-gray-400 rounded-md"
          />
        </label>
        <label
          htmlFor="password"
          className="border border-gray-700 border-solid p-2 rounded-lg w-full">
          <p>Password</p>
          <input
            {...register('password')}
            id="password"
            className="border border-solid border-gray-400 rounded-md"
          />
        </label>
        <button disabled={loading} type="submit" className="bg-gray-400 rounded-lg text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}
