import { EThemeColor, ETheme } from '@/enum';
import { ThemeConfig } from 'antd';

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
  c6: '#fe2c55', // #fe2c55红色
};

// Component Token
export const customComponent: Record<ETheme, ThemeConfig['components']> = {
  light: {
    Menu: {
      itemColor: '#575756',
    },
  },
  dark: {
    Menu: {
      itemColor: '#abacb0',
    },
  },
};

// antd token
export const themeTokenCover: Record<ETheme, ThemeConfig['token']> = {
  light: { colorBgElevated: '#fff' }, //#f9faf5
  dark: { colorBgContainer: '#1b1b1b', colorBgElevated: '#161616' },
};
