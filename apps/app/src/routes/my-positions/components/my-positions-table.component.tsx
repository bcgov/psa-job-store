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
import { Button, Card, Col, Menu, Modal, Result, Row, Space, Table, Tooltip, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { generateJobProfile } from 'common-kit';
import copy from 'copy-to-clipboard';
import { Packer } from 'docx';
import saveAs from 'file-saver';
import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorGraphic from '../../../assets/empty_error.svg';
import EmptyJobPositionGraphic from '../../../assets/empty_jobPosition.svg';
import TasksCompleteGraphic from '../../../assets/task_complete.svg';
import AcessiblePopoverMenu from '../../../components/app/common/components/accessible-popover-menu';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import '../../../components/app/common/css/filtered-table.component.css';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import {
  useDeletePositionRequestMutation,
  useLazyGetPositionRequestQuery,
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
  const [pageSize, setPageSize] = useState(import.meta.env.VITE_TEST_ENV === 'true' ? 2 : initialPageSize);
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

  // This is for downloading of the job profile
  const [prTrigger, { data: prData, isLoading: isLoadingPositionRequest }] = useLazyGetPositionRequestQuery();
  const [jpTrigger, { data: jpData, isLoading: isLoadingJobProfile }] = useLazyGetJobProfilesQuery();

  // Fetch the position request which includes the job profile and potentially a parent job profile ID
  const fetchJobProfileAndParent = async (id: any) => {
    prTrigger({ id: +id });
  };

  const generateAndDownloadDocument = useCallback((jobProfile: any, parentProfile: any) => {
    const document = generateJobProfile({
      jobProfile: jobProfile,
      parentJobProfile: parentProfile,
    });
    Packer.toBlob(document).then((blob) => {
      saveAs(blob, 'job-profile.docx');
      message.success('Your document is downloading!');
    });
  }, []);

  useEffect(() => {
    // When the position request data is received
    if (prData && prData.positionRequest) {
      const { parent_job_profile_id } = prData.positionRequest;

      // If there's a parent job profile ID, fetch the parent job profile
      if (parent_job_profile_id) {
        jpTrigger({ where: { id: { equals: parent_job_profile_id } } });
      }
      // else {
      //   // If there's no parent, proceed to generate the document with the current profile data
      //   generateAndDownloadDocument(profile_json_updated, null);
      // }
    }
  }, [prData, jpData, jpTrigger]);

  useEffect(() => {
    // When the parent job profile data is received
    if (jpData && jpData.jobProfiles && jpData.jobProfiles.length > 0) {
      const parentProfile = jpData.jobProfiles[0];

      if (prData && prData.positionRequest && prData.positionRequest.profile_json_updated) {
        // Generate and download the document with both job and parent job profiles
        generateAndDownloadDocument(prData.positionRequest.profile_json_updated, parentProfile);
      }
    }
  }, [jpData, prData, generateAndDownloadDocument]);

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
    const linkToCopy = `${window.location.origin}/my-positions/share/${record.shareUUID}`;

    // Use the Clipboard API to copy the link to the clipboard
    if (import.meta.env.VITE_TEST_ENV !== 'true') copy(linkToCopy);
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
                  onClick={() => navigate(`/my-positions/${record.id}`)}
                >
                  <Link to={`/my-positions/${record.id}`}>Edit</Link>
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
                  onClick={() => navigate(`/my-positions/${record.id}`)}
                >
                  <Link data-testid="view-link" to={`/my-positions/${record.id}`}>
                    View
                  </Link>
                </Menu.Item>
                <Menu.Item
                  data-testid="menu-option-download"
                  key="download"
                  icon={<FilePdfOutlined aria-hidden />}
                  onClick={() => fetchJobProfileAndParent(record.id)}
                >
                  <span>{isLoadingPositionRequest || isLoadingJobProfile ? 'Loading...' : 'Download'}</span>
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

            {record.status === 'IN_REVIEW' && (
              <>
                <Menu.Item
                  data-testid="menu-option-view"
                  key="view"
                  icon={<EyeOutlined aria-hidden />}
                  onClick={() => navigate(`/my-positions/${record.id}`)}
                >
                  <Link to={`/my-positions/${record.id}`}>View</Link>
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
              onClick={() => navigate(`/my-positions/${record.id}`)}
            >
              View
            </Menu.Item>
            <Menu.Item key="download" icon={<DownloadOutlined aria-hidden />}>
              Download attachements
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
            <Menu.Item key="view" data-testid="menu-option-view" icon={<EyeOutlined aria-hidden />}>
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

  const columns: ColumnTypes[] = [
    {
      title: <span data-testid="job-title-header">Job Title</span>,
      dataIndex: 'title',
      key: 'title',
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('title'),
      render: (text: any, record: any) => {
        if (mode == null)
          return (
            <Link to={`/my-positions/${record.id}`} data-testid={`job-position-${record.id}`}>
              <div data-testid="job-title">{text}</div>
            </Link>
          );
        else if (mode == 'total-compensation') {
          return (
            <Link to={`/approved-requests/${record.id}`}>
              <div data-testid="job-title">{text}</div>
            </Link>
          );
        } else if (mode == 'classification') {
          return (
            <Link to={`/classification-tasks/${record.id}`}>
              <div data-testid="job-title">{text}</div>
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
                  <span data-testid={`status-${status}`}>{getStatusLabel(status)}</span>
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
        title: <span data-testid="class-header">Class</span>,
        dataIndex: 'classification_code',
        key: 'classification_code',
        render: (text: string) => <div data-testid={`classification-${text}`}> {text}</div>,
      },
    ],

    ...(mode == 'classification'
      ? [
          {
            sorter: allowSorting,
            defaultSortOrder: getSortOrder('crm_id'),
            title: <span data-testid="crm-service-request-header">CRM service request</span>,
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
                        if (import.meta.env.VITE_TEST_ENV !== 'true') copy(valueString);
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
      render: (_text: any, record: any) => (
        <>
          <AcessiblePopoverMenu
            triggerButton={<EllipsisOutlined className={`ellipsis-${record.id}`} />}
            content={
              <MenuContent
                record={record}
                onCopyLink={handleCopyLink}
                onDeleteConfirm={showDeleteConfirm}
                selectedKeys={selectedKeys}
              />
            }
          ></AcessiblePopoverMenu>

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
              [sortField]: ['approved_at', 'submitted_at', 'updated_at'].includes(sortField)
                ? sortOrder === 'ascend'
                  ? 'asc'
                  : 'desc' // Directly use 'asc'/'desc' for updated_at
                : sortField === 'parent_job_profile'
                  ? { number: sortOrder === 'ascend' ? 'asc' : 'desc' }
                  : sortField === 'title'
                    ? { sort: sortOrder === 'ascend' ? 'asc' : 'desc' } // Use SortOrderInput for title
                    : { sort: sortOrder === 'ascend' ? 'asc' : 'desc' }, // Use SortOrderInput for other fields as needed
            },
          ],
        }
      : {};

    console.log('sortParams: ', sortParams);

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

    console.log('sorter: ', sorter);

    // console.log('sorter: ', JSON.stringify(sorter));

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
