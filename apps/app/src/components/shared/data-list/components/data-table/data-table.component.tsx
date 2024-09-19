import { Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { TableProps } from 'antd/lib';
import { useMemo } from 'react';
import { PageInfo } from '../../../../../redux/services/dtos/page-info.dto';
import { FilterBuilder } from '../../lib/prisma-filter/common/filter.builder';

export interface DataTableProps {
  columns?: ColumnsType<AnyObject>;
  data?: { data?: TableProps<AnyObject>['dataSource']; pageInfo: PageInfo };
  filterBuilder: FilterBuilder;
  loading?: boolean;
}

export const DataTable = ({ columns, data, filterBuilder, loading }: DataTableProps) => {
  const filter = useMemo(() => filterBuilder.toFilter(), [filterBuilder]);

  return (
    <Table
      onChange={(pagination, _filters, sorter) => {
        const { current, pageSize } = pagination;

        const sorters = Array.isArray(sorter)
          ? sorter
              .filter((s) => s.field != null && s.order != null)
              .map((s) => ({ field: Array.isArray(s.field) ? `${s.field.join('.')}` : `${s.field}`, order: s.order }))
          : sorter.field != null && sorter.order != null
            ? [
                {
                  field: Array.isArray(sorter.field) ? `${sorter.field.join('.')}` : `${sorter.field}`,
                  order: sorter.order,
                },
              ]
            : [];

        filterBuilder.setOrderBy(
          sorters.length > 0 ? sorters.map((s) => ({ [s.field]: s.order === 'ascend' ? 'asc' : 'desc' })) : undefined,
        );

        if (current != null && pageSize != null) {
          filterBuilder.setPage(current);
          filterBuilder.setPageSize(pageSize);
        }

        filterBuilder.apply();
      }}
      columns={columns}
      dataSource={data?.data}
      loading={loading}
      pagination={{
        ...(filter.page != null &&
          filterBuilder.setPageSize != null && {
            current: filter.page,
            pageSize: filter.pageSize,
          }),
        total: data?.pageInfo.totalCount,
      }}
      size="middle"
    />
  );
};
