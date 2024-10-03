import { Helmet } from 'react-helmet-async';
import { App as AntdApp, Watermark } from 'antd';

import AntdTheme from '@/components/AntdTheme';
import Router from './router';

import Logo from './assets/logo.svg';
import { AppWrapped } from '@/style/app';
import { NAME } from './utils/config';
import { useAppSelector } from './hooks/redux';

function App() {
  const { watermark, theme } = useAppSelector((state) => state.settings);

  return (
    <AntdTheme>
      <AntdApp>
        <AppWrapped $theme={theme}>
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
        </AppWrapped>
      </AntdApp>
    </AntdTheme>
  );
}

export default App;
