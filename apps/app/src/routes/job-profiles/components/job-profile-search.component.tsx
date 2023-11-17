/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons';
import { Col, Flex, Input, Row, Select, Space } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetClassificationsQuery } from '../../../redux/services/graphql-api/classification.api';
import { useGetJobFamiliesQuery } from '../../../redux/services/graphql-api/job-family.api';
import { useGetJobRolesQuery } from '../../../redux/services/graphql-api/job-role.api';
import { useGetMinistriesQuery } from '../../../redux/services/graphql-api/ministry.api';

const { Search } = Input;
type Option = { label: string; value: number };
type FilterData = {
  [key: string]: Option[];
};

const filters: Record<string, any>[] = [
  {
    title: 'Ministry',
    icon: <DownOutlined />,
  },
  {
    title: 'Classification',
    icon: <DownOutlined />,
  },
  {
    title: 'Job Family',
    icon: <DownOutlined />,
  },
  // {
  //   title: 'Job Roles',
  //   icon: <DownOutlined />,
  // },
];

export const JobProfileSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const ministryData = useGetMinistriesQuery().data?.ministries;
  const jobFamilyData = useGetJobFamiliesQuery().data?.jobFamilies;
  const jobRoleData = useGetJobRolesQuery().data?.jobRoles;
  const classificationData = useGetClassificationsQuery().data?.classifications;

  const ministryDataOptions = useMemo(() => {
    return (
      ministryData?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  }, [ministryData]);
  const jobFamilyDataOptions = useMemo(() => {
    return (
      jobFamilyData?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  }, [jobFamilyData]);
  const classificationDataOptions = useMemo(() => {
    return (
      classificationData?.map((item) => ({
        label: item.occupation_group.name + ' ' + item.grid.name,
        value: item.id,
      })) || []
    );
  }, [classificationData]);
  const jobRoleDataOptions = useMemo(() => {
    return (
      jobRoleData?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  }, [jobRoleData]);

  const filterData: FilterData = {
    Ministry: ministryDataOptions,
    'Job Family': jobFamilyDataOptions,
    'Job Roles': jobRoleDataOptions,
    Classification: classificationDataOptions,
  };

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
      searchParams.delete('search');
    } else {
      searchParams.set('search', trimmedValue);
    }

    navigate({
      pathname: basePath,
      search: searchParams.toString(),
    });
  };

  const handleFilters = () => {
    const basePath = getBasePath(location.pathname);

    navigate({
      pathname: basePath,
      search: searchParams.toString(),
    });
  };

  return (
    <Row justify="center" gutter={8} style={{ margin: '0 1rem' }} role="search">
      <Col xs={24} sm={18} md={18} lg={18} xl={14} style={{ margin: '1rem' }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Search
            aria-label="Search by job title or keyword"
            onSearch={handleSearch}
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            allowClear
            defaultValue={searchParams.get('search') ?? undefined}
            enterButton="Find job profiles"
            placeholder="Search by job title or keyword"
          />
          <Flex
            wrap="wrap"
            flex="1 1 0.5 0"
            align="flex-start"
            style={{
              width: '100%',
            }}
          >
            {filters.map((filter) => {
              return (
                <div
                  key={filter.title}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    padding: '20px 10px 10px',
                    marginRight: '8px',
                    marginTop: '10px',
                    flexShrink: 1,
                    minWidth: '20%',
                  }}
                >
                  <label
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '10px',
                      backgroundColor: 'white',
                      padding: '0 5px',
                      fontSize: '14px',
                    }}
                    htmlFor={filter.title}
                  >
                    {filter.title}
                  </label>
                  <Select
                    mode="multiple"
                    filterOption={(inputValue, option) => {
                      return option ? option.label.toLowerCase().includes(inputValue.toLowerCase()) : false;
                    }}
                    allowClear
                    // aria-label={filter.title}
                    id={filter.title}
                    placeholder={filter.title}
                    options={filterData[filter.title]}
                    style={{
                      flexGrow: 1,
                      flexBasis: 0,
                      border: '1px dotted #d9d9d9',
                      borderRadius: '4px',
                      width: '-webkit-fill-available',
                    }}
                    bordered={false}
                    onClear={() => {
                      switch (filter.title) {
                        case 'Job Family':
                          searchParams.delete('job_family_id__in');
                          break;
                        case 'Job Roles':
                          searchParams.delete('job_role_id__in');
                          break;
                        case 'Classification':
                          searchParams.delete('classification_id__in');
                          break;
                        case 'Ministry':
                          searchParams.delete('ministry_id__in');
                          break;
                        default:
                          break;
                      }
                      handleFilters();
                    }}
                    onChange={(value: string) => {
                      switch (filter.title) {
                        case 'Job Family':
                          searchParams.set('job_family_id__in', value);
                          !searchParams.get('job_family_id__in') && searchParams.delete('job_family_id__in');
                          break;
                        case 'Job Roles':
                          searchParams.set('job_role_id__in', value);
                          !searchParams.get('job_role_id__in') && searchParams.delete('job_role_id__in');
                          break;
                        case 'Classification':
                          searchParams.set('classification_id__in', value);
                          !searchParams.get('classification_id__in') && searchParams.delete('classification_id__in');

                          break;
                        case 'Ministry':
                          searchParams.set('ministry_id__in', value);
                          !searchParams.get('ministry_id__in') && searchParams.delete('ministry_id__in');
                          break;
                        default:
                          break;
                      }
                      handleFilters();
                    }}
                    defaultValue={
                      // Set the value on page load from URL
                      filter.title === 'Job Family'
                        ? searchParams.has('job_family_id__in')
                          ? eval('[' + searchParams.get('job_family_id__in') + ']')
                          : undefined
                        : filter.title === 'Job Roles'
                        ? searchParams.has('job_role_id__in')
                          ? eval('[' + searchParams.get('job_role_id__in') + ']')
                          : undefined
                        : filter.title === 'Classification'
                        ? searchParams.has('classification_id__in')
                          ? eval('[' + searchParams.get('classification_id__in') + ']')
                          : undefined
                        : filter.title === 'Ministry'
                        ? searchParams.has('ministry_id__in')
                          ? eval('[' + searchParams.get('ministry_id__in') + ']')
                          : undefined
                        : undefined
                    }
                  />
                </div>
              );
            })}
          </Flex>
        </Space>
      </Col>
    </Row>
  );
};
