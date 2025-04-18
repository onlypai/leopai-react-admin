// 按钮
import { memo } from 'react';
import { CSSProperties, ReactNode } from 'react';
import { useThemeToken } from '@/hooks/themeToken';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const index = memo(({ children, style = {}, className = '', onClick }: Props) => {
  const { colorTextSecondary } = useThemeToken();
  return (
    <button
      style={{ color: colorTextSecondary, ...style }}
      className={`flex-cc hover:scale-150 duration-200 rounded-full p-2.5 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default index;
