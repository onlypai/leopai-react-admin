import { EPermission } from './enum';

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: EPermission;
  route: string;
  icon?: string;
  component?: string;
  hideTab?: boolean;
  frameSrc?: string;
  children?: Permission[];
}
