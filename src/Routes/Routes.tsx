import React, { Suspense } from 'react';
import { RouterProvider, ReactRouter, createRouteConfig } from '@tanstack/react-router';
import FullScreenLoader from 'components/Loader';
import Layout from 'components/Layout/Layout';
import Profile from 'pages/Auth/Profile/Profile';
import ErrorPage from 'components/Errors/Error';
import AuthGuard from 'components/Layout/AuthGuard';
import RouteGuard from 'components/Layout/RouteGuard';
import User from 'pages/User/User';
import { userLoader } from 'pages/User/userLoader';
import Home from 'pages/Home';
import UserDetail from 'pages/User/UserDetail';
import { userDetailLoader } from 'pages/User/userDetailLoader';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import AuthRedirect from 'pages/Auth/AuthRedirect';
import { z } from 'zod';

const rootRoute = createRouteConfig({});

const loginRoute = rootRoute.createRoute({
  path: '/login',
  component: Login,
  errorComponent: ErrorPage
});

const registerRoute = rootRoute.createRoute({
  path: '/register',
  component: Register,
  errorComponent: ErrorPage
});

const authRedirectRoute = rootRoute.createRoute({
  path: '/auth-redirect',
  component: AuthRedirect,
  validateSearch: z.object({
    access_token: z.string().optional()
  }),
  errorComponent: ErrorPage
});

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: () => (
    <AuthGuard>
      <Layout />
    </AuthGuard>
  )
});

const homeRoute = indexRoute.createRoute({
  path: 'home',
  component: Home,
  errorComponent: ErrorPage
});

const profileRoute = indexRoute.createRoute({
  path: 'profile',
  component: Profile,
  errorComponent: ErrorPage
});

export const userRoute = indexRoute.createRoute({
  path: 'user',
  component: () => (
    <RouteGuard authKey="userDetail">
      <User />
    </RouteGuard>
  ),
  errorComponent: ErrorPage,
  loader: userLoader
});

export const userDetailRoute = userRoute.createRoute({
  path: 'detail',
  component: UserDetail,
  errorComponent: ErrorPage,
  loader: userDetailLoader
});

const routeConfig = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  authRedirectRoute,
  indexRoute.addChildren([homeRoute, profileRoute, userRoute.addChildren([userDetailRoute])])
]);

const router = new ReactRouter({
  routeConfig,
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
