export const FILTER_VALUES = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
} as const;

export type Filter = (typeof FILTER_VALUES)[keyof typeof FILTER_VALUES];
