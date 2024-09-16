import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { Space } from 'antd';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataFilter } from './components/data-filter/data-filter.component';
import { DataTable, DataTableProps } from './components/data-table/data-table.component';
import { FilterBuilder } from './lib/prisma-filter/common/filter.builder';

export interface DataListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: LazyQueryTrigger<QueryDefinition<any, any, any, any>>;
  tableProps?: Omit<DataTableProps, 'filterBuilder'>;
}

export const DataList = ({ trigger, tableProps }: DataListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterBuilder = useMemo(
    () => new FilterBuilder(setSearchParams, searchParams),
    [setSearchParams, searchParams],
  );
  const filter = useMemo(() => filterBuilder.toFilter(), [filterBuilder]);

  useEffect(() => {
    trigger(filterBuilder.toTriggerArguments());
  }, [trigger, filterBuilder, filter]);

  return (
    <Space direction="vertical" size="middle">
      <DataFilter />
      <DataTable filterBuilder={filterBuilder} {...tableProps} />
    </Space>
  );
};
