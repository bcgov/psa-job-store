/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space } from 'antd';

const { Search } = Input;

const filters: Record<string, any>[] = [
  {
    title: 'Job Family',
    icon: <DownOutlined />,
  },
  {
    title: 'Job Roles',
    icon: <DownOutlined />,
  },
  {
    title: 'Classification',
    icon: <DownOutlined />,
  },
  {
    title: 'Ministry',
    icon: <DownOutlined />,
  },
];

export const JobProfileSearch = () => {
  return (
    <Row justify="center" gutter={8} style={{ margin: '0 1rem' }}>
      <Col xs={24} sm={18} md={18} lg={18} xl={14} style={{ margin: '1rem' }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Search placeholder="Search by job title or keyword" enterButton="Find job profiles" />
          <Space direction="horizontal" style={{ width: '100%', overflowX: 'auto' }}>
            {filters.map((filter) => {
              return (
                <Button type="default">
                  <Space>
                    {filter.title}
                    {filter.icon}
                  </Space>
                </Button>
              );
            })}
          </Space>
        </Space>
      </Col>
    </Row>
  );
};
