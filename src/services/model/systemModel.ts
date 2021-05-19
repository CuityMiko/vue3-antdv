import { BasicPageParams, BasicFetchResult } from '/@/services/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export type InspectionParams = BasicPageParams & {
  district?: string;
  merchent?: string;
  quality?: number;
  filterDate?: string;
  searchName?: string;
};

export type AnalysisParams = {
  filterDate?: string;
};

export type ClassifyParams = {
  filterDate?: string;
  listType?: number;
};

export type AlarmParams = BasicPageParams & {
  alarmTime?: string;
  status?: number;
  sceneName?: string;
};

export type TransformParams = BasicPageParams & {
  transformName?: string;
  transformType?: number | string;
  transformStatus?: number | string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

export interface InspectionListItem {
  id: string;
  district: string;
  sceneType: string;
  sceneName: string;
  garbageType: string;
  inspecterName: string;
  createTime: number;
  quality: number;
  score: number;
  averageScore: number;
  imgPath: string;
}

export interface AnalysisListItem {
  id: string;
  rank: string | number;
  countyName: string;
  score: number;
  percent: string;
}

export interface ClassifyListItem {
  id: string;
  rank: string | number;
  countyName: string;
  sceneType: string;
  sceneName: string;
  score: number;
  percent: string;
}

export interface AlarmListItem {
  id: string;
  sceneName: string;
  sceneAddress: string;
  alarmTime: string;
  status: number;
  dealPerson: string;
  alarmRelievedTime: string;
  imgPath: string;
}

export interface TransformListItem {
  id: string;
  transformName: string;
  district: string;
  chargeUnit: string;
  transformType: number | string;
  transformStatus: number | string;
  transformAmount: number;
  initDate: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

export type InspectionListModel = BasicFetchResult<InspectionListItem>;

export type AnalysisListModel = BasicFetchResult<AnalysisListItem>;

export type ClassifyListModel = BasicFetchResult<ClassifyListItem>;

export type AlarmListModel = BasicFetchResult<AlarmListItem>;

export type TransformListModel = BasicFetchResult<TransformListItem>;
