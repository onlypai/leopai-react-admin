import { Permission } from '@/types/router';

export enum UserApi {
  Login = '/login',
}
export interface Account {
  username: string;
  password: string;
}

export interface UserInfo {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
  avatar?: string;
  createdAt: string;
  permissions?: Permission[];
}

export interface loginResult {
  accessToken?: string;
  refreshToken?: string;
  userInfo: UserInfo;
}
