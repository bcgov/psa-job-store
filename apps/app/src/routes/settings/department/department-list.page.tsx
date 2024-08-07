import { Space } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { FilterBar } from '../../../components/shared/filter-bar/filter-bar.component';
import { GetDepartmentsForSettingsArgs } from '../../../redux/services/graphql-api/settings/dtos/get-departments-for-settings-args.dto';
import {
  useGetOrganizationsPicklistForSettingsQuery,
  useLazyGetDepartmentsForSettingsQuery,
} from '../../../redux/services/graphql-api/settings/settings.api';
import { deserializeOrderBy } from '../../../redux/services/graphql-api/utils/deserialize-order-by.util';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { DepartmentSearchBar } from './components/department-search-bar.component';
import { DepartmentTable } from './components/department.table';
import { DEFAULT_SEARCH_PARAMS } from './department.constants';

export type FilterOption = { label: string; value: string };
export type FilterOptions = { [key in 'organization_id' | 'effective_status']: FilterOption[] };

export const DepartmentListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS);

  const [departmentTrigger, { data: departmentData, isFetching: departmentDataIsFetching }] =
    useLazyGetDepartmentsForSettingsQuery();

  const { data: organizationsData } = useGetOrganizationsPicklistForSettingsQuery();

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

    // let where: GetDepartmentsForSettingsArgs['where'] | null = { AND: [] };
    const where: GetDepartmentsForSettingsArgs['where'] = { AND: [] };
    const AND: typeof where.AND = [];
    const filterKeys = ['organization_id__in', 'effective_status__in'];

    filterKeys.forEach((filterKey) => {
      const rawValue = searchParams.get(filterKey);
      const [key, operation] = filterKey.split('__');

      const value = ['in'].includes(operation) ? rawValue?.split(',') : rawValue;

      if (rawValue != null) {
        AND.push({ [key]: { [operation]: value } });
      }
    });

    if (AND.length > 0) {
      where.AND = AND;
    }

    departmentTrigger({
      where: where.AND.length > 0 ? where : undefined,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: deserializeOrderBy(orderBy),
    });
  }, [searchParams]);

  useEffect(() => fetchData(), [fetchData]);

  return (
    <>
      <PageHeader title="Departments" subTitle="Manage departments" />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <FilterBar
            filters={[
              {
                name: 'organization_id',
                componentType: 'select',
                isMulti: true,
                options: (organizationsData?.organizations ?? []).map((o) => ({ label: o.name, value: o.id })),
                placeholder: 'Ministries',
              },
              {
                name: 'effective_status',
                componentType: 'select',
                isMulti: false,
                options: [
                  {
                    label: 'Active',
                    value: 'Active',
                  },
                  {
                    label: 'Inactive',
                    value: 'Inactive',
                  },
                ],
                placeholder: 'Status',
              },
            ]}
          />
          <DepartmentSearchBar setSearchParams={setSearchParams} searchParams={searchParams} />
          <DepartmentTable
            setSearchParams={setSearchParams}
            data={departmentData}
            isLoading={departmentDataIsFetching}
            searchParams={searchParams}
          />
        </Space>
      </ContentWrapper>
    </>
  );
};
