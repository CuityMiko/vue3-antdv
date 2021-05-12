import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/classification_collection',
  name: 'ClassificationCollection',
  component: LAYOUT,
  redirect: '/classification_collection/collection_map',
  meta: {
    icon: 'ion:grid-outline',
    title: '分类收运',
  },
  children: [
    {
      path: 'collection_map',
      name: 'CollectionMap',
      component: () => import('/@/views/classification_collection/collection_map/index.vue'),
      meta: {
        affix: true,
        title: '收运地图',
      },
    },
    {
      path: 'alarm_manage',
      name: 'AlarmManage',
      component: () => import('/@/views/classification_collection/alarm_manage/index.vue'),
      meta: {
        title: '报警管理',
      },
    },
    {
      path: 'transfer_information',
      name: 'TransferInformation',
      component: () => import('/@/views/classification_collection/transfer_information/index.vue'),
      meta: {
        title: '中转站信息',
      },
    },
  ],
};

export default dashboard;
