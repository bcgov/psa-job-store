/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutlined, EllipsisOutlined, LinkOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Dropdown,
  Result,
  Row,
  Space,
  Tabs,
  Typography,
  message,
} from 'antd';
import { MenuProps } from 'antd/es/menu';
import copy from 'copy-to-clipboard';
import { cloneElement, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import '../../components/app/common/css/filtered-table.component.css';
import { PageHeader } from '../../components/app/page-header.component';
import { statusIconColorMap } from '../../components/app/utils/statusIconColorMap.utils';
import { DownloadJobProfileComponent } from '../../components/shared/download-job-profile/download-job-profile.component';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import { useTestUser } from '../../utils/useTestUser';
import NotFoundComponent from '../not-found/404';
import { OrgChart } from '../org-chart/components/org-chart';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import StatusIndicator from '../wizard/components/wizard-position-request-status-indicator';
import './classification-tasks.page.css';
import { JobProfileWithDiff } from './components/job-profile-with-diff.component';
import { NextSteps } from './components/next-steps';
import { ServiceRequestDetails } from './components/service-request-details.component';

// import '../wizard/wizard-review.page.css';
// import './total-comp-approved-request.page.css';
const { Text } = Typography;

// Import your API service to fetch position request

export const ClassificationTaskPage = () => {
  const isTestUser = useTestUser();
  const { positionRequestId } = useParams();
  const [activeTabKey, setActiveTabKey] = useState('1');

  if (!positionRequestId) throw 'No position request provided';

  const { data, isLoading } = useGetPositionRequestQuery({
    id: parseInt(positionRequestId),
  });

  // END PROFILE TAB INFO
  // const handleDownload = () => {
  //   // Implement download functionality here
  // };

  const handleCopyURL = () => {
    // Implement URL copy functionality here
    const linkToCopy = `${window.location.origin}/requests/positions/share/${data?.positionRequest?.shareUUID}`;

    // Use the Clipboard API to copy the link to the clipboard
    if (!isTestUser) copy(linkToCopy);
    message.success('Link copied to clipboard!');
  };

  const StatusIcon = ({ status }: any) => {
    // const statusInfo = statusIconColorMap[status];
    // return statusInfo?.icon ? (
    //   <Space>
    //     <span style={{ color: statusInfo.color }}>{statusInfo.icon}</span>
    //     <span style={{ color: statusInfo.textColor }}>{statusInfo.text}</span>
    //   </Space>
    // ) : null;
    return <StatusIndicator status={status} />;
  };

  const currentStatus = data?.positionRequest?.status;
  const statusDetails = statusIconColorMap[currentStatus as keyof typeof statusIconColorMap];

  if (!data) {
    return <LoadingSpinnerWithMessage />;
  }

  // console.log('positionRequest data: ', data);
  if (!data.positionRequest && !isLoading) return <NotFoundComponent entity="Position request" />;
  // END ACTIONS TAB DATA
  const snapshotCopy = JSON.parse(JSON.stringify(data?.positionRequest?.orgchart_json));
  const tabItems = [
    {
      key: '1',
      label: 'Service request details',
      children: <ServiceRequestDetails positionRequestData={data}></ServiceRequestDetails>,
    },
    {
      key: '2',
      label: 'Organization Chart',
      children: (
        <div style={{ height: '100%' }}>
          <OrgChart
            type={OrgChartType.READONLY}
            departmentId={data.positionRequest?.department_id ?? ''}
            elements={snapshotCopy}
          />
        </div>
      ),
    },
    {
      key: '3',
      label: 'Job Profile',
      children: (
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <JobProfileWithDiff positionRequestData={data} />
        </div>
      ),
    },
    {
      key: '4',
      label: 'Actions',
      children: (
        <>
          <Result
            status="success"
            title={statusDetails?.text}
            icon={cloneElement(statusDetails?.icon, { style: { color: statusDetails?.color } })}
            extra={[
              <div className="result-extra-content">
                <Row justify="center">
                  <Col xs={24} sm={24} md={24} lg={20} xl={16}>
                    {!['COMPLETED', 'CANCELLED'].includes(currentStatus ?? '') && <NextSteps />}
                    {currentStatus == 'REVIEW' && (
                      <Alert
                        style={{ marginBottom: '1rem' }}
                        message={
                          <div className="alert-with-link">
                            To re-open this service request, go to the corresponding CRM service request and change the
                            state to 'Unresolved'
                            {/* <Link to="#" className="alert-extra-link">
                              Learn More
                            </Link> */}
                          </div>
                        }
                        type="warning"
                        showIcon
                      />
                    )}

                    {currentStatus == 'COMPLETED' && (
                      <Alert
                        style={{ marginBottom: '1rem' }}
                        message={
                          <div className="alert-with-link">
                            This service request was processed successfully, go to the corresponding CRM service request
                            to view more details.
                            {/* <Link to="#" className="alert-extra-link">
                              Learn More
                            </Link> */}
                          </div>
                        }
                        type="success"
                        showIcon
                      />
                    )}
                    <Card style={{ marginBottom: '1rem' }} title="Contact" bordered={false}>
                      <p>Reach out to the hiring manager or reporting managers for feedback.</p>
                      <Descriptions bordered column={2}>
                        <Descriptions.Item label="Hiring Manager" span={3}>
                          {data?.positionRequest?.user?.name} -{' '}
                          <a href={`mailto:${data?.positionRequest?.user?.email}`}>
                            {data?.positionRequest?.user?.email}
                          </a>
                          <CopyOutlined
                            onClick={() => {
                              navigator.clipboard.writeText(data?.positionRequest?.user?.email || '');
                              message.success('Email copied to clipboard');
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                        </Descriptions.Item>
                        <Descriptions.Item label="Reporting Manager" span={3}>
                          <PositionProfile
                            positionNumber={data?.positionRequest?.reports_to_position.positionNumber}
                            // positionProfile={data?.positionRequest?.reports_to_position}
                            orgChartData={data?.positionRequest?.orgchart_json}
                            mode="contact"
                          ></PositionProfile>
                        </Descriptions.Item>
                        <Descriptions.Item label="First Band Manager" span={3}>
                          <PositionProfile
                            positionNumber={data?.positionRequest?.excluded_manager_position.positionNumber}
                            // positionProfile={data?.positionRequest?.excluded_manager_position}
                            orgChartData={data?.positionRequest?.orgchart_json}
                            mode="contact"
                          ></PositionProfile>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                    {currentStatus == 'COMPLETED' && (
                      <Card title="Actions" style={{ marginBottom: '1rem' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div>
                            <strong>Download job profile</strong>
                            <p>Attached copy of the job profile that needs review.</p>
                            {/* <Button onClick={handleDownload}>Download job profile</Button> */}
                            <DownloadJobProfileComponent
                              positionRequest={data?.positionRequest}
                              jobProfile={data?.positionRequest?.profile_json}
                            />
                            <Button type="link" onClick={() => setActiveTabKey('3')}>
                              View job profile
                            </Button>
                          </div>
                          <Divider />
                          {/* <div>
                          <strong>Download organization chart</strong>
                          <p>
                            Attached copy of the org chart that shows the topic position and the job titles, position
                            numbers and classification levels, of the supervisor, peer and subordinate positions.
                          </p>
                          <Button onClick={handleDownload}>Download org chart</Button>
                          <Button type="link">View org chart</Button>
                        </div>
                        <Divider /> */}
                          <div>
                            <strong>Invite others to review</strong>
                            <p>Share the URL with people who you would like to collaborate with (IDIR restricted).</p>
                            <Space>
                              <Text>{`${window.location.origin}/requests/positions/share/${data?.positionRequest?.shareUUID}`}</Text>
                              <Button icon={<CopyOutlined />} onClick={handleCopyURL}>
                                Copy URL
                              </Button>
                            </Space>
                          </div>
                          <Divider />
                          <div>
                            <Text strong>View all tasks</Text>
                            <p>View all tasks that you have been assigned to.</p>
                            <Link to="/">
                              <Button>Go to My tasks</Button>
                            </Link>
                          </div>
                        </Space>
                      </Card>
                    )}
                  </Col>
                </Row>
              </div>,
            ]}
          />
        </>
      ),
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: (
        <div>
          Copy link <LinkOutlined />
          <Text type="secondary" style={{ display: 'block' }}>
            Invite others to review the task.
          </Text>
        </div>
      ),
      key: '1',
      onClick: handleCopyURL,
    },
    {
      label: (
        <div>
          <DownloadJobProfileComponent
            positionRequest={data?.positionRequest}
            jobProfile={data.positionRequest?.profile_json}
          >
            <>
              Download job profile
              <Text type="secondary" style={{ display: 'block' }}>
                Download the attached copy of the job profile.
              </Text>
            </>
          </DownloadJobProfileComponent>
        </div>
      ),
      key: '2',
    },
    // {
    //   label: (
    //     <div>
    //       Download org chart
    //       <Text type="secondary" style={{ display: 'block' }}>
    //         Download the attached copy of the org chart.
    //       </Text>
    //     </div>
    //   ),
    //   key: '3',
    // },
  ];

  return (
    <>
      <PageHeader
        extra={
          <>
            {data?.positionRequest?.status && <StatusIcon status={data.positionRequest.status} />}

            <Divider type="vertical" />
            <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
              <Button icon={<EllipsisOutlined />}></Button>
            </Dropdown>
          </>
        }
        title={data?.positionRequest?.title}
        subTitle={
          <div>
            <PositionProfile
              prefix="Reporting to"
              mode="compact"
              positionNumber={data?.positionRequest?.reports_to_position_id}
              positionProfile={data.positionRequest?.reports_to_position}
              orgChartData={data?.positionRequest?.orgchart_json}
            />
          </div>
        }
        additionalBreadcrumb={{ title: data?.positionRequest?.title }}
      />
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => setActiveTabKey(key)}
        defaultActiveKey="1"
        items={tabItems}
        tabBarStyle={{ backgroundColor: '#fff', padding: '0 1rem 0px 1rem' }}
        style={{ backgroundColor: '#f5f5f5' }}
      />
    </>
  );
};
