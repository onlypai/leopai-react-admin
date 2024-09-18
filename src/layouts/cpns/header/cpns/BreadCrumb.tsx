import { memo, useEffect, useState } from 'react';
import { useMatches, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

import { usePermissionRoutes } from '@/hooks/formatRoute';
import { useTranslation } from 'react-i18next';
import { menuFilter, flattenTree } from '@/utils';

import { AppRouteObject } from '@/router/types';

const BreadCrumb = memo(() => {
  const matches = useMatches();
  const permissionRoutes = usePermissionRoutes();
  const { t } = useTranslation();

  const [breadCrumds, setBreadCrumds] = useState<ItemType[]>([]);

  useEffect(() => {
    const flattenRoute = flattenTree(menuFilter(permissionRoutes));

    const paths = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname);
    const pathRouteMetas = flattenRoute.filter(
      (item) => paths.indexOf(item.meta.key) !== -1,
    ) as AppRouteObject[];
    const breadCrumds = pathRouteMetas.map((item) => {
      const breadCrumbItem: ItemType = {
        title: t(item.meta!.label),
        key: item.meta!.key,
      };
      if (item.children) {
        breadCrumbItem.menu = {
          items: item.children.map((item) => {
            return {
              key: item.meta!.key,
              label: <Link to={item.meta!.key}>{t(item.meta!.label)}</Link>,
            };
          }),
        };
      }
      return breadCrumbItem;
    });
    setBreadCrumds(breadCrumds);
  }, [matches, t, permissionRoutes]);

  return <Breadcrumb items={breadCrumds} />;
});

export default BreadCrumb;
