import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setUserInfo, logoutAction } from './user';
import localCache from '@/utils/localCache';

import { Permission } from '@/types/router';
import { EStorage } from '@/types/enum';

export interface IPermissions {
  permissions: Permission[];
}

//在 Redux 中，状态必须是可序列化的，就是这里状态不应该包含 React 元素⭐，所以这里只保存原始permission数据
const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: (): IPermissions => ({
    permissions: localCache.getCache<Permission[]>(EStorage.Permissions) || [],
  }),
  reducers: {
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.permissions = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(setUserInfo, (state, action) => {
      state.permissions = action.payload.permissions || [];
    });
    builder.addCase(logoutAction, (state) => {
      state.permissions = [];
      localCache.removeCache(EStorage.Permissions);
    });
  },
});
export const { setPermissions } = permissionsSlice.actions;

export default permissionsSlice.reducer;
