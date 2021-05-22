import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/classification_deposition',
  name: 'ClassificationDeposition',
  component: LAYOUT,
  redirect: '/classification_deposition/inspection_data',
  meta: {
    icon: 'fe:app-menu',
    title: '分类质量',
  },
  children: [
    {
      path: 'inspection_data',
      name: 'InspectionData',
      component: () => import('/@/views/classification_deposition/inspection_data/index.vue'),
      meta: {
        title: '巡检数据明细',
      },
    },
    {
      path: 'classification_quality_analysis',
      name: 'ClassificationQualityAnalysis',
      component: () => import('/@/views/classification_deposition/classification_quality_analysis/index.vue'),
      meta: {
        title: '分类质量分析',
      },
    },
  ],
};

export default dashboard;
