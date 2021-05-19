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
  AccountList = '/system/getAccountList',
  DeptList = '/system/getDeptList',
  MenuList = '/system/getMenuList',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
  GetInspectionList = '/system/getInspectionList',
  GetAnalysisList = '/system/getAnalysisList',
  GetClassifyList = '/system/getClassifyList',
  GetAlarmList = '/system/getAlarmList',
  GetTransformList = '/system/getTransformList',
}

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
