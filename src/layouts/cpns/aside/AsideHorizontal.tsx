import { memo, useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

import { usePermissionRoutes } from '@/hooks/formatRoute';
import { menuFilter } from '@/utils';
import { MenuItem, useRouteToMenu } from '@/hooks/routeToMenu';

import Logo from '@/components/Logo';
import { HorizontalWrapped } from './style';

const index = memo(() => {
  const permissionRoutes = usePermissionRoutes();
  const routrToMenu = useRouteToMenu();
  const matches = useMatches();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 菜单列表
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  // 展开的 SubMenu 菜单项 key 数组
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 选中的菜单项 key 数组
  const [selectKeys, setSelectKeys] = useState<string[]>([]);

  useEffect(() => {
    setMenuList(routrToMenu(menuFilter(permissionRoutes)));
  }, [permissionRoutes, routrToMenu]);

  useEffect(() => {
    const openKeys = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname);
    setOpenKeys(openKeys);
    setSelectKeys([pathname]);
  }, [pathname, matches]);

  const menuItemClick: MenuProps['onClick'] = ({ key }) => {
    setSelectKeys([key]);
    navigate(key);
  };
  const menu = (
    <Menu
      className="h-full flex-1 min-w-[200px]"
      defaultSelectedKeys={selectKeys}
      selectedKeys={selectKeys}
      defaultOpenKeys={openKeys}
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys)}
      onClick={menuItemClick}
      mode="horizontal"
      items={menuList}
      style={{
        background: 'inherit',
        borderBottom: 'none',
      }}
    />
  );

  return (
    <>
      <div className="mx-6">
        <Logo />
      </div>
      <HorizontalWrapped>{menu}</HorizontalWrapped>
    </>
  );
});

export default index;
