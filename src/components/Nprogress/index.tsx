import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { memo, useEffect, useState } from 'react';

import { useThemeToken } from '@/hooks/themeToken';
import { useLocation } from 'react-router-dom';

const changeNprogress = (colorPrimary: string) => {
  const nprogress = document.getElementById('nprogress');
  if (nprogress) {
    const bar: HTMLElement = nprogress.querySelector('.bar') as HTMLElement;

    bar.style.background = colorPrimary;
  }
};

const index = memo(() => {
  const { pathname } = useLocation();
  const { colorPrimary } = useThemeToken();

  const [mounted, setMounted] = useState(false); //组件是否挂载

  useEffect(() => {
    setMounted(true); //组件挂载
  }, []);

  useEffect(() => {
    changeNprogress(colorPrimary);
    //加载进度条
    NProgress.configure({
      showSpinner: false,
    });
    NProgress.start();

    //边缘情况，确保逻辑严密性
    if (mounted) {
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [pathname, mounted, colorPrimary]);

  // 控制进度条的显示、隐藏及样式调整。
  return null;
});

export default index;
