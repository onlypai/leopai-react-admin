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
  // Settings = 'settings',
  // I18N = 'i18nextLng',
}
