import { memo } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';

const index = memo(() => {
  return (
    <div>
      <div style={{ height: 'calc(100vh - 105px)' }}>
        <Excalidraw />
      </div>
    </div>
  );
});

export default index;
