import { SettingOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip } from 'antd';
import { isArray } from 'class-validator';
import { Link, SetURLSearchParams } from 'react-router-dom';
import { GetDepartmentsForSettingsResponse } from '../../../../redux/services/graphql-api/settings/dtos/get-departments-for-settings-response.dto';
import { DEFAULT_SEARCH_PARAMS } from '../department.constants';

export class DepartmentTableProps {
  setSearchParams: SetURLSearchParams;
  data: GetDepartmentsForSettingsResponse | undefined;
  isLoading?: boolean;
  searchParams: URLSearchParams;
}

export const DepartmentTable = ({ setSearchParams, data, isLoading, searchParams }: DepartmentTableProps) => {
  return (
    <Table
      onChange={(pagination, _filters, sorter) => {
        const { current, pageSize } = pagination;

        setSearchParams((params) => {
          params.set(
            'page',
            current != null ? current.toString() : (DEFAULT_SEARCH_PARAMS as Record<string, string>).page.toString(),
          );
          params.set(
            'pageSize',
            pageSize != null
              ? pageSize.toString()
              : (DEFAULT_SEARCH_PARAMS as Record<string, string>).pageSize.toString(),
          );

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
      loading={isLoading}
      pagination={{
        current: Number(searchParams.get('page')),
        pageSize: Number(searchParams.get('pageSize')),
        total: data?.departmentsWithCount.pageInfo.totalCount,
      }}
    />
  );
};
