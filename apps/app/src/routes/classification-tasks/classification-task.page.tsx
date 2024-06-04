/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircleFilled,
  CloseSquareFilled,
  CopyOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  LinkOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Col, Divider, Dropdown, Result, Row, Space, Tabs, Typography, message } from 'antd';
import { MenuProps } from 'antd/es/menu';
import copy from 'copy-to-clipboard';
import { cloneElement, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import '../../components/app/common/css/filtered-table.component.css';
import { PageHeader } from '../../components/app/page-header.component';
import { DownloadJobProfileComponent } from '../../components/shared/download-job-profile/download-job-profile.component';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import { OrgChart } from '../org-chart/components/org-chart';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import './classification-tasks.page.css';
import { JobProfileWithDiff } from './components/job-profile-with-diff.component';
import { ServiceRequestDetails } from './components/service-request-details.component';
// import '../wizard/wizard-review.page.css';
// import './total-comp-approved-request.page.css';
const { Text } = Typography;

// Import your API service to fetch position request

export const ClassificationTaskPage = () => {
  const { positionRequestId } = useParams();
  const [activeTabKey, setActiveTabKey] = useState('1');

  if (!positionRequestId) throw 'No position request provided';

  const { data } = useGetPositionRequestQuery({
    id: parseInt(positionRequestId),
  });

  // END PROFILE TAB INFO
  // const handleDownload = () => {
  //   // Implement download functionality here
  // };

  const handleCopyURL = () => {
    // Implement URL copy functionality here
    const linkToCopy = `${window.location.origin}/my-position-requests/share/${data?.positionRequest?.shareUUID}`;

    // Use the Clipboard API to copy the link to the clipboard
    if (import.meta.env.VITE_TEST_ENV !== 'true') copy(linkToCopy);
    message.success('Link copied to clipboard!');
  };

  const statusIconColorMap: any = {
    REVIEW: { icon: <ExclamationCircleFilled />, color: '#FA8C16', text: 'Classification Review' },
    ACTION_REQUIRED: { icon: <CloseSquareFilled />, color: '#FF4D4F', text: 'Action Required' },
    COMPLETED: { icon: <CheckCircleFilled />, color: '#237804', text: 'Completed' },
    VERIFICATION: { icon: <CheckCircleFilled />, color: '#722ED1', text: 'Review' },
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

  // console.log('positionRequest data: ', data);

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
        <OrgChart
          type={OrgChartType.READONLY}
          departmentId={data.positionRequest?.department_id ?? ''}
          elements={snapshotCopy}
        />
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
                    <Card title="Actions" style={{ marginBottom: '1rem' }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div>
                          <strong>Download job profile</strong>
                          <p>Attached copy of the job profile that needs review.</p>
                          {/* <Button onClick={handleDownload}>Download job profile</Button> */}
                          <DownloadJobProfileComponent jobProfile={data?.positionRequest?.profile_json} />
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
                            <Text>{`${window.location.origin}/my-position-requests/share/${data?.positionRequest?.shareUUID}`}</Text>
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
      <Row align="middle" justify="space-between">
        <Col xs={24} lg={21}>
          <PageHeader
            title={data?.positionRequest?.title}
            subTitle={
              <div>
                <PositionProfile
                  prefix="Reporting to"
                  mode="compact"
                  positionNumber={data?.positionRequest?.reports_to_position_id}
                  orgChartData={data?.positionRequest?.orgchart_json}
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
          activeKey={activeTabKey}
          onChange={(key) => setActiveTabKey(key)}
          defaultActiveKey="1"
          items={tabItems}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      </ContentWrapper>
    </>
  );
};
