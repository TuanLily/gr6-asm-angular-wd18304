import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Sản phẩm',
    icon: 'archive-outline',
    children: [
      {
        title: 'Danh Sách',
        link: '/pages/products/list',
      },
    ],
  },
  {
    title: 'Danh Mục',
    icon: 'list-outline',
    children: [
      {
        title: 'Danh Sách',
        link: '/pages/categories/list',
      },
    ],
  },
];