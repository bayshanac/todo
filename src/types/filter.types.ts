export enum FilterEnum {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export type Filter = (typeof FilterEnum)[keyof typeof FilterEnum];
