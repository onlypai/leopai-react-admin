export enum EResult {
  SUCCESS = 1000,
  ERROR = 2000,
}

export enum EPermission {
  CATALOGUE, //目录
  MENU, //菜单
  BUTTON, //按钮
}

export enum EStorage {
  Account = 'accountInfo',
  UserInfo = 'userInfo',
  Token = 'token',
  Permissions = 'permissions',
  Settings = 'settings',
  I18N = 'i18nextLng',
}

export enum ETheme {
  Light = 'light',
  Dark = 'dark',
}
export enum EThemeColor {
  C1 = 'c1',
  C2 = 'c2',
  C3 = 'c3',
  C4 = 'c4',
  C5 = 'c5',
  C6 = 'c6',
}
export enum ELayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ESize {
  ASIDE_WIDTH = 280,
  ASIDE_COLLAPSED_WIDTH = 90,
  HEADER_HEIGHT = 75, //header
  ASIDE_HORIZONTAL_HEIGHT = 48, //horizontal sider
  LABEL_TABS_HEIGHT = 32, //tab
}
export enum ELanguage {
  en_US = 'en_US',
  zh_CN = 'zh_CN',
}
