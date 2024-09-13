import { memo, useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { Menu, MenuProps } from 'antd';
import styled from 'styled-components';

import { useAppSelector } from '@/hooks/redux';
import { useThemeToken } from '@/hooks/themeToken';
import { usePermissionRoutes } from '@/hooks/formatRoute';
import { menuFilter } from '@/utils';
import { NAME } from '@/utils/config';
import { MenuItem, useRouteToMenu } from '@/hooks/routeToMenu';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

import { ELayout, ESize } from '@/enum';

const AntdWrapped = styled.span`
  //submenu样式
  .ant-menu-sub.ant-menu-inline {
    background: none !important;
  }
  .ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 24px;
  }
`;

const AsideVertical = memo(() => {
  const { layout } = useAppSelector((state) => state.settings);
  const { colorPrimary } = useThemeToken();
  const permissionRoutes = usePermissionRoutes();
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
    <div className="hidden w-full h-full md:block">
      <div className="flex items-center justify-center" style={{ height: HEADER_HEIGHT + 'px' }}>
        <Logo />
        {layout === ELayout.Vertical && (
          <div className="text-xl ml-2 font-bold" style={{ color: colorPrimary }}>
            {NAME}
          </div>
        )}
      </div>
      <div className="overflow-y-hidden" style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        <AntdWrapped>
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
            }}
          />
        </AntdWrapped>
      </div>
    </div>
  );
});

export default AsideVertical;
