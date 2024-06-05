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
  UploadOutlined,
} from '@ant-design/icons';
import { SerializedError } from '@reduxjs/toolkit';
import { Button, Card, Col, Menu, Modal, Popover, Result, Row, Table, Tooltip } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { ErrorResponse, Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorGraphic from '../../../assets/empty_error.svg';
import EmptyJobPositionGraphic from '../../../assets/empty_jobPosition.svg';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import '../../../components/app/common/css/filtered-table.component.css';
import {
  GetJobProfilesArchivedResponse,
  GetJobProfilesDraftsResponse,
  GetJobProfilesResponse,
} from '../../../redux/services/graphql-api/job-profile-types';
import {
  useDeleteJobProfileMutation,
  useDuplicateJobProfileMutation,
  useLazyGetJobProfilesArchivedQuery,
  useLazyGetJobProfilesDraftsQuery,
  useLazyGetJobProfilesQuery,
  useUnarchiveJobProfileMutation,
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
  is_archived?: boolean;
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
  is_archived = false,
  style,
  itemsPerPage = 10,
  topRightComponent,
  tableTitle = 'My Position Requests',
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
  const [hasSearched, setHasSearched] = useState(false);

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
  let data: GetJobProfilesDraftsResponse | GetJobProfilesResponse | GetJobProfilesArchivedResponse | undefined;
  let isLoading: boolean;
  let fetchError: ErrorResponse | SerializedError | null | undefined;
  let link: string;
  if (state === 'DRAFT') {
    if (is_archived === false) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      [trigger, { data, isLoading, error: fetchError }] = useLazyGetJobProfilesDraftsQuery();
      link = '/draft-job-profiles/';
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      [trigger, { data, isLoading, error: fetchError }] = useLazyGetJobProfilesArchivedQuery();
      link = '/archived-job-profiles/';
    }
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [trigger, { data, isLoading, error: fetchError }] = useLazyGetJobProfilesQuery();
    link = '/published-job-profiles/';
  }

  // Check if data is available and call the callback function to notify the parent component
  useEffect(() => {
    if (isLoading) return;

    const hasData =
      (data && 'jobProfilesArchived' in data && data.jobProfilesArchived.length > 0) ||
      (data && 'jobProfilesDrafts' in data && data.jobProfilesDrafts.length > 0) ||
      (data && 'jobProfiles' in data && data.jobProfiles.length > 0);

    if (onDataAvailable) {
      onDataAvailable(hasData || hasSearched || false);
    }
  }, [data, onDataAvailable, isLoading, hasSearched]);

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
    if (data && 'jobProfilesArchived' in data) {
      setTotalResults(data.jobProfilesArchivedCount);
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
      render: (text: any, record: any) => <Link to={`${link}${record.id}`}>{text?.trim() || 'Untitled'}</Link>,
    },
    {
      sorter: allowSorting,
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
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('owner'),
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (owner: any) => owner?.name,
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
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('organizations'),
      title: 'Ministries',
      dataIndex: 'organizations',
      key: 'organizations',
      render: (organizations: any[]) => {
        if (organizations.length === 0) {
          return 'All';
        } else if (organizations.length === 1) {
          // Directly return the ministry name if there's only one
          return organizations[0].organization.name;
        } else {
          // Sort organizations by name and then create a string with all ministry names
          const sortedOrganizations = [...organizations].sort((a, b) =>
            a.organization.name.localeCompare(b.organization.name),
          );
          const ministryNames = sortedOrganizations.map((org) => org.organization.name).join(', ');

          return (
            <span>
              {organizations.length}{' '}
              <Tooltip title={ministryNames}>
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          );
        }
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
    const jobStreamFilter = searchParams.get('job_stream_id__in');

    if (search || organizationFilter || jobRoleFilter || jobFamilyFilter || classificationFilter || jobStreamFilter) {
      setHasSearched(true);
    }
    //   setCurrentPage(parseInt(searchParams.get('page') ?? '1'));

    // if sortOrder is "ASC" or "DESC" convert to 'ascend' or 'descend' respectively into useSortField variable

    let useSortOrder = sortOrder;
    if (sortOrder === 'ASC') {
      useSortOrder = 'ascend';
    } else if (sortOrder === 'DESC') {
      useSortOrder = 'descend';
    }

    let sortParams = {};

    // Check if the user is sorting by classification
    const isSortingByClassification = sortField === 'classifications';
    const isSortingByJobFamily = sortField === 'jobFamilies';
    const isSortingByOrganization = sortField === 'organizations';

    if (!isSortingByClassification && !isSortingByJobFamily && !isSortingByOrganization) {
      sortParams = sortField
        ? {
            orderBy: [
              {
                [sortField]:
                  sortField === 'number' || sortField == 'title'
                    ? useSortOrder === 'ascend'
                      ? 'asc'
                      : 'desc'
                    : sortField === 'owner'
                      ? {
                          name: {
                            sort: useSortOrder === 'ascend' ? 'asc' : 'desc',
                            // add nulls handling if required, e.g., nulls: 'first'
                          },
                        }
                      : sortField === 'updated_at'
                        ? { sort: useSortOrder === 'ascend' ? 'asc' : 'desc' }
                        : { sort: useSortOrder === 'ascend' ? 'asc' : 'desc' },
              },
            ],
          }
        : {};
    }

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
                      OR: classificationFilter?.split(',').flatMap((c) => {
                        const [id, employee_group_id, peoplesoft_id] = c.split('.');
                        return {
                          classification_id: { equals: id },
                          classification_employee_group_id: { equals: employee_group_id },
                          classification_peoplesoft_id: { equals: peoplesoft_id },
                        };
                      }),
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
          ...(jobStreamFilter !== null
            ? [
                {
                  streams: { some: { streamId: { in: JSON.parse(`[${jobStreamFilter}]`) } } },
                },
              ]
            : []),
        ],
      },
      ...sortParams,
      sortByClassificationName: isSortingByClassification,
      sortByJobFamily: isSortingByJobFamily,
      sortByOrganization: isSortingByOrganization,
      sortOrder:
        isSortingByClassification || isSortingByJobFamily || isSortingByOrganization
          ? useSortOrder === 'ascend'
            ? 'asc'
            : 'desc'
          : null,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  }, [searchParams, trigger, currentPage, pageSize, sortField, sortOrder]);

  let hasPositionRequests: boolean | undefined;

  // Check if the type is GetJobProfilesResponse
  if (data && 'jobProfiles' in data) {
    hasPositionRequests = data.jobProfiles && data.jobProfiles.length > 0;
  } else if (data && 'jobProfilesDrafts' in data) {
    hasPositionRequests = data?.jobProfilesDrafts && data.jobProfilesDrafts.length > 0;
  } else if (data && 'jobProfilesArchived' in data) {
    hasPositionRequests = data?.jobProfilesArchived && data.jobProfilesArchived.length > 0;
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
  const [deleteJobProfile] = useDeleteJobProfileMutation();
  const [unarchiveJobProfile] = useUnarchiveJobProfileMutation();

  const navigate = useNavigate();
  const duplicate = async (record: any) => {
    // console.log('duplicate', record);
    const res = await duplicateJobProfile({ jobProfileId: record.id }).unwrap();
    // console.log('res: ', res);
    navigate(`${link}${res.duplicateJobProfile}`);
  };

  const deleteDraft = async (record: any) => {
    Modal.confirm({
      title: 'Delete Draft',
      content:
        'Are you sure you want to delete this draft? If the profile had any Position Requests linked to it, it will be archived instead.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteJobProfile({ jobProfileId: record.id }).unwrap();
        updateData();
      },
    });
  };

  const unarchive = async (record: any) => {
    Modal.confirm({
      title: 'Unarchive job profile',
      content: 'Are you sure you want to unarchive this job profile? It will appear in the drafts section',
      okText: 'Unarchive',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await unarchiveJobProfile({ jobProfileId: record.id }).unwrap();
        updateData();
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMenuContent = (_record: any) => {
    return (
      <Menu>
        <>
          {state === 'PUBLISHED' && (
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
          )}

          {state === 'DRAFT' && !is_archived && (
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
              <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={() => deleteDraft(_record)}>
                Delete
              </Menu.Item>
            </>
          )}

          {state === 'DRAFT' && is_archived && (
            <>
              <Menu.Item key="publish" icon={<UploadOutlined />} onClick={() => unarchive(_record)}>
                Unarchive
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

  if (isLoading) return <LoadingSpinnerWithMessage />;

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
          dataSource={
            data
              ? 'jobProfilesDrafts' in data
                ? data.jobProfilesDrafts
                : 'jobProfilesArchived' in data
                  ? data.jobProfilesArchived
                  : data.jobProfiles
              : undefined
          }
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
      {!isLoading &&
        !hasPositionRequests &&
        !error &&
        (hasSearched ? (
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
            <Result
              status="404"
              title="No search results"
              subTitle="Sorry, no results returned for your query."
              // extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        ) : (
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
            {is_archived ? (
              <>
                <div>There are no archived profiles.</div>
              </>
            ) : (
              <>
                <div>Looks like you’re not working on anything right now.</div>
                {/* Link button to the orgchart page */}
                <Link to="/draft-job-profiles/create">
                  <Button type="primary" style={{ marginTop: '1rem' }}>
                    Create new profile
                  </Button>
                </Link>
              </>
            )}
          </div>
        ))}
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
