import { BasicColumn } from '/@/components/Table';

export const scoreColumns: BasicColumn[] = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
    width: 74,
  },
  {
    title: '社区/村名称',
    dataIndex: 'qxmc',
    key: 'qxmc',
    width: 110,
    ellipsis: true,
  },
  {
    title: '总积分',
    dataIndex: 'zjf',
    key: 'zjf',
    width: 80,
  },
  {
    title: '分类合格率',
    dataIndex: 'flhgl',
    key: 'flhgl',
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
    dataIndex: 'string',
    width: 85,
  },
  {
    title: '场景类型',
    dataIndex: 'cjlx',
    width: 85,
  },
  {
    title: '场景名称',
    dataIndex: 'cjmc',
    width: 100,
  },
  {
    title: '总积分',
    dataIndex: 'zjf',
    width: 85,
  },
  {
    title: '分类合格率',
    dataIndex: 'flhgl',
    width: 115,
  },
];
