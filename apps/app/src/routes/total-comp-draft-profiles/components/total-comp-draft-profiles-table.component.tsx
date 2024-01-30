/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowDownOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { SerializedError } from '@reduxjs/toolkit';
import { Button, Card, Col, Menu, Popover, Row, Table, Tooltip } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { ErrorResponse, Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorGraphic from '../../../assets/empty_error.svg';
import EmptyJobPositionGraphic from '../../../assets/empty_jobPosition.svg';
import '../../../components/app/common/css/filtered-table.component.css';
import {
  GetJobProfilesDraftsResponse,
  GetJobProfilesResponse,
} from '../../../redux/services/graphql-api/job-profile-types';
import {
  useDuplicateJobProfileMutation,
  useLazyGetJobProfilesDraftsQuery,
  useLazyGetJobProfilesQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import { formatDateTime } from '../../../utils/Utils';

// Define the new PositionsTable component
interface MyPositionsTableProps {
  // handleTableChangeCallback?: (...args: any[]) => void; // assuming the handleTableChange is of Ant Design's Table onChange type
  allowSorting?: boolean;
  showPagination?: boolean;
  showFooter?: boolean;
  style?: CSSProperties;
  itemsPerPage?: number;
  topRightComponent?: ReactNode;
  tableTitle?: string;
  state?: string;
  onDataAvailable?: (isDataAvailable: boolean) => void;
}

type ColumnTypes = {
  title: string | JSX.Element;
  dataIndex?: string;
  key: string;
  sorter?: boolean;
  defaultSortOrder?: SortOrder;
  render?: (text: any, record: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right'; // AlignType is typically one of these string literals
};

// Declare the MyPositionsTable component with TypeScript
const TotalCompProfilesTable: React.FC<MyPositionsTableProps> = ({
  allowSorting = true,
  showPagination = true,
  showFooter = true,
  style,
  itemsPerPage = 10,
  topRightComponent,
  tableTitle = 'My Positions',
  state = 'DRAFT',
  onDataAvailable,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL parameters for table properties
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialPageSize = parseInt(searchParams.get('pageSize') || itemsPerPage.toString());
  const initialSortField = searchParams.get('sortField');
  const initialSortOrder = searchParams.get('sortOrder');

  // Set initial state for table properties
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const [totalResults, setTotalResults] = useState(0); // Total results count from API
  const [error, setError] = useState<string | null>(null);

  // Callback function to be called when table properties change
  const handleTableChangeCallback = (pagination: any, _filters: any, sorter: any) => {
    const newPage = pagination.current;
    const newPageSize = pagination.pageSize;
    const newSortField = sorter.field;
    const newSortOrder = sorter.order;

    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (newPage !== 1) newSearchParams.set('page', newPage.toString());
    else newSearchParams.delete('page');

    if (newPageSize !== 10) newSearchParams.set('pageSize', newPageSize.toString());
    else newSearchParams.delete('pageSize');

    if (newSortOrder) {
      newSearchParams.set('sortField', newSortField);
      newSearchParams.set('sortOrder', newSortOrder === 'ascend' ? 'ASC' : 'DESC');
    } else {
      newSearchParams.delete('sortField');
      newSearchParams.delete('sortOrder');
      // setSortField(null);
    }
    setSearchParams(newSearchParams);
  };

  let trigger: any;
  let data: GetJobProfilesDraftsResponse | GetJobProfilesResponse | undefined;
  let isLoading: boolean;
  let fetchError: ErrorResponse | SerializedError | null | undefined;

  if (state === 'DRAFT') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [trigger, { data, isLoading, error: fetchError }] = useLazyGetJobProfilesDraftsQuery();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [trigger, { data, isLoading, error: fetchError }] = useLazyGetJobProfilesQuery();
  }

  // Check if data is available and call the callback function to notify the parent component
  useEffect(() => {
    if (isLoading) return;
    const hasData =
      (data && 'jobProfilesDrafts' in data && data.jobProfilesDrafts.length > 0) ||
      (data && 'jobProfiles' in data && data.jobProfiles.length > 0);
    if (onDataAvailable) {
      onDataAvailable(hasData || false);
    }
  }, [data, onDataAvailable, isLoading]);

  // Check if there was an error fetching data and set the error message
  useEffect(() => {
    if (fetchError) {
      setError('An error occurred while fetching data.');
    } else {
      setError(null);
    }
  }, [fetchError]);

  const getSortOrder = (fieldName: string): SortOrder | undefined => {
    if (sortField === fieldName) {
      return sortOrder === 'ASC' ? 'ascend' : 'descend';
    }
    return undefined;
  };

  useEffect(() => {
    if (data && 'jobProfilesDrafts' in data) {
      setTotalResults(data.jobProfilesDraftsCount);
    }
    if (data && 'jobProfilesCount' in data) {
      setTotalResults(data.jobProfilesCount);
    }
  }, [data]);

  const columns: ColumnTypes[] = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('title'),
      render: (text: any, record: any) => <Link to={`/total-compensation/profiles/${record.id}`}>{text}</Link>,
    },
    {
      sorter: false,
      defaultSortOrder: getSortOrder('classifications'),
      title: 'Class',
      dataIndex: 'classifications',
      key: 'classifications',
      render: (classifications: any[]) => classifications?.map((c) => c.classification.name).join(', '),
    },
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('number'),
      title: 'JobStore number',
      dataIndex: 'number',
      key: 'number',
    },
    // {
    //   sorter: allowSorting,
    //   defaultSortOrder: getSortOrder('career_group'),
    //   title: 'Career Group',
    //   dataIndex: 'career_group',
    //   key: 'career_group',
    //   render: (careerGroup: any) => careerGroup?.name,
    // },
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('jobFamilies'),
      title: 'Job Family',
      dataIndex: 'jobFamilies',
      key: 'jobFamilies',
      render: (jobFamilies: any[]) => {
        if (jobFamilies.length === 0) {
          return '-';
        } else if (jobFamilies.length === 1) {
          return jobFamilies[0].jobFamily.name;
        }

        // Create a string with all ministry names
        const jobFamilyNames = jobFamilies.map((jobFamily) => jobFamily.jobFamily.name).join(', ');

        return (
          <span>
            {jobFamilies.length}{' '}
            <Tooltip title={jobFamilyNames}>
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        );
      },
    },
    {
      sorter: false,
      defaultSortOrder: getSortOrder('organizations'),
      title: 'Ministries',
      dataIndex: 'organizations',
      key: 'organizations',
      render: (organizations: any[]) => {
        if (organizations.length === 0) {
          return 'All';
        }

        // Create a string with all ministry names
        const ministryNames = organizations.map((org) => org.organization.name).join(', ');

        return (
          <span>
            {organizations.length}{' '}
            <Tooltip title={ministryNames}>
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        );
      },
    },
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('updated_at'),
      title: 'Modified at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text: string) => formatDateTime(text),
    },
    {
      title: <SettingOutlined />,
      align: 'center',
      key: 'action',
      render: (_text: any, record: any) => (
        <Popover content={getMenuContent(record)} trigger="click" placement="bottomRight">
          <EllipsisOutlined />
        </Popover>
      ),
    },
  ];

  const updateData = useCallback(() => {
    const search = searchParams.get('search');

    const organizationFilter = searchParams.get('ministry_id__in');
    // const careerGroupFilter = searchParams.get('career_group_id__in');
    const jobRoleFilter = searchParams.get('job_role_id__in');
    const classificationFilter = searchParams.get('classification_id__in');
    const jobFamilyFilter = searchParams.get('job_family_id__in');
    //   setCurrentPage(parseInt(searchParams.get('page') ?? '1'));

    // if sortOrder is "ASC" or "DESC" convert to 'ascend' or 'descend' respectively into useSortField variable

    let useSortOrder = sortOrder;
    if (sortOrder === 'ASC') {
      useSortOrder = 'ascend';
    } else if (sortOrder === 'DESC') {
      useSortOrder = 'descend';
    }

    const sortParams = sortField
      ? {
          orderBy: [
            {
              [sortField]:
                sortField === 'job_family'
                  ? {
                      name: useSortOrder === 'ascend' ? 'asc' : 'desc',
                    }
                  : sortField === 'updated_at'
                    ? { sort: useSortOrder === 'ascend' ? 'asc' : 'desc' }
                    : useSortOrder === 'ascend'
                      ? 'asc'
                      : 'desc',
            },
          ],
        }
      : {};

    //   // todo: this code is duplicated in job-profiles.component.tsx
    trigger({
      ...(search != null && { search }),
      where: {
        AND: [
          // ...(careerGroupFilter !== null
          //   ? [
          //       {
          //         career_group_id: {
          //           in: JSON.parse(`[${careerGroupFilter}]`),
          //         },
          //       },
          //     ]
          //   : []), // todo: replace this with job family filter
          ...(organizationFilter != null
            ? [
                {
                  organizations: {
                    some: {
                      organization_id: {
                        in: organizationFilter.split(',').map((v) => v.trim()),
                      },
                    },
                  },
                },
              ]
            : []),
          ...(classificationFilter != null
            ? [
                {
                  classifications: {
                    some: {
                      classification_id: {
                        in: classificationFilter.split(',').map((v) => v.trim()),
                      },
                    },
                  },
                },
              ]
            : []),
          ...(jobFamilyFilter !== null
            ? [
                {
                  jobFamilies: { some: { jobFamilyId: { in: JSON.parse(`[${jobFamilyFilter}]`) } } },
                },
              ]
            : []),
          ...(jobRoleFilter !== null
            ? [
                {
                  role_id: {
                    in: JSON.parse(`[${jobRoleFilter}]`),
                  },
                },
              ]
            : []),
        ],
      },
      ...sortParams,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  }, [searchParams, trigger, currentPage, pageSize, sortField, sortOrder]);

  let hasPositionRequests: boolean | undefined;

  // Check if the type is GetJobProfilesResponse
  if (data && 'jobProfiles' in data) {
    hasPositionRequests = data.jobProfiles && data.jobProfiles.length > 0;
  } else {
    hasPositionRequests = data?.jobProfilesDrafts && data.jobProfilesDrafts.length > 0;
  }

  const renderTableFooter = () => {
    return (
      <div>
        Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalResults)} of {totalResults}{' '}
        results
      </div>
    );
  };

  useEffect(() => {
    updateData();
  }, [updateData]);

  const handleTableChange = (pagination: any, _filters: any, sorter: any) => {
    const newPage = pagination.current;
    const newPageSize = pagination.pageSize;
    const newSortField = sorter.field;
    const newSortOrder = sorter.order;

    setCurrentPage(newPage);
    setPageSize(newPageSize);
    setSortField(newSortField);
    setSortOrder(newSortOrder);

    if (!newSortOrder) setSortField(null);

    if (handleTableChangeCallback) handleTableChangeCallback(pagination, _filters, sorter);
  };

  const [duplicateJobProfile] = useDuplicateJobProfileMutation();
  const navigate = useNavigate();
  const duplicate = async (record: any) => {
    console.log('duplicate', record);
    const res = await duplicateJobProfile({ jobProfileId: record.id }).unwrap();
    console.log('res: ', res);
    navigate(`/total-compensation/profiles/${res.duplicateJobProfile}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMenuContent = (_record: any) => {
    return (
      <Menu>
        <>
          {state === 'PUBLISHED' ? (
            <>
              <Menu.Item key="view" icon={<EyeOutlined />}>
                View
              </Menu.Item>
              <Menu.Item key="unpublish" icon={<ArrowDownOutlined />}>
                Unpublish
              </Menu.Item>
              <Menu.Item key="duplicate" icon={<CopyOutlined />} onClick={() => duplicate(_record)}>
                Duplicate
              </Menu.Item>
              <Menu.Item key="copy" icon={<LinkOutlined />}>
                Copy link
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="edit" icon={<EditOutlined />}>
                Edit
              </Menu.Item>
              <Menu.Item key="publish" icon={<DownloadOutlined />}>
                Publish
              </Menu.Item>
              <Menu.Item key="duplicate" icon={<CopyOutlined />} onClick={() => duplicate(_record)}>
                Duplicate
              </Menu.Item>
              <Menu.Item key="copy" icon={<LinkOutlined />}>
                Copy link
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />}>
                Delete
              </Menu.Item>
            </>
          )}
        </>
      </Menu>
    );
  };

  // // State to track the hovered row's key

  // const [hoveredRowKey, setHoveredRowKey] = useState(null);

  // // Handler to be called when a row is hovered
  // const handleMouseEnter = (key: any) => setHoveredRowKey(key);

  // // Handler to be called when the mouse leaves a row
  // const handleMouseLeave = () => setHoveredRowKey(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="profilesTable" style={style}>
      <Card className="tableHeader">
        <Row gutter={24} wrap>
          <Col span={12}>
            <h2 style={{ marginBottom: 0 }}>{tableTitle}</h2>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Col>
                {topRightComponent ? (
                  topRightComponent
                ) : (
                  <Button icon={<ReloadOutlined />} onClick={() => updateData()} />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {!isLoading && hasPositionRequests && !error && (
        <Table
          // onRow={(record) => {
          //   return {
          //     onMouseEnter: () => handleMouseEnter(record.id),
          //     onMouseLeave: handleMouseLeave,
          //   };
          // }}
          className="tableWithHeader"
          columns={columns}
          dataSource={data ? ('jobProfilesDrafts' in data ? data.jobProfilesDrafts : data.jobProfiles) : undefined}
          rowKey="id"
          pagination={
            showPagination
              ? {
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalResults,
                  pageSizeOptions: ['2', '10', '20', '50'],
                  showSizeChanger: true,
                }
              : false
          }
          onChange={handleTableChange}
          footer={showFooter ? renderTableFooter : undefined}
        />
      )}
      {!isLoading && !hasPositionRequests && !error && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            flexGrow: 1, // Expand to take available space
            background: 'white',
            marginBottom: '1rem',
          }}
        >
          <img src={EmptyJobPositionGraphic} alt="No positions" />
          <div>Looks like you’re not working on anything right now.</div>
          {/* Link button to the orgchart page */}
          <Link to="/total-compensation/create-profile">
            <Button type="primary" style={{ marginTop: '1rem' }}>
              Create new profile
            </Button>
          </Link>
        </div>
      )}
      {error && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            flexGrow: 1, // Expand to take available space
            background: 'white',
            marginBottom: '1rem',
          }}
        >
          <img src={ErrorGraphic} alt="Error" />
          <div>Oops! We were unable to fetch the details.</div>
          <Button type="link" style={{ marginTop: '1rem' }} icon={<ReloadOutlined />} onClick={updateData}>
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default TotalCompProfilesTable;
