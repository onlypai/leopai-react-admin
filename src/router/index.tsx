import { memo } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { usePermissionRoutes, useDefaultDisplayPath } from '@/hooks/formatRoute';

import Layouts from '@/layouts';
import Loading from '@/components/Loading';
import ErrBoundary from './ErrBoundary';

import { AppRouteObject } from './types';

const Page404 = lazy(() => import('@/views/error/404'));
const Page403 = lazy(() => import('@/views/error/403'));

const index = memo(() => {
  //路由格式化
  const permissionRoutes = usePermissionRoutes();
  const defaultPath = useDefaultDisplayPath();

  const routes: AppRouteObject[] = [
    //dynamic routing
    {
      path: '/',
      element: (
        <ErrBoundary>
          <Layouts />
        </ErrBoundary>
      ),
      children: [
        { index: true, element: <Navigate to={defaultPath} replace /> },
        ...permissionRoutes,
      ],
    },
    //login routing
    {
      path: '/login',
      Component: lazy(() => import('@/views/login')),
    },
    //error routing
    {
      element: (
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        { path: '403', element: <Page403 /> },
        { path: '404', element: <Page404 /> },
      ],
    },
    //page not found routing
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];
  const router = createBrowserRouter(routes as unknown as RouteObject[]);
  return <RouterProvider router={router} />;
});

export default index;
