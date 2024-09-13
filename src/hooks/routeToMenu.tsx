import { useCallback } from 'react';
import Iconify from '@/components/icons/Iconify';

import { AppRouteObject } from '@/router/types';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[];
};

export function useRouteToMenu() {
  const routeToMenuFn = useCallback((items: AppRouteObject[]) => {
    return items.map((item) => {
      const { meta, children } = item;
      const menuItem: MenuItem = {
        key: meta?.key as string,
        label: meta?.label,
      };

      const icon = meta?.icon;
      if (icon) {
        if (typeof icon === 'string') {
          menuItem.icon = <Iconify icon={icon} size={22} />;
        } else {
          menuItem.icon = icon;
        }
      }
      if (children) {
        menuItem.children = routeToMenuFn(children);
      }
      return menuItem;
    });
  }, []);
  return routeToMenuFn;
}
