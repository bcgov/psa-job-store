import { SetURLSearchParams } from 'react-router-dom';
import { DataFilterSearchProps } from '../../../components/data-filter/data-filter.component';
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
        return {
          [this.normalizeFilterOperator(operator)]: normalizedValue,
          mode: operator.endsWith('.i') ? 'insensitive' : 'default',
        };
      default:
        throw new Error(`${operator} is not a valid filter operator`);
    }
  }

  private normalizeFilterOperator(operator: FilterOperator) {
    switch (operator) {
      case FilterOperator.StringContains:
      case FilterOperator.StringIContains:
        return 'contains';
      default:
        throw new Error(`${operator} is not a valid filter operator`);
    }
  }

  private normalizeFilterValue(
    operator: FilterOperator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ): string | number | boolean | string[] | number[] | boolean[] | (string | number | boolean)[] | null {
    if (Array.isArray(value)) {
      // TODO
    }

    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      throw new Error('Filter value must be a string, number, or boolean');
    }

    if ([FilterOperator.StringContains, FilterOperator.StringIContains].includes(operator as FilterOperator)) {
      return value;
    }

    return !isNaN(+value) ? +value : value;
  }

  public toTriggerArguments() {
    const searchFOV: ISingleFilter[] =
      this.searchProps != null && this.filter.search != null
        ? this.searchProps.fields.map((fo) => ({ ...fo, value: this.filter.search }))
        : ([] as ISingleFilter[]);

    const searchWhere = this.generateWhere(searchFOV);

    const searchKeys = Object.keys(searchWhere);

    const where = {
      ...(searchKeys.length > 0 && {
        AND: [
          ...(searchKeys.length > 0
            ? [{ OR: Object.keys(searchWhere).map((key) => ({ [key]: searchWhere[key] })) }]
            : []),
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
