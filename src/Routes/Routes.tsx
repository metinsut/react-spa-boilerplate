import React, { lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AuthGuard from '../Components/Layout/AuthGuard';
import Layout from '../Components/Layout/Layout';
import RouteGuard from '../Components/Layout/RouteGuard';
import FullScreenLoader from '../Components/Loader';

const Home = lazy(() => import('../Pages/Home'));
const Login = lazy(() => import('../Pages/Login'));
const Register = lazy(() => import('../Pages/Register'));
const User = lazy(() => import('../Pages/User'));

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
      path: 'user',
      element: (
        <RouteGuard authKey="userDetail">
          <User />
        </RouteGuard>
      )
    }
  ]
};

const routes: RouteObject[] = [authRoutes, protectedRoutes];

function Routes() {
  const content = useRoutes(routes);
  return <Suspense fallback={<FullScreenLoader />}>{content}</Suspense>;
}

export default Routes;
