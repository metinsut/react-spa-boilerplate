import React, { useEffect } from 'react';
import { Outlet, useRouter } from '@tanstack/react-router';
import Header from '../Header/Header';

export default function Layout() {
  const {
    store: {
      currentLocation: { pathname }
    },
    navigate
  } = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      navigate({ to: '/home' });
    }
  }, [navigate, pathname]);

  return (
    <>
      <Header />
      <div className="overflow-auto p-4 overflow-x-hidden">
        <Outlet />
      </div>
    </>
  );
}
