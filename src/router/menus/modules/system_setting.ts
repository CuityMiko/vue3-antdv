import type { MenuModule } from '/@/router/types';

const menu: MenuModule = {
  orderNo: 40,
  menu: {
    name: '系统设置',
    path: '/system_setting',
    children: [
      {
        path: 'data_dictionary',
        name: '数据字典',
      },
      {
        path: 'scene_info',
        name: '场景信息',
      },
      {
        path: 'integral_rule',
        name: '积分规则',
      },
      {
        path: 'power_manage',
        name: '权限管理',
        children: [
          {
            path: 'role_manage',
            name: '角色管理',
          },
          {
            path: 'account_manage',
            name: '账号管理',
          },
        ],
      },
      {
        path: 'secret_manage',
        name: '秘钥管理',
      },
      {
        path: 'manage_unit',
        name: '管理单位',
      },
      {
        path: 'region_maintenance',
        name: '地区维护',
      },
    ],
  },
};
export default menu;
