import { SettingOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Tooltip, Typography } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { useLazyGetUsersQuery } from '../../../redux/services/graphql-api/user.api';
import ContentWrapper from '../../home/components/content-wrapper.component';

const { Text } = Typography;

export const UserListPage = () => {
  const [trigger, { data, isFetching }] = useLazyGetUsersQuery();

  useEffect(() => {
    trigger({});
  }, []);

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
