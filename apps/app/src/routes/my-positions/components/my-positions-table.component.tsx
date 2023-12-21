/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Table } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyGetPositionRequestsQuery } from '../../../redux/services/graphql-api/position-request.api';
import EmptyJobPositionGraphic from '../images/empty_jobPosition.svg';

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

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: allowSorting,
      defaultSortOrder: getSortOrder('title'),
      render: (text: any) => <a href="#!">{text}</a>,
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
    const search = searchParams.get('search');
    const statusFilter = searchParams.get('status');
    const classificationFilter = searchParams.get('classification');

    const sortParams = sortField
      ? {
          orderBy: [
            {
              [sortField]:
                sortField === 'title'
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
          <Button type="primary" style={{ marginTop: '1rem' }}>
            Create new position
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyPositionsTable;
