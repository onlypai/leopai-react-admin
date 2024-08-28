import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
// import Loading from '@/components/Loading';

import store from '@/store';
import worder from '@/mock';

import './style/base';

//vite-plugin-svg-icons
import 'virtual:svg-icons-register';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Suspense fallback={<div>loading...</div>}>
      <App />
    </Suspense>
  </Provider>,
);

//msw
await worder.start();
