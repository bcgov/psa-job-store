/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Menu, Popover, Row, Table, Tooltip } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../../../components/app/common/css/filtered-table.component.css';
import { useLazyGetJobProfilesDraftsQuery } from '../../../redux/services/graphql-api/job-profile.api';
// import EmptyJobPositionGraphic from '../images/empty_jobPosition.svg';

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
const TotalCompDraftProfilesTable: React.FC<MyPositionsTableProps> = ({
  allowSorting = true,
  showPagination = true,
  showFooter = true,
  style,
  itemsPerPage = 10,
  topRightComponent,
  tableTitle = 'My Positions',
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

  const [trigger, { data, isLoading }] = useLazyGetJobProfilesDraftsQuery();

  const getSortOrder = (fieldName: string): SortOrder | undefined => {
    if (sortField === fieldName) {
      return sortOrder === 'ASC' ? 'ascend' : 'descend';
    }
    return undefined;
  };

  useEffect(() => {
    if (data && data.jobProfilesDrafts !== undefined) {
      setTotalResults(data.jobProfilesDraftsCount);
    }
  }, [data]);

  const columns: ColumnTypes[] = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('title'),
      render: (text: any, record: any) => <Link to={`/position-request/${record.id}`}>{text}</Link>,
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
      defaultSortOrder: getSortOrder('career_group'),
      title: 'Career Group',
      dataIndex: 'career_group',
      key: 'career_group',
      render: (careerGroup: any) => careerGroup?.name,
    },
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('job_family'),
      title: 'Job Family',
      dataIndex: 'job_family',
      key: 'job_family',
      render: (jobFamily: any) => jobFamily?.name,
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
    const careerGroupFilter = searchParams.get('career_group_id__in');
    const jobRoleFilter = searchParams.get('job_role_id__in');
    const classificationFilter = searchParams.get('classification_id__in');
    const jobFamilyFilter = searchParams.get('job_family_id__in');
    //   setCurrentPage(parseInt(searchParams.get('page') ?? '1'));

    const sortParams = sortField
      ? {
          orderBy: [
            {
              [sortField]:
                sortField === 'title' || sortField === 'updated_at'
                  ? sortOrder === 'ascend'
                    ? 'asc'
                    : 'desc'
                  : { sort: sortOrder === 'ascend' ? 'asc' : 'desc' },
            },
          ],
        }
      : {};

    //   // todo: this code is duplicated in job-profiles.component.tsx
    trigger({
      ...(search != null && { search }),
      where: {
        AND: [
          ...(careerGroupFilter !== null
            ? [
                {
                  career_group_id: {
                    in: JSON.parse(`[${careerGroupFilter}]`),
                  },
                },
              ]
            : []),
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
                  job_family_id: {
                    in: JSON.parse(`[${jobFamilyFilter}]`),
                  },
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

  const hasPositionRequests = data?.jobProfilesDrafts && data.jobProfilesDrafts.length > 0;

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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMenuContent = (_record: any) => {
    return (
      <Menu>
        <>
          <Menu.Item key="edit" icon={<EditOutlined />}>
            Edit
          </Menu.Item>
          <Menu.Item key="publish" icon={<DownloadOutlined />}>
            Publish
          </Menu.Item>
          <Menu.Item key="publish" icon={<CopyOutlined />}>
            Duplicate
          </Menu.Item>
          <Menu.Item key="copy" icon={<LinkOutlined />}>
            Copy link
          </Menu.Item>
          <Menu.Item key="delete" icon={<DeleteOutlined />}>
            Delete
          </Menu.Item>
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
    <div style={style}>
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

      {hasPositionRequests ? (
        <Table
          // onRow={(record) => {
          //   return {
          //     onMouseEnter: () => handleMouseEnter(record.id),
          //     onMouseLeave: handleMouseLeave,
          //   };
          // }}
          className="tableWithHeader"
          columns={columns}
          dataSource={data?.jobProfilesDrafts}
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
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'white', flex: 1, overflowY: 'auto' }}>
          {/* <img src={EmptyJobPositionGraphic} alt="No positions" /> */}
          <div>New to the JobStore?</div>
          {/* Link button to the orgchart page */}
          <Link to="/my-positions/create">
            <Button type="primary" style={{ marginTop: '1rem' }}>
              Create new position
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TotalCompDraftProfilesTable;
