import React, { Suspense } from 'react';
import { RouterProvider, ReactRouter, RootRoute, Route } from '@tanstack/react-router';
import FullScreenLoader from "components/Loader";
import Layout from 'components/layout/layout';
import ErrorPage from 'components/errors/error';
import AuthGuard from 'components/layout/authGuard';
import { loginRoute } from 'pages/auth/login';
import { authRedirectRoute } from 'pages/auth/authRedirect';
import { homeRoute } from 'pages/home';
import { registerRoute } from 'pages/auth/register';
import { profileRoute } from 'pages/auth/profile/profile';
import { userRoute } from 'pages/user/user';
import { userDetailRoute } from 'pages/user/userDetail';

export const rootRoute = new RootRoute({});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AuthGuard>
      <Layout />
    </AuthGuard>
  )
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  authRedirectRoute,
  indexRoute.addChildren([homeRoute, profileRoute, userRoute.addChildren([userDetailRoute])])
]);

const router = new ReactRouter({
  routeTree,
  defaultErrorComponent: ErrorPage,
  defaultPendingComponent: FullScreenLoader
});

export default function Routes() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}
