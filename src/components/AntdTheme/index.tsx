import { memo } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import { useAppSelector } from '@/hooks/redux';
import { colorPresets } from './config';

import { ETheme } from '@/enum';

type Props = {
  children: React.ReactNode;
};

const index = memo(({ children }: Props) => {
  const { theme, themeColor } = useAppSelector((state) => state.settings);
  const algorithm = theme === ETheme.Light ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm;
  return (
    // antd全局配置
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: colorPresets[themeColor],
        },
      }}
    >
      {/* 取消降权: https://ant.design/docs/react/compatible-style-cn */}
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
});
export default index;
