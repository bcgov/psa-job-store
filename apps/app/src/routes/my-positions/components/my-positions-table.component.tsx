/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FilePdfOutlined,
  LinkOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Menu, Popover, Result, Row, Space, Table, Tooltip, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import copy from 'copy-to-clipboard';
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorGraphic from '../../../assets/empty_error.svg';
import EmptyJobPositionGraphic from '../../../assets/empty_jobPosition.svg';
import TasksCompleteGraphic from '../../../assets/task_complete.svg';
import '../../../components/app/common/css/filtered-table.component.css';
import { useLazyGetPositionRequestsQuery } from '../../../redux/services/graphql-api/position-request.api';
import { formatDateTime } from '../../../utils/Utils';

// Define the new PositionsTable component
interface MyPositionsTableProps {
  handleTableChangeCallback?: (...args: any[]) => void; // assuming the handleTableChange is of Ant Design's Table onChange type
  allowSorting?: boolean;
  showPagination?: boolean;
  showFooter?: boolean;
  style?: CSSProperties;
  itemsPerPage?: number;
  topRightComponent?: ReactNode;
  tableTitle?: string;
  mode?: string | null;
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
const MyPositionsTable: React.FC<MyPositionsTableProps> = ({
  handleTableChangeCallback,
  allowSorting = true,
  showPagination = true,
  showFooter = true,
  style,
  itemsPerPage = 10,
  topRightComponent,
  tableTitle = 'My Positions',
  mode = null,
  onDataAvailable,
}) => {
  const [trigger, { data, isLoading, error: fetchError }] = useLazyGetPositionRequestsQuery();
  const [searchParams] = useSearchParams();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [sortField, setSortField] = useState<null | string>(null);
  const [sortOrder, setSortOrder] = useState<null | string>(null);
  const [error, setError] = useState<string | null>(null);

  const [totalResults, setTotalResults] = useState(0); // Total results count from API

  const [hasSearched, setHasSearched] = useState(false);

  const getSortOrder = (fieldName: string): SortOrder | undefined => {
    if (sortField === fieldName) {
      return sortOrder === 'ASC' ? 'ascend' : 'descend';
    }
    return undefined;
  };

  // Check if data is available and call the callback function to notify the parent component
  useEffect(() => {
    if (isLoading) return;
    const hasData = data && 'positionRequests' in data && data.positionRequests.length > 0;
    if (onDataAvailable) {
      onDataAvailable(hasData || hasSearched || false);
    }
  }, [data, onDataAvailable, isLoading, hasSearched]);

  useEffect(() => {
    if (data && data.positionRequestsCount !== undefined) {
      setTotalResults(
        mode == 'total-compensation' ? data.positionRequestsCount.completed : data.positionRequestsCount.total,
      );
    }
  }, [data, mode]);

  const getMenuContent = (record: any) => {
    return (
      <Menu>
        {mode == null && (
          <>
            {record.status === 'DRAFT' && (
              <>
                <Menu.Item key="edit" icon={<EditOutlined />}>
                  Edit
                </Menu.Item>
                <Menu.Item key="copy" icon={<LinkOutlined />}>
                  Copy link
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />}>
                  Delete
                </Menu.Item>
              </>
            )}

            {record.status === 'COMPLETED' && (
              <>
                <Menu.Item key="view" icon={<EyeOutlined />}>
                  View
                </Menu.Item>
                <Menu.Item key="download" icon={<FilePdfOutlined />}>
                  Download profile
                </Menu.Item>
                <Menu.Item key="copy" icon={<LinkOutlined />}>
                  Copy link
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />} disabled>
                  Delete
                </Menu.Item>
              </>
            )}

            {record.status === 'IN_REVIEW' && (
              <>
                <Menu.Item key="view" icon={<EyeOutlined />}>
                  View
                </Menu.Item>
                <Menu.Item key="copy" icon={<LinkOutlined />}>
                  Copy link
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />} disabled>
                  Delete
                </Menu.Item>
              </>
            )}
          </>
        )}

        {mode == 'total-compensation' && (
          <>
            <Menu.Item key="view" icon={<EyeOutlined />}>
              View
            </Menu.Item>
            <Menu.Item key="download" icon={<DownloadOutlined />}>
              Download attachements
            </Menu.Item>
            <Menu.Item key="copy" icon={<LinkOutlined />}>
              Copy link
            </Menu.Item>
          </>
        )}

        {mode == 'classification' && (
          <>
            <Menu.Item key="view" icon={<EyeOutlined />}>
              View
            </Menu.Item>
            <Menu.Item key="download" icon={<DownloadOutlined />}>
              Download attachements
            </Menu.Item>
          </>
        )}
      </Menu>
    );
  };

  // State to track the hovered row's key
  const [hoveredRowKey, setHoveredRowKey] = useState(null);

  // Handler to be called when a row is hovered
  const handleMouseEnter = (key: any) => setHoveredRowKey(key);

  // Handler to be called when the mouse leaves a row
  const handleMouseLeave = () => setHoveredRowKey(null);

  const columns: ColumnTypes[] = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('title'),
      render: (text: any, record: any) => {
        if (mode == null) return <Link to={`/position-request/${record.id}`}>{text}</Link>;
        else if (mode == 'total-compensation') {
          return <Link to={`/total-compensation/approved-requests/${record.id}`}>{text}</Link>;
        } else if (mode == 'classification') {
          return <Link to={`/classification-tasks/${record.id}`}>{text}</Link>;
        }
      },
    },
    ...(mode == null || mode == 'classification'
      ? [
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('status'),
            render: (status: any) => {
              const getColorForStatus = (status: string) => {
                switch (status) {
                  case 'DRAFT':
                    return 'gray';
                  case 'IN_REVIEW':
                    return '#722ED1';
                  case 'COMPLETED':
                    return '#13C2C2';
                  case 'ESCALATED':
                    return '#FAAD14';
                  case 'ACTION_REQUIRED':
                    return '#F5222D';
                  default:
                    return 'black';
                }
              };

              const getStatusLabel = (status: string) => {
                switch (status) {
                  case 'DRAFT':
                    return 'Draft';
                  case 'IN_REVIEW':
                    return 'In Review';
                  case 'COMPLETED':
                    return 'Completed';
                  case 'ESCALATED':
                    return 'Escalated';
                  case 'ACTION_REQUIRED':
                    return 'Action Required';
                  default:
                    return 'Unknown'; // or any default status label you prefer
                }
              };

              const color = getColorForStatus(status);
              return (
                <Space>
                  <span className={`status-dot`} style={{ backgroundColor: color }} />
                  {getStatusLabel(status)}
                </Space>
              );
            },
          },
        ]
      : []),

    ...(mode == 'total-compensation' || mode == 'classification'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('classification_code'),
            title: 'Classification',
            dataIndex: 'classification_code',
            key: 'classification_code',
          },
        ]
      : []),

    ...(mode == 'classification'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('crm_ticket'),
            title: 'CRM service request',
            dataIndex: 'crm_ticket',
            key: 'crm_ticket',
          },
        ]
      : []),

    ...(mode == 'total-compensation'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('jobStoreId'),
            title: 'JobStore number',
            dataIndex: 'parent_job_profile',
            key: 'parent_job_profile_number',
            render: (parentJobProfile: any) => (parentJobProfile ? parentJobProfile.number : 'N/A'),
          },
        ]
      : []),

    ...(mode == 'classification' || mode == 'total-compensation'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('user_name'),
            title: 'Submitted by',
            dataIndex: 'user_name',
            key: 'user_name',
          },
        ]
      : []),

    ...(mode == 'classification'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('submitted_at'),
            title: 'Submitted at',
            dataIndex: 'submitted_at',
            key: 'submitted_at',
            render: (text: string) => formatDateTime(text),
          },
        ]
      : []),

    ...(mode == 'total-compensation'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('approved_at'),
            title: 'Approved at',
            dataIndex: 'approved_at',
            key: 'approved_at',
            render: (text: string) => formatDateTime(text),
          },
        ]
      : []),

    ...(mode == null
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('position_number'),
            title: 'Position #',
            dataIndex: 'position_number',
            key: 'position_number',
            render: (text: any, record: any) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {text}
                {record.status === 'COMPLETED' && hoveredRowKey === record.id && (
                  <Button
                    icon={<CopyOutlined />}
                    size="small"
                    style={{
                      marginLeft: 8,
                      padding: '0px', // Reduce padding
                      lineHeight: '1', // Match the line height to the row content
                      border: 'none', // Remove the border if not needed
                      background: 'transparent', // Remove background
                      height: 'fit-content', // Ensure the button only takes up the necessary height
                    }}
                    onClick={() => {
                      copy(text.toString());
                      message.success('Position number copied!');
                    }}
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('submission_id'),
      title: 'Submission ID',
      dataIndex: 'submission_id',
      key: 'submission_id',
    },
    ...(mode == null
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('updated_at'),
            title: 'Modified at',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text: string) => formatDateTime(text),
          },
        ]
      : []),
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

  const renderTableFooter = () => {
    return (
      <div>
        Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalResults)} of {totalResults}{' '}
        results
      </div>
    );
  };

  const updateData = useCallback(() => {
    // console.log('updateData');
    const search = searchParams.get('search');
    const statusFilter = searchParams.get('status') || searchParams.get('status__in');
    const classificationFilter = searchParams.get('classification') || searchParams.get('classification_id__in');
    const submittedByFilter = searchParams.get('submitted_by__in');

    if (search || statusFilter || classificationFilter || submittedByFilter) {
      setHasSearched(true);
    }

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

    trigger({
      ...(search != null && { search }),
      where: {
        AND: [
          ...(statusFilter != null
            ? [
                {
                  status: {
                    in: JSON.parse(`[${statusFilter.split(',').map((v) => `"${v}"`)}]`),
                  },
                },
              ]
            : []),
          ...(classificationFilter != null
            ? [
                {
                  classification_id: {
                    in: JSON.parse(`[${classificationFilter.split(',').map((v) => `"${v}"`)}]`),
                  },
                },
              ]
            : []),
          ...(submittedByFilter != null
            ? [
                {
                  user_id: {
                    in: JSON.parse(`[${submittedByFilter.split(',').map((v) => `"${v}"`)}]`),
                  },
                },
              ]
            : []),
        ],
      },
      ...sortParams,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      onlyCompletedForAll: mode === 'total-compensation',
    });
  }, [searchParams, trigger, currentPage, pageSize, sortField, sortOrder, mode]);

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

  const hasPositionRequests = data?.positionRequests && data.positionRequests.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    if (fetchError) {
      setError('An error occurred while fetching data.');
    } else {
      setError(null);
    }
  }, [fetchError]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={style}>
      {error === null ? (
        <>
          <Card className="tableHeader">
            <Row gutter={24} wrap>
              <Col span={12}>
                <h2 style={{ marginBottom: 0 }}>{tableTitle}</h2>
              </Col>
              <Col span={12}>
                <Row justify="end">
                  <Col>
                    {selectedRowKeys.length > 0 ? (
                      <Tooltip title="Download attachments">
                        <Button
                          icon={<DownloadOutlined />}
                          onClick={() => console.log('Download selected rows:', selectedRowKeys)}
                        />
                      </Tooltip>
                    ) : (
                      topRightComponent || <Button icon={<ReloadOutlined />} onClick={() => updateData()} />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {hasPositionRequests ? (
            <Table
              rowSelection={rowSelection}
              onRow={(record) => {
                return {
                  onMouseEnter: () => handleMouseEnter(record.id),
                  onMouseLeave: handleMouseLeave,
                };
              }}
              className="tableWithHeader"
              columns={columns}
              dataSource={data?.positionRequests}
              rowKey="id"
              pagination={
                showPagination
                  ? {
                      current: currentPage,
                      pageSize: pageSize,
                      total: totalResults,
                      pageSizeOptions: ['10', '20', '50'],
                      showSizeChanger: true,
                    }
                  : false
              }
              onChange={handleTableChange}
              footer={showFooter ? renderTableFooter : undefined}
            />
          ) : hasSearched ? (
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
            <>
              {mode == 'classification' || mode == 'total-compensation' ? (
                <>
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
                    <img src={TasksCompleteGraphic} alt="No positions" />
                    <div>All good! It looks like you don't have any assigned tasks.</div>
                    <Button type="link" style={{ marginTop: '1rem' }} icon={<ReloadOutlined />} onClick={updateData}>
                      Refresh
                    </Button>
                  </div>
                </>
              ) : (
                <>
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
                    <div>New to the JobStore?</div>
                    {/* Link button to the orgchart page */}
                    <Link to="/my-positions/create">
                      <Button type="primary" style={{ marginTop: '1rem' }}>
                        Create new position
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </>
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

export default MyPositionsTable;
