import { Permission } from '@/types/permission';

export interface Account {
  username: string;
  password: string;
}

export interface loginResult {
  accessToken?: string;
  refreshToken?: string;
}
export interface UserInfoResult {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
  avatar?: string;
  permissions?: Permission[];
}
