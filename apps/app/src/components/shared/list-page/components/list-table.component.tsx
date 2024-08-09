import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { SetURLSearchParams } from 'react-router-dom';
import { PageInfo } from '../../../../redux/services/dtos/page-info.dto';
import { PaginationData } from '../interfaces/pagination-data.interface';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../list-page.constants';

export interface ListTableProps {
  setSearchParams: SetURLSearchParams;
  columns?: ColumnsType<AnyObject>;
  dataSource: TableProps<AnyObject>['dataSource'];
  loading?: boolean;
  pageInfo?: PageInfo;
  paginationData: PaginationData;
}

export const ListTable = ({
  setSearchParams,
  columns,
  dataSource,
  loading,
  pageInfo,
  paginationData,
}: ListTableProps) => {
  console.log('datasource length: ', dataSource);

  return (
    <Table
      onChange={(pagination, filters, sorter) => {
        const { current, pageSize } = pagination;

        setSearchParams((params) => {
          params.set('page', (current ? current : DEFAULT_PAGE).toString());
          params.set('pageSize', (pageSize ? pageSize : DEFAULT_PAGE_SIZE).toString());

          if (!Array.isArray(sorter) && sorter.field != null && sorter.order != null) {
            const { order, field } = sorter;
            const orderBy = `${order === 'ascend' ? '' : '-'}${Array.isArray(field) ? field.join('.') : field}`;
            params.set('orderBy', orderBy);
          } else {
            params.delete('orderBy');
          }

          return params;
        });
      }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{
        ...paginationData,
        total: pageInfo?.totalCount,
      }}
    />
  );
};
