import { BasicColumn } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'nickname',
    width: 300,
    align: 'left',
  },
  {
    title: '角色描述',
    dataIndex: 'remark',
    width: 300,
    align: 'left',
  },
  {
    width: 300,
    title: '操作',
    align: 'left',
    fixed: 'right',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
];
