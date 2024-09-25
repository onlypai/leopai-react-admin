import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import { useThemeToken } from '@/hooks/themeToken';
import { useAppSelector } from '@/hooks/redux';

import { useColor } from '@/hooks/color';
import { ELayout } from '@/enum';

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Vertical = memo(({ onClick }: Props) => {
  const { layout } = useAppSelector((state) => state.settings, shallowEqual);
  const { colorPrimary, colorBorder, colorTextLabel } = useThemeToken();
  const { aplhaColor } = useColor();
  return (
    <div
      onClick={onClick}
      className="flex h-16 w-[30%] border-[1px] p-1 rounded-md cursor-pointer"
      style={{
        borderColor: layout === ELayout.Vertical ? aplhaColor(colorPrimary, 0.5) : colorBorder,
      }}
    >
      <div
        className="flex-1 rounded-md mr-1"
        style={{
          background:
            layout === ELayout.Vertical
              ? aplhaColor(colorPrimary, 0.5)
              : aplhaColor(colorTextLabel, 0.2),
        }}
      ></div>
      <div className="flex-[2] flex flex-col">
        <div
          className="flex-1 rounded-md mb-1"
          style={{
            background:
              layout === ELayout.Vertical ? colorPrimary : aplhaColor(colorTextLabel, 0.4),
          }}
        ></div>
        <div
          className="flex-[2] rounded-md"
          style={{
            background:
              layout === ELayout.Vertical
                ? aplhaColor(colorPrimary, 0.2)
                : aplhaColor(colorTextLabel, 0.1),
          }}
        ></div>
      </div>
    </div>
  );
});

const Mini = memo(({ onClick }: Props) => {
  const { layout } = useAppSelector((state) => state.settings, shallowEqual);
  const { colorPrimary, colorBorder, colorTextLabel } = useThemeToken();
  const { aplhaColor } = useColor();

  return (
    <div
      onClick={onClick}
      className="flex h-16 w-[30%] border-[1px] p-1 rounded-md cursor-pointer"
      style={{
        borderColor: layout === ELayout.Mini ? aplhaColor(colorPrimary, 0.5) : colorBorder,
      }}
    >
      <div
        className="flex-1 rounded-md mr-1"
        style={{
          background:
            layout === ELayout.Mini
              ? aplhaColor(colorPrimary, 0.5)
              : aplhaColor(colorTextLabel, 0.2),
        }}
      ></div>
      <div className="flex-[4] flex flex-col">
        <div
          className="flex-1 rounded-md mb-1"
          style={{
            background: layout === ELayout.Mini ? colorPrimary : aplhaColor(colorTextLabel, 0.4),
          }}
        ></div>
        <div
          className="flex-[2] rounded-md"
          style={{
            background:
              layout === ELayout.Mini
                ? aplhaColor(colorPrimary, 0.2)
                : aplhaColor(colorTextLabel, 0.1),
          }}
        ></div>
      </div>
    </div>
  );
});

const Horizontal = memo(({ onClick }: Props) => {
  const { layout } = useAppSelector((state) => state.settings, shallowEqual);
  const { colorPrimary, colorBorder, colorTextLabel } = useThemeToken();
  const { aplhaColor } = useColor();

  return (
    <div
      onClick={onClick}
      className="flex flex-col h-16 w-[30%] border-[1px] p-1 rounded-md cursor-pointer"
      style={{
        borderColor: layout === ELayout.Horizontal ? aplhaColor(colorPrimary, 0.5) : colorBorder,
      }}
    >
      <div
        className="flex-1 rounded-md mb-1"
        style={{
          background:
            layout === ELayout.Horizontal ? colorPrimary : aplhaColor(colorTextLabel, 0.4),
        }}
      ></div>
      <div
        className="flex-[2] rounded-md"
        style={{
          background:
            layout === ELayout.Horizontal
              ? aplhaColor(colorPrimary, 0.2)
              : aplhaColor(colorTextLabel, 0.1),
        }}
      ></div>
    </div>
  );
});
export { Vertical, Mini, Horizontal };
