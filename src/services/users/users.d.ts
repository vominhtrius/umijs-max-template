export enum AdminRole {
  Unknown = 0,
  Root = 1,
  Admin = 2,
  Viewer = 3,
  WarehouseManager = 4,
  Accountant = 5,
  Guest = 6,
}

export type UserInfo = {
  id: number;
  display_name: string;
  avatar?: string;
  email?: string;
  role: AdminRole;
  phone?: string;
  permissions?: string[];
};

export type UserDetail = UserInfo;
