import { CSSProperties, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Tabs, TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import Iconify from '@/components/icons/Iconify';
import { useThemeToken } from '@/hooks/themeToken';
import { usePermissionRoutes } from '@/hooks/formatRoute';

import { menuFilter, flattenTree } from '@/utils';
import { ESize } from '@/enum';

interface ITabs {
  key: string;
  label: React.ReactNode;
  closable: boolean;
}

const MultiTabs = memo(() => {
  const { colorPrimaryText, colorBgContainer, colorBorderSecondary } = useThemeToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const permissionRoutes = usePermissionRoutes();
  const { t } = useTranslation();
  const { TAGS_VIEW_HEIGHT } = ESize;

  const tabsWrapper = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState<ITabs[]>([]);
  const [hoveringTabKey, setHoveringTabKey] = useState('');

  const flattenMenus = useMemo(() => {
    return flattenTree(menuFilter(permissionRoutes));
  }, [permissionRoutes]);

  //tabs初始化
  useEffect(() => {
    const activeMenu = flattenMenus.find((item) => item.meta.key === pathname);

    if (activeMenu && !activeMenu.children && !activeMenu.meta.hideTab) {
      setActiveKey(activeMenu.meta.key);
      if (items.findIndex((item) => item.key === pathname) === -1) {
        setItems((prev) => [
          ...prev,
          { label: t(activeMenu.meta.label), key: activeMenu.meta.key, closable: items.length > 1 },
        ]);
      }
    }
  }, [items, pathname, t, flattenMenus]);
  //tabs滚动
  useEffect(() => {
    function handleMouseWheel(event: WheelEvent) {
      event.preventDefault();
      tabsWrapper.current!.scrollLeft += event.deltaY;
    }

    tabsWrapper.current!.addEventListener('mouseenter', () => {
      tabsWrapper.current!.addEventListener('wheel', handleMouseWheel);
    });
    tabsWrapper.current!.addEventListener('mouseleave', () => {
      tabsWrapper.current!.removeEventListener('wheel', handleMouseWheel);
    });
  }, []);
  //如果tabs过长，切换页面使其滚动到指定位置
  useEffect(() => {
    if (!tabsWrapper || !tabsWrapper.current) {
      return;
    }
    const index = items.findIndex((tab) => tab.key === activeKey);
    const currentEle = tabsWrapper.current.querySelector(`#tab-${index}`);
    if (currentEle) {
      currentEle.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeKey, items]);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const tabItemStyle = useCallback(
    (tab: any): CSSProperties => {
      const isActive = tab.key === activeKey || tab.key === hoveringTabKey;
      const tabItem: CSSProperties = {
        width: 'auto',
        // border: `1px solid ${aplhaColor(colorBorder, 0.6)}`,
        border: `1px solid ${colorBorderSecondary}`,
        borderRadius: '10px',
        padding: '4px 16px',
        margin: '0 2px',
        userSelect: 'none',
        cursor: 'pointer',
        transition: '.5s',
      };

      if (isActive) {
        tabItem.backgroundColor = colorBgContainer;
        tabItem.color = colorPrimaryText;
      }
      return tabItem;
    },
    [activeKey, hoveringTabKey, colorPrimaryText, colorBgContainer, colorBorderSecondary],
  );
  const renderTabBar: TabsProps['renderTabBar'] = useCallback(() => {
    const closeTab = (tab: any, index: number) => {
      if (tab.key === activeKey) {
        let key = '';
        if (index === 0) {
          key = items[index + 1].key;
        } else {
          key = items[index - 1].key;
        }
        setActiveKey(key);
        navigate(key);
      }
      setItems(items.filter((item) => item.key !== tab.key));
    };
    return (
      <div
        ref={tabsWrapper}
        className="flex items-center"
        style={{ overflowX: 'auto', width: '100%' }}
      >
        {items.map((item, index) => {
          return (
            <div
              id={`tab-${index}`}
              style={tabItemStyle(item)}
              key={item.key}
              onMouseEnter={() => {
                if (item.key === activeKey) return;
                setHoveringTabKey(item.key);
              }}
              onMouseLeave={() => setHoveringTabKey('')}
              onClick={() => {
                if (item.key === activeKey) return;
                setActiveKey(item.key);
                navigate(item.key);
              }}
            >
              {/*  white-space: nowrap; 阻止文本换行 */}
              <div className="flex items-center whitespace-nowrap">
                <>{item.label}</>
                <Iconify
                  icon="ion:close-outline"
                  size={18}
                  className="cursor-pointer opacity-50"
                  style={{
                    display:
                      (item.key !== activeKey && item.key !== hoveringTabKey) || items.length === 1
                        ? 'none'
                        : 'block',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(item, index);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [items, activeKey, hoveringTabKey, tabItemStyle, navigate]);
  return (
    <TabsWrapper style={{ height: TAGS_VIEW_HEIGHT + 'px', padding: '0 18px' }}>
      <Tabs
        size="small"
        type="card"
        onChange={onChange}
        activeKey={activeKey}
        items={items}
        renderTabBar={renderTabBar}
      />
    </TabsWrapper>
    // </div>
  );
});
const TabsWrapper = styled.div`
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
    padding: 4px 16px;
  }
  .ant-tabs-nav::before {
    border-bottom: none !important;
  }
  .ant-tabs .ant-tabs-tab .anticon {
    margin-right: 0;
  }
  //隐藏滚动条
  ::-webkit-scrollbar {
    display: none;
  }
`;
export default MultiTabs;
