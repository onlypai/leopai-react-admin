import { memo, useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { Menu, MenuProps } from 'antd';

import { usePermissionRoutes } from '@/hooks/formatRoute';
import { menuFilter } from '@/utils';
import { MenuItem, useRouteToMenu } from '@/hooks/routeToMenu';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { VerticalWrapped } from './style';

import { ESize } from '@/enum';
import { useThemeToken } from '@/hooks/themeToken';

const index = memo(() => {
  const permissionRoutes = usePermissionRoutes();
  const { colorBorderSecondary } = useThemeToken();
  const { HEADER_HEIGHT } = ESize;

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
  //md 尺寸以上显示
  return (
    <div
      className="hidden w-full h-full md:block"
      style={{ borderRight: `1px solid ${colorBorderSecondary}` }}
    >
      <Logo />
      <div
        className="flex justify-center overflow-y-hidden"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px`,
        }}
      >
        <VerticalWrapped>
          <Menu
            className="h-full"
            // 初始选中的菜单项 key 数组
            defaultSelectedKeys={selectKeys}
            // 当前选中的菜单项 key 数组
            selectedKeys={selectKeys}
            // 初始展开的 SubMenu 菜单项 key 数组
            defaultOpenKeys={openKeys}
            // 当前展开的 SubMenu 菜单项 key 数组
            openKeys={openKeys}
            // -----------------------
            // SubMenu 展开/关闭的回调
            onOpenChange={(keys) => setOpenKeys(keys)}
            // 点击 MenuItem 调用此函数
            onClick={menuItemClick}
            mode="inline"
            items={menuList}
            style={{
              borderInlineEnd: 'none', //去除右边边框
              background: 'inherit',
            }}
          />
        </VerticalWrapped>
      </div>
    </div>
  );
});

export default index;
