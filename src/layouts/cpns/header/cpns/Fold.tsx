import { memo, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

import IButton from '@/components/IButton';
import Iconify from '@/components/icons/Iconify';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useThemeToken } from '@/hooks/themeToken';
import { setSettings } from '@/store/modules/settings';

import { ELayout } from '@/enum';

const Fold: React.FC = memo(() => {
  const { layout } = useAppSelector((state) => state.settings, shallowEqual);
  const { colorTextSecondary } = useThemeToken();

  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false); //false未折叠

  useEffect(() => {
    if (layout === ELayout.Vertical) {
      setCollapsed(false);
    }
    if (layout === ELayout.Mini) {
      setCollapsed(true);
    }
  }, [layout]);

  const toggleCollapsed = () => {
    if (!collapsed) {
      dispatch(setSettings({ key: 'layout', value: ELayout.Mini }));
    } else {
      dispatch(setSettings({ key: 'layout', value: ELayout.Vertical }));
    }
    setCollapsed(!collapsed);
  };
  return (
    <IButton
      onClick={toggleCollapsed}
      style={{
        color: colorTextSecondary,
      }}
      className="mx-5"
    >
      {collapsed ? (
        <Iconify icon="line-md:menu-unfold-right" size={20} />
      ) : (
        <Iconify icon="line-md:menu-unfold-left" size={20} />
      )}
    </IButton>
  );
});

export default Fold;
