import { lazy, Suspense, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '@/components/Loading';

import { useAppSelector } from '@/hooks/redux';
import { shallowEqual } from 'react-redux';
import { menuFilter, flattenTree } from '@/utils';

import { AppRouteObject, Permission } from '@/router/types';
import { EPermission } from '@/enum';

/**
 * 解析组件
 * @param path 路由路径
 * @returns {string}
 */
function resolveComponent(path: string) {
  const pageFolder = '/views';
  const pages = import.meta.glob(`/src/views/**/*.tsx`);
  return pages[`/src${pageFolder}${path}`];
}

/**
 *
 * /management/user/profile
 * /management/user
 * /management
 * 获取完整path
 * @param route Permission
 * @param routes Permission[]
 * @returns {string}
 */
function getCompleteRoute(route: Permission, routes: Permission[]): string {
  const { parentId } = route;
  if (parentId) {
    const parent = routes.find((item) => item.id === parentId);
    if (parent) {
      return `${getCompleteRoute(parent, routes)}/${route.route}`;
    }
  }
  return `/${route.route}`;
}

/**
 * 格式化路由
 * @param {Permission[]} permissions 权限列表
 * @returns {AppRouteObject[]}
 */
function formatPermissionsToRoutes(permissions: Permission[]) {
  const _recursion = (items: Permission[]) => {
    return items.map((item) => {
      const {
        route,
        type,
        label,
        icon,
        frameSrc,
        component,
        parentId,
        hideTab = false,
        children = [],
      } = item;
      const flatPermissons = flattenTree(permissions) as Permission[];
      const appRoute: AppRouteObject = {
        path: route,
        meta: {
          label,
          key: getCompleteRoute(item, flatPermissons),
          hideTab,
        },
      };

      if (icon) appRoute.meta!.icon = icon;
      if (frameSrc) appRoute.meta!.frameSrc = frameSrc;

      //目录
      if (type === EPermission.CATALOGUE) {
        appRoute.meta!.hideTab = true;
        if (!parentId) {
          appRoute.element = (
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          );
        }
        appRoute.children = _recursion(children);

        if (children && children.length > 0) {
          appRoute.children.unshift({
            index: true,
            element: <Navigate to={children[0].route} replace />,
          });
        }
      } else if (type === EPermission.MENU) {
        const El = lazy(resolveComponent(component!) as any);
        if (frameSrc) {
          appRoute.element = <El src={frameSrc} />;
        } else {
          appRoute.element = (
            //内容区域loading
            <Suspense fallback={<Loading />}>
              <El />
            </Suspense>
          );
        }
      }
      return appRoute;
    });
  };
  return _recursion([...permissions]);
}

//hooks: 获取权限路由
export const usePermissionRoutes = (): AppRouteObject[] => {
  const { permissions } = useAppSelector((state) => state.permissions, shallowEqual);
  return useMemo(() => formatPermissionsToRoutes(permissions), [permissions]);
};

//hooks: 获取默认展示路由
export const useDefaultDisplayPath = (): string => {
  const filterRoutes = menuFilter(usePermissionRoutes());
  const _recursion = (route: AppRouteObject): string => {
    if (route.children && route.children.length > 0) {
      return _recursion(route.children[0]);
    } else {
      return route.meta!.key;
    }
  };
  return !filterRoutes.length ? '' : _recursion(filterRoutes[0]);
};
