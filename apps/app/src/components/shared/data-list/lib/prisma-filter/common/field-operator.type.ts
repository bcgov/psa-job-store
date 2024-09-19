import { FilterOperator } from './filter-operator.enum';

export type FieldPathOperatorValue<T = Record<string, unknown>> = {
  field: keyof T & string;
  path?: string[];
  operator: FilterOperator;
  value?: unknown;
};
