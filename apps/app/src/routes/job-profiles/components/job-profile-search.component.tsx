/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

export const JobProfileSearch = ({ filterData }: any) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', value);
    }

    navigate({
      pathname: '/job-profiles',
      search: searchParams.toString(),
    });
  };
  const handleFilters = () => {
    navigate({
      pathname: '/job-profiles',
      search: searchParams.toString(),
    });
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
                <Select
                  placeholder={filter.title}
                  options={filterData[filter.title]}
                  onChange={(value: string) => {
                    switch (filter.title) {
                      case 'Job Family':
                        value ? searchParams.set('job-family', value) : searchParams.delete('job-family');
                        break;
                      case 'Job Roles':
                        value ? searchParams.set('job-role', value) : searchParams.delete('job-role');
                        break;
                      case 'Classification':
                        value ? searchParams.set('classification', value) : searchParams.delete('job-family');
                        break;
                      case 'Ministry':
                        console.log('setting ministry to ', value);
                        value ? searchParams.set('ministry', value) : searchParams.delete('ministry');
                        break;
                      default:
                        break;
                    }
                    handleFilters();
                  }}
                  value={
                    // Set the value on page load from URL
                    filter.title === 'Job Family'
                      ? searchParams.get('job-family')
                      : filter.title === 'Job Roles'
                      ? searchParams.get('job-role')
                      : filter.title === 'Classification'
                      ? searchParams.get('classification')
                      : filter.title === 'Ministry'
                      ? searchParams.get('ministry')
                      : undefined
                  }
                />
              );
            })}
          </Space>
        </Space>
      </Col>
    </Row>
  );
};
