import request from '../index';
import type { Account, loginResult, UserInfoResult } from './types';
export enum UserApi {
  Login = '/login',
  UserInfo = '/userInfo',
}

export function login(account: Account): Promise<loginResult> {
  return request<loginResult>({
    url: UserApi.Login,
    method: 'post',
    data: account,
  });
}
export function userInfo(): Promise<UserInfoResult> {
  return request<UserInfoResult>({
    url: UserApi.UserInfo,
  });
}
