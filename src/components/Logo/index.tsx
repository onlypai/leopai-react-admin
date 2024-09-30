import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';

import { useThemeToken } from '@/hooks/themeToken';
import SvgIcon from '@/components/icons/SvgIcon';

import { ELayout, ESize } from '@/enum';
import { NAME } from '@/utils/config';

interface Props {
  size?: string;
}
const index = memo(({ size = '4em' }: Props) => {
  const { HEADER_HEIGHT } = ESize;
  const { colorPrimary } = useThemeToken();
  const { layout } = useAppSelector((state) => state.settings);

  return (
    <NavLink to="/">
      <div className="flex items-center justify-center" style={{ height: HEADER_HEIGHT + 'px' }}>
        <SvgIcon icon="logo" color={colorPrimary} size={size}></SvgIcon>
        {layout !== ELayout.Mini && (
          <div className="text-xl ml-2 font-bold text-nowrap" style={{ color: colorPrimary }}>
            {NAME}
          </div>
        )}
      </div>
    </NavLink>
  );
});

export default index;
