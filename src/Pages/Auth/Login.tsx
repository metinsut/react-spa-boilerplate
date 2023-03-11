import altogic from 'helpers/altogic';
import React, { useState } from 'react';
import useAuthStore from 'store/authStore';
import useSessionStore from 'store/sessionStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import TextInput from 'components/Inputs/TextInput';
import { schema, TRegister } from './schema';

export default function Login() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any[]>([]);

  const setAuth = useAuthStore((state) => state.setAuth);
  const setSession = useSessionStore((state) => state.setSession);

  const { register, handleSubmit, control, watch } = useForm<TRegister>({
    resolver: zodResolver(schema)
  });

  const email = watch('email');

  const handleLogin: SubmitHandler<TRegister> = async (formValues) => {
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
      navigate('/profile');
    } catch (err: any) {
      setLoading(false);
      setError(err.items);
    }
  };

  const handleSendMagicLink = async () => {
    setLoading(true);
    setError([]);

    const { errors } = await altogic.auth.resendVerificationEmail(email);
    setLoading(false);

    if (errors) {
      setError(errors.items);
    } else {
      setSuccess('Email sent! Check your inbox.');
    }
  };

  return (
    <div className="grid w-screen h-screen items-center justify-center content-center gap-8 bg-slate-200">
      <form onSubmit={handleSubmit(handleLogin)} className="grid min-w-[300px]">
        <h3 className="text-4xl">Login</h3>
        {error?.map(({ message }: any) => (
          <div key={message} className="bg-red-600 text-white text-[13px] p-2">
            <p>{message}</p>
          </div>
        ))}
        {error[0]?.code === 'email_not_verified' && (
          <button onClick={handleSendMagicLink} className="bg-purple-400">
            Send email again
          </button>
        )}
        {success && <div className="bg-green-600 text-white text-[13px] p-2">{success}</div>}
        <TextInput
          className="mt-8"
          register={register}
          control={control}
          name="email"
          label="Email"></TextInput>
        <TextInput
          register={register}
          control={control}
          name="password"
          label="Password"></TextInput>
        <button
          disabled={loading}
          type="submit"
          className="bg-gray-400 rounded-lg text-white p-2 mt-4">
          Login
        </button>
      </form>
      <Link className="text-indigo-600" to="/register">
        Have not you any account ?
      </Link>
    </div>
  );
}
