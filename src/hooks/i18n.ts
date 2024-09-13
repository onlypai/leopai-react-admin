//设置钩子并集成antd国际化
import { useTranslation } from 'react-i18next';
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';

import { ELanguage } from '@/enum';

type LanguageKey = keyof typeof ELanguage;
export const langList = [
  {
    locale: en_US,
    name: 'English',
    lang: ELanguage.en_US,
  },
  {
    locale: zh_CN,
    name: '简体中文',
    lang: ELanguage.zh_CN,
  },
];
export const useI18n = () => {
  const { i18n } = useTranslation();
  // 当前使用语言
  const lang = (i18n.resolvedLanguage || ELanguage.en_US) as LanguageKey;
  // antd使用语言
  const antdLocale = langList.find((e) => e.lang === lang)!.locale;

  //设置语言
  const setLanguage = (lang: LanguageKey) => {
    i18n.changeLanguage(lang);
  };
  return { lang, antdLocale, setLanguage };
};
