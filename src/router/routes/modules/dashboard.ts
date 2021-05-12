import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    icon: 'clarity:dashboard-line',
    title: '工作台',
  },
  children: [
    {
      path: 'index',
      name: 'DashboardIndex',
      component: () => import('/@/views/dashboard/index.vue'),
      meta: {
        affix: true,
        title: '工作台',
        icon: 'clarity:dashboard-line',
      },
    },
  ],
};

export default dashboard;
