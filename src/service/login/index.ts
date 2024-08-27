import request from '../index';
import type { Account, loginResult } from './types';
import { UserApi } from './types';

export function login(account: Account): Promise<loginResult> {
  return request<loginResult>({
    url: UserApi.Login,
    method: 'post',
    data: account,
  });
}
