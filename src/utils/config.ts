import { EThemeColor } from '@/enum';

// themeColor
export const COLORPRESETS: {
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

export const NAME = 'Leopai React Admin';
export const GITHUB_URL = 'https://github.com/onlypai/leopai-react-admin';
export const LINK_URLS = [
  {
    name: 'React',
    url: 'https://react.docschina.org/',
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Vite',
    url: 'https://vitejs.cn/vite3-cn/',
  },
  {
    name: 'Ant Design',
    url: 'https://ant.design/',
  },
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
  },
];
