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
import TagsView from '../tagsView';

const index = memo(() => {
  const { layout, breadCrumb, tagsView } = useAppSelector((state) => state.settings);
  const { colorBorderSecondary } = useThemeToken();
  const { HEADER_HEIGHT } = ESize;

  const isHorizontal = useMemo(() => layout === ELayout.Horizontal, [layout]);

  return (
    <header
      style={{
        borderBottom: `1px solid ${colorBorderSecondary}`,
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
      {tagsView ? <TagsView /> : null}
    </header>
  );
});

export default index;
