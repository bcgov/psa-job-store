import { ClockCircleFilled, ExclamationCircleFilled, FundFilled } from '@ant-design/icons';
import { Alert, Button, Card, Col, Descriptions, Modal, Result, Row, Tabs, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useBlocker, useParams } from 'react-router-dom';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import { JobProfileWithDiff } from '../classification-tasks/components/job-profile-with-diff.component';
import { ServiceRequestDetails } from '../classification-tasks/components/service-request-details.component';
import ContentWrapper from '../home/components/content-wrapper.component';
import OrgChartWrapped from '../org-chart/components/org-chart-wrapped.component';
import { useWizardContext } from './components/wizard.provider';
import { WizardConfirmDetailsPage } from './wizard-confirm-details.page';
import { WizardEditPage } from './wizard-edit.page';
import { WizardOrgChartPage } from './wizard-org-chart.page';
import { WizardResultPage } from './wizard-result.page';
import { WizardReviewPage } from './wizard-review.page';
import { WizardPage } from './wizard.page';

const { Paragraph } = Typography;

export const PositionRequestPage = () => {
  // let mode = 'editable';
  // mode = 'readonly';

  // mode = 'editable';

  // let readonlyMode = 'sentForVerification';
  // readonlyMode = 'reSubmittedForVerification';
  // readonlyMode = 'completed';
  // readonlyMode = 'inQueue';

  const [mode, setMode] = useState('editable');
  const [readonlyMode, setReadonlyMode] = useState('');
  const [readOnlySelectedTab, setReadOnlySelectedTab] = useState('1');

  const { setWizardData, setPositionRequestId, setPositionRequestProfileId, setPositionRequestDepartmentId } =
    useWizardContext();
  // console.log('wizardData: ', wizardData);
  const { positionRequestId } = useParams();

  if (!positionRequestId) throw 'No position request provided';

  const { data } = useGetPositionRequestQuery({
    id: parseInt(positionRequestId),
  });

  const [currentStep, setCurrentStep] = useState<number | null>(null);

  useEffect(() => {
    const step = data?.positionRequest?.step;

    if (step != null) setCurrentStep(step);

    if (data?.positionRequest?.id) {
      setPositionRequestId(data?.positionRequest?.id);
    }

    if (data?.positionRequest?.profile_json) setWizardData(data?.positionRequest?.profile_json);

    if (data?.positionRequest?.parent_job_profile_id)
      setPositionRequestProfileId(data?.positionRequest?.parent_job_profile_id);

    if (data?.positionRequest?.department_id) {
      setPositionRequestDepartmentId(data?.positionRequest?.department_id);
    }
  }, [data, setPositionRequestId, setWizardData, setPositionRequestProfileId, setPositionRequestDepartmentId]);

  const onNext = async () => {
    setCurrentStep(currentStep ? currentStep + 1 : 1);
  };

  const onBack = async () => {
    setCurrentStep(currentStep ? currentStep - 1 : 1);
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  const switchParentMode = (mode: string) => {
    setMode(mode);
  };

  const switchParentReadonlyMode = (mode: string) => {
    setReadonlyMode(mode);
  };

  // nav block
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname && currentStep != 5,
  );

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <WizardOrgChartPage onCreateNewPosition={onNext} />;
      case 1:
        return <WizardPage onNext={onNext} onBack={onBack} />;
      case 2:
        return <WizardEditPage onBack={onBack} onNext={onNext} />;

      case 3:
        return <WizardReviewPage onNext={onNext} onBack={onBack} />;
      case 4:
        return <WizardConfirmDetailsPage onNext={onNext} onBack={onBack} />;
      case 5:
        return (
          <WizardResultPage
            onBack={onBack}
            setStep={setStep}
            switchParentMode={switchParentMode}
            switchParentReadonlyMode={switchParentReadonlyMode}
            setReadOnlySelectedTab={setReadOnlySelectedTab}
          />
        );
      default:
        return <div>Loading or invalid step...</div>;
    }
  };

  // READONLY MODE

  let snapshotCopy = { edges: [], nodes: [] };
  if (data?.positionRequest?.orgchart_json)
    snapshotCopy = JSON.parse(JSON.stringify(data?.positionRequest?.orgchart_json));

  const tabItems = [
    {
      key: '1',
      label: 'Job details',
      children: <ServiceRequestDetails positionRequestData={data}></ServiceRequestDetails>,
    },
    {
      key: '2',
      label: 'Organization Chart',
      children: (
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
          {readonlyMode === 'sentForVerification' && (
            <>
              <Result
                icon={<ClockCircleFilled style={{ color: '#9254DE' }} />}
                title="Sent for verification"
                subTitle="The profile was submitted for review on: " // todo: add date
              />

              <Row justify="center" style={{ padding: '0 1rem' }}>
                <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                  <Alert
                    message="We have received your verification request. We are working on the request and will respond. Depending on the information that needs to be reviewed, we will respond as quickly as possible."
                    type="info"
                    showIcon
                    icon={<ExclamationCircleFilled />}
                    style={{ marginBottom: '24px' }}
                  />

                  <Card title="Other Actions" bordered={false} style={{ marginBottom: '20rem' }}>
                    {/* <Title level={5}>Save as Draft</Title>
              <Paragraph>
                Let's save your progress and come back later to make changes or get a position number.
              </Paragraph>
              <Button onClick={handleSaveAsDraft}>Save as Draft</Button>

              <Divider /> */}

                    {/* <Title level={5}>Allow others to edit</Title>
              <Paragraph>
                Share the URL with people who you would like to collaborate with (IDIR restricted).
              </Paragraph>
              <Button onClick={handleCopyURL}>Copy URL</Button>

              <Divider /> */}

                    <Title level={5}>View all Positions</Title>
                    <Paragraph>View all positions that you have created.</Paragraph>
                    <Button type="default" onClick={() => {}}>
                      Go to Dashboard
                    </Button>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {readonlyMode === 'reSubmittedForVerification' && (
            <>
              <Result
                icon={<ClockCircleFilled style={{ color: '#9254DE' }} />}
                title="Sent for verification"
                subTitle="The profile was re-submitted for verification on:" // todo: add date
              />

              <Row justify="center" style={{ padding: '0 1rem' }}>
                <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                  <Alert
                    message={
                      <>
                        <div>Service standards for profile review process submitted via JobStore:</div>
                        <ul>
                          <li>
                            For profiles that need review by analyst or specialist: <b>21 business days</b>
                          </li>
                        </ul>
                      </>
                    }
                    type="info"
                    showIcon
                    icon={<ExclamationCircleFilled />}
                    style={{ marginBottom: '24px' }}
                  />

                  <Card title="Other Actions" bordered={false} style={{ marginBottom: '20rem' }}>
                    {/* <Title level={5}>Save as Draft</Title>
      <Paragraph>
        Let's save your progress and come back later to make changes or get a position number.
      </Paragraph>
      <Button onClick={handleSaveAsDraft}>Save as Draft</Button>

      <Divider /> */}

                    {/* <Title level={5}>Allow others to edit</Title>
      <Paragraph>
        Share the URL with people who you would like to collaborate with (IDIR restricted).
      </Paragraph>
      <Button onClick={handleCopyURL}>Copy URL</Button>

      <Divider /> */}

                    <Title level={5}>View all Positions</Title>
                    <Paragraph>View all positions that you have created.</Paragraph>
                    <Button type="default" onClick={() => {}}>
                      Go to Dashboard
                    </Button>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {readonlyMode === 'inQueue' && (
            <>
              <Result
                status="error"
                icon={<FundFilled></FundFilled>}
                title="Your classification review is in the queue"
                subTitle="Thank you for your submission. A Classification specialist will reach out to you via email shortly."
                extra={[
                  <Button type="primary" key="console" onClick={() => {}}>
                    Go to Dashboard
                  </Button>,
                ]}
              />
              <Row justify="center" style={{ padding: '0 1rem', marginBottom: '5rem' }}>
                <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                  <Card title="Information" bordered={false}>
                    <Descriptions bordered layout="horizontal" column={1}>
                      <Descriptions.Item label="Position number">
                        123456 <Button type="link">Copy</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Job Details">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Organization chart">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Job store job profile">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Modified job profile">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {readonlyMode === 'completed' && (
            <>
              <Result
                status="success"
                title="Your position has been created."
                subTitle="Find the information needed for recruitment in the table below."
                extra={[
                  <Button type="primary" key="console" onClick={() => {}}>
                    Go to Dashboard
                  </Button>,
                ]}
              />
              <Row justify="center" style={{ padding: '0 1rem', marginBottom: '5rem' }}>
                <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                  <Card title="Information" bordered={false}>
                    <Descriptions bordered layout="horizontal" column={1}>
                      <Descriptions.Item label="Position number">
                        123456 <Button type="link">Copy</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Job Details">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Organization chart">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Job store job profile">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Modified job profile">
                        <Button type="link">View</Button> | <Button type="link">Download</Button>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {mode === 'readonly' && (
        <>
          <ContentWrapper>
            <Tabs
              defaultActiveKey={readOnlySelectedTab}
              items={tabItems}
              tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
            />
          </ContentWrapper>
        </>
      )}
      {mode === 'editable' && (
        <>
          {blocker.state === 'blocked' && (
            <Modal
              title="Are you sure you want to leave?"
              open={true}
              onOk={async () => {
                blocker.proceed();
              }}
              onCancel={() => blocker.reset()}
            >
              <p>You can resume the process from "My Positions" page</p>
            </Modal>
          )}
          {currentStep !== null ? renderStepComponent() : <div>Loading position request information...</div>}
        </>
      )}
    </>
  );
  // return <div>wizard position request page</div>;
};
