import React from 'react';
import { useMatch, Outlet, Link } from '@tanstack/react-router';

export default function User() {
  const {
    loaderData: { users }
  } = useMatch('/user');

  return (
    <div className="grid">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {users.map((user) => (
          <div key={user.id} className="grid bg-slate-500 text-white p-2 rounded-lg">
            <div>{user.id}</div>
            <div>{user.username}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{user.website}</div>
          </div>
        ))}
      </div>
      <div>Detail</div>
      <div>
        <Link to="/user/detail">Go Detail</Link>
      </div>
      <Outlet />
    </div>
  );
}
