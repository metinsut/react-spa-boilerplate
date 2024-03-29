import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function User() {
  const userId = 1;
  // const { users } = LoaderState({ from: userRoute.id });
  // const usersLoaderInstance = new LoaderInstance({ loader: usersLoader });
  // const users = usersLoaderInstance.state.data;
  return (
    <div className="grid">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {/* {users.map((user) => (
          <div key={user.id} className="grid bg-slate-500 text-white p-2 rounded-lg">
            <div>{user.id}</div>
            <div>{user.username}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{user.website}</div>
          </div>
        ))} */}
      </div>
      <div>Detail</div>
      <div>
        <Link to={`/user/${userId}`}>Go Detail</Link>
      </div>
      <Outlet />
    </div>
  );
}
