/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { Space, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageInfo } from '../../../redux/services/dtos/page-info.dto';
import { deserializeOrderBy } from '../../../redux/services/graphql-api/utils/deserialize-order-by.util';
import { ExtendedPageHeaderProps, PageHeader } from '../../app/page-header.component';
import ContentWrapper from '../../content-wrapper.component';
import { Filter } from './components/list-filter/components/filters';
import { ListFilter } from './components/list-filter/list-filter.component';
import { ListTable } from './components/list-table.component';
import { FilterData } from './interfaces/filter-data.interface';
import { PaginationData } from './interfaces/pagination-data.interface';
import { SearchConfig } from './interfaces/search-config.interface';
import { SearchData } from './interfaces/search-data.interface';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from './list-page.constants';
import { OrderByData } from './types/order-by-data.type';

export interface ListPageProps {
  trigger: LazyQueryTrigger<QueryDefinition<any, any, any, any>>;
  columns?: ColumnsType<AnyObject>;
  data?: { data?: TableProps<AnyObject>['dataSource']; pageInfo: PageInfo };
  filters: Filter[];
  loading?: boolean;
  pageHeaderProps: ExtendedPageHeaderProps;
  searchConfig?: SearchConfig | undefined;
}

export const ListPage = ({
  trigger,
  columns,
  data,
  filters,
  loading,
  pageHeaderProps,
  searchConfig,
}: ListPageProps) => {
  const [filterData, setFilterData] = useState<FilterData>(
    Object.fromEntries(
      filters.map((f) => [
        f.name,
        ...[f.type === 'multi-value' ? { operation: 'in', value: [] } : { operation: 'equals', value: null }],
      ]),
    ),
  );

  const filterKeys = useMemo(() => Object.keys(filterData), [filterData]);

  const [orderByData, setOrderByData] = useState<OrderByData | null>(null);

  const [paginationData, setPaginationData] = useState<PaginationData>({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [searchData, setSearchData] = useState<SearchData | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Pagination Data
    const current = Number(searchParams.get('page') ?? DEFAULT_PAGE);
    const pageSize = Number(searchParams.get('pageSize') ?? DEFAULT_PAGE_SIZE);

    setPaginationData({ current, pageSize });

    // Filter Data
    let tempFilterData: FilterData = {};

    Object.keys(filterData).forEach((key) => {
      const { operation } = filterData[key];
      const valueFromQueryString = searchParams.get(`${key}__${operation}`);

      tempFilterData = {
        ...{
          ...tempFilterData,
          [key]: {
            operation: operation as any,
            value: (operation === 'in'
              ? valueFromQueryString != null && valueFromQueryString.length > 0
                ? valueFromQueryString.split(',')
                : []
              : valueFromQueryString) as any,
          },
        },
      };
    });

    setFilterData(tempFilterData);

    // Search Data
    if (searchConfig) {
      const searchTerm = searchParams.get('search');
      const newSearchData = searchTerm
        ? {
            OR: searchConfig.fields.map((field) => ({
              [field]: { contains: searchTerm, mode: 'insensitive' as const },
            })),
          }
        : undefined;

      // Compare current and proposed search data
      // reset page, pageSize, update searchData if valus have changed
      if (JSON.stringify(searchData) !== JSON.stringify(newSearchData)) {
        setSearchParams((params) => {
          params.delete('page');
          params.delete('pageSize');

          return params;
        });
        setSearchData(searchTerm ? newSearchData : undefined);
      }
    }

    // Order By Data
    const orderBy = searchParams.get('orderBy');
    setOrderByData(deserializeOrderBy(orderBy));
  }, [searchParams]);

  useEffect(() => {
    // Get pagination data
    const { current, pageSize } = paginationData;

    // Generate where clause
    const where: Record<string, any>[] = [];
    filterKeys.forEach((key) => {
      const { operation, value } = filterData[key];

      if (operation === 'equals') {
        if (value != null) {
          where.push({ [key]: { [operation]: value } });
        }
      } else if (operation === 'in') {
        if (Array.isArray(value) && value.length > 0) {
          where.push({ [key]: { [operation]: value } });
        }
      }
    });

    if (searchData) {
      where.push(searchData);
    }

    trigger({
      where: where.length > 0 ? { AND: where } : undefined,
      take: pageSize,
      skip: (current - 1) * pageSize,
      ...(orderByData != null && { orderBy: orderByData }),
    });
  }, [trigger, paginationData, searchData]);

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <ListFilter
            setSearchParams={setSearchParams}
            filterData={filterData}
            filters={filters}
            searchConfig={searchConfig}
            searchTerm={searchParams.get('search') ?? undefined}
          />
          <ListTable
            setSearchParams={setSearchParams}
            columns={columns}
            dataSource={data?.data}
            loading={loading}
            pageInfo={data?.pageInfo}
            paginationData={paginationData}
          />
        </Space>
      </ContentWrapper>
    </>
  );
};
