import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { DepartmentSearchBar } from './components/department-search-bar.component';
import { DepartmentTable } from './components/department.table';

export type FilterOption = { label: string; value: string };
export type FilterValues = { [key in 'ministry' | 'status']: FilterOption[] };

export const DepartmentListPage = () => {
  const [filterValues, setFilterValues] = useState<FilterValues>({ ministry: [], status: [] });

  useEffect(() => {
    console.log(JSON.stringify(filterValues, undefined, 2));
  }, [filterValues]);

  return (
    <>
      <PageHeader title="Departments" subTitle="Manage departments" />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <DepartmentSearchBar setFilterValues={setFilterValues} filterValues={filterValues} />
          <DepartmentTable />
        </Space>
      </ContentWrapper>
    </>
  );
};
