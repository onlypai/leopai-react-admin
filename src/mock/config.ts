import { faker } from '@faker-js/faker';
import { EPermission } from '@/enum';

const PERMISSIONS = [
  //首页
  {
    id: '6440331230149425',
    label: 'menu.home',
    parentId: '',
    type: EPermission.MENU,
    route: 'home',
    icon: 'ion:home',
    component: '/home/index.tsx',
  },
  //测试页面
  {
    id: '3380918801154644',
    label: 'test',
    parentId: '',
    type: EPermission.CATALOGUE,
    route: 'test',
    icon: 'codicon:copilot',
    children: [
      {
        id: '8551082552692133',
        label: 'testChild',
        parentId: '3380918801154644',
        type: EPermission.MENU,
        route: 'testChild',
        icon: 'codicon:bracket-error',
        component: '/test/testChild/index.tsx',
      },
    ],
  },
];

export const USERS = [
  {
    id: '3f8c23c7-c872-408f-8d1b-a65fe28e3c81',
    username: 'admin',
    email: faker.internet.email(),
    avatar: faker.image.avatarGitHub(),
    createdAt: faker.date.anytime(),
    password: 'admin123456',
    permissions: PERMISSIONS,
  },
];
