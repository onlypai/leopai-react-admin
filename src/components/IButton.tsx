// 按钮
import { memo } from 'react';
import { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IButton = memo(({ children, style = {}, className = '', onClick }: Props) => {
  return (
    <button
      style={style}
      className={`flex-cc hover:bg-[#66737d15] rounded-full p-2.5 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default IButton;
