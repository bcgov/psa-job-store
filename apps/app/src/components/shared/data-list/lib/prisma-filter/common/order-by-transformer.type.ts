export type OrderByTransformType = 'SortOrder' | 'SortOrderInput';

export type OrderByTransformers<T = Record<string, unknown>> = Record<keyof T & string, OrderByTransformType>;
