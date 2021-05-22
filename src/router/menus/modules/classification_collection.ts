import type { MenuModule } from '/@/router/types';

const menu: MenuModule = {
  orderNo: 30,
  menu: {
    name: '分类收运',
    path: '/classification_collection',
    children: [
      {
        path: 'collection_map',
        name: '收运地图',
      },
      {
        path: 'alarm_manage',
        name: '报警管理',
      },
      {
        path: 'collection_ability',
        name: '收运能力',
        children: [
          {
            path: 'transfer_information',
            name: '中转站信息',
          },
        ],
      },
    ],
  },
};
export default menu;
