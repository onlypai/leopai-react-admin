import { memo } from 'react';

import Iconify from '@/components/icons/Iconify';
import IButton from '@/components/IButton';

import { useThemeToken } from '@/hooks/themeToken';

import { GITHUB_URL } from '@/utils/config';

const github = memo(() => {
  const { colorTextSecondary } = useThemeToken();
  return (
    <IButton
      style={{
        color: colorTextSecondary,
      }}
      onClick={() => window.open(GITHUB_URL, '_blank')}
    >
      <Iconify size={20} icon="lucide:github"></Iconify>
    </IButton>
  );
});

export default github;
