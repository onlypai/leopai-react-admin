import { memo } from 'react';

import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';
import { useThemeToken } from '@/hooks/themeToken';

interface Props extends IconProps {
  size?: IconProps['width'];
}
const Iconify = memo(({ icon, size = '1em', className = '', style = {}, color }: Props) => {
  const { colorTextSecondary } = useThemeToken();
  return (
    <Icon
      icon={icon}
      color={color ? color : colorTextSecondary}
      style={style}
      width={size}
      height={size}
      className={`inline-block align-middle ${className}`}
    />
  );
});

export default Iconify;
