export interface IFilter<T = Record<string, unknown>> {
  order?: ISingleOrder<T>[];
  page?: number;
  pageSize?: number;
}

export type ISingleOrder<T = Record<string, unknown>> = Record<keyof T & string, 'asc' | 'desc'>;
