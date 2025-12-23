import { memo } from 'react';
import { Dropdown } from 'antd';

import SvgIcon from '@/components/icons/SvgIcon';
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
          <SvgIcon size={20} icon="fa6-solid--link"></SvgIcon>
        </IButton>
      </span>
    </Dropdown>
  );
});

export default Link;
