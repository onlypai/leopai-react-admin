import { memo } from 'react';

interface Props {
  icon: string;
  size?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}
const SvgIcon = memo(
  ({ icon, size = '1em', color = 'currentColor', className = '', style = {} }: Props) => {
    const SvgStyle = {
      width: size,
      height: size,
      color,
      ...style,
    };

    return (
      <svg aria-hidden="true" style={SvgStyle} className={`inline-block ${className}`}>
        <use href={`#icon-${icon}`} fill="currentColor" />
      </svg>
    );
  },
);

export default SvgIcon;
