import { SetURLSearchParams } from 'react-router-dom';
import { DataFilterSearchProps } from '../../../components/data-filter/data-filter.component';
import { FieldOperator, FieldOperatorValue } from './field-operator.type';
import { FilterOperator } from './filter-operator.enum';
import { IFilter, ISingleFilter, ISingleOrder } from './filter.interface';

export class FilterBuilder<T = Record<string, unknown>> {
  private setSearchParams: SetURLSearchParams;
  private searchParams: URLSearchParams;
  private searchProps?: DataFilterSearchProps;

  private readonly filter: IFilter<T> = Object.create(null);

  constructor(setSearchParams: SetURLSearchParams, searchParams: URLSearchParams, searchProps?: DataFilterSearchProps) {
    this.setSearchParams = setSearchParams;
    this.searchParams = searchParams;
    this.searchProps = searchProps;

    const searchTerm = searchParams.get('search');
    if (searchTerm != null) {
      this.setSearchTerm(searchTerm);
    }

    const filter = searchParams.get('filter');
    if (filter != null) {
      const parts = filter.split(',');

      console.log('parts: ', parts);
      parts.forEach((part) => {
        const [field, operator, encodedValue] = part.split(/__|=/);
        const value = decodeURIComponent(encodedValue);

        console.log('value: ', value);
        this.addFilter({ field: field as keyof T & string, operator: operator as FilterOperator, value });
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

  public addFilter({ field, operator, value }: FieldOperatorValue<T>): this {
    if (this.filter.filter == null) {
      this.filter.filter = [];
    }

    const normalizedValue = this.normalizeFilterValue(operator, value);

    console.log('normalizedValue: ', normalizedValue);

    // If filter exists (field, operator match)
    //  Update existing value
    // else
    //  Add new filter
    const matchIndex = this.filter.filter.findIndex((f) => f.field === field && f.operator === operator);
    if (matchIndex != -1) {
      this.filter.filter[matchIndex].value = normalizedValue;
    } else {
      this.filter.filter.push({ field, operator, value: normalizedValue });
    }

    return this;
  }

  public removeFilter({ field, operator }: FieldOperator<T>): this {
    if (this.filter.filter != null) {
      // Remove filter matching the provided field, operator
      this.filter.filter = this.filter.filter.filter((f) => f.field !== field && f.operator !== operator);

      // If the filter array is empty, remove it
      if (this.filter.filter.length === 0) {
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
            this.filter.filter.map((f) => `${f.field}__${f.operator}=${encodeURIComponent(`${f.value}`)}`).join(','),
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

  private generateOrder(order?: ISingleOrder[]) {
    return order?.flatMap((o) =>
      Object.entries(o).map(([key, value]) => {
        const transformedFilter = Object.create(null);

        const keyParts = key.split('.');
        keyParts.reduce(
          (prev, curr, i) => (
            Object.assign(prev, { [curr]: i === keyParts.length - 1 ? value : Object(prev[curr]) }), prev[curr]
          ),
          transformedFilter,
        );

        return transformedFilter;
      }),
    );
  }

  private generateWhere(filter: ISingleFilter[]) {
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

      Object.assign(currentWhere, this.generateWhereValue(f.operator, f.value));
    }

    return where;
  }

  private generateWhereValue(
    operator: FilterOperator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) {
    const normalizedValue = this.normalizeFilterValue(operator, value);

    switch (operator) {
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
      default:
        throw new Error(`generateWhereValue: ${operator} is not a valid filter operator`);
    }
  }

  private normalizeFilterOperator(operator: FilterOperator) {
    switch (operator) {
      case FilterOperator.StringContains:
      case FilterOperator.StringIContains:
        return 'contains';
      case FilterOperator.StringEquals:
      case FilterOperator.StringIEquals:
        return 'equals';
      case FilterOperator.StringIn:
      case FilterOperator.StringIIn:
        return 'in';
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
      if ([FilterOperator.StringIn, FilterOperator.StringIIn].includes(operator as FilterOperator)) {
        return value;
      }
    }

    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      throw new Error('Filter value must be a string, number, or boolean');
    }

    if ([FilterOperator.StringContains, FilterOperator.StringIContains].includes(operator as FilterOperator)) {
      return value;
    }

    if ([FilterOperator.StringIn, FilterOperator.StringIIn].includes(operator as FilterOperator)) {
      console.log('zzValue: ', value);
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
