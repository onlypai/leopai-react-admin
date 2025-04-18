import { memo } from 'react';
import { Dropdown } from 'antd';

import Iconify from '@/components/icons/Iconify';
import IButton from '@/components/IButton';

import { LINK_URLS } from '@/utils/config';

import type { MenuProps } from 'antd';

const items: MenuProps['items'] = LINK_URLS.map((e, i) => ({
  label: (
    <a target="_blank" rel="noopener noreferrer" href={e.url} key={e.name}>
      {e.name}
    </a>
  ),
  key: i.toString(),
}));

const Link = memo(() => {
  return (
    <Dropdown menu={{ items }}>
      <span>
        <IButton>
          <Iconify size={20} icon="fa6-solid:link"></Iconify>
        </IButton>
      </span>
    </Dropdown>
  );
});

export default Link;
