import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const routes = [
  {
    path: '/',
    element: <div>主页</div>,
  },
  {
    path: '/login',
    Component: lazy(() => import('@/views/login')),
  },
];
const router = createBrowserRouter(routes as unknown as RouteObject[]);

export default <RouterProvider router={router} />;
