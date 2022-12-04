import React from 'react';
import { useMatch, Outlet, Link } from '@tanstack/react-router';

export default function User() {
  const {
    loaderData: { users }
  } = useMatch('/user');

  const user = users.slice(0, 3);
  // const user = users;
  return (
    <div>
      {JSON.stringify(user)}
      <div>Detail</div>
      <div>
        <Link to="/user/detail">Go Detail</Link>
      </div>
      <Outlet />
    </div>
  );
}
