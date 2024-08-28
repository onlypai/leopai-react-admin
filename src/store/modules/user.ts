import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '@/service/login';

import { Account, loginResult, UserInfo } from '@/service/login/types';
import localCache from '@/utils/localCache';

import type { PayloadAction } from '@reduxjs/toolkit';
import { EStorage } from '@/enum';

export interface IToken {
  accessToken?: string;
  refreshToken?: string;
}
export interface IUserState {
  token: IToken;
  userInfo: Partial<UserInfo>;
}
//createAsyncThunk return Promise
export const loginThunk = createAsyncThunk(
  'user/login',
  async (payload: Account, { dispatch, rejectWithValue }) => {
    try {
      const res: loginResult = await login(payload);
      //使用 rejectWithValue 返回一个错误状态
      if (!res) {
        return rejectWithValue('登录失败');
      }
      const { accessToken, refreshToken, userInfo } = res;
      const token = { accessToken, refreshToken };
      dispatch(setToken(token));
      dispatch(setUserInfo(userInfo));

      localCache.setCache(EStorage.Token, token);
      localCache.setCache(EStorage.UserInfo, userInfo);
      localCache.setCache(EStorage.Permissions, userInfo.permissions);
      return res;
    } catch (error) {
      //msw总是返回成功，不会到这里
      return rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: (): IUserState => {
    return {
      token: localCache.getCache<IToken>(EStorage.Token) || {},
      userInfo: localCache.getCache<UserInfo>(EStorage.UserInfo) || {},
    };
  },
  reducers: {
    setToken: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    logoutAction: (state) => {
      state.token = {};
      state.userInfo = {};
      localCache.removeCache(EStorage.Token);
      localCache.removeCache(EStorage.UserInfo);
    },
  },
});

export const { setToken, setUserInfo, logoutAction } = userSlice.actions;
export default userSlice.reducer;
