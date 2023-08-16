export type RoleName = {
  Administrator: string;
  SecurityGuard: string;
  [index: string]: string;
};

export type ConfigResponse = {
  RoleNames: RoleName;
  ApiUri: string;
};
