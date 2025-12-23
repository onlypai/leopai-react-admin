import { faker } from '@faker-js/faker';
import { EPermission } from '@/enum';
//https://icon-sets.iconify.design/  菜单图标

const PERMISSIONS = [
  //首页
  {
    id: '6440331230149425',
    label: 'menu.home',
    parentId: '',
    type: EPermission.MENU,
    route: 'home',
    icon: 'ion--home',
    component: '/home/index.tsx',
  },
  //测试页面
  {
    id: '3380918801154644',
    label: 'test',
    parentId: '',
    type: EPermission.CATALOGUE,
    route: 'test',
    icon: 'codicon--copilot',
    children: [
      {
        id: '8551082552692133',
        label: 'testChild',
        parentId: '3380918801154644',
        type: EPermission.MENU,
        route: 'testChild',
        icon: 'solar--align-right-broken',
        component: '/test/testChild/index.tsx',
      },
    ],
  },
  {
    id: '3365818801154644',
    label: 'menu.tools',
    parentId: '',
    type: EPermission.CATALOGUE,
    route: 'tools',
    icon: 'streamline-plump--atom-solid',
    children: [
      {
        id: '8551082565892133',
        label: 'menu.toolsChildren.flow',
        parentId: '3365818801154644',
        type: EPermission.MENU,
        route: 'flow',
        icon: 'streamline-plump--hotel-bed-5-remix',
        component: '/tools/flow/index.tsx',
      },
      {
        id: '8551082567892133',
        label: 'menu.toolsChildren.jsonView',
        parentId: '3365818801154644',
        type: EPermission.MENU,
        route: 'jsonView',
        icon: 'mdi--code-json',
        component: '/tools/jsonView/index.tsx',
      },
    ],
  },
  {
    id: '3380925283154644',
    label: 'menu.example',
    parentId: '',
    type: EPermission.CATALOGUE,
    route: 'example',
    icon: 'solar--banknote-bold-duotone',
    children: [
      {
        id: '8553652567892133',
        label: 'menu.exampleChildren.select',
        parentId: '3380925283154644',
        type: EPermission.MENU,
        route: 'select',
        icon: 'solar--airbuds-remove-bold-duotone',
        component: '/tools/viselect/index.tsx',
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
