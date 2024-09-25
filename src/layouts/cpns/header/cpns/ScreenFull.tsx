import { memo, useEffect, useState } from 'react';
import screenfull from 'screenfull';

import Iconify from '@/components/icons/Iconify';
import IButton from '@/components/IButton';

function isFullScreen() {
  return !!document.fullscreenElement;
}
const ScreenFull = memo(() => {
  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);

  useEffect(() => {
    window.addEventListener(
      'fullscreenchange',
      function () {
        setIsFullscreen(isFullScreen());
      },
      false,
    );
  });
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };
  return (
    <IButton onClick={toggleFullScreen}>
      <div className="flex items-center justify-center">
        {isFullscreen ? (
          <>
            <Iconify size={20} icon="material-symbols:zoom-in-map" />
          </>
        ) : (
          <>
            <Iconify size={20} icon="material-symbols:zoom-out-map" />
          </>
        )}
      </div>
    </IButton>
  );
});

export default ScreenFull;
