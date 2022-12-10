import React, { lazy, Suspense } from 'react';
import { RouterProvider, createReactRouter, createRouteConfig } from '@tanstack/react-router';
import FullScreenLoader from '../Components/Loader';
import AuthGuard from '../Components/Layout/AuthGuard';
import Layout from '../Components/Layout/Layout';
import { userLoader } from '../Pages/User/userLoader';
import RouteGuard from '../Components/Layout/RouteGuard';
import { userDetailLoader } from '../Pages/User/userDetailLoader';
import Profile from '../Pages/Profile';

const Home = lazy(() => import('../Pages/Home'));
const Login = lazy(() => import('../Pages/Login'));
const Register = lazy(() => import('../Pages/Register'));
const User = lazy(async () => import('../Pages/User/User'));
const UserDetail = lazy(() => import('../Pages/User/UserDetail'));
const ErrorPage = lazy(() => import('../Components/Errors/Error'));

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}

const rootRoute = createRouteConfig();

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

const userRoute = indexRoute.createRoute({
  path: 'user',
  component: () => (
    <RouteGuard authKey="userDetail">
      <User />
    </RouteGuard>
  ),
  errorComponent: ErrorPage,
  loader: userLoader
});

const userDetailRoute = userRoute.createRoute({
  path: 'detail',
  component: UserDetail,
  errorComponent: ErrorPage,
  loader: userDetailLoader
});

const routeConfig = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  indexRoute.addChildren([homeRoute, profileRoute, userRoute.addChildren([userDetailRoute])])
]);

const router = createReactRouter({
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
