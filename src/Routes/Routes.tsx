import React, { Suspense } from 'react';
import { RouterProvider, ReactRouter, RootRoute, Route } from '@tanstack/react-router';
import { Loader } from '@tanstack/react-loaders';
import FullScreenLoader from "components/Loader";
import Layout from 'components/layout/layout';
import Profile from 'pages/auth/profile/profile';
import ErrorPage from 'components/errors/error';
import AuthGuard from 'components/layout/authGuard';
import RouteGuard from 'components/layout/routeGuard';
import User from 'pages/user/user';
import { userLoader } from 'pages/user/userLoader';
import Home from 'pages/home';
import UserDetail from 'pages/user/userDetail';
import { userDetailLoader } from 'pages/user/userDetailLoader';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import AuthRedirect from 'pages/auth/authRedirect';
import { z } from 'zod';

const rootRoute = new RootRoute({});

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
  errorComponent: ErrorPage
});

// const loginRoute = rootRoute.parentRoute({
//   path: '/login',
//   component: Login,
//   errorComponent: ErrorPage
// });

export const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
  errorComponent: ErrorPage
});

// const registerRoute = rootRoute.parentRoute({
//   path: '/register',
//   component: Register,
//   errorComponent: ErrorPage
// });

export const authRedirectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth-redirect',
  component: AuthRedirect,
  validateSearch: z.object({
    access_token: z.string().optional()
  }),
  errorComponent: ErrorPage
});

// const authRedirectRoute = rootRoute.parentRoute({
//   path: '/auth-redirect',
//   component: AuthRedirect,
//   validateSearch: z.object({
//     access_token: z.string().optional()
//   }),
//   errorComponent: ErrorPage
// });

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AuthGuard>
      <Layout />
    </AuthGuard>
  )
});

// const indexRoute = rootRoute.parentRoute({
//   path: '/',
//   component: () => (
//     <AuthGuard>
//       <Layout />
//     </AuthGuard>
//   )
// });

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'home',
  component: Home,
  errorComponent: ErrorPage
});

// const homeRoute = indexRoute.createRoute({
//   path: 'home',
//   component: Home,
//   errorComponent: ErrorPage
// });

export const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'profile',
  component: Profile,
  errorComponent: ErrorPage
});

// const profileRoute = indexRoute.createRoute({
//   path: 'profile',
//   component: Profile,
//   errorComponent: ErrorPage
// });

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

// export const userRoute = indexRoute.createRoute({
//   path: 'user',
//   component: () => (
//     <RouteGuard authKey="userDetail">
//       <User />
//     </RouteGuard>
//   ),
//   errorComponent: ErrorPage,
//   loader: userLoader
// });

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

// export const userDetailRoute = userRoute.createRoute({
//   path: 'detail',
//   component: UserDetail,
//   errorComponent: ErrorPage,
//   loader: userDetailLoader
// });

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
