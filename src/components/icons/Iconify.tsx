import { memo } from 'react';

import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';

interface Props extends IconProps {
  size?: IconProps['width'];
}
const Iconify = memo(({ icon, size = '1em', className = '', style = {}, color }: Props) => {
  return (
    <Icon
      icon={icon}
      color={color}
      style={style}
      width={size}
      height={size}
      className={`inline-block align-middle ${className}`}
    />
  );
});

export default Iconify;
