import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ELayout, ETheme, EThemeColor, EStorage } from '@/enum';
import localCache from '@/utils/localCache';

export interface ISettings {
  theme: ETheme;
  layout: ELayout;
  themeColor: EThemeColor;
  zoom: boolean;
  breadCrumb: boolean;
  tagsView: boolean;
  watermark: boolean;
}
//payload类型
export interface payloadType {
  key: keyof ISettings;
  value: ISettings[keyof ISettings];
}
const { theme, layout, themeColor, zoom, breadCrumb, tagsView, watermark } =
  localCache.getCache<ISettings>(EStorage.Settings) || {};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: (): ISettings => ({
    theme: theme || ETheme.Light, //主题
    layout: layout || ELayout.Vertical, //布局
    themeColor: themeColor || EThemeColor.C1, //主题色
    zoom: zoom ?? false, //内容区域宽度缩放
    breadCrumb: breadCrumb ?? true, //面包屑
    tagsView: tagsView ?? false, //标签选项卡
    watermark: watermark ?? false, //水印
  }),
  reducers: {
    setSettings: (state, action: PayloadAction<payloadType>) => {
      //@ts-ignore
      state[action.payload.key] = action.payload.value;
      localCache.setCache(EStorage.Settings, { ...state });
    },
  },
});
export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
