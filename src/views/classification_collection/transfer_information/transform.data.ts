import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '中转站名称',
    dataIndex: 'transformName',
    width: 130,
  },
  {
    title: '所属地区',
    dataIndex: 'district',
    width: 100,
  },
  {
    title: '管理单位',
    dataIndex: 'chargeUnit',
    width: 200,
  },
  {
    title: '中转站类型',
    dataIndex: 'transformType',
    width: 100,
  },
  {
    title: '设施状态',
    dataIndex: 'transformStatus',
    width: 100,
  },
  {
    title: '日设计运转量(t)',
    dataIndex: 'transformAmount',
    width: 120,
  },
  {
    title: '启用时间',
    dataIndex: 'initDate',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'transformName',
    label: '',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'transformType',
    label: '',
    component: 'ApiSelect',
    componentProps: {
      api: '',
      labelField: 'value',
      labelName: 'name',
    },
    colProps: { span: 6 },
  },
  {
    field: 'transformStatus',
    label: '',
    component: 'ApiSelect',
    componentProps: {
      api: '',
      labelField: 'value',
      labelName: 'name',
    },
    colProps: { span: 6 },
  },
];

export const siteFormSchema: FormSchema[] = [
  {
    field: 'sceneName',
    label: '中转站名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'district',
    label: '所属地区',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'chargeUnit',
    label: '管理单位',
    component: 'Input',
    required: true,
  },
  {
    field: 'transformType',
    label: '中转站类型',
    component: 'ApiSelect',
    componentProps: {
      api: '',
      labelField: 'name',
      valueField: 'value',
    },
    required: true,
  },
  {
    field: 'transformStatus',
    label: '中转站状态',
    component: 'ApiSelect',
    componentProps: {
      api: '',
      labelField: 'name',
      valueField: 'value',
    },
    required: true,
  },
];
