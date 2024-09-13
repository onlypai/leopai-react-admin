import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const index = memo(() => {
  const { t } = useTranslation();
  return <div>{t('hello_world')}</div>;
});

export default index;
