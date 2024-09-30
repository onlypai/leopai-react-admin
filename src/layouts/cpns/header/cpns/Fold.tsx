import { memo, useEffect, useState } from 'react';

import IButton from '@/components/IButton';
import Iconify from '@/components/icons/Iconify';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSettings } from '@/store/modules/settings';

import { ELayout } from '@/enum';

const Fold = memo(() => {
  const { layout } = useAppSelector((state) => state.settings);

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
    <IButton onClick={toggleCollapsed} className="mx-5">
      {collapsed ? (
        <Iconify icon="line-md:menu-unfold-right" size={20} />
      ) : (
        <Iconify icon="line-md:menu-unfold-left" size={20} />
      )}
    </IButton>
  );
});

export default Fold;
