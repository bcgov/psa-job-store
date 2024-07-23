import { InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Space, Spin, Table, Tag, Tooltip, Typography } from 'antd';
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
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <Table
            columns={[
              {
                key: 'name',
                title: 'Name',
                dataIndex: 'name',
                sorter: false,
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
                sorter: false,
                render: (value) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{value}</div>,
                width: '25%',
              },
              {
                key: 'metadata.org_chart.department_ids',
                title: 'Departments',
                dataIndex: ['metadata', 'org_chart', 'department_ids'],
                sorter: false,
                render: (value: string[]) => {
                  if (organizations.isLoading) {
                    return <Spin size="small" spinning />;
                  }

                  // Reduce data to the format { organization_name: string, department_count: number }[]
                  const organizationAndDepartmentCounts = (
                    organizations && organizations.data ? [...organizations.data] : []
                  )
                    .filter((o) => o.departments.filter((d) => d.effective_status === 'Active').length > 0)
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((organization) => ({
                      organization_name: organization.name,
                      department_count: [...organization.departments]
                        .filter((d) => d.effective_status === 'Active' && value?.includes(d.id))
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((d) => d.id).length,
                    }))
                    .filter((o) => o.department_count > 0);

                  return (
                    <span>
                      <Tooltip
                        title={
                          <>
                            {organizationAndDepartmentCounts.map((o) => (
                              <div>
                                {o.organization_name} ({o.department_count})
                              </div>
                            ))}
                          </>
                        }
                      >
                        <Space>
                          {organizationAndDepartmentCounts.reduce((prev, curr) => prev + curr.department_count, 0)}
                          <InfoCircleOutlined />
                        </Space>
                      </Tooltip>
                    </span>
                  );

                  //       <span>
                  //   {jobFamilies.length}{' '}
                  //   <Tooltip title={jobFamilyNames}>
                  //     <InfoCircleOutlined />
                  //   </Tooltip>
                  // </span>

                  // return organizations.isLoading ? (
                  //   <Spin size="small" spinning />
                  // ) : (
                  //   <div>
                  //     {(value ?? []).map((v) => organizations.departments?.find((d) => d.id === v)?.name).join(', ')}
                  //   </div>
                  // );
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
        </Space>
      </ContentWrapper>
    </>
  );
};
