import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/system_setting',
  name: 'SystemSetting',
  component: LAYOUT,
  redirect: '/system_setting/scene_info',
  meta: {
    icon: 'carbon:calendar-settings',
    title: '系统设置',
  },
  children: [
    {
      path: 'scene_info',
      name: 'SceneInfo',
      component: () => import('/@/views/system_setting/scene_info/index.vue'),
      meta: {
        title: '场景信息',
      },
    },
    {
      path: 'integral_rule',
      name: 'IntegralRule',
      component: () => import('/@/views/system_setting/integral_rule/index.vue'),
      meta: {
        title: '积分规则',
      },
    },
    {
      path: 'role_manage',
      name: 'RoleManage',
      component: () => import('/@/views/system_setting/role_manage/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: 'account_manage',
      name: 'AccountManage',
      component: () => import('/@/views/system_setting/account_manage/index.vue'),
      meta: {
        title: '账号管理',
      },
    },
    {
      path: 'data_dictionary',
      name: 'DataDictionary',
      component: () => import('/@/views/system_setting/data_dictionary/index.vue'),
      meta: {
        title: '数据字典',
      },
    },
    {
      path: 'secret_manage',
      name: 'SecretManage',
      component: () => import('/@/views/system_setting/secret_manage/index.vue'),
      meta: {
        title: '秘钥管理',
      },
    },
    {
      path: 'manage_unit',
      name: 'ManageUnit',
      component: () => import('/@/views/system_setting/manage_unit/index.vue'),
      meta: {
        title: '管理单位',
      },
    },
    {
      path: 'region_maintenance',
      name: 'RegionMaintenance',
      component: () => import('/@/views/system_setting/region_maintenance/index.vue'),
      meta: {
        title: '地区维护',
      },
    },
  ],
};

export default dashboard;
