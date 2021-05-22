import { BasicPageParams, BasicFetchResult } from '/@/services/model/baseModel';

export type LoginParams = {
  yhzh?: string;
  yhmm?: string;
};

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
  regionid?: string;
  cjlx?: string;
  flzl?: number;
  cxrq?: string;
  cjmc?: string;
};

export type AnalysisParams = {
  tjsj?: string;
};

export type ClassifyParams = {
  tjsj?: string;
  redBlack?: number;
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
  communityid: string;
  qymc: string;
  cjlx: string;
  cjmc: string;
  ljlx: string;
  xjy: string;
  xjsj: number;
  flzlpj: number;
  dcjf: number;
  averageScore: number;
  imgurl1: string;
}

export interface AnalysisListItem {
  qxmc: string;
  zjf: number;
  flhgl: string;
}

export interface ClassifyListItem {
  id: string;
  rank: string | number;
  qxmc: string;
  cjlx: string;
  cjmc: string;
  zjf: number;
  flhgl: string;
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
