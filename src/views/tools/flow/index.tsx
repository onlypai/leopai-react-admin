import { memo, useEffect, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { useAppSelector } from '@/hooks/redux';
import { debounce } from 'lodash';
import localCache from '@/utils/localCache';
import { EStorage } from '@/enum';

import { ETheme } from '@/enum';

//https://docs.excalidraw.com/
const index = memo(() => {
  const { theme } = useAppSelector((state) => state.settings);
  const [flowData, setFlowData] = useState<any[]>([]);
  useEffect(() => {
    const flowData = localCache.getCache(EStorage.FlowData);
    if (flowData) {
      setFlowData(flowData as any[]);
    }
  }, []);
  return (
    <div>
      <div style={{ height: 'calc(100vh - 105px)' }}>
        <Excalidraw
          initialData={{
            elements: flowData,
            appState: { zenModeEnabled: true },
            scrollToContent: true,
          }}
          theme={theme === ETheme.Dark ? 'dark' : 'light'}
          onChange={debounce((e) => {
            setFlowData(e);
            localCache.setCache(EStorage.FlowData, e);
          }, 1000)}
        />
      </div>
    </div>
  );
});

export default index;
