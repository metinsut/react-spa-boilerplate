import Header from 'components/Header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <div className="overflow-auto p-4 overflow-x-hidden">
        <Outlet />
      </div>
    </>
  );
}
