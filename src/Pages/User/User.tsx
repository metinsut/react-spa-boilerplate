import React from 'react';
import { Outlet, Link, Route } from '@tanstack/react-router';
import { Loader, LoaderInstance } from '@tanstack/react-loaders';
import { userLoader } from './userLoader';
import { rootRoute } from 'routes/routes';
import RouteGuard from 'components/layout/routeGuard';
import ErrorPage from 'components/errors/error';

export const usersLoader = new Loader({
  key: 'users',
  loader: userLoader
});

export const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'user',
  component: () => (
    <RouteGuard authKey="userDetail">
      <User />
    </RouteGuard>
  ),
  errorComponent: ErrorPage,
  onLoad: async ({ preload }) => usersLoader.load({ preload })
});

export default function User() {
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
        <Link to="/user/detail">Go Detail</Link>
      </div>
      <Outlet />
    </div>
  );
}
