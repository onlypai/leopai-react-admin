import { memo } from 'react';
import { ConfigProvider, theme as antdTheme, ThemeConfig } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import { useAppSelector } from '@/hooks/redux';
import { useI18n } from '@/hooks/i18n';

import { ETheme, EThemeColor } from '@/enum';

// Component Token
const customComponent: ThemeConfig['components'] = {
  Menu: {
    itemColor: '#575757',
  },
};
// themeColor
export const colorPresets: {
  [k in EThemeColor]: string;
} = {
  c1: '#6c63ff',
  c2: '#1677ff',
  c3: '#42b883',
  // #18a058绿色
  c4: '#ff3d68',
  c5: '#fda92d',
  c6: '#ff235e',
};

type Props = {
  children: React.ReactNode;
};
const index = memo(({ children }: Props) => {
  const { antdLocale } = useI18n();
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
        components: { ...customComponent },
      }}
      locale={antdLocale}
    >
      {/* 取消降权: https://ant.design/docs/react/compatible-style-cn */}
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
});
export default index;
