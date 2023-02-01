import { Loader } from '@tanstack/react-loaders';
import { Route } from '@tanstack/react-router';
import ErrorPage from 'components/errors/error';
import React from 'react';
import { userRoute } from './user';
import { userDetailLoader } from './userDetailLoader';
// import { useLoaderData } from '@tanstack/react-router';

export const userDetailLoaderRoot = new Loader({
  key: 'users',
  loader: userDetailLoader
});

export const userDetailRoute = new Route({
  getParentRoute: () => userRoute,
  path: 'detail',
  component: UserDetail,
  errorComponent: ErrorPage,
  onLoad: async ({ preload }) => userDetailLoaderRoot.load({ preload })
});

export default function UserDetail() {
  // const { userDetail } = useLoaderData({ from: userDetailRoute.id });

  // const detail = userDetail.slice(0, 3);

  return (
    <div>
      <div>More detail</div>
      {/* <div>{JSON.stringify(detail)}</div> */}
    </div>
  );
}
