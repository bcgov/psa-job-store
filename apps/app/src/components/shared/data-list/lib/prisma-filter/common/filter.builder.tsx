import { SetURLSearchParams } from 'react-router-dom';
import { IFilter, ISingleOrder } from './filter.interface';

export class FilterBuilder<T = Record<string, unknown>> {
  private setSearchParams: SetURLSearchParams;
  private searchParams: URLSearchParams;

  private readonly filter: IFilter<T> = Object.create(null);

  constructor(setSearchParams: SetURLSearchParams, searchParams: URLSearchParams) {
    this.setSearchParams = setSearchParams;
    this.searchParams = searchParams;

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

  public toTriggerArguments() {
    return {
      orderBy: this.generateOrder(this.filter.order),
      ...(this.filter.page != null &&
        this.filter.pageSize != null && {
          skip: (this.filter.page - 1) * this.filter.pageSize,
          take: this.filter.pageSize,
        }),
    };
  }
}
