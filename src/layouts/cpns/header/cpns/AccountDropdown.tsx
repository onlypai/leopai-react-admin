import { App, Dropdown } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';

import IButton from '@/components/IButton';
import AvatarErrorUrl from '@/assets/images/avatarError.jpg';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logoutAction } from '@/store/modules/user';

import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

const Avatar = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const { userInfo } = useAppSelector((state) => state.user, shallowEqual);

  const logout = async () => {
    dispatch(logoutAction());
    message.success(t('login.logout_success'));
    navigate('/login', { replace: true });
  };
  const items: MenuProps['items'] = [
    {
      label: <button>{t('login.logout')}</button>,
      key: '0',
      onClick: logout,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <span>
        <IButton className="h-full">
          <img
            src={userInfo.avatar}
            alt=""
            onError={(e) => ((e.target as HTMLImageElement).src = AvatarErrorUrl)}
            className="h-6 w-6 rounded-full overflow-hidden font-mono font-bold text-lg"
          />
        </IButton>
      </span>
    </Dropdown>
  );
});

export default Avatar;
