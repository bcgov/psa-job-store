/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const getBasePath = (path: string) => {
    const pathParts = path.split('/');
    // Check if the last part is a number (ID), if so, remove it
    if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
      pathParts.pop(); // Remove the last part (job profile ID)
    }
    return pathParts.join('/');
  };

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    const basePath = getBasePath(location.pathname);

    if (trimmedValue.length === 0) {
      navigate(basePath); // Navigate without search params if the search is empty
    } else {
      navigate(`${basePath}?search=${trimmedValue}`); // Update the path and search param
    }
  };

  return (
    <Row justify="center" gutter={8} style={{ margin: '0 1rem' }}>
      <Col xs={24} sm={18} md={18} lg={18} xl={14} style={{ margin: '1rem' }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Search
            onSearch={handleSearch}
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            placeholder="Search by job title or keyword"
            enterButton="Find job profiles"
            defaultValue={searchParams.get('search') ?? undefined}
          />
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
