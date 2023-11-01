/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Space } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetClassificationsQuery } from '../../../redux/services/graphql-api/classification.api';
import { useGetJobFamiliesQuery } from '../../../redux/services/graphql-api/job-family.api';
import { useGetJobRolesQuery } from '../../../redux/services/graphql-api/job-role.api';
import { useGetMinistriesQuery } from '../../../redux/services/graphql-api/ministry.api';

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

  const ministryData = useGetMinistriesQuery().data?.ministries;
  const jobFamilyData = useGetJobFamiliesQuery().data?.jobFamilies;
  const jobRoleData = useGetJobRolesQuery().data?.jobRoles;
  const classificationData = useGetClassificationsQuery().data?.classifications;

  const filterData = useMemo(() => {
    return {
      Ministry: ministryData?.map((ministry) => ({
        value: ministry.id.toString(),
        label: ministry.name,
      })),
      'Job Family': jobFamilyData?.map((jobFamily) => ({
        value: jobFamily.id.toString(),
        label: jobFamily.name,
      })),
      'Job Roles': jobRoleData?.map((jobRole) => ({
        value: jobRole.id.toString(),
        label: jobRole.name,
      })),
      Classification: classificationData?.map((classification) => ({
        value: classification.id.toString(),
        label: classification.occupation_group.name + classification.grid.name,
      })),
    } as Record<string, any>;
  }, [ministryData, jobFamilyData, jobRoleData, classificationData]);

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

  const handleFilters = () => {
    const basePath = getBasePath(location.pathname);

    navigate({
      pathname: basePath,
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
                  allowClear
                  placeholder={filter.title}
                  options={filterData[filter.title]}
                  onClear={() => {
                    switch (filter.title) {
                      case 'Job Family':
                        searchParams.delete('job-family');
                        break;
                      case 'Job Roles':
                        searchParams.delete('job-role');
                        break;
                      case 'Classification':
                        searchParams.delete('classification');
                        break;
                      case 'Ministry':
                        searchParams.delete('ministry');
                        break;
                      default:
                        break;
                    }
                    handleFilters();
                  }}
                  onChange={(value: string) => {
                    switch (filter.title) {
                      case 'Job Family':
                        value ? searchParams.set('job-family', value) : searchParams.delete('job-family');
                        break;
                      case 'Job Roles':
                        value ? searchParams.set('job-role', value) : searchParams.delete('job-role');
                        break;
                      case 'Classification':
                        value ? searchParams.set('classification', value) : searchParams.delete('classification');
                        break;
                      case 'Ministry':
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
