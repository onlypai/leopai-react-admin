import { memo } from 'react';

import SvgIcon from '@/components/icons/SvgIcon';
import IButton from '@/components/IButton';

import { GITHUB_URL } from '@/utils/config';

const Github = memo(() => {
  return (
    <IButton onClick={() => window.open(GITHUB_URL, '_blank')}>
      <SvgIcon size={20} icon="akar-icons--github-fill"></SvgIcon>
    </IButton>
  );
});

export default Github;
