import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
let user = JSON.parse(localStorage.getItem('userInfo'));
console.log("user",user);
var NavigationItems = [];

NavigationItems = [
  {
    id: 'navigation',
    hidden: (user && user.role === 1 ? false: true),
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'users',
    hidden: (user && user.role === 1 ? false: true),
    title: 'Users',
    type: 'collapse',
    icon: 'feather icon-users',
    children: [
      {
        id: 'add-user',
        title: 'Add User',
        type: 'item',
        icon: 'feather icon-user',
        url: '/admin/user/add',
        classes: 'nav-item'
      },
      {
        id: 'users-list',
        title: 'Users List',
        type: 'item',
        icon: 'feather icon-users',
        url: '/admin/user/all',
        classes: 'nav-item'
      },
      {
        id: 'users-disabled',
        title: 'Disabled Users',
        type: 'item',
        icon: 'feather icon-users',
        url: '/admin/user/disabled',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'dispensaries',
    hidden: (user && user.role === 1 ? false: true),
    title: 'Dispensaries',
    type: 'collapse',
    icon: 'feather icon-help-circle',
    children: [
      {
        id: 'add-dispensary',
        title: 'Add Dispensary',
        type: 'item',
        url: '/admin/dispensary/add',
        icon: 'feather icon-file-text',
        classes: 'nav-item'
      },
      {
        id: 'dispensaries-list',
        title: 'Dispensaries List',
        type: 'item',
        url: '/admin/dispensary/all',
        icon: 'feather icon-server',
        classes: 'nav-item'
      },
      {
        id: 'dispensaries-disabled',
        title: 'Disabled Dispensaries',
        type: 'item',
        url: '/admin/dispensary/disabled',
        icon: 'feather icon-server',
        classes: 'nav-item'
      },
    ]
  },
  {
    id: 'questions',
    hidden: (user && user.role === 1 ? false: true),
    title: 'Questions',
    type: 'collapse',
    icon: 'feather icon-box',
    children: [
      {
        id: 'add-questions',
        title: 'Add Questions',
        type: 'item',
        url: '/admin/quiz/add',
        icon: 'feather icon-file-text',
        classes: 'nav-item'
      },
      {
        id: 'questions-list',
        title: 'Group Questions List',
        type: 'item',
        url: '/admin/quiz/all',
        icon: 'feather icon-server',
        classes: 'nav-item'
      },
      {
        id: 'all-questions',
        title: 'All Questions',
        type: 'item',
        url: '/admin/quiz/questions',
        icon: 'feather icon-file',
        classes: 'nav-item'
      }
    ]
  },
  // {
  //   id: 'payment-methods',
  //   hidden: (user && user.role === 1 ? false: true),
  //   title: 'Payment Methods',
  //   type: 'collapse',
  //   icon: 'feather icon-shopping-cart',
  //   children: [
  //     {
  //       id: 'account-info',
  //       title: 'Account Info',
  //       type: 'item',
  //       url: '/admin/payment/info',
  //       icon: 'feather icon-file-text',
  //       classes: 'nav-item'
  //     },
  //     {
  //       id: 'all-transactions',
  //       title: 'Transactions List',
  //       type: 'item',
  //       url: '/admin/payment/all',
  //       icon: 'feather icon-server',
  //       classes: 'nav-item'
  //     }
  //   ]
  // },
  {
    id: 'dispensaries',
    hidden: (user && user.role === 2 ? false: true),
    title: 'Dispensaries',
    type: 'collapse',
    icon: 'feather icon-help-circle',
    children: [
      {
        id: 'add-dispensary',
        title: 'Add Dispensary',
        type: 'item',
        url: '/admin/dispensary/add',
        icon: 'feather icon-file-text',
        classes: 'nav-item'
      },
      // {
      //   id: 'dispensaries-list',
      //   title: 'Dispensary Profile',
      //   type: 'item',
      //   url: '/admin/dispensary/profile',
      //   icon: 'feather icon-server',
      //   classes: 'nav-item'
      // },
      {
        id: 'dispensaries-list',
        title: 'Dispensaries List',
        type: 'item',
        url: '/admin/dispensary/all',
        icon: 'feather icon-server',
        classes: 'nav-item'
      },
      {
        id: 'dispensaries-disabled',
        title: 'Disabled Dispensaries',
        type: 'item',
        url: '/admin/dispensary/disabled',
        icon: 'feather icon-server',
        classes: 'nav-item'
      }
      
    ]
  },
  {
    id: 'vouchers',
    hidden: (user && user.role === 1 ? false: true),
    title: 'Vouchers',
    type: 'item',
    url: '/admin/vouchers/all',
    icon: 'feather icon-anchor',
    classes: 'nav-item'
  },
  {
    id: 'logout',
    title: 'Logout',
    type: 'item',
    url: '/auth/logout',
    icon: 'feather icon-log-out',
    classes: 'nav-item'
  }

];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}



