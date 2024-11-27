export type FilterData = {
  [key: string]: { operation: 'in'; value: string[] } | { operation: 'equals'; value: string | null };
};
