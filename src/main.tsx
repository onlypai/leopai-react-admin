import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './style/base.css';
import worder from '@/mock';

//vite-plugin-svg-icons
import 'virtual:svg-icons-register';

//msw
await worder.start();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
