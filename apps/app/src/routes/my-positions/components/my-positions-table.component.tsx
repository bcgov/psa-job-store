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
import { Button, Card, Col, Menu, Modal, Popover, Result, Row, Space, Table, Tooltip, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import copy from 'copy-to-clipboard';
import React, { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorGraphic from '../../../assets/empty_error.svg';
import EmptyJobPositionGraphic from '../../../assets/empty_jobPosition.svg';
import TasksCompleteGraphic from '../../../assets/task_complete.svg';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import '../../../components/app/common/css/filtered-table.component.css';
import {
  useDeletePositionRequestMutation,
  useLazyGetPositionRequestsQuery,
} from '../../../redux/services/graphql-api/position-request.api';
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
  const [trigger, { data, isLoading, error: fetchError, isFetching }] = useLazyGetPositionRequestsQuery();
  const [deletePositionRequest] = useDeletePositionRequestMutation();
  const [searchParams] = useSearchParams();

  // Get initial values from URL parameters for table properties
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialPageSize = parseInt(searchParams.get('pageSize') || itemsPerPage.toString());
  const initialSortField = searchParams.get('sortField');
  const initialSortOrder = searchParams.get('sortOrder');

  const [selectedRowKeys] = useState([]);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [hasPositionRequests, setHasPositionRequests] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState<{ [key: string]: boolean }>({});

  const [totalResults, setTotalResults] = useState(0); // Total results count from API

  const [hasSearched, setHasSearched] = useState(false);

  const getSortOrder = (fieldName: string): SortOrder | undefined => {
    // console.log('getSortOrder: ', fieldName, sortField, sortOrder);
    if (sortField === fieldName) {
      return sortOrder === 'ASC' ? 'ascend' : 'descend';
    }
    return undefined;
  };

  // Check if data is available and call the callback function to notify the parent component
  useEffect(() => {
    if (isLoading || isFetching) return;
    const hasData = data && 'positionRequests' in data && data.positionRequests.length > 0;
    if (onDataAvailable) {
      onDataAvailable(hasData || hasSearched || false);
    }
    setHasPositionRequests(data?.positionRequests && data.positionRequests.length > 0 ? true : false);
  }, [data, onDataAvailable, isLoading, hasSearched, isFetching]);

  useEffect(() => {
    if (data && data.positionRequestsCount !== undefined) {
      setTotalResults(
        mode == 'total-compensation' ? data.positionRequestsCount.completed : data.positionRequestsCount.total,
      );
    }
  }, [data, mode]);

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: 'Delete Position Request',
      content: 'Do you want to delete the position request?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        await deletePositionRequest({ id: id });
        await updateData();
      },
    });
  };

  const handleCopyLink = (record: any) => {
    // Dynamically construct the link to include the current base URL
    const linkToCopy = `${window.location.origin}/position-request/${record.id}`;

    // Use the Clipboard API to copy the link to the clipboard
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        // Notification to show the link has been copied successfully
        message.success('Link copied to clipboard!');
      })
      .catch((err) => {
        // Handle any errors here
        console.error('Failed to copy link: ', err);
        message.error('Failed to copy link');
      });
    setSelectedKeys([]);

    handleVisibleChange(record.id, false);
  };

  const MenuContent = ({ record }: any) => {
    return (
      <Menu selectedKeys={selectedKeys} className={`popover-selector-${record.id}`}>
        {mode == null && (
          <>
            {record.status === 'DRAFT' && (
              <>
                <Menu.Item key="edit" icon={<EditOutlined aria-hidden />}>
                  <Link to={`/position-request/${record.id}`}>Edit</Link>
                </Menu.Item>
                <Menu.Item key="copy" icon={<LinkOutlined aria-hidden />} onClick={() => handleCopyLink(record)}>
                  Copy link
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  icon={<DeleteOutlined aria-hidden />}
                  onClick={() => showDeleteConfirm(record.id)}
                >
                  Delete
                </Menu.Item>
              </>
            )}

            {record.status === 'COMPLETED' && (
              <>
                <Menu.Item key="view" icon={<EyeOutlined aria-hidden />}>
                  <Link to={`/position-request/${record.id}`}>View</Link>
                </Menu.Item>
                <Menu.Item key="download" icon={<FilePdfOutlined aria-hidden />}>
                  Download profile
                </Menu.Item>
                <Menu.Item key="copy" icon={<LinkOutlined aria-hidden />} onClick={() => handleCopyLink(record)}>
                  Copy link
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined aria-hidden />} disabled>
                  Delete
                </Menu.Item>
              </>
            )}

            {record.status === 'IN_REVIEW' && (
              <>
                <Menu.Item key="view" icon={<EyeOutlined aria-hidden />}>
                  <Link to={`/position-request/${record.id}`}>View</Link>
                </Menu.Item>
                <Menu.Item key="copy" icon={<LinkOutlined aria-hidden />} onClick={() => handleCopyLink(record)}>
                  Copy link
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined aria-hidden />} disabled>
                  Delete
                </Menu.Item>
              </>
            )}
          </>
        )}

        {mode == 'total-compensation' && (
          <>
            <Menu.Item key="view" icon={<EyeOutlined aria-hidden />}>
              View
            </Menu.Item>
            <Menu.Item key="download" icon={<DownloadOutlined aria-hidden />}>
              Download attachements
            </Menu.Item>
            <Menu.Item key="copy" icon={<LinkOutlined aria-hidden />} onClick={() => handleCopyLink(record)}>
              Copy link
            </Menu.Item>
          </>
        )}

        {mode == 'classification' && (
          <>
            <Menu.Item key="view" icon={<EyeOutlined aria-hidden />}>
              View
            </Menu.Item>
            <Menu.Item key="download" icon={<DownloadOutlined aria-hidden />}>
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

  const ellipsisRefs = useRef<any>({});

  const handleVisibleChange = (id: any, isVisible: any) => {
    // Update the visibility based on user interaction
    setPopoverVisible((prevState) => ({ ...prevState, [id]: isVisible }));

    if (!isVisible && ellipsisRefs.current[id]) {
      ellipsisRefs.current[id].focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        const keys = Object.keys(popoverVisible);
        keys.forEach((key) => {
          if (popoverVisible[key]) {
            setPopoverVisible((prevState) => ({ ...prevState, [key]: false }));
            // Focus back on the corresponding ellipsis button
            if (ellipsisRefs.current[key]) {
              ellipsisRefs.current[key].focus();
            }
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [popoverVisible]);

  const handlePopoverOpen = (visible: any, recordId: any) => {
    if (visible) {
      setTimeout(() => {
        const popover = document.querySelector(
          `.popover-selector-${recordId} .ant-menu-item:not(.ant-menu-item-disabled) a`,
        );
        if (popover) {
          const popoverElement = popover as HTMLElement;
          popoverElement.focus();
        }
      }, 100);
    }
  };

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

    ...[
      {
        sorter: allowSorting,
        defaultSortOrder: getSortOrder('classification_code'),
        title: 'Class',
        dataIndex: 'classification_code',
        key: 'classification_code',
      },
    ],

    ...(mode == 'classification'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('crm_id'),
            title: 'CRM service request',
            dataIndex: 'crm_id',
            key: 'crm_id',
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
                <span>{text}</span>
                <span
                  style={{
                    visibility:
                      (record.status === 'COMPLETED' || mode === 'classification' || mode === 'total-compensation') &&
                      hoveredRowKey === record.id
                        ? 'visible'
                        : 'hidden',
                    marginLeft: 0,
                  }}
                >
                  <Button
                    icon={<CopyOutlined />}
                    size="small"
                    style={{
                      border: 'none',
                      padding: 0,
                      background: 'transparent',
                    }}
                    onClick={() => {
                      copy(text.toString());
                      message.success('Position number copied!');
                    }}
                  />
                </span>
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
      title: <SettingOutlined aria-label="actions" />,
      align: 'center',
      key: 'action',
      render: (_text: any, record: any) => (
        <Popover
          open={popoverVisible[record.id]}
          onOpenChange={(visible) => {
            handleVisibleChange(record.id, visible);
            handlePopoverOpen(visible, record.id);
          }}
          content={
            <MenuContent
              record={record}
              onCopyLink={handleCopyLink}
              onDeleteConfirm={showDeleteConfirm}
              selectedKeys={selectedKeys}
            />
          } //{getMenuContent(record)}
          trigger="click"
          placement="bottomRight"
        >
          <EllipsisOutlined ref={(el) => (ellipsisRefs.current[record.id] = el)} className={`ellipsis-${record.id}`} />
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
                sortField === 'updated_at'
                  ? sortOrder === 'ascend'
                    ? 'asc'
                    : 'desc' // Directly use 'asc'/'desc' for updated_at
                  : sortField === 'title'
                    ? { sort: sortOrder === 'ascend' ? 'asc' : 'desc' } // Use SortOrderInput for title
                    : { sort: sortOrder === 'ascend' ? 'asc' : 'desc' }, // Use SortOrderInput for other fields as needed
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

    console.log('sorter: ', JSON.stringify(sorter));

    setCurrentPage(newPage);
    setPageSize(newPageSize);
    setSortField(newSortField);
    setSortOrder(newSortOrder);

    if (!newSortOrder) setSortField(null);

    if (handleTableChangeCallback) handleTableChangeCallback(pagination, _filters, sorter);
  };

  useEffect(() => {
    if (fetchError) {
      setError('An error occurred while fetching data.');
    } else {
      setError(null);
    }
  }, [fetchError]);

  // NOTE: DO NOT CHECK OF ISFETCHING HERE, IT WILL BREAK SORTING
  if (isLoading) return <LoadingSpinnerWithMessage />;

  // console.log('data?.positionRequests: ', data?.positionRequests);

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
                      topRightComponent || (
                        <Button
                          aria-label="Refresh"
                          icon={<ReloadOutlined aria-hidden />}
                          onClick={() => updateData()}
                        />
                      )
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {hasPositionRequests ? (
            <Table
              // rowSelection={rowSelection}
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
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalResults,
                pageSizeOptions: ['10', '20', '50'],
                showSizeChanger: showPagination,
                itemRender: (_current, type, originalElement) => {
                  // Modifying page doesn't work..
                  // if (type === 'page') {
                  //   // Modify the page item to include aria-label directly on the li element
                  //   return (
                  //     <li aria-label={`Go to page ${current}`} tabIndex="0">
                  //       {React.cloneElement(originalElement, {})}
                  //     </li>
                  //   );
                  // }
                  if (type === 'prev' && React.isValidElement(originalElement)) {
                    return React.cloneElement(originalElement as React.ReactElement, {
                      'aria-label': 'Go to previous page',
                    });
                  }

                  if (type === 'next' && React.isValidElement(originalElement)) {
                    return React.cloneElement(originalElement as React.ReactElement, {
                      'aria-label': 'Go to next page',
                    });
                  }
                  return originalElement;
                },
              }}
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
                    <Button
                      type="link"
                      style={{ marginTop: '1rem' }}
                      icon={<ReloadOutlined aria-hidden />}
                      onClick={updateData}
                    >
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
          <Button type="link" style={{ marginTop: '1rem' }} icon={<ReloadOutlined aria-hidden />} onClick={updateData}>
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyPositionsTable;
