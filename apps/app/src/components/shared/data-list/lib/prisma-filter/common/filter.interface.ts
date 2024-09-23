import { FieldPathOperatorValue } from './field-operator.type';

export interface IFilter<T = Record<string, unknown>> {
  search?: string;
  filter?: ISingleFilter<T>[];
  order?: ISingleOrder<T>[];
  page?: number;
  pageSize?: number;
}

export type ISingleFilter<T = Record<string, unknown>> = FieldPathOperatorValue<T>;

export type ISingleOrder<T = Record<string, unknown>> = Record<keyof T & string, 'asc' | 'desc'>;
