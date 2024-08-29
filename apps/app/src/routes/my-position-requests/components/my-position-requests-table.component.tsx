/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  LinkOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Menu, Modal, Row, Table, Tooltip, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import copy from 'copy-to-clipboard';
import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorGraphic from '../../../assets/empty_error.svg';
import EmptyJobPositionGraphic from '../../../assets/empty_jobPosition.svg';
import TasksCompleteGraphic from '../../../assets/task_complete.svg';
import AccessiblePopoverMenu from '../../../components/app/common/components/accessible-popover-menu';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import '../../../components/app/common/css/filtered-table.component.css';
import { DownloadJobProfileComponent } from '../../../components/shared/download-job-profile/download-job-profile.component';
import {
  useDeletePositionRequestMutation,
  useLazyGetPositionRequestsQuery,
} from '../../../redux/services/graphql-api/position-request.api';
import { formatDateTime } from '../../../utils/Utils';
import StatusIndicator from '../../wizard/components/wizard-position-request-status-indicator';
import NoResultsView from './no-results.component';

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
  clearFilters?: () => void;
  requestingFeature?: string;
}

type ColumnTypes = {
  title: string | JSX.Element;
  dataIndex?: string;
  key: string;
  sorter?: boolean;
  defaultSortOrder?: SortOrder;
  render?: (text: any, record: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right'; // AlignType is typically one of these string literals
  requestingFeature?: 'classificationTasks' | 'myPositions' | 'totalCompApprovedRequests';
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
  tableTitle = 'My Position Requests',
  mode = null,
  onDataAvailable,
  clearFilters,
  requestingFeature,
  ...props
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
  // const [pageSize, setPageSize] = useState(import.meta.env.VITE_TEST_ENV === 'true' ? 2 : initialPageSize);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [hasPositionRequests, setHasPositionRequests] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState([]);

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
    // shareUUID
    // Dynamically construct the link to include the current base URL
    const linkToCopy = `${window.location.origin}/requests/positions/share/${record.shareUUID}`;

    // Use the Clipboard API to copy the link to the clipboard
    // if (import.meta.env.VITE_TEST_ENV !== 'true')
    copy(linkToCopy);
    message.success('Link copied to clipboard!');
    setSelectedKeys([]);
  };

  const navigate = useNavigate();

  const MenuContent = ({ record }: any) => {
    return (
      <Menu selectedKeys={selectedKeys} className={`popover-selector-${record.id}`}>
        {mode == null && (
          <>
            {record.status === 'DRAFT' && (
              <>
                <Menu.Item
                  key="edit"
                  icon={<EditOutlined aria-hidden />}
                  data-testid="menu-option-edit"
                  onClick={() => navigate(`/requests/positions/${record.id}`)}
                >
                  <Link to={`/requests/positions/${record.id}`}>Edit</Link>
                </Menu.Item>
                <Menu.Item
                  key="copy"
                  icon={<LinkOutlined aria-hidden />}
                  onClick={() => handleCopyLink(record)}
                  data-testid="menu-option-copy link"
                >
                  Copy link
                </Menu.Item>
                <Menu.Item
                  data-testid="menu-option-delete"
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
                <Menu.Item
                  data-testid="menu-option-view"
                  key="view"
                  icon={<EyeOutlined aria-hidden />}
                  onClick={() => navigate(`/requests/positions/${record.id}`)}
                >
                  <Link data-testid="view-link" to={`/requests/positions/${record.id}`}>
                    View
                  </Link>
                </Menu.Item>
                <Menu.Item key="download" icon={<DownloadOutlined aria-hidden />}>
                  <DownloadJobProfileComponent positionRequestId={record.id}>Download</DownloadJobProfileComponent>
                </Menu.Item>
                <Menu.Item
                  key="copy"
                  icon={<LinkOutlined aria-hidden />}
                  onClick={() => handleCopyLink(record)}
                  data-testid="menu-option-copy link"
                >
                  Copy link
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined aria-hidden />} disabled>
                  Delete
                </Menu.Item>
              </>
            )}

            {record.status === 'VERIFICATION' && (
              <>
                <Menu.Item
                  data-testid="menu-option-view"
                  key="view"
                  icon={<EyeOutlined aria-hidden />}
                  onClick={() => navigate(`/requests/positions/${record.id}`)}
                >
                  <Link to={`/requests/positions/${record.id}`}>View</Link>
                </Menu.Item>
                <Menu.Item
                  key="copy"
                  icon={<LinkOutlined aria-hidden />}
                  onClick={() => handleCopyLink(record)}
                  data-testid="menu-option-copy link"
                >
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
            <Menu.Item
              data-testid="menu-option-view"
              key="view"
              icon={<EyeOutlined aria-hidden />}
              onClick={() => navigate(`/requests/positions/${record.id}`)}
            >
              View
            </Menu.Item>
            <Menu.Item key="download" icon={<DownloadOutlined aria-hidden />}>
              <DownloadJobProfileComponent positionRequestId={record.id}>Download</DownloadJobProfileComponent>
            </Menu.Item>
            <Menu.Item
              key="copy"
              icon={<LinkOutlined aria-hidden />}
              onClick={() => handleCopyLink(record)}
              data-testid="menu-option-copy link"
            >
              Copy link
            </Menu.Item>
          </>
        )}

        {mode == 'classification' && (
          <>
            <Menu.Item
              data-testid="menu-option-view"
              key="view"
              icon={<EyeOutlined aria-hidden />}
              onClick={() => navigate(`/requests/positions/${record.id}`)}
            >
              View
            </Menu.Item>
            <Menu.Item key="download" icon={<DownloadOutlined aria-hidden />}>
              <DownloadJobProfileComponent positionRequestId={record.id}>Download</DownloadJobProfileComponent>
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
      title: <span data-testid="job-title-header">Job Title</span>,
      dataIndex: 'title',
      key: 'title',
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('title'),
      render: (text: any, record: any) => {
        const renderText = text || 'New position';
        if (mode == null)
          return (
            <Link to={`/requests/positions/${record.id}`} data-testid={`job-position-${record.id}`}>
              <div data-testid="job-title">{renderText}</div>
            </Link>
          );
        else if (mode == 'total-compensation') {
          return (
            <Link to={`/requests/positions/manage/approved/${record.id}`}>
              <div data-testid="job-title">{renderText}</div>
            </Link>
          );
        } else if (mode == 'classification') {
          return (
            <Link to={`/requests/positions/manage/${record.id}`}>
              <div data-testid="job-title">{renderText}</div>
            </Link>
          );
        }
      },
    },
    ...(mode == null || mode == 'classification'
      ? [
          {
            title: <span data-testid="status-header">Status</span>,
            dataIndex: 'status',
            key: 'status',
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('status'),
            render: (status: any) => {
              return (
                <StatusIndicator status={status} colorText={false} />
                // <Space>
                //   <span className={`status-dot`} style={{ backgroundColor: color }} />
                //   <span data-testid={`status-${status}`}>{getStatusLabel(status)}</span>
                // </Space>
              );
            },
          },
        ]
      : []),

    ...[
      {
        sorter: allowSorting,
        defaultSortOrder: getSortOrder('classification_code'),
        title: <span data-testid="class-header">Class</span>,
        dataIndex: 'classification_code',
        key: 'classification_code',
        render: (_text: string, record: any) => (
          <div data-testid={`classification-${record.classification?.code}`}>{record.classification?.code}</div>
        ),
      },
    ],

    ...(mode == 'classification'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('crm_lookup_name'),
            title: <span data-testid="crm-service-request-header">CRM service request</span>,
            dataIndex: 'crm_lookup_name',
            key: 'crm_lookup_name',
          },
        ]
      : []),

    ...(mode == 'total-compensation'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('jobStoreId'),
            title: <span data-testid="crm-jobstore-number-header">JobStore number</span>,
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
            title: <span data-testid="submitted-by-header">Submitted by</span>,
            dataIndex: 'user_name',
            key: 'user_name',
            render: (_text: string, record: any) => (
              <span data-testid={`submitted-by-${record.user?.name}`}>{record.user?.name}</span>
            ),
          },
        ]
      : []),

    ...(mode == 'classification'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('submitted_at'),
            title: <span data-testid="submitted-at-header">Submitted at</span>,
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
            title: <span data-testid="approved-at-header">Approved at</span>,
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
            title: <span data-testid="position-#-header">Position #</span>,
            dataIndex: 'position_number',
            key: 'position_number',
            render: (value: number | undefined, record: any) => {
              const valueString = value != null ? `${value}`.padStart(8, '0') : '';

              return (
                <div
                  style={{
                    alignItems: 'center',
                    display:
                      record.status === 'COMPLETED' || mode === 'classification' || mode === 'total-compensation'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  <span>{valueString}</span>
                  <span
                    style={{
                      visibility: hoveredRowKey === record.id ? 'visible' : 'hidden',
                      marginLeft: 0,
                    }}
                  >
                    <Button
                      data-testid="copy-position-number-button"
                      icon={<CopyOutlined />}
                      size="small"
                      style={{
                        border: 'none',
                        padding: 0,
                        background: 'transparent',
                      }}
                      onClick={() => {
                        // if (import.meta.env.VITE_TEST_ENV !== 'true')
                        copy(valueString);
                        message.success('Position number copied!');
                      }}
                    />
                  </span>
                </div>
              );
            },
          },
        ]
      : []),
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('submission_id'),
      title: <span data-testid="submission-id-header">Submission ID</span>,
      dataIndex: 'submission_id',
      key: 'submission_id',
      render: (text) => <div data-testid="submission-id">{text}</div>,
    },
    ...(mode == null
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('updated_at'),
            title: <span data-testid="modified-at-header">Modified at</span>,
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
      render: (_text: any, record: any) =>
        record.status === 'CANCELLED' ? (
          <></>
        ) : (
          <>
            <AccessiblePopoverMenu
              triggerButton={<EllipsisOutlined className={`ellipsis-${record.id}`} />}
              content={
                <MenuContent
                  record={record}
                  onCopyLink={handleCopyLink}
                  onDeleteConfirm={showDeleteConfirm}
                  selectedKeys={selectedKeys}
                />
              }
            ></AccessiblePopoverMenu>

            {/* <Popover
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
            <EllipsisOutlined
              ref={(el) => (ellipsisRefs.current[record.id] = el)}
              className={`ellipsis-${record.id}`}
            />
          </Popover> */}
          </>
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
    console.log('updateData');
    const search = searchParams.get('search');
    const statusFilter = searchParams.get('status') || searchParams.get('status__in');
    const classificationFilter = searchParams.get('classification') || searchParams.get('classification_id__in');
    const submittedByFilter = searchParams.get('submitted_by__in');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (search || statusFilter || classificationFilter || submittedByFilter || startDate || endDate) {
      setHasSearched(true);
    }

    // const sortParams = sortField
    //   ? {
    //       orderBy: [
    //         {
    //           [sortField]: ['approved_at', 'submitted_at', 'updated_at'].includes(sortField)
    //             ? sortOrder === 'ascend'
    //               ? 'asc'
    //               : 'desc' // Directly use 'asc'/'desc' for updated_at
    //             : sortField === 'parent_job_profile'
    //               ? { number: sortOrder === 'ascend' ? 'asc' : 'desc' }
    //               : sortField === 'title'
    //                 ? { sort: sortOrder === 'ascend' ? 'asc' : 'desc' } // Use SortOrderInput for title
    //                 : { sort: sortOrder === 'ascend' ? 'asc' : 'desc' }, // Use SortOrderInput for other fields as needed
    //         },
    //       ],
    //     }
    //   : {};

    const sortParams = sortField
      ? {
          orderBy: [
            {
              ...(sortField === 'classification_code'
                ? {
                    classification: {
                      code: sortOrder === 'ascend' ? 'asc' : 'desc',
                    },
                  }
                : sortField === 'user_name'
                  ? {
                      user: {
                        name: sortOrder === 'ascend' ? 'asc' : 'desc',
                      },
                    }
                  : ['approved_at', 'submitted_at', 'updated_at'].includes(sortField)
                    ? {
                        [sortField]: sortOrder === 'ascend' ? 'asc' : 'desc',
                      }
                    : sortField === 'parent_job_profile'
                      ? {
                          parent_job_profile: {
                            number: sortOrder === 'ascend' ? 'asc' : 'desc',
                          },
                        }
                      : sortField === 'title'
                        ? {
                            [sortField]: { sort: sortOrder === 'ascend' ? 'asc' : 'desc' },
                          }
                        : {
                            [sortField]: { sort: sortOrder === 'ascend' ? 'asc' : 'desc' },
                          }),
            },
          ],
        }
      : {};

    console.log('updateData sortParams: ', sortParams);

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
          ...(startDate != null && endDate != null
            ? [
                {
                  updated_at: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
              ]
            : []),
        ],
      },
      // by default, sort by updated_at
      ...(mode == null || mode === 'classification'
        ? {
            orderBy: [
              {
                updated_at: 'desc',
              },
            ],
          }
        : {}),
      // if sortParams is defined (because user did custom sorting)
      // it will override the above default setting
      ...sortParams,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      requestingFeature: requestingFeature,
    });
  }, [searchParams, trigger, currentPage, pageSize, sortField, sortOrder, mode, requestingFeature]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const handleTableChange = (pagination: any, _filters: any, sorter: any) => {
    console.log('handleTableChange');
    const newPage = pagination.current;
    const newPageSize = pagination.pageSize;
    const newSortField = sorter.field;
    const newSortOrder = sorter.order;

    console.log('handleTableChange sorter: ', sorter);

    // console.log('sorter: ', JSON.stringify(sorter));

    setCurrentPage(newPage);
    setPageSize(newPageSize);
    setSortField(newSortField);
    setSortOrder(newSortOrder);

    if (!newSortOrder) setSortField(null);

    if (handleTableChangeCallback) handleTableChangeCallback(pagination, _filters, sorter);
    else console.log('no handleTableChangeCallback');
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
    <div style={style} {...props}>
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
              loading={isFetching || isLoading}
              // rowSelection={rowSelection}
              onRow={(record) => {
                return {
                  onMouseEnter: () => handleMouseEnter(record.id),
                  onMouseLeave: handleMouseLeave,
                };
              }}
              rowClassName="job-position-row"
              className="tableWithHeader job-positions-table"
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
              <>
                {/* <div
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
                > */}
                <NoResultsView onClearFilters={clearFilters} />
                {/* <img src={NoResultsGraphic} alt="No positions" />
                  <div>No results found! Try adjusting your search or filters</div>
                  <Button
                    type="link"
                    style={{ marginTop: '1rem' }}
                    icon={<ReloadOutlined aria-hidden />}
                    onClick={clearFilters}
                  >
                    Reset Filters
                  </Button> */}
                {/* </div> */}
              </>
            </div>
          ) : (
            <>
              {mode == 'classification' || mode == 'total-compensation' ? (
                !hasPositionRequests && !hasSearched ? (
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
                      <div>No results</div>
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
                )
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
                    <Link to={'/requests/positions/create'}>
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
