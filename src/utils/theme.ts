import { EThemeColor, ETheme } from '@/enum';
import { ThemeConfig } from 'antd';

// themeColor
export const colorPresets: {
  [k in EThemeColor]: string;
} = {
  c1: '#6c63ff',
  c2: '#f50057',
  c3: '#06ad56',
  c4: '#c084fc',
  c5: '#f97316',
  c6: '#3b82f6',
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
