import { Helmet } from 'react-helmet-async';
import { App as AntdApp } from 'antd';

import AntdTheme from '@/components/AntdTheme';
import Router from './router';

import Logo from './assets/logo.svg';
import { NAME } from './utils/config';

function App() {
  return (
    <AntdTheme>
      <AntdApp>
        <Helmet>
          <title>{NAME}</title>
          <link rel="icon" type="image/svg+xml" href={Logo} />
        </Helmet>
        <Router />
      </AntdApp>
    </AntdTheme>
  );
}

export default App;
