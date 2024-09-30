import { Helmet } from 'react-helmet-async';
import { App as AntdApp, Watermark } from 'antd';

import AntdTheme from '@/components/AntdTheme';
import Router from './router';

import Logo from './assets/logo.svg';
import { NAME } from './utils/config';
import { useAppSelector } from './hooks/redux';

function App() {
  const { watermark } = useAppSelector((state) => state.settings);
  return (
    <AntdTheme>
      <AntdApp>
        <Helmet>
          <title>{NAME}</title>
          <link rel="icon" type="image/svg+xml" href={Logo} />
        </Helmet>
        {watermark ? (
          <Watermark content={NAME}>
            <Router />
          </Watermark>
        ) : (
          <Router />
        )}
      </AntdApp>
    </AntdTheme>
  );
}

export default App;
