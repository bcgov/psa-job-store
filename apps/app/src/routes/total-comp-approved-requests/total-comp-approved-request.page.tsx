import { CopyOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Result, Row, Space, Tabs, Typography, message } from 'antd';
import copy from 'copy-to-clipboard';
import { Link, useParams } from 'react-router-dom';
import {
  default as LoadingComponent,
  default as LoadingSpinnerWithMessage,
} from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import '../../components/app/common/css/filtered-table.component.css';
import { PageHeader } from '../../components/app/page-header.component';
import { DownloadJobProfileComponent } from '../../components/shared/download-job-profile/download-job-profile.component';
import { useGetJobProfileMetaQuery } from '../../redux/services/graphql-api/job-profile.api';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import { useGetPositionQuery } from '../../redux/services/graphql-api/position.api';
import { formatDateTime } from '../../utils/Utils';
import { useTestUser } from '../../utils/useTestUser';
import { JobProfileWithDiff } from '../classification-tasks/components/job-profile-with-diff.component';
import NotFoundComponent from '../not-found/404';
import { OrgChart } from '../org-chart/components/org-chart';
import { initialElements } from '../org-chart/constants/initial-elements.constant';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import './total-comp-approved-request.page.css';
const { Text } = Typography;

// Import your API service to fetch position request

export const TotalCompApprovedRequestPage = () => {
  const { positionRequestId } = useParams();

  if (!positionRequestId) throw 'No position request provided';

  const { data, isLoading } = useGetPositionRequestQuery({
    id: parseInt(positionRequestId),
  });

  const { data: jobProfileMeta } = useGetJobProfileMetaQuery(
    data?.positionRequest?.parent_job_profile_id ?? -1,

    { skip: !data?.positionRequest?.additional_info?.work_location_id },
  );
  const currentVersion =
    data?.positionRequest?.parent_job_profile_version ==
    jobProfileMeta?.jobProfileMeta.versions.map((v) => v.version).sort((a, b: number) => b - a)[0];

  // fetch positionInfo to find effective date
  // this endpoint gets position info regardless if it's encumbered or not
  // useGetPositionProfileQuery on the other hand will only return the result if position is encumbered
  // together with employee info
  const { data: positionInfo, isLoading: positionLoading } = useGetPositionQuery(
    { where: { id: `${data?.positionRequest?.position_number?.toString().padStart(8, '0')}` } },
    { skip: data?.positionRequest?.reports_to_position != null || !data?.positionRequest?.position_number },
  );

  const submissionDetailsItems = [
    {
      key: 'submittedAt',
      label: 'Submitted at',
      children: <div>{data?.positionRequest?.approved_at}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'submissionId',
      label: 'Submission ID',
      children: <div>{data?.positionRequest?.submission_id}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'submittedBy',
      label: 'Submitted by',
      children: <div>{data?.positionRequest?.user?.name}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'contactEmail',
      label: 'Contact Email',
      children: <div>{data?.positionRequest?.user?.email}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'positionNumber',
      label: 'Position number',
      children: <div>{data?.positionRequest?.parent_job_profile?.number}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
  ];

  const jobDetailsItems = [
    {
      key: 'jobTitle',
      label: 'Job title',
      children: <div>{data?.positionRequest?.profile_json?.title?.text}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'expectedClassificationLevel',
      label: 'Expected classification level',
      children: <div>{data?.positionRequest?.classification?.code}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'jobStoreProfileNumber',
      label: 'Job Store profile number',
      children: (
        <div>
          <div>{data?.positionRequest?.parent_job_profile?.number}</div>

          <Link
            to={`/job-profiles/${data?.positionRequest?.parent_job_profile?.number}?id=${data?.positionRequest?.parent_job_profile_id}&version=${data?.positionRequest?.parent_job_profile_version}`}
          >
            <Typography.Text type="secondary">
              Version {data?.positionRequest?.parent_job_profile_version} {currentVersion && '(Latest) '}
            </Typography.Text>
            <ExportOutlined />
          </Link>
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'reportsTo',
      label: 'Reports to',
      children: (
        <PositionProfile
          positionNumber={null}
          positionProfile={data?.positionRequest?.reports_to_position}
          orgChartData={data?.positionRequest?.orgchart_json}
        ></PositionProfile>

        // <div>
        //   TEST DATA Hill, Nathan CITZ:EX <br />
        //   Sr. Director, Digital Portfolio, Band 4 <br />
        //   Position No.: 00012345
        // </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'firstLevelExcludedManager',
      label: 'Excluded manager who approved the profile',
      children: (
        <PositionProfile
          positionNumber={null}
          positionProfile={data?.positionRequest?.excluded_manager_position}
          orgChartData={data?.positionRequest?.orgchart_json}
        ></PositionProfile>
        // <div>
        //   TEST DATA Hill, Nathan CITZ:EX <br />
        //   Sr. Director, Digital Portfolio, Band 4 <br />
        //   Position No.: 00012345
        // </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'payListDepartmentIdNumber',
      label: 'Department ID',
      children: (
        <div>
          <div>{data?.positionRequest?.additional_info?.department_id}</div>
          {data?.positionRequest?.additional_info?.branch && (
            <div>
              <Typography.Text type="secondary">
                Branch: {data?.positionRequest?.additional_info?.branch}
              </Typography.Text>
            </div>
          )}
          {data?.positionRequest?.additional_info?.division && (
            <div>
              <Typography.Text type="secondary">
                Division: {data?.positionRequest?.additional_info?.division}
              </Typography.Text>
            </div>
          )}
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'branch',
      label: 'Branch',
      children: <div>{data?.positionRequest?.additional_info?.branch}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'division',
      label: 'Division',
      children: <div>{data?.positionRequest?.additional_info?.division}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'includedOrExcluded',
      label: 'Included or excluded?',
      children: (
        <div>
          {data?.positionRequest?.classification?.employee_group_id === 'MGT' ||
          data?.positionRequest?.classification?.employee_group_id === 'OEX'
            ? 'Excluded'
            : 'Included'}
        </div>
      ),
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
      children: <div>{data?.positionRequest?.additional_info?.work_location_name}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'effectiveDate',
      label: 'Effective Date',
      children: (
        <div>
          {positionLoading && <LoadingComponent mode="small" />}
          {formatDateTime(
            data?.positionRequest?.reports_to_position?.effectiveDate ?? positionInfo?.position?.effective_date,
            true,
          )}
        </div>
      ),
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
  // const collapseRef = useRef<HTMLDivElement>(null);

  // const [hasScrolledPast, setHasScrolledPast] = useState(false);

  // const handleScroll = () => {
  //   const layoutScrollContainer = document.querySelector('.ant-layout > div > div') as HTMLElement;
  //   if (layoutScrollContainer && collapseRef.current) {
  //     const collapseTop = collapseRef.current.getBoundingClientRect().top;
  //     const containerTop = layoutScrollContainer.getBoundingClientRect().top;

  //     // Check if the Collapse top is above the container top
  //     setHasScrolledPast(collapseTop < containerTop);
  //   }
  // };

  // useEffect(() => {
  //   const layoutScrollContainer = document.querySelector('.ant-layout > div > div');
  //   if (layoutScrollContainer) {
  //     layoutScrollContainer.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (layoutScrollContainer) {
  //       layoutScrollContainer.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, []);

  // END PROFILE TAB INFO
  // const handleDownload = () => {
  //   // Implement download functionality here
  // };

  const isTestUser = useTestUser();

  if (!data?.positionRequest && !isLoading) return <NotFoundComponent entity="Position request" />;

  const handleCopyURL = () => {
    // Implement URL copy functionality here
    const linkToCopy = `${window.location.origin}/requests/positions/share/${data?.positionRequest?.shareUUID}`;

    // Use the Clipboard API to copy the link to the clipboard
    if (!isTestUser) copy(linkToCopy);
    message.success('Link copied to clipboard!');
  };

  const tabItems = [
    {
      key: '1',
      label: 'Details',
      children: (
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
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
              style={{ background: '#fff' }}
              labelStyle={{
                fontWeight: 700,
                // width: '300px',
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
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Organization Chart',
      children: (
        <div style={{ height: '100%' }}>
          <OrgChart
            type={OrgChartType.READONLY}
            departmentId={data?.positionRequest?.department_id ?? ''}
            elements={data?.positionRequest?.orgchart_json ?? initialElements}
          />
        </div>
      ),
    },
    {
      key: '3',
      label: 'Job Profile',
      children: (
        <JobProfileWithDiff
          positionRequestData={{ positionRequest: data?.positionRequest }}
          rowProps={{ justify: 'center' }}
          colProps={{ xs: 24, sm: 24, md: 24, lg: 20, xl: 16 }}
        />
        // <>
        //   <Row justify="center">
        //     <Col xs={24} sm={24} md={24} lg={20} xl={16} style={{ background: '#fff' }}>
        //       <WizardEditControlBar
        //         onToggleShowDiff={handleToggleShowDiff}
        //         showDiffToggle={true}
        //         showDiff={showDiff}
        //         showNext={false}
        //       />
        //       {/* <Collapse
        //         ref={collapseRef}
        //         bordered={false}
        //         ghost
        //         activeKey={showDiff ? ['1'] : []} // Control the active key based on showDiff
        //         className={hasScrolledPast ? 'no-animation' : ''}
        //       >
        //         <Collapse.Panel key="1" showArrow={false} header="">
        //           {diffLegendContent}
        //         </Collapse.Panel>
        //       </Collapse> */}
        //       <JobProfile
        //         style={{ marginTop: '1rem' }}
        //         profileData={data?.positionRequest?.profile_json}
        //         showBackToResults={false}
        //         showDiff={showDiff}
        //       />
        //     </Col>
        //   </Row>
        // </>
      ),
    },
    {
      key: '4',
      label: 'Actions',
      children: (
        <>
          <Result
            status="success"
            title="Position was created!"
            subTitle={
              <div>
                <div>Position: {data?.positionRequest?.title}</div>
                <div>Position #: {data?.positionRequest?.position_number}</div>
              </div>
            }
            extra={[
              <div className="result-extra-content">
                <Row justify="center">
                  <Col xs={24} sm={24} md={24} lg={20} xl={16}>
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
                            positionNumber={null}
                            positionProfile={data?.positionRequest?.reports_to_position}
                            orgChartData={data?.positionRequest?.orgchart_json}
                            mode="compact"
                          ></PositionProfile>
                        </Descriptions.Item>
                        <Descriptions.Item label="First Band Manager" span={3}>
                          <PositionProfile
                            positionNumber={null}
                            positionProfile={data?.positionRequest?.excluded_manager_position}
                            orgChartData={data?.positionRequest?.orgchart_json}
                            mode="compact"
                          ></PositionProfile>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>

                    <Card title="Other Actions" style={{ marginBottom: '1rem' }}>
                      <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        {/* <div>
                          <strong>Download attachments</strong>
                          <p>Download the job profile & org chart related to the Job Profile.</p>
                          <Button icon={<DownloadOutlined />} onClick={handleDownload}>
                            Download attachments
                          </Button>
                        </div> */}
                        <div>
                          <strong>Download job profile</strong>
                          {/* <Button onClick={handleDownload}>Download job profile</Button> */}
                          <br></br>
                          <br></br>
                          <div>
                            <DownloadJobProfileComponent
                              positionRequest={data?.positionRequest}
                              jobProfile={data?.positionRequest?.profile_json}
                            />
                          </div>
                        </div>
                        <Divider />
                        <div>
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
                          {/* <strong>Invite others to review</strong>
                          <p>Share the URL with people who you would like to collaborate with (IDIR restricted).</p>
                          <Space>
                            <Text>http://pjs-dev.apps.silver.devops.gov.bc.ca/wizard/review/1</Text>
                            <Button icon={<CopyOutlined />} onClick={handleCopyURL}>
                              Copy URL
                            </Button>
                          </Space> */}
                        </div>
                        <Divider />
                        <div>
                          <Text strong>View all approved requests</Text>
                          <p>View all approved requests in JobStore.</p>
                          <Link to="/requests/positions/manage/approved">
                            <Button>Go to Approved requests</Button>
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
    return <LoadingSpinnerWithMessage />;
  }

  return (
    <>
      <PageHeader
        title={data?.positionRequest?.title}
        subTitle={
          <div>
            <PositionProfile
              prefix="Reporting to"
              mode="compact"
              positionNumber={null}
              positionProfile={data?.positionRequest?.reports_to_position}
              orgChartData={data?.positionRequest?.orgchart_json}
            ></PositionProfile>
          </div>
        }
        additionalBreadcrumb={{ title: data?.positionRequest?.title }}
      />
      {/* <ContentWrapper> */}
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        tabBarStyle={{ backgroundColor: '#fff', padding: '0 1rem 0px 1rem' }}
      />
      {/* </ContentWrapper> */}
      {/* subTitle={positionRequest.title} */}
    </>
  );
};
