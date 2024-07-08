import { SettingOutlined } from '@ant-design/icons';
import { Button, Spin, Table, Tag, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { useGetUsersForSettingsQuery } from '../../../redux/services/graphql-api/settings/settings.api';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { useSettingsContext } from '../hooks/use-settings-context.hook';

const { Text } = Typography;

export const UserListPage = () => {
  const { organizations } = useSettingsContext();

  const { data, isFetching } = useGetUsersForSettingsQuery();

  return (
    <>
      <PageHeader title="Users" subTitle={'Manage user details'} />
      <ContentWrapper>
        <Table
          columns={[
            {
              key: 'name',
              title: 'Name',
              dataIndex: 'name',
              sorter: true,
              render: (text) => <Text strong>{text}</Text>,
              width: '50%',
            },
            {
              key: 'roles',
              title: 'Roles',
              dataIndex: 'roles',
              sorter: false,
              render: (values: string[]) => {
                return (
                  <div style={{ rowGap: '1rem', wordWrap: 'break-word', wordBreak: 'break-word' }}>
                    {values.map((value) => (
                      <Tag style={{ margin: '2px' }}>
                        {value
                          .split('-')
                          .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
                          .join(' ')}
                      </Tag>
                    ))}
                  </div>
                );
              },
              width: '25%',
            },
            {
              key: 'email',
              title: 'Email',
              dataIndex: 'email',
              sorter: true,
              render: (value) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{value}</div>,
              width: '25%',
            },
            {
              key: 'metadata.org_chart.department_ids',
              title: 'Departments',
              dataIndex: ['metadata', 'org_chart', 'department_ids'],
              sorter: false,
              render: (value: string[]) => {
                return organizations.isLoading ? (
                  <Spin size="small" spinning />
                ) : (
                  <div>
                    {(value ?? []).map((v) => organizations.departments?.find((d) => d.id === v)?.name).join(', ')}
                  </div>
                );
              },
            },
            {
              title: 'Actions',
              render: (_, record) => (
                <Link to={`${record.id}`}>
                  <Tooltip title="Manage user">
                    <Button icon={<SettingOutlined />} />
                  </Tooltip>
                </Link>
              ),
              align: 'center',
            },
          ]}
          dataSource={data?.users}
          loading={isFetching}
          rowKey="id"
          size="small"
        />
      </ContentWrapper>
    </>
  );
};
