import { CopyOutlined, EllipsisOutlined, LinkOutlined, ThunderboltFilled } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Descriptions,
  Divider,
  Dropdown,
  Result,
  Row,
  Space,
  Tabs,
  Typography,
} from 'antd';
import { MenuProps } from 'antd/es/menu';
import TabPane from 'antd/es/tabs/TabPane';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../components/app/common/css/filtered-table.component.css';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import OrgChartWrapped from '../org-chart/components/org-chart-wrapped.component';
import WizardEditControlBar from '../wizard/components/wizard-edit-control-bar';
import { diffLegendContent } from '../wizard/wizard-review.page';
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

  const submissionDetailsItems = [
    {
      key: 'submittedBy',
      label: 'Submitted by',
      children: <div>{data?.positionRequest?.user_name}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'submittedAt',
      label: 'Submitted at',
      children: <div>{data?.positionRequest?.approved_at}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'ticketId',
      label: 'CRM service request',
      children: <div>231213-000737</div>, // todo: implement
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'submissionId',
      label: 'Submission ID',
      children: <div>{data?.positionRequest?.submission_id}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },

    // {
    //   key: 'contactEmail',
    //   label: 'Contact Email',
    //   children: <div>{data?.positionRequest?.email}</div>,
    //   span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    // },
    {
      key: 'positionNumber',
      label: 'Position Number',
      children: <div>{data?.positionRequest?.parent_job_profile?.number}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'positionStatus',
      label: 'Position status',
      children: <div>Proposed</div>, // todo: implement
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
  ];

  const jobDetailsItems = [
    {
      key: 'jobTitle',
      label: 'Job title',
      children: <div>{data?.positionRequest?.profile_json?.title?.value}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'expectedClassificationLevel',
      label: 'Expected classification level',
      children: <div>{data?.positionRequest?.classification_code}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'jobStoreProfileNumber',
      label: 'Job Store profile number',
      children: <div>{data?.positionRequest?.parent_job_profile?.number}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'reportsTo',
      label: 'Reports to',
      children: (
        <div>
          Hill, Nathan CITZ:EX <br />
          Sr. Director, Digital Portfolio, Band 4 <br />
          Position No.: 00012345
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'firstLevelExcludedManager',
      label: 'First level excluded manager for this position',
      children: (
        <div>
          Hill, Nathan CITZ:EX <br />
          Sr. Director, Digital Portfolio, Band 4 <br />
          Position No.: 00012345
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'payListDepartmentIdNumber',
      label: 'Pay list/department ID number',
      children: <div>{data?.positionRequest?.department_id}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'includedOrExcluded',
      label: 'Included or excluded?',
      children: <div>Included</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'fullTimeOrPartTime',
      label: 'Full-time or part-time?',
      children: <div>Full-time</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'regularOrTemporary',
      label: 'Regular or temporary?',
      children: <div>Regular</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'positionLocation',
      label: 'Position location',
      children: <div>Victoria</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },

    {
      key: 'receivedExecutiveApproval',
      label: 'Received executive approval (Deputy Minister or delegate)',
      children: <div>Yes</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
  ];

  // PROFILE TAB INFO - todo: use wizard-reivew.page.tsx instead, make it configurable
  const collapseRef = useRef<HTMLDivElement>(null);

  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  const handleScroll = () => {
    const layoutScrollContainer = document.querySelector('.ant-layout > div > div') as HTMLElement;
    if (layoutScrollContainer && collapseRef.current) {
      const collapseTop = collapseRef.current.getBoundingClientRect().top;
      const containerTop = layoutScrollContainer.getBoundingClientRect().top;

      // Check if the Collapse top is above the container top
      setHasScrolledPast(collapseTop < containerTop);
    }
  };

  useEffect(() => {
    const layoutScrollContainer = document.querySelector('.ant-layout > div > div');
    if (layoutScrollContainer) {
      layoutScrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (layoutScrollContainer) {
        layoutScrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const [showDiff, setShowDiff] = useState(true);

  const handleToggleShowDiff = (checked: boolean) => {
    setShowDiff(checked);
  };

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
      title: 'CRM: Send feedback email to client',
      subtitle:
        'Describe the changes that need to be made which will ensure that the profile clears the review process.',
    },
    {
      key: '2',
      title: 'CRM: Update status to "Waiting - Client"',
      subtitle: 'This will update the status of this ticket in the JobStore to "Action required".',
    },
    // Add more tasks as needed
  ];
  // END ACTIONS TAB DATA
  const tabItems = [
    {
      key: '1',
      label: 'Service request details',
      children: (
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={20} xl={16}>
            <Card className="tableHeader" style={{ marginTop: '1rem' }}>
              <Row gutter={24} wrap>
                <Col span={12}>
                  <h2 style={{ marginBottom: 0 }}>Job details</h2>
                </Col>
                <Col span={12}>
                  <Row justify="end">
                    <Col>{/* controls on the right of header go here */}</Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Descriptions
              className="descriptionsWithHeader"
              bordered
              column={24}
              items={jobDetailsItems}
              style={{ background: '#fff', marginBottom: '1rem' }}
              labelStyle={{
                fontWeight: 700,
                width: '200px',
                verticalAlign: 'top',
                background: '#FAFAFA',
              }}
              contentStyle={{
                background: '#fff',
                verticalAlign: 'top',
              }}
            />

            <Card className="tableHeader" style={{ marginTop: '1rem' }}>
              <Row gutter={24} wrap>
                <Col span={12}>
                  <h2 style={{ marginBottom: 0 }}>Submission details</h2>
                </Col>
                <Col span={12}>
                  <Row justify="end">
                    <Col>{/* controls on the right of header go here */}</Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Descriptions
              className="descriptionsWithHeader"
              bordered
              column={24}
              items={submissionDetailsItems}
              style={{ background: '#fff', marginBottom: '1rem' }}
              labelStyle={{
                fontWeight: 700,
                width: '300px',
                verticalAlign: 'top',
                background: '#FAFAFA',
              }}
              contentStyle={{
                background: '#fff',
                verticalAlign: 'top',
              }}
            />
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Organization Chart',
      children: (
        <>
          <div style={{ overflow: 'hidden', position: 'relative', height: '500px' }}>
            <OrgChartWrapped selectedDepartment={data?.positionRequest?.department_id ?? null} />
          </div>
        </>
      ),
    },
    {
      key: '3',
      label: 'Job Profile',
      children: (
        <>
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={20} xl={16} style={{ background: '#fff' }}>
              <WizardEditControlBar
                onToggleShowDiff={handleToggleShowDiff}
                showDiffToggle={true}
                showDiff={showDiff}
                showNext={false}
              />
              <Collapse
                ref={collapseRef}
                bordered={false}
                ghost
                activeKey={showDiff ? ['1'] : []} // Control the active key based on showDiff
                className={hasScrolledPast ? 'no-animation' : ''}
              >
                <Collapse.Panel key="1" showArrow={false} header="">
                  {diffLegendContent}
                </Collapse.Panel>
              </Collapse>
              <JobProfile
                style={{ marginTop: '1rem' }}
                profileData={data?.positionRequest?.profile_json}
                showBackToResults={false}
                showDiff={showDiff}
                id={data?.positionRequest?.parent_job_profile_id?.toString() ?? undefined}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: '4',
      label: 'Actions',
      children: (
        <>
          <Result
            status="success"
            title="Review"
            icon={<ThunderboltFilled style={{ color: '#722ED1' }} />}
            extra={[
              <div className="result-extra-content">
                <Row justify="center">
                  <Col xs={24} sm={24} md={24} lg={20} xl={16}>
                    <Card title="Next steps" bordered={false} style={{ marginBottom: '1rem' }}>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Medium touch" key="1">
                          {taskList.map((task) => (
                            <div key={task.key}>
                              <Checkbox>{task.title}</Checkbox>
                              <Paragraph>{task.subtitle}</Paragraph>
                            </div>
                          ))}
                        </TabPane>
                        <TabPane tab="High touch" key="2">
                          {/* High touch content */}
                        </TabPane>
                        <TabPane tab="Solved" key="3">
                          {/* Solved content */}
                        </TabPane>
                      </Tabs>
                    </Card>

                    <Card title="Other Actions" style={{ marginBottom: '1rem' }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div>
                          <strong>Download job profile</strong>
                          <p>Attached copy of the job profile that needs review.</p>
                          <Button onClick={handleDownload}>Download job profile</Button>
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

  if (!data) {
    return <div>Loading...</div>;
  }

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
          Download job profile
          <Text type="secondary" style={{ display: 'block' }}>
            Download the attached copy of the job profile.
          </Text>
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
      <Row justify="space-between" align="middle">
        <Col xs={24} lg={21}>
          <PageHeader
            title="Approved"
            subTitle={`reporting to Sr. Director, Digital Portfolio, Band 4 in CITZ:EX.`}
            additionalBreadcrumb={{ title: data?.positionRequest?.title }}
          />
        </Col>
        <Col xs={24} lg={3}>
          {/* <Button style={{ color: '#722ED1' }} type="link" icon={<ThunderboltOutlined />}>
            Review
          </Button> */}
          <span style={{ color: '#722ED1' }}>
            <Space>
              <ThunderboltFilled />
              Review
            </Space>
          </span>

          <Divider type="vertical" />
          <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
            <Button icon={<EllipsisOutlined />}></Button>
          </Dropdown>
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
