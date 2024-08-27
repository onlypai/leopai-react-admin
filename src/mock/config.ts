import { faker } from '@faker-js/faker';

export const USERS = [
  {
    id: '3f8c23c7-c872-408f-8d1b-a65fe28e3c81',
    username: 'admin',
    email: faker.internet.email(),
    avatar: faker.image.avatarGitHub(),
    createdAt: faker.date.anytime(),
    password: 'admin123456',
    //   permissions: ADMIN_ROLE.permission,
  },
  {
    id: '054490d2-eafa-44b0-b3fa-0f9441c411b9',
    username: 'test',
    password: 'test123456',
    email: faker.internet.email(),
    avatar: faker.image.avatarGitHub(),
    createdAt: faker.date.anytime(),
    //   permissions: TEST_ROLE.permission,
  },
];
