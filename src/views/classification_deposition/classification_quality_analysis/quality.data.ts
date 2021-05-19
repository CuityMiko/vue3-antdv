import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const scoreColumns: BasicColumn[] = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
    width: 74,
  },
  {
    title: '社区/村名称',
    dataIndex: 'countyName',
    key: 'countyName',
    width: 110,
    ellipsis: true,
  },
  {
    title: '总积分',
    dataIndex: 'score',
    key: 'score',
    width: 80,
  },
  {
    title: '分类合格率',
    dataIndex: 'percent',
    key: 'percent',
    slots: { customRender: 'percent' },
  },
];

export const classifyColumns: BasicColumn[] = [
  {
    title: '排名',
    dataIndex: 'rank',
    width: 70,
  },
  {
    title: '社区/村',
    dataIndex: 'countyName',
    width: 85,
  },
  {
    title: '场景类型',
    dataIndex: 'sceneType',
    width: 85,
  },
  {
    title: '场景名称',
    dataIndex: 'sceneName',
    width: 100,
  },
  {
    title: '总积分',
    dataIndex: 'score',
    width: 85,
  },
  {
    title: '分类合格率',
    dataIndex: 'percent',
    width: 115,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'filterType',
    label: '',
    component: 'Select',
    colProps: {},
  },
  {
    field: 'filterDate',
    label: '',
    component: 'DatePicker',
    colProps: {},
  },
];
