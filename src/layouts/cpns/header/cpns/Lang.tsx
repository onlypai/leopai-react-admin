import { memo } from 'react';
import { Dropdown } from 'antd';

import Iconify from '@/components/icons/Iconify';
import IButton from '@/components/IButton';

import { langList, useI18n } from '@/hooks/i18n';

import type { MenuProps } from 'antd';

const Lang = memo(() => {
  const { setLanguage, lang } = useI18n();
  const items: MenuProps['items'] = langList.map((e) => ({
    label: <span>{e.name}</span>,
    key: e.lang,
    onClick: () => {
      setLanguage(e.lang);
    },
  }));

  return (
    <Dropdown menu={{ items, selectable: true, defaultSelectedKeys: [lang] }}>
      <span>
        <IButton>
          <Iconify size={20} icon="fa6-solid:language"></Iconify>
        </IButton>
      </span>
    </Dropdown>
  );
});

export default Lang;
