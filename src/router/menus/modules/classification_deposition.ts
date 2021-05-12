import type { MenuModule } from '/@/router/types';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: '分类投放',
    path: '/classification_deposition',
    children: [
      {
        path: 'inspection_data',
        name: '巡检数据明细',
      },
      {
        path: 'classification_quality_analysis',
        name: '分类质量分析',
      },
    ],
  },
};
export default menu;
