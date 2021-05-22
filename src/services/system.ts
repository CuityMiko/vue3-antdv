import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  InspectionParams,
  AnalysisParams,
  ClassifyParams,
  AlarmParams,
  TransformParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  InspectionListModel,
  AnalysisListModel,
  ClassifyListModel,
  AlarmListModel,
  TransformListModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 登录
  LoginReq = '/api-ca/platformlogin/m',
  AccountList = '/system/getAccountList',
  DeptList = '/system/getDeptList',
  MenuList = '/system/getMenuList',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
  // 巡检数据明细
  GetInspectionList = '/api-supervision/classifiquality/l',
  // 全镇分类质量分析
  GetAnalysisData = '/api-supervision/classifiqualitystatistics/l/towndataanalysis',
  // 全镇分类质量分析 - 排名
  GetAnalysisList = '/api-supervision/classifiqualitystatistics/l/recordList',
  // 全镇分类质量分析 - 红黑榜
  GetClassifyList = '/api-supervision/classifiqualitystatistics/l/redBlackList',
  GetAlarmList = '/system/getAlarmList',
  GetTransformList = '/system/getTransformList',
  GetIndexRPro = '/index/r/pro',
  GetRoleList = '/api-platform/tenantrole/l',
}

export const getLogin = (params?) => defHttp.get({ url: Api.LoginReq, params });

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) => defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const getInspectionList = (params?: InspectionParams) =>
  defHttp.get<InspectionListModel>({ url: Api.GetInspectionList, params });

export const getAnalysisList = (params?: AnalysisParams) =>
  defHttp.get<AnalysisListModel>({ url: Api.GetAnalysisList, params });

export const getClassifyList = (params?: ClassifyParams) =>
  defHttp.get<ClassifyListModel>({ url: Api.GetClassifyList, params });

export const getAlarmList = (params?: AlarmParams) => defHttp.get<AlarmListModel>({ url: Api.GetAlarmList, params });

export const getTransformList = (params?: TransformParams) =>
  defHttp.get<TransformListModel>({ url: Api.GetTransformList, params });

export const getIndexRPro = (params?) => defHttp.get({ url: Api.GetIndexRPro, params });
// 角色管理
export const getRoleList = (params?: RolePageParams) => defHttp.post({ url: Api.GetRoleList, params });
