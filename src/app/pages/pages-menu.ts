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
  {
    title: 'Mã giảm giá',
    icon: 'pricetags-outline',
    children: [
      {
        title: 'Danh Sách',
        link: '/pages/vouchers/list',
      },
    ],
  },
  {
    title: 'Đơn Hàng',
    icon: 'shopping-cart-outline',
    children: [
      {
        title: 'Danh Sách',
        link: '/pages/bills/list',
      }
    ]
  },
  {
    title: 'Tài khoản khách hàng',
    icon: 'person-outline',
    children: [
      {
        title: 'Danh Sách',
        link: '/pages/customers/list',
      },
    ],
  },
  {
    title: 'Đánh giá',
    icon: 'message-square-outline',
    children: [
      {
        title: 'Danh Sách',
        link: '/pages/feedback/list',
      }
    ]
  },
  {
    title: 'Vai trò',
    icon: 'people-outline',
    children: [
      {
        title: 'Danh Sách',
        link: '/pages/roles/list',
      },
    ],
  },
];
