import { Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { useLazyGetDepartmentsForSettingsQuery } from '../../../redux/services/graphql-api/settings/settings.api';
import { deserializeOrderBy } from '../../../redux/services/graphql-api/utils/deserialize-order-by.util';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { DepartmentSearchBar } from './components/department-search-bar.component';
import { DepartmentTable } from './components/department.table';
import { DEFAULT_SEARCH_PARAMS } from './department.constants';

export type FilterOption = { label: string; value: string };
export type FilterValues = { [key in 'ministry' | 'status']: FilterOption[] };

export const DepartmentListPage = () => {
  const [filterValues, setFilterValues] = useState<FilterValues>({ ministry: [], status: [] });
  const [searchParams, setSearchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS);

  const [departmentTrigger, { data: departmentData, isFetching: departmentDataIsFetching }] =
    useLazyGetDepartmentsForSettingsQuery();

  const fetchData = useCallback(() => {
    const page = parseInt(
      searchParams.get('page') ?? (DEFAULT_SEARCH_PARAMS as Record<string, string>).page.toString(),
      10,
    );
    const pageSize = parseInt(
      searchParams.get('pageSize') ?? (DEFAULT_SEARCH_PARAMS as Record<string, string>).pageSize.toString(),
      10,
    );
    const orderBy = searchParams.get('orderBy');

    departmentTrigger({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: deserializeOrderBy(orderBy),
    });
  }, [searchParams]);

  useEffect(() => fetchData(), [fetchData]);

  useEffect(() => {
    console.log(JSON.stringify(filterValues, undefined, 2));
  }, [filterValues]);

  return (
    <>
      <PageHeader title="Departments" subTitle="Manage departments" />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <DepartmentSearchBar setFilterValues={setFilterValues} filterValues={filterValues} />
          <DepartmentTable
            setSearchParams={setSearchParams}
            data={departmentData}
            defaultSearchParams={DEFAULT_SEARCH_PARAMS}
            isLoading={departmentDataIsFetching}
            searchParams={searchParams}
          />
        </Space>
      </ContentWrapper>
    </>
  );
};
