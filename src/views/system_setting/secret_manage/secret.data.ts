import { getAllRoleList } from '/@/services/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '编码',
    dataIndex: 'account',
    width: 120,
    align: 'left',
  },
  {
    title: '单位名称',
    dataIndex: 'account',
    width: 120,
    align: 'left',
  },
  {
    title: '单位类型',
    dataIndex: 'nickname',
    width: 120,
    align: 'left',
  },
  {
    title: '联系人',
    dataIndex: 'email',
    width: 120,
    align: 'left',
  },
  {
    title: '联系方式',
    dataIndex: 'createTime',
    width: 180,
    align: 'left',
  },
  {
    title: '详细地址',
    dataIndex: 'createTime',
    width: 180,
    align: 'left',
  },
  {
    title: '添加人',
    dataIndex: 'createTime',
    width: 180,
    align: 'left',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    width: 180,
    align: 'left',
  },
  {
    width: 150,
    title: '操作',
    align: 'left',
    dataIndex: 'action',
    fixed: 'right',
    slots: { customRender: 'action' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '单位名称、联系人、联系电话',
    },
  },
  {
    label: '',
    field: 'role',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
      placeholder: '单位类型',
    },
  },
];

export const secretFormSchema: FormSchema[] = [
  {
    field: 'dwmc',
    label: '单位名称',
    component: 'Input',
    required: true,
  },
  {
    label: '单位类型',
    field: 'dwlx',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    label: '关联项目',
    field: 'glxm',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
  },
  {
    field: 'lxr',
    label: '联系人',
    component: 'Input',
  },
  {
    field: 'lxfs',
    label: '联系方式',
    component: 'Input',
  },
  {
    field: 'xxdz',
    label: '详细地址',
    component: 'Input',
    required: true,
  },
  // {
  //   field: 'account',
  //   label: '接口权限',
  //   slot:{ customRender:'authority' },
  //   required: true,
  // },
];
