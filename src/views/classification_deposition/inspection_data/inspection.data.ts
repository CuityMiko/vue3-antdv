import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '行政区划',
    dataIndex: 'district',
    width: 120,
  },
  {
    title: '场景类型',
    dataIndex: 'sceneType',
    width: 120,
  },
  {
    title: '场景名称',
    dataIndex: 'sceneName',
    width: 120,
  },
  {
    title: '垃圾类型',
    dataIndex: 'garbageType',
    width: 120,
    slots: { customRender: 'garbageType' },
  },
  {
    title: '巡检员',
    dataIndex: 'inspecterName',
    width: 120,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '分类质量',
    dataIndex: 'quality',
    width: 120,
    slots: { customRender: 'quality' },
  },
  {
    title: '单次积分',
    dataIndex: 'score',
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
    dataIndex: 'imgPath',
    width: 120,
    slots: { customRender: 'checkImg' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'district',
    label: '地区：',
    component: 'Select',
    colProps: { span: 8 },
  },
  {
    field: 'merchant',
    label: '沿街商铺：',
    component: 'Select',
    colProps: { span: 8 },
  },
  {
    field: 'quality',
    label: '分类质量：',
    component: 'Select',
    colProps: { span: 8 },
  },
  {
    field: 'filterDate',
    label: '时间选择：',
    component: 'DatePicker',
    colProps: { span: 8 },
    componentProps: {},
  },
  {
    field: 'searchName',
    label: '场景名称搜索：',
    component: 'Input',
    colProps: { span: 8 },
  },
];
