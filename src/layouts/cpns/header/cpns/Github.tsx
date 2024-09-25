import { memo } from 'react';

import Iconify from '@/components/icons/Iconify';
import IButton from '@/components/IButton';

import { GITHUB_URL } from '@/utils/config';

const Github = memo(() => {
  return (
    <IButton onClick={() => window.open(GITHUB_URL, '_blank')}>
      <Iconify size={20} icon="akar-icons:github-fill"></Iconify>
    </IButton>
  );
});

export default Github;
