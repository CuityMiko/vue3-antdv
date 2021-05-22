import { getAllRoleList } from '/@/services/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
    align: 'left',
    width: 180,
  },
  {
    title: '姓名',
    dataIndex: 'nickname',
    align: 'left',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'email',
    align: 'left',
    width: 180,
  },
  {
    title: '手机号码',
    dataIndex: 'createTime',
    align: 'left',
    width: 180,
  },
  {
    title: '账号状态',
    dataIndex: 'status',
    align: 'left',
    width: 100,
    slots: { customRender: 'status' },
  },
  {
    width: 220,
    title: '操作',
    fixed: 'right',
    align: 'left',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '选择角色',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
  },
  {
    field: 'nickname',
    label: '账号或姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
];
