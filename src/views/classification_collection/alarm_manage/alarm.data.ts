import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '报警场景',
    dataIndex: 'sceneName',
    width: 180,
  },
  {
    title: '场景地址',
    dataIndex: 'sceneAddress',
    width: 240,
  },
  {
    title: '报警时间',
    dataIndex: 'alarmTime',
    width: 180,
  },
  {
    title: '处理状态',
    dataIndex: 'status',
    width: 120,
  },
  {
    title: '处理人',
    dataIndex: 'dealPerson',
    width: 100,
  },
  {
    title: '解除报警时间',
    dataIndex: 'alarmRelievedTime',
    width: 180,
  },
  {
    title: '操作',
    dataIndex: 'imgPath',
    width: 120,
    slots: { customRender: 'checkImg' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'warnTime',
    label: '报警时间：',
    component: 'RangePicker',
    colProps: { span: 7 },
  },
  {
    field: 'status',
    label: '处理状态：',
    component: 'Select',
    colProps: { span: 5 },
  },
  {
    field: 'sceneName',
    label: ' ',
    component: 'Input',
    colProps: { span: 5 },
  },
];
