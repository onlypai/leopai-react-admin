import { memo, CSSProperties, useMemo } from 'react';
import { shallowEqual } from 'react-redux';

import { useThemeToken } from '@/hooks/themeToken';
import { ESize, ELayout } from '@/enum';
import { useAppSelector } from '@/hooks/redux';

import Fold from './cpns/Fold';
import Logo from '@/components/Logo';

const index = memo(() => {
  const { layout } = useAppSelector((state) => state.settings, shallowEqual);
  const { colorBorder } = useThemeToken();
  const { HEADER_HEIGHT } = ESize;

  const isHorizontal = useMemo(() => layout === ELayout.Horizontal, [layout]);

  const headerStyle: CSSProperties = {
    height: `${HEADER_HEIGHT}px`,
    borderBottom: layout === ELayout.Horizontal ? `1px dashed ${colorBorder}` : 'none',
  };
  return (
    <header>
      {/* headerStyle中高度需要计算，计算之前有一个默认高度，这个过程会闪烁⭐，外部加一个header标签 */}
      <div
        style={headerStyle}
        className={`w-full flex items-center justify-between px-10 box-border ${
          !isHorizontal ? 'pl-0' : ''
        }`}
      >
        <div className="flex items-center">
          <div className={`${isHorizontal ? 'mr-6' : ''}`}>
            {!isHorizontal ? <Fold /> : <Logo />}
          </div>
        </div>
        <div className="flex items-center "></div>
      </div>
    </header>
  );
});

export default index;