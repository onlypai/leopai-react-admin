import { memo, useState, useEffect } from 'react';
import { Card, Drawer, Tooltip, Switch, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import Iconify from '@/components/icons/Iconify';
import IButton from '@/components/IButton';
import { Vertical, Mini, Horizontal } from './layoutCpns';

import { useColor } from '@/hooks/color';
import { useThemeToken } from '@/hooks/themeToken';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSettings } from '@/store/modules/settings';
import { colorPresets } from '@/utils/theme';

import { ELayout, ETheme, EThemeColor } from '@/enum';
import type { payloadType } from '@/store/modules/settings';

const index = memo(() => {
  const dispatch = useAppDispatch();
  const { aplhaColor } = useColor();
  const [drawVisible, setDrawVisible] = useState(false);
  const [isFollowSys, setIsFollowSys] = useState(false);
  const { colorTextSecondary, colorPrimary } = useThemeToken();

  const { theme, themeColor, breadCrumb, tagsView, watermark } = useAppSelector(
    (state) => state.settings,
  );

  // 更新配置选项
  const setStoreSettings = (payload: payloadType, e?: React.MouseEvent<HTMLDivElement>) => {
    //更换主题色加入动画

    //所有的都添加渐入渐出动画
    const viewTransition = document.startViewTransition(() => {
      dispatch(setSettings(payload));
    });
    //只有主题色切换使用圆心放大动画，效果更好
    if (payload.key === 'theme' && e) {
      viewTransition.ready.then(() => {
        const x = e!.clientX;
        const y = e!.clientY;
        document.documentElement.animate(
          {
            clipPath: [`circle(0% at ${x}px ${y}px)`, `circle(100% at ${x}px ${y}px)`],
          },
          {
            duration: 400,
            pseudoElement: '::view-transition-new(root)', // style/base.css屏幕截图默认动画关闭
          },
        );
      });
    }
  };

  // 检查系统首选主题
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  const setTheme = (matches: boolean, e?: React.MouseEvent<HTMLDivElement>) => {
    if (matches) {
      setStoreSettings({ key: 'theme', value: ETheme.Dark }, e);
    } else {
      setStoreSettings({ key: 'theme', value: ETheme.Light }, e);
    }
  };

  const setThemeMode = (
    e: React.MouseEvent<HTMLDivElement>,
    isFollowSys: boolean,
    theme?: ETheme,
  ) => {
    setIsFollowSys(isFollowSys);
    if (isFollowSys) {
      setTheme(prefersDarkScheme.matches, e);
    } else {
      setStoreSettings({ key: 'theme', value: theme! }, e);
    }
  };

  useEffect(() => {
    prefersDarkScheme.addEventListener('change', (event) => {
      setTheme(event.matches);
    });
  });

  return (
    <>
      <Drawer
        title="Settings"
        closable={false}
        width={340}
        onClose={() => setDrawVisible(false)}
        open={drawVisible}
        style={{
          borderRadius: '12px 0 0 12px',
          overflow: 'hidden',
        }}
        extra={
          <IButton onClick={() => setDrawVisible(false)} className="h-9 w-9 hover:scale-105">
            <CloseOutlined className="text-lg text-gray-400" />
          </IButton>
        }
      >
        <>
          <Divider variant="dashed" style={{ borderColor: aplhaColor(colorPrimary, 0.5) }} dashed>
            Theme Mode
          </Divider>
          <div className="flex justify-between">
            <Tooltip title="亮色">
              <Card
                onClick={(e) => setThemeMode(e, false, ETheme.Light)}
                className="text-center w-[30%] cursor-pointer"
              >
                <Iconify
                  icon="ph:sun-bold"
                  size="24"
                  color={!isFollowSys && theme === ETheme.Light ? colorPrimary : ''}
                />
              </Card>
            </Tooltip>
            <Tooltip title="暗色">
              <Card
                onClick={(e) => setThemeMode(e, false, ETheme.Dark)}
                className="text-center w-[30%] cursor-pointer"
              >
                <Iconify
                  icon="solar:moon-sleep-bold-duotone"
                  size="24"
                  color={!isFollowSys && theme === ETheme.Dark ? colorPrimary : ''}
                />
              </Card>
            </Tooltip>
            <Tooltip title="跟随系统">
              <Card
                onClick={(e) => setThemeMode(e, true)}
                className="text-center w-[30%] cursor-pointer"
              >
                <Iconify
                  icon="icon-park-twotone:system"
                  size="24"
                  color={isFollowSys ? colorPrimary : ''}
                />
              </Card>
            </Tooltip>
          </div>
        </>
        <>
          <Divider variant="dashed" style={{ borderColor: aplhaColor(colorPrimary, 0.5) }} dashed>
            Layout
          </Divider>
          <div className="flex justify-between">
            <Vertical
              onClick={() => setStoreSettings({ key: 'layout', value: ELayout.Vertical })}
            />
            <Mini onClick={() => setStoreSettings({ key: 'layout', value: ELayout.Mini })} />
            <Horizontal
              onClick={() => setStoreSettings({ key: 'layout', value: ELayout.Horizontal })}
            />
          </div>
        </>
        <>
          <Divider variant="dashed" style={{ borderColor: aplhaColor(colorPrimary, 0.5) }} dashed>
            Theme Color
          </Divider>
          <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            {Object.entries(colorPresets).map(([key, color]) => (
              <Card
                key={key}
                className="text-center w-full cursor-pointer"
                style={{ backgroundColor: themeColor === key ? aplhaColor(color, 0.2) : '' }}
                onClick={() => setStoreSettings({ key: 'themeColor', value: key as EThemeColor })}
              >
                <Iconify icon="ion:color-palette" size="24" color={color} />
              </Card>
            ))}
          </div>
        </>
        <>
          <Divider variant="dashed" style={{ borderColor: aplhaColor(colorPrimary, 0.5) }} dashed>
            Page Display
          </Divider>
          <div className="flex flex-col gap-2">
            <div className="flex-cb">
              <div style={{ color: colorTextSecondary }}>BreadCrumb</div>
              <Switch
                size="small"
                checked={breadCrumb}
                onChange={(checked) => setStoreSettings({ key: 'breadCrumb', value: checked })}
              />
            </div>
            <div className="flex-cb">
              <div style={{ color: colorTextSecondary }}>TagsView</div>
              <Switch
                size="small"
                checked={tagsView}
                onChange={(checked) => setStoreSettings({ key: 'tagsView', value: checked })}
              />
            </div>
            <div className="flex-cb">
              <div style={{ color: colorTextSecondary }}>Watermark</div>
              <Switch
                size="small"
                checked={watermark}
                onChange={(checked) => setStoreSettings({ key: 'watermark', value: checked })}
              />
            </div>
          </div>
        </>
      </Drawer>
      <IButton onClick={() => setDrawVisible(true)}>
        <Iconify size={22} icon="ion:settings-sharp"></Iconify>
      </IButton>
    </>
  );
});

export default index;
