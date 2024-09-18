import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { Space } from 'antd';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataFilter, DataFilterProps } from './components/data-filter/data-filter.component';
import { DataTable, DataTableProps } from './components/data-table/data-table.component';
import { FilterBuilder } from './lib/prisma-filter/common/filter.builder';
import { OrderByTransformers } from './lib/prisma-filter/common/order-by-transformer.type';

export interface DataListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: LazyQueryTrigger<QueryDefinition<any, any, any, any>>;
  filterProps?: Omit<DataFilterProps, 'filterBuilder'>;
  tableProps: Omit<DataTableProps, 'filterBuilder'> & { orderByTransformers: OrderByTransformers };
}

export const DataList = ({
  trigger,
  filterProps,
  tableProps: { orderByTransformers, ...tableProps },
}: DataListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterBuilder = useMemo(
    () => new FilterBuilder(setSearchParams, orderByTransformers, searchParams, filterProps?.searchProps),
    [setSearchParams, searchParams],
  );
  const filter = useMemo(() => filterBuilder.toFilter(), [filterBuilder]);

  useEffect(() => {
    trigger(filterBuilder.toTriggerArguments());
  }, [trigger, filterBuilder, filter]);

  return (
    <Space direction="vertical" size="middle">
      <DataFilter filterBuilder={filterBuilder} {...filterProps} />
      <DataTable filterBuilder={filterBuilder} {...tableProps} />
    </Space>
  );
};
