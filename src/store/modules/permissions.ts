import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setUserInfo, logoutAction } from './user';
import localCache from '@/utils/localCache';

import { Permission } from '@/router/types';
import { EStorage } from '@/enum';

export interface IPermissions {
  permissions: Permission[];
}

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
