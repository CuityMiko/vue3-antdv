import { getAllRoleList } from '/@/services/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '单位名称',
    dataIndex: 'dwmc',
  },
  {
    title: '单位类型',
    dataIndex: 'dwlxmc',
    width: 180,
  },
  {
    title: '组织机构代码',
    dataIndex: 'zzjgdm',
    width: 400,
  },
  {
    title: '负责人',
    dataIndex: 'fzr',
    width: 160,
  },
  {
    title: '联系电话',
    dataIndex: 'lxdh',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dwmc',
    label: '单位名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dwlx',
    label: '单位类型',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'dwmc',
      valueField: 'dwlx',
    },
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'dwlx',
    label: '单位类型',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'dwmc',
      valueField: 'dwlx',
    },
    required: true,
  },
  {
    field: 'dwmc',
    label: '单位名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'zzjgdm',
    label: '组织机构代码',
    component: 'Input',
    required: true,
  },
  {
    label: '负责人',
    field: 'fzr',
    component: 'Input',
    required: true,
  },

  {
    label: '联系电话',
    field: 'lxdh',
    component: 'Input',
    required: true,
  },
];
