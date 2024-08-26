import { SelectFilterProps } from './select-filter.component';

export type FilterOption = { label: string; value: string };

type FilterWithType<Type extends string, Props> = { type: Type } & Props;
export type Filter =
  | FilterWithType<'single-value', Omit<SelectFilterProps, 'isMulti' | 'setSearchParams' | 'filterData'>>
  | FilterWithType<'multi-value', Omit<SelectFilterProps, 'isMulti' | 'setSearchParams' | 'filterData'>>;
