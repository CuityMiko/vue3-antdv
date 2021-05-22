import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '行政区划',
    dataIndex: 'qymc',
    width: 120,
  },
  {
    title: '场景类型',
    dataIndex: 'cjlx',
    width: 120,
  },
  {
    title: '场景名称',
    dataIndex: 'cjmc',
    width: 120,
  },
  {
    title: '垃圾类型',
    dataIndex: 'ljlx',
    width: 120,
    slots: { customRender: 'garbageType' },
  },
  {
    title: '巡检员',
    dataIndex: 'xjy',
    width: 120,
  },
  {
    title: '提交时间',
    dataIndex: 'xjsj',
    width: 200,
  },
  {
    title: '分类质量',
    dataIndex: 'flzlpj',
    width: 120,
    slots: { customRender: 'quality' },
  },
  {
    title: '单次积分',
    dataIndex: 'dcjf',
    width: 120,
    align: 'right',
  },
  {
    title: '日均积分',
    dataIndex: 'averageScore',
    width: 120,
    align: 'right',
  },
  {
    title: '巡检图片',
    dataIndex: 'imgurl1',
    width: 120,
    slots: { customRender: 'checkImg' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'regionid',
    label: '地区：',
    component: 'Select',
    colProps: { span: 8 },
  },
  {
    field: 'cjlx',
    label: '场景类型：',
    component: 'Select',
    colProps: { span: 8 },
  },
  {
    field: 'flzl',
    label: '分类质量：',
    component: 'Select',
    colProps: { span: 8 },
  },
  {
    field: 'cxrq',
    label: '时间选择：',
    component: 'DatePicker',
    colProps: { span: 8 },
    componentProps: {},
  },
  {
    field: 'cjmc',
    label: '场景名称：',
    component: 'Input',
    colProps: { span: 8 },
  },
];
