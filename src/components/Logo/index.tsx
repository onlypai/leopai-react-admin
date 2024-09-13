import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useThemeToken } from '@/hooks/themeToken';
import SvgIcon from '@/components/icons/SvgIcon';

interface Props {
  size?: string;
}
const Logo = memo(({ size = '4em' }: Props) => {
  const { colorPrimary } = useThemeToken();
  return (
    <NavLink to="/">
      <SvgIcon icon="logo" color={colorPrimary} size={size}></SvgIcon>
    </NavLink>
  );
});

export default Logo;
