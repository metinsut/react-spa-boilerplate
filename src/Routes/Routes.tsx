import FullScreenLoader from 'components/Loader';
import React, { Suspense, lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

const Login = lazy(() => import('pages/Auth/Login'));
const Register = lazy(() => import('pages/Auth/Register'));
const AuthRedirect = lazy(() => import('pages/Auth/AuthRedirect'));

const AuthGuard = lazy(() => import('components/Layout/AuthGuard'));
const RouteGuard = lazy(() => import('components/Layout/RouteGuard'));
const Layout = lazy(() => import('components/Layout/Layout'));

const Home = lazy(() => import('pages/Home'));
const Profile = lazy(() => import('pages/Auth/Profile/Profile'));
const User = lazy(() => import('pages/User/User'));
const UserDetail = lazy(() => import('pages/User/UserDetail'));

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'auth-redirect',
      element: <AuthRedirect />
    }
  ]
};

const protectedRoutes: RouteObject = {
  path: '*',
  element: (
    <AuthGuard>
      <Layout />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'user',
      element: (
        <RouteGuard authKey="userDetail">
          <User />
        </RouteGuard>
      ),
      children: [
        {
          path: ':id',
          element: <UserDetail />
        }
      ]
    }
  ]
};

const routes: RouteObject[] = [authRoutes, protectedRoutes];

function Routes() {
  const content = useRoutes(routes);
  return <Suspense fallback={<FullScreenLoader />}>{content}</Suspense>;
}

export default Routes;
