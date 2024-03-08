/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircleFilled,
  CloseSquareFilled,
  CopyOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  LinkOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Checkbox, Col, Divider, Dropdown, Result, Row, Space, Tabs, Typography } from 'antd';
import { MenuProps } from 'antd/es/menu';
import TabPane from 'antd/es/tabs/TabPane';
import { cloneElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import '../../components/app/common/css/filtered-table.component.css';
import { PageHeader } from '../../components/app/page-header.component';
import { DownloadJobProfileComponent } from '../../components/shared/download-job-profile/download-job-profile.component';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import OrgChartWrapped from '../org-chart/components/org-chart-wrapped.component';
import './classification-tasks.page.css';
import { JobProfileWithDiff } from './components/job-profile-with-diff.component';
import { ServiceRequestDetails } from './components/service-request-details.component';
// import '../wizard/wizard-review.page.css';
// import './total-comp-approved-request.page.css';
const { Text, Paragraph } = Typography;

// Import your API service to fetch position request

export const ClassificationTaskPage = () => {
  const { positionRequestId } = useParams();

  if (!positionRequestId) throw 'No position request provided';

  const { data } = useGetPositionRequestQuery({
    id: parseInt(positionRequestId),
  });

  // END PROFILE TAB INFO
  const handleDownload = () => {
    // Implement download functionality here
  };

  const handleCopyURL = () => {
    // Implement URL copy functionality here
  };

  const taskList = [
    {
      key: '1',
      title: 'CRM: If needed, contact an analyst for guidance',
      subtitle: 'Analysts can help answer any questions and concerns you may have regarding this request.',
    },
    {
      key: '2',
      title: 'CRM: Send feedback email to client',
      subtitle:
        'Describe the changes that need to me made which will ensure that the profile clears the review process.',
    },
    {
      key: '3',
      title: 'CRM: Update state to ‘Waiting - Client’',
      subtitle:
        'This will change the ticket status here to ‘Action required’, and once the client responds, this will revert to ‘Review’.',
    },
  ];

  const highTouchTasks = [
    {
      key: '1',
      title: 'CRM: Contact a specialist for guidance',
      subtitle: 'Specialists can help answer any questions and concerns you may have regarding this request.',
    },
    {
      key: '2',
      title: 'CRM: Reach out to client to obtain a review approval',
      subtitle:
        'Describe the need for a full review process and get confirmation that they would submit a new webform for classification review.',
    },
    {
      key: '3',
      title: 'CRM: Update state to ‘Unresolved’',
      subtitle: 'This will change the ticket status here to ‘Escalated’, and then closed.',
    },
    {
      key: '4',
      title: 'CRM: Update category to ‘Classification’',
      subtitle: 'This will help with reporting and documentation.',
    },
    {
      key: '5',
      title: 'CRM: Update case to ‘ECLASS’',
      subtitle: 'This will help with reporting and documentation.',
    },
    {
      key: '6',
      title: 'CRM: Assign service request to the specialist',
      subtitle:
        'Reassign the CRM service request to the same specialist that will be taking over the classification review.',
    },
  ];

  const solvedTasks = [
    {
      key: '1',
      title: 'Generate position',
      subtitle: 'In PeopleSoft, approve the ‘proposed’ position number.',
    },
    {
      key: '2',
      title: 'Contact client',
      subtitle: 'Inform the client that the review was successful and share the position number.',
    },
    {
      key: '3',
      title: 'Generate position',
      subtitle: 'Change state to ‘Solved’: This will mark the service request as ‘Complete’ and then closed.',
    },
  ];

  const statusIconColorMap: any = {
    ESCALATED: { icon: <ExclamationCircleFilled />, color: '#FA8C16', text: 'Escalated' },
    ACTION_REQUIRED: { icon: <CloseSquareFilled />, color: '#FF4D4F', text: 'Action Required' },
    COMPLETED: { icon: <CheckCircleFilled />, color: '#237804', text: 'Completed' },
    IN_REVIEW: { icon: <CheckCircleFilled />, color: '#722ED1', text: 'Review' },
  };

  const StatusIcon = ({ status }: any) => {
    const statusInfo = statusIconColorMap[status];
    return statusInfo?.icon ? (
      <span style={{ color: statusInfo.color }}>
        <Space>
          {statusInfo.icon}
          {statusInfo.text}
        </Space>
      </span>
    ) : null;
  };

  const currentStatus = data?.positionRequest?.status;
  const statusDetails = statusIconColorMap[currentStatus as keyof typeof statusIconColorMap];

  if (!data) {
    return <LoadingSpinnerWithMessage />;
  }

  // console.log('positionRequest data: ', data?.positionRequest);

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
        <>
          <div style={{ overflow: 'hidden', position: 'relative', height: '800px' }}>
            <OrgChartWrapped
              selectedDepartment={data?.positionRequest?.department_id ?? null}
              orgChartSnapshot={snapshotCopy}
              highlightPositionId={'extraNode'}
              extraNodeInfo={{
                nodeId: 'extraNode',
                title: data?.positionRequest?.title,
                classification: { code: '', name: '' },
                status: data?.positionRequest?.status,
                targetNodeId: data?.positionRequest?.reports_to_position_id?.toString(),
                submittedBy: data?.positionRequest?.user_name,
              }}
            />
          </div>
        </>
      ),
    },
    {
      key: '3',
      label: 'Job Profile',
      children: <JobProfileWithDiff positionRequestData={data} />,
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
                    {currentStatus == 'ESCALATED' && (
                      <Alert
                        style={{ marginBottom: '1rem' }}
                        message={
                          <div className="alert-with-link">
                            To re-open this service request, go to the corresponding CRM service request and change the
                            state to 'Unresolved'
                            <Link to="#" className="alert-extra-link">
                              Learn More
                            </Link>
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
                            <Link to="#" className="alert-extra-link">
                              Learn More
                            </Link>
                          </div>
                        }
                        type="success"
                        showIcon
                      />
                    )}

                    {(currentStatus == 'IN_REVIEW' || currentStatus == 'ACTION_REQUIRED') && (
                      <Card title="Next steps" bordered={false} style={{ marginBottom: '1rem' }}>
                        <Tabs defaultActiveKey="1">
                          <TabPane tab="Medium touch" key="1">
                            <Paragraph>
                              If you consider this ticket as medium touch, then perform the following tasks:
                            </Paragraph>
                            {taskList.map((task) => (
                              <div key={task.key} className="task-item">
                                <Checkbox className="custom-checkbox">
                                  <div className="checkbox-contents">
                                    {task.title}
                                    <Paragraph type="secondary">{task.subtitle}</Paragraph>
                                  </div>
                                </Checkbox>
                              </div>
                            ))}
                          </TabPane>
                          <TabPane tab="High touch" key="2">
                            <Paragraph>
                              If you consider this ticket as high touch, then perform the following tasks:
                            </Paragraph>
                            {highTouchTasks.map((task) => (
                              <div key={task.key} className="task-item">
                                <Checkbox className="custom-checkbox">
                                  <div className="checkbox-contents">
                                    {task.title}
                                    <Paragraph type="secondary">{task.subtitle}</Paragraph>
                                  </div>
                                </Checkbox>
                              </div>
                            ))}
                          </TabPane>
                          <TabPane tab="Solved" key="3">
                            <Paragraph>
                              If you consider this ticket as solved, then perform the following tasks:
                            </Paragraph>
                            {solvedTasks.map((task) => (
                              <div key={task.key} className="task-item">
                                <Checkbox className="custom-checkbox">
                                  <div className="checkbox-contents">
                                    {task.title}
                                    <Paragraph type="secondary">{task.subtitle}</Paragraph>
                                  </div>
                                </Checkbox>
                              </div>
                            ))}
                          </TabPane>
                        </Tabs>
                      </Card>
                    )}
                    <Card title="Other Actions" style={{ marginBottom: '1rem' }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div>
                          <strong>Download job profile</strong>
                          <p>Attached copy of the job profile that needs review.</p>
                          {/* <Button onClick={handleDownload}>Download job profile</Button> */}
                          <DownloadJobProfileComponent jobProfile={data?.positionRequest?.profile_json} />
                          <Button type="link">View job profile</Button>
                        </div>
                        <Divider />
                        <div>
                          <strong>Download organization chart</strong>
                          <p>
                            Attached copy of the org chart that shows the topic position and the job titles, position
                            numbers and classification levels, of the supervisor, peer and subordinate positions.
                          </p>
                          <Button onClick={handleDownload}>Download org chart</Button>
                          <Button type="link">View org chart</Button>
                        </div>
                        <Divider />
                        <div>
                          <strong>Invite others to review</strong>
                          <p>Share the URL with people who you would like to collaborate with (IDIR restricted).</p>
                          <Space>
                            <Text>http://pjs-dev.apps.silver.devops.gov.bc.ca/wizard/review/1</Text>
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
                            <Button>Go to Dashboard</Button>
                          </Link>
                        </div>
                      </Space>
                    </Card>
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
    },
    {
      label: (
        <div>
          <DownloadJobProfileComponent jobProfile={data.positionRequest?.profile_json}>
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
    {
      label: (
        <div>
          Download org chart
          <Text type="secondary" style={{ display: 'block' }}>
            Download the attached copy of the org chart.
          </Text>
        </div>
      ),
      key: '3',
    },
  ];

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col xs={24} lg={21}>
          <PageHeader
            title="Approved"
            subTitle={
              <div>
                <PositionProfile
                  prefix="Reporting to"
                  mode="compact"
                  positionNumber={data?.positionRequest?.reports_to_position_id}
                ></PositionProfile>
              </div>
            }
            additionalBreadcrumb={{ title: data?.positionRequest?.title }}
          />
        </Col>
        <Col xs={24} lg={3}>
          <Row justify="start">
            <Col>
              {data?.positionRequest?.status && <StatusIcon status={data.positionRequest.status} />}

              <Divider type="vertical" />
              <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
                <Button icon={<EllipsisOutlined />}></Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>

      <ContentWrapper>
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      </ContentWrapper>
      {/* subTitle={positionRequest.title} */}
    </>
  );
};
