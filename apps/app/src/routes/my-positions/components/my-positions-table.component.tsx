/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FilePdfOutlined,
  LinkOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Menu, Popover, Row, Space, Table, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import copy from 'copy-to-clipboard';
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EmptyJobPositionGraphic from '../../../assets/empty_jobPosition.svg';
import '../../../components/app/common/css/filtered-table.component.css';
import { useLazyGetPositionRequestsQuery } from '../../../redux/services/graphql-api/position-request.api';

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
}) => {
  const [trigger, { data, isLoading }] = useLazyGetPositionRequestsQuery();
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [sortField, setSortField] = useState<null | string>(null);
  const [sortOrder, setSortOrder] = useState<null | string>(null);

  const [totalResults, setTotalResults] = useState(0); // Total results count from API

  const getSortOrder = (fieldName: string): SortOrder | undefined => {
    if (sortField === fieldName) {
      return sortOrder === 'ASC' ? 'ascend' : 'descend';
    }
    return undefined;
  };

  useEffect(() => {
    if (data && data.positionRequestsCount !== undefined) {
      setTotalResults(data.positionRequestsCount.total);
    }
  }, [data]);

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

  const getMenuContent = (record: any) => {
    return (
      <Menu>
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
            <Menu.Item key="edit" icon={<EyeOutlined />}>
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
            <Menu.Item key="edit" icon={<EyeOutlined />}>
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
      render: (text: any, record: any) => <Link to={`/position-request/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('status'),
      render: (status: any) => {
        const color = status === 'DRAFT' ? 'gray' : status === 'IN_REVIEW' ? 'blue' : 'green';
        return (
          <Space>
            <span className={`status-dot status-dot-${color}`} />
            {status === 'DRAFT'
              ? 'Draft'
              : status === 'IN_REVIEW'
                ? 'In review'
                : status === 'COMPLETED'
                  ? 'Completed'
                  : ''}
          </Space>
        );
      },
    },
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
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('classification_code'),
      title: 'Classification',
      dataIndex: 'classification_code',
      key: 'classification_code',
    },
    {
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('submission_id'),
      title: 'Submission ID',
      dataIndex: 'submission_id',
      key: 'submission_id',
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
    const statusFilter = searchParams.get('status');
    const classificationFilter = searchParams.get('classification');

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
        ],
      },
      ...sortParams,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  }, [searchParams, trigger, currentPage, pageSize, sortField, sortOrder]);

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
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'white', flex: 1, overflowY: 'auto' }}>
          <img src={EmptyJobPositionGraphic} alt="No positions" />
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

export default MyPositionsTable;
