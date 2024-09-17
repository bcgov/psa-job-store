import { SelectFilterProps } from './select-filter.component';

type FilterWithType<Type extends 'select', Props> = { type: Type } & Props;

export type Filter = FilterWithType<'select', Omit<SelectFilterProps, 'filterBuilder'>>;
