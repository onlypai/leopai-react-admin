import { memo } from 'react';
import { Dropdown } from 'antd';

import SvgIcon from '@/components/icons/SvgIcon';
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
          <SvgIcon size={20} icon="fa6-solid--language" />
        </IButton>
      </span>
    </Dropdown>
  );
});

export default Lang;
