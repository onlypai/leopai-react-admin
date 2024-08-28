import { ReactNode } from 'react';
import { Params, RouteObject } from 'react-router-dom';
import { EPermission } from '@/enum';

export interface Permission {
  id: string;
  label: string;
  parentId: string;
  type: EPermission;
  route: string;
  icon?: string;
  component?: string;
  hideTab?: boolean;
  frameSrc?: string;
  children?: Permission[];
}

export interface RouteMeta {
  key: string; //complete path
  label: string;
  icon?: ReactNode;
  hideTab?: boolean;
  outlet?: any;
  timeStamp?: string;
  frameSrc?: string;
  params?: Params<string>;
}
export type AppRouteObject = {
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;
