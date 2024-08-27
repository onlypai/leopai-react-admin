import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

import { USERS } from '../config';
import { UserApi } from '@/service/login/types';
import type { Account } from '@/service/login/types';

const loginUrl = import.meta.env.VITE_APP_BASEURL + UserApi.Login;
export default [
  //login
  http.post(loginUrl, async ({ request }) => {
    const { username, password } = (await request.json()) as Account;
    const user = USERS.find((e) => e.username === username);

    if (user && user.password === password) {
      return HttpResponse.json({
        status: 1000,
        message: '',
        data: {
          userInfo: user,
          accessToken: faker.string.uuid(),
          refreshToken: faker.string.uuid(),
        },
      });
    } else {
      return HttpResponse.json({
        status: 2000,
        message: '用户名或密码错误',
        data: null,
      });
    }
  }),
];
