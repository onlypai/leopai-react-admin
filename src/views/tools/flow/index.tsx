import { memo } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { useAppSelector } from '@/hooks/redux';

import { ETheme } from '@/enum';

//https://docs.excalidraw.com/
const index = memo(() => {
  const { theme } = useAppSelector((state) => state.settings);
  return (
    <div>
      <div style={{ height: 'calc(100vh - 105px)' }}>
        <Excalidraw theme={theme === ETheme.Dark ? 'dark' : 'light'} />
      </div>
    </div>
  );
});

export default index;
