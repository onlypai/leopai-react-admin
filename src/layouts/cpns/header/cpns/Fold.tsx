import { memo, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

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
    <button
      onClick={toggleCollapsed}
      style={{
        color: colorTextSecondary,
        // borderColor: colorTextBase,
        fontSize: 16,
        margin: '0 20px',
        cursor: 'pointer',
      }}
    >
      {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
    </button>
  );
});

export default Fold;
