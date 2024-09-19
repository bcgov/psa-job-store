import { SetURLSearchParams } from 'react-router-dom';
import { DataFilterSearchProps } from '../../../components/data-filter/data-filter.component';
import { FieldPathOperatorValue } from './field-operator.type';
import { FilterOperator } from './filter-operator.enum';
import { IFilter, ISingleFilter, ISingleOrder } from './filter.interface';
import { OrderByTransformType, OrderByTransformers } from './order-by-transformer.type';

export class FilterBuilder<T = Record<string, unknown>> {
  private setSearchParams: SetURLSearchParams;
  private orderByTransformers: OrderByTransformers;
  private searchParams: URLSearchParams;
  private searchProps?: DataFilterSearchProps;

  private readonly filter: IFilter<T> = Object.create(null);

  constructor(
    setSearchParams: SetURLSearchParams,
    orderByTransformers: OrderByTransformers,
    searchParams: URLSearchParams,
    searchProps?: DataFilterSearchProps,
  ) {
    this.setSearchParams = setSearchParams;
    this.orderByTransformers = orderByTransformers;
    this.searchParams = searchParams;
    this.searchProps = searchProps;

    const searchTerm = searchParams.get('search');
    if (searchTerm != null) {
      this.setSearchTerm(searchTerm);
    }

    const filter = searchParams.get('filter');
    if (filter != null) {
      const parts = filter.split(',');

      const re = new RegExp(
        /^(?<field>.*)(?:(?=(?=\[)\[)|(?=(?<!\])__))\[?(?<path>.*)(?=(?<!\]))]?__(?<=__)(?<operator>.*)(?==)=(?<==)(?<value>.*)/,
      );

      parts.forEach((part) => {
        const { field, path, operator, value: rawValue } = re.exec(part)?.groups ?? Object.create(null);

        const value = decodeURIComponent(rawValue);

        this.addFilter({
          field: field as keyof T & string,
          path: typeof path === 'string' && path.length > 0 ? path.split('.') : undefined,
          operator: operator as FilterOperator,
          value,
        });
      });
    }

    const orderBy = searchParams.get('orderBy');
    if (orderBy != null) {
      const order: ISingleOrder<T>[] = orderBy
        .split(',')
        .map(
          (o) => ({ [o.replace('-', '')]: (o.startsWith('-') ? 'desc' : 'asc') as 'asc' | 'desc' }) as ISingleOrder<T>,
        );
      this.setOrderBy(order);
    }

    this.setPage(+(this.searchParams.get('page') ?? 1));
    this.setPageSize(+(this.searchParams.get('pageSize') ?? 10));
  }

  public setSearchTerm(value: string): this {
    this.filter.search = value;

    return this;
  }

  public clearSearchTerm(): this {
    delete this.filter.search;

    return this;
  }

  public addFilter({ field, path, operator, value }: FieldPathOperatorValue<T>): this {
    if (this.filter.filter == null) {
      this.filter.filter = [];
    }

    const normalizedValue = this.normalizeFilterValue(operator, value);

    const matchIndex = this.filter.filter.findIndex(
      (f) =>
        f.field === field &&
        (path != null ? JSON.stringify(f.path) === JSON.stringify(path) : 1 === 1) &&
        f.operator === operator,
    );

    if (matchIndex != -1) {
      this.filter.filter[matchIndex].value = normalizedValue;
    } else {
      this.filter.filter.push({ field, path, operator, value: normalizedValue });
    }

    return this;
  }

  public removeFilter({ field, path, operator, value }: FieldPathOperatorValue<T> & { value?: unknown }): this {
    if (this.filter.filter != null) {
      const filterIndex = this.filter.filter.findIndex(
        (filter) =>
          filter.field === field &&
          (path != null ? JSON.stringify(filter.path) === JSON.stringify(path) : 1 === 1) &&
          filter.operator === operator,
      );

      if (filterIndex >= 0) {
        if (Array.isArray(this.filter.filter[filterIndex].value) && value != null) {
          const filteredData = (this.filter.filter[filterIndex].value as []).filter((v) => v !== value);

          if ((filteredData ?? []).length > 0) {
            // If filteredData.length > 0, update filter value
            this.addFilter({
              field,
              path,
              operator,
              value: (this.filter.filter[filterIndex].value as []).filter((v) => v !== value),
            });
          } else {
            // If filteredData.length === 0, remove filter completely
            this.removeFilter({ field, path, operator });
          }
        } else {
          this.filter.filter = this.filter.filter.filter(
            (filter) => filter.field !== field && filter.operator !== operator,
          );
        }
      }

      // If the filter array is empty, remove it
      if ((this.filter.filter ?? []).length === 0) {
        this.clearFilters();
      }
    }

    return this;
  }

  public clearFilters() {
    if (this.filter.filter != null) {
      delete this.filter.filter;
    }
  }

  public setOrderBy(order?: ISingleOrder<T>[]): this {
    this.filter.order = order;

    return this;
  }

  public setPage(page: number): this {
    this.filter.page = page;

    return this;
  }

  public setPageSize(pageSize: number): this {
    this.filter.pageSize = pageSize;

    return this;
  }

  public apply() {
    this.setSearchParams((params) => {
      this.filter.search != null ? params.set('search', this.filter.search) : params.delete('search');

      this.filter.filter != null
        ? params.set(
            'filter',
            this.filter.filter
              .map(
                (f) =>
                  `${f.field}${f.path != null && f.path.length > 0 ? `[${f.path.join('.')}]` : ''}__${
                    f.operator
                  }=${encodeURIComponent(`${f.value}`)}`,
              )
              .join(','),
          )
        : params.delete('filter');

      this.filter.order != null
        ? params.set(
            'orderBy',
            this.filter.order
              .map((o) => Object.entries(o).map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`))
              .join(','),
          )
        : params.delete('orderBy');

      this.filter.page != null ? params.set('page', `${this.filter.page}`) : params.delete('page');
      this.filter.pageSize != null ? params.set('pageSize', `${this.filter.pageSize}`) : params.delete('pageSize');

      return params;
    });
  }

  public toFilter(): IFilter<T> {
    return this.filter;
  }

  /**
   * Parsing Methods
   *
   */
  private generateSortOrder = (sort: 'asc' | 'desc') => sort;

  private generateSortOrderInput = (sort: 'asc' | 'desc', nulls: 'first' | 'last' = 'first') => ({ sort, nulls });

  private transformSortOrder = (key: string, sort: 'asc' | 'desc') => {
    const transformType: OrderByTransformType = this.orderByTransformers[key] ?? 'SortOrder';
    return transformType === 'SortOrder' ? this.generateSortOrder(sort) : this.generateSortOrderInput(sort);
  };

  private generateOrder(order?: ISingleOrder[]) {
    return order?.flatMap((o) =>
      Object.entries(o).map(([key, value]) => {
        const transformedFilter = Object.create(null);

        const keyParts = key.split('.');
        keyParts.reduce(
          (prev, curr, i) => (
            Object.assign(prev, {
              [curr]: i === keyParts.length - 1 ? this.transformSortOrder(key, value) : Object(prev[curr]),
            }),
            prev[curr]
          ),
          transformedFilter,
        );

        return transformedFilter;
      }),
    );
  }

  private generateWhere<T = Record<string, unknown>>(filter: ISingleFilter<T>[]) {
    const where = Object.create(null);

    for (const f of filter) {
      const { field } = f;
      const fieldParts = field.split('.');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let currentWhere: any = where;

      for (const fieldPart of fieldParts) {
        if (currentWhere[fieldPart] == null) {
          currentWhere[fieldPart] = Object.create(null);
        }

        currentWhere = currentWhere[fieldPart];
      }

      Object.assign(currentWhere, this.generateWhereValue(f.operator, f.path, f.value));
    }

    return where;
  }

  private generateWhereValue(
    operator: FilterOperator,
    path: string[] | undefined = undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) {
    const normalizedValue = this.normalizeFilterValue(operator, value);

    switch (operator) {
      case FilterOperator.JsonEquals:
        return {
          path,
          [this.normalizeFilterOperator(operator)]: value,
        };
      case FilterOperator.StringContains:
      case FilterOperator.StringIContains:
      case FilterOperator.StringEquals:
      case FilterOperator.StringIEquals:
      case FilterOperator.StringIn:
      case FilterOperator.StringIIn:
        return {
          [this.normalizeFilterOperator(operator)]: normalizedValue,
          mode: operator.endsWith('.i') ? 'insensitive' : 'default',
        };
      case FilterOperator.StringListHasSome:
        return {
          [this.normalizeFilterOperator(operator)]: normalizedValue,
        };
      default:
        throw new Error(`generateWhereValue: ${operator} is not a valid filter operator`);
    }
  }

  private normalizeFilterOperator(operator: FilterOperator) {
    switch (operator) {
      case FilterOperator.StringContains:
      case FilterOperator.StringIContains:
        return 'contains';
      case FilterOperator.JsonEquals:
      case FilterOperator.StringEquals:
      case FilterOperator.StringIEquals:
        return 'equals';
      case FilterOperator.StringIn:
      case FilterOperator.StringIIn:
        return 'in';
      case FilterOperator.StringListHasSome:
        return 'hasSome';
      default:
        throw new Error(`normalizeFilterOperator: ${operator} is not a valid filter operator`);
    }
  }

  private normalizeFilterValue(
    operator: FilterOperator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ): string | number | boolean | string[] | number[] | boolean[] | (string | number | boolean)[] | null {
    if (Array.isArray(value)) {
      if (
        [FilterOperator.StringIn, FilterOperator.StringIIn, FilterOperator.StringListHasSome].includes(
          operator as FilterOperator,
        )
      ) {
        return value;
      }
    }

    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      throw new Error('Filter value must be a string, number, or boolean');
    }

    if ([FilterOperator.StringContains, FilterOperator.StringIContains].includes(operator as FilterOperator)) {
      return value;
    }

    if (
      [FilterOperator.StringIn, FilterOperator.StringIIn, FilterOperator.StringListHasSome].includes(
        operator as FilterOperator,
      )
    ) {
      return (value as string).split(',');
    }

    return !isNaN(+value) ? +value : value;
  }

  public toTriggerArguments() {
    const searchFOV: ISingleFilter[] =
      this.searchProps != null && this.filter.search != null
        ? this.searchProps.fields.map((fo) => ({ ...fo, value: this.filter.search }))
        : ([] as ISingleFilter[]);

    const searchWhere = this.generateWhere(searchFOV);
    const filterWhere = this.generateWhere(this.filter.filter ?? []);

    const searchKeys = Object.keys(searchWhere);
    const filterKeys = Object.keys(filterWhere);

    const where = {
      ...((searchKeys.length > 0 || filterKeys.length > 0) && {
        AND: [
          ...(searchKeys.length > 0
            ? [{ OR: Object.keys(searchWhere).map((key) => ({ [key]: searchWhere[key] })) }]
            : []),
          ...(filterKeys.length > 0 ? [filterWhere] : []),
        ],
      }),
    };

    return {
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: this.generateOrder(this.filter.order),
      ...(this.filter.page != null &&
        this.filter.pageSize != null && {
          skip: (this.filter.page - 1) * this.filter.pageSize,
          take: this.filter.pageSize,
        }),
    };
  }
}
