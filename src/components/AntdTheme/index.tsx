import { memo } from 'react';
import { ConfigProvider, theme as antdTheme, ThemeConfig } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import { useAppSelector } from '@/hooks/redux';
import { useI18n } from '@/hooks/i18n';
import { COLORPRESETS } from '@/utils/config';

import { ETheme } from '@/enum';

// Component Token
const customComponent: ThemeConfig['components'] = {
  Menu: {
    itemColor: '#575757',
  },
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
          colorPrimary: COLORPRESETS[themeColor],
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
