import { memo, useMemo } from 'react';

import { useThemeToken } from '@/hooks/themeToken';
import { ESize, ELayout } from '@/enum';
import { useAppSelector } from '@/hooks/redux';

import Github from './cpns/Github';
import Link from './cpns/Link';
import Lang from './cpns/Lang';
import AccountDropdown from './cpns/AccountDropdown';
import ScreenFull from './cpns/ScreenFull';
import Config from './cpns/config';
import AsideHorizontal from '../aside/AsideHorizontal';
import Fold from '../header/cpns/Fold';
import BreadCrumb from '../header/cpns/BreadCrumb';

const index = memo(() => {
  const { layout, breadCrumb } = useAppSelector((state) => state.settings);
  const { colorBgContainer } = useThemeToken();
  const { HEADER_HEIGHT, LAYOUT_GAP } = ESize;

  const isHorizontal = useMemo(() => layout === ELayout.Horizontal, [layout]);

  return (
    <header
      style={{
        background: colorBgContainer,
        marginBottom: LAYOUT_GAP + 'px',
      }}
    >
      <div
        style={{ height: `${HEADER_HEIGHT}px` }}
        className={`h-full flex-cb pr-5 ${!isHorizontal ? 'pl-0' : ''}`}
      >
        <div className="flex items-center flex-1">
          {isHorizontal ? (
            <AsideHorizontal />
          ) : (
            <>
              <Fold />
              {breadCrumb ? <BreadCrumb /> : null}
            </>
          )}
        </div>
        <div className="flex items-center ">
          <Github />
          <ScreenFull />
          <Lang />
          <Link />
          <Config />
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
});

export default index;
