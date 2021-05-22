// import { getAllRoleList } from '/@/services/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
    width: 120,
    align: 'left',
  },
  {
    title: '字段名称',
    dataIndex: 'nickname',
    width: 120,
    align: 'left',
  },
  {
    title: '字段值',
    dataIndex: 'email',
    width: 120,
    align: 'left',
  },
  {
    title: '显示顺序',
    dataIndex: 'status',
    width: 180,
    align: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '关键字查询',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const sortFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '分类名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'pwd',
    label: '分类编码',
    component: 'Input',
    required: true,
  },
  {
    label: '备注说明',
    field: 'remark',
    component: 'InputTextArea',
  },
];

// export const dataFormSchema: FormSchema[] = [
//   {
//     field: 'account',
//     label: '字段名称',
//     component: 'Input',
//     required: true,
//   },
//   {
//     field: 'pwd',
//     label: '显示顺序',
//     component: 'Input',
//     required: true,
//   },
//   {
//     label: '备注说明',
//     field: 'remark',
//     component: 'InputTextArea',
//   },
//   {
//     label: '图片上传',
//     field: 'img',

//   }
// ];
