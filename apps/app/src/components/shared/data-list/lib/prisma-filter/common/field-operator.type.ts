import { FilterOperator } from './filter-operator.enum';

export type FieldOperator<T = Record<string, unknown>> = {
  field: keyof T & string;
  operator: FilterOperator;
};

export type FieldOperatorValue<T = Record<string, unknown>> = FieldOperator<T> & { value: unknown };
