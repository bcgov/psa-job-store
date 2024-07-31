import { SettingOutlined } from '@ant-design/icons';
import { Button, Table, TableProps, Tooltip } from 'antd';
import { isArray } from 'class-validator';
import { useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLazyGetDepartmentsForSettingsQuery } from '../../../../redux/services/graphql-api/settings/settings.api';
import { deserializeOrderBy } from '../../../../redux/services/graphql-api/utils/deserialize-order-by.util';

export class DepartmentTableProps {
  tableProps: TableProps<{ name: string }>;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const DepartmentTable = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: DEFAULT_PAGE.toString(),
    pageSize: DEFAULT_PAGE_SIZE.toString(),
  });
  const [trigger, { data, isFetching }] = useLazyGetDepartmentsForSettingsQuery();

  const fetchData = useCallback(() => {
    const page = parseInt(searchParams.get('page') ?? DEFAULT_PAGE.toString(), 10);
    const pageSize = parseInt(searchParams.get('pageSize') ?? DEFAULT_PAGE_SIZE.toString(), 10);
    const orderBy = searchParams.get('orderBy');

    trigger({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: deserializeOrderBy(orderBy),
    });
  }, [searchParams]);

  useEffect(() => fetchData(), [fetchData]);

  return (
    <Table
      onChange={(pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;

        console.log('pagination: ', pagination);
        console.log('filters: ', filters);
        console.log('sorter: ', sorter);
        console.log('extra: ', extra);

        setSearchParams((params) => {
          params.set('page', current != null ? current.toString() : DEFAULT_PAGE.toString());
          params.set('pageSize', pageSize != null ? pageSize.toString() : DEFAULT_PAGE_SIZE.toString());

          if (!isArray(sorter) && sorter.field != null && sorter.order != null) {
            const { order, field } = sorter;
            const orderBy = `${order === 'ascend' ? '' : '-'}${isArray(field) ? field.join('.') : field}`;
            params.set('orderBy', orderBy);
          } else {
            params.delete('orderBy');
          }

          return params;
        });
      }}
      columns={[
        {
          key: 'id',
          dataIndex: 'id',
          sorter: true,
          title: 'Department ID',
        },
        {
          key: 'name',
          dataIndex: 'name',
          sorter: true,
          title: 'Name',
        },
        {
          key: 'organization.name',
          dataIndex: ['organization', 'name'],
          sorter: true,
          title: 'Ministry',
        },
        {
          key: 'effective_status',
          dataIndex: 'effective_status',
          sorter: true,
          title: 'Status',
        },
        {
          key: 'actions',
          align: 'center',
          title: 'Actions',
          render: (_, record) => (
            <Link to={`${record.id}`}>
              <Tooltip title="Manage department">
                <Button icon={<SettingOutlined />} />
              </Tooltip>
            </Link>
          ),
        },
      ]}
      dataSource={data?.departmentsWithCount.data ?? []}
      loading={isFetching}
      pagination={{
        current: Number(searchParams.get('page')),
        pageSize: Number(searchParams.get('pageSize')),
        total: data?.departmentsWithCount.pageInfo.totalCount,
      }}
    />
  );
};
