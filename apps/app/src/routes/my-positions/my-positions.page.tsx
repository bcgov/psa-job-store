/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Select, Space, Table, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { useState } from 'react';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetPositionRequestsQuery } from '../../redux/services/graphql-api/position-request.api';
import './my-positions.page.css';

export const MyPositionsPage = () => {
  const { data, error, isLoading, refetch } = useGetPositionRequestsQuery();

  const handleSearch = (_selectedKeys: any, _confirm: any) => {
    // Implement the search logic
  };

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: (text: any) => <a href="#!">{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
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
      title: 'Position #',
      dataIndex: 'position_number',
      key: 'position_number',
    },
    {
      title: 'Class',
      dataIndex: 'classification',
      key: 'classification',
    },
    {
      title: 'Submission ID',
      dataIndex: 'submission_id',
      key: 'submission_id',
    },
    // Add more columns as needed
  ];

  const statusFilterData = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'In Review', value: 'IN_REVIEW' },
    // Add other status options...
  ];

  const classificationFilterData = [
    { label: 'Class A', value: 'CLASS_A' },
    { label: 'Class B', value: 'CLASS_B' },
    // Add other classification options...
  ];

  // tag handling

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState([]);

  const handleStatusChange = (values: any) => {
    setSelectedStatus(values);
  };

  const handleClassificationChange = (values: any) => {
    setSelectedClassification(values);
  };

  const handleDeselect = (value: any, type: any) => {
    if (type === 'status') {
      setSelectedStatus(selectedStatus.filter((status) => status !== value));
    } else {
      setSelectedClassification(selectedClassification.filter((classification) => classification !== value));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <PageHeader title="My Positions" subTitle="Review the profile before creating a new position" />

      <div style={{ padding: '0 1rem', backgroundColor: '#F0F2F5' }}>
        <Card style={{ marginTop: '1rem' }}>
          <Row gutter={24} wrap>
            <Col span={12}>
              <Search
                enterButton="Find positions"
                aria-label="Search by job title or keyword"
                onPressEnter={(e) => handleSearch(e.currentTarget.value, null)}
                allowClear
                placeholder="Search by job title or submission ID"
                onSearch={handleSearch}
                style={{ width: 400 }}
              />
            </Col>
            <Col span={12}>
              <Row gutter={8} justify="end">
                <Col>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Status"
                    options={statusFilterData}
                    style={{ width: 120 }}
                    onChange={setSelectedStatus}
                  />
                </Col>
                <Col>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Classification"
                    options={classificationFilterData}
                    style={{ width: 120 }}
                    onChange={setSelectedClassification}
                  />
                </Col>
                <Col>
                  <Button type="primary">Find positions</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              {selectedStatus.map((status) => (
                <Tag closable onClose={() => handleDeselect(status, 'status')} key={status}>
                  {status}
                </Tag>
              ))}
              {selectedClassification.map((classification) => (
                <Tag closable onClose={() => handleDeselect(classification, 'classification')} key={classification}>
                  {classification}
                </Tag>
              ))}
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: '1rem' }} className="tableHeader">
          <Row gutter={24} wrap>
            <Col span={12}>
              <h2 style={{ marginBottom: 0 }}>My Positions</h2>
            </Col>
            <Col span={12}>
              <Row justify="end">
                <Col>
                  <Button icon={<ReloadOutlined />} onClick={() => refetch()} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Table
          className="tableWithHeader"
          columns={columns}
          dataSource={data?.positionRequests}
          rowKey="id"
          pagination={{
            pageSizeOptions: ['10', '20', '50'],
            showSizeChanger: true,
          }}
        />
      </div>
    </>
  );
};
