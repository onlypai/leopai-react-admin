import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zh_CN from './lang/zh.json';
import en_US from './lang/en.json';

import { ELanguage, EStorage } from '@/enum';

i18n
  // 语言偏好
  .use(LanguageDetector)
  // React 集成
  .use(initReactI18next)
  // init i18next
  // https://www.i18next.com/overview/configuration-options
  .init({
    debug: true, // 将信息到控制台输出
    // 应用程序使用 i18next 的 LanguageDetector 插件检测用户的语言偏好，保存在本地，键为i18nextLng，没有字符串序列化，不使用封装的获取本地存储的方法
    lng: localStorage.getItem(EStorage.I18N) || (ELanguage.en_US as string), //设置应用的默认语言
    fallbackLng: ELanguage.en_US, //当当前语言的翻译缺失时，使用回退语言。
    resources: {
      en_US: { translation: en_US },
      zh_CN: { translation: zh_CN },
    }, //i18n初始化资源
    interpolation: {
      escapeValue: false, // 配置插值选项，这里设置 escapeValue 为 false，因为在 React 中默认会进行转义。
    },
  });

export default i18n;
export const { t } = i18n;
