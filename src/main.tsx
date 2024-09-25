import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
// import Loading from '@/components/Loading';

import store from '@/store';
import worder from '@/mock';

import './style';

//vite-plugin-svg-icons
import 'virtual:svg-icons-register';

// i18n
import './i18n';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HelmetProvider>
      <Suspense fallback={<div>loading</div>}>
        <App />
      </Suspense>
    </HelmetProvider>
  </Provider>,
);

//msw
// https://mswjs.io/docs/api/setup-worker/start
//注册 Service Worker 并开始请求拦截。
await worder.start({
  onUnhandledRequest: 'bypass', //决定如何响应未处理的请求(即那些没有匹配请求处理程序的请求) 不打印
});
