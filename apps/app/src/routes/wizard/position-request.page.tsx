/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, BulbOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Alert, Button, Card, Col, Descriptions, Modal, Result, Row, Tabs, Typography, message } from 'antd';
import Title from 'antd/es/typography/Title';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { cloneElement, useEffect, useRef, useState } from 'react';
import { Link, useBlocker, useLocation, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import { statusIconColorMap } from '../../components/app/utils/statusIconColorMap.utils';
import { DownloadJobProfileComponent } from '../../components/shared/download-job-profile/download-job-profile.component';
import { useLazyGetClassificationsQuery } from '../../redux/services/graphql-api/classification.api';
import {
  GetPositionRequestResponse,
  useLazyGetPositionRequestQuery,
  useLazyGetSharedPositionRequestQuery,
  useLazyPositionNeedsRivewQuery,
} from '../../redux/services/graphql-api/position-request.api';
import { useTestUser } from '../../utils/useTestUser';
import { JobProfileWithDiff } from '../classification-tasks/components/job-profile-with-diff.component';
import { ServiceRequestDetails } from '../classification-tasks/components/service-request-details.component';
import { NotFoundComponent } from '../not-found/404';
import { OrgChart } from '../org-chart/components/org-chart';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';
import './position-request.page.css';
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

  const {
    positionRequestId: wizardPositionRequestId,
    setWizardData,
    setPositionRequestId,
    setPositionRequestProfileId,
    setPositionRequestProfileVersion,
    setPositionRequestDepartmentId,
    setPositionRequestData,
    resetWizardContext,
    setRequiresVerification,
    positionRequestData: wizardContextPositionRequestData,
    setClassificationsData,
  } = useWizardContext();

  // check if this position currently requires review
  // do this only if it's past the edit page
  const [triggerPositionNeedsReviewQuery, { data: positionNeedsReviewData }] = useLazyPositionNeedsRivewQuery();

  const [triggerGetClassificationData, { data: classificationsData, isLoading: classificationsDataLoading }] =
    useLazyGetClassificationsQuery();

  // Fetch all classifications - thiw will be used throughout the wizard via the wizardContext
  const [classificationsFetched, setClassificationsFetched] = useState(false);

  useEffect(() => {
    if (classificationsData) {
      setClassificationsData(classificationsData);
      setClassificationsFetched(true);
    }
  }, [classificationsData, setClassificationsData]);

  useEffect(() => {
    if (!classificationsFetched) {
      triggerGetClassificationData();
    }
  }, [classificationsFetched, triggerGetClassificationData]);

  useEffect(() => {
    if (
      positionNeedsReviewData?.positionNeedsRivew?.result == true ||
      positionNeedsReviewData?.positionNeedsRivew?.result == false
    ) {
      // if the only reason for review is that the profile was set as requiring review, ignore it
      // otherwise the step indicator will show wrongfully that user made edits to profile requiring review
      // e.g. if response is like this : {"positionNeedsRivew":{"result":true,"reasons":["Job Profile is denoted as requiring review"]}}

      // Check if the only reason for review is that the profile was set as requiring review
      const reasons = positionNeedsReviewData?.positionNeedsRivew?.reasons || [];
      const onlyReasonIsProfileRequiresReview =
        reasons.length === 1 && reasons[0] === 'Job Profile is denoted as requiring review';

      if (onlyReasonIsProfileRequiresReview) {
        // If the only reason is that the profile requires review, set requiresVerification to false
        setRequiresVerification(false);
      } else {
        // Otherwise, set requiresVerification based on the positionNeedsRivew result
        setRequiresVerification(positionNeedsReviewData?.positionNeedsRivew?.result);
      }
    }
  }, [positionNeedsReviewData, setRequiresVerification]);

  const { positionRequestId } = useParams();

  const location = useLocation();
  // Determine if the current path is a shared URL
  const isSharedRoute = location.pathname.includes('/requests/positions/share/');

  // position request id changed from what's being stored in the context,
  // clear context
  useEffect(() => {
    if (
      positionRequestId &&
      wizardPositionRequestId &&
      positionRequestId !== wizardPositionRequestId?.toString() &&
      !isSharedRoute
    ) {
      resetWizardContext();
    }
  }, [positionRequestId, wizardPositionRequestId, resetWizardContext, isSharedRoute]);

  const [currentStep, setCurrentStep] = useState<number | null>(null);

  // Use state or other logic to determine which query hook to use
  // This could be a piece of state that determines which query to run, for example
  // const queryHook = isSharedRoute ? useLazyGetSharedPositionRequestQuery : useLazyGetPositionRequestQuery;

  const [getPositionRequest, { data: positionRequestData }] = isSharedRoute
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useLazyGetSharedPositionRequestQuery()
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useLazyGetPositionRequestQuery();

  // Use the determined query hook with the positionRequestId
  // const { data: positionRequestData, refetch } = isSharedRoute
  //   ? queryHook({ uuid: positionRequestId ?? '' })
  //   : queryHook({ id: parseInt(positionRequestId ?? '') });

  useEffect(() => {
    getPositionRequest({
      ...(isSharedRoute ? { uuid: positionRequestId ?? '' } : { id: parseInt(positionRequestId ?? '') }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!positionRequestId) throw new Error('No position request provided');

    // Perform actions based on the data or the route
    if (isSharedRoute) {
      // If it's a shared route, set modes or perform actions accordingly
      setMode('readonly');
    }
    console.log(positionRequestData);
    setPositionRequestData(
      isSharedRoute
        ? (positionRequestData?.sharedPositionRequest ?? null)
        : (positionRequestData?.positionRequest ?? null),
    );
  }, [
    positionRequestId,
    location.pathname,
    positionRequestData,
    setWizardData,
    setPositionRequestId,
    setPositionRequestProfileId,
    setPositionRequestProfileVersion,
    setPositionRequestDepartmentId,
    setPositionRequestData,

    isSharedRoute,
  ]);

  useEffect(() => {
    if (
      wizardContextPositionRequestData &&
      // AL-980 Navigating between position requests may display an error
      // check that the id from useParams is the same as the one in the context
      // fixes a bug where the context still contains stale data when switching between requests
      // - user navigates to request A
      // - goes back to dashboard, navigates to request B
      // - context still contains data from request A
      // - resetWizardContext fires, but this useEffect fires while data is still stale
      // fix does not apply for shared routes (no position request id in the URL)
      (wizardContextPositionRequestData?.id == parseInt(positionRequestId ?? '-1') || isSharedRoute)
    ) {
      const step = wizardContextPositionRequestData?.step;

      if (step != null) {
        setCurrentStep(step);
      }

      //TODO
      // if (step ?? 0 > 2)
      triggerPositionNeedsReviewQuery({ id: wizardContextPositionRequestData?.id });

      if (wizardContextPositionRequestData?.id) {
        setPositionRequestId(wizardContextPositionRequestData?.id);
      }

      if (wizardContextPositionRequestData?.profile_json) setWizardData(wizardContextPositionRequestData?.profile_json);

      if (wizardContextPositionRequestData?.parent_job_profile_id)
        setPositionRequestProfileId(wizardContextPositionRequestData?.parent_job_profile_id);

      if (wizardContextPositionRequestData?.parent_job_profile_version)
        setPositionRequestProfileVersion(wizardContextPositionRequestData?.parent_job_profile_version);

      if (wizardContextPositionRequestData?.department_id) {
        setPositionRequestDepartmentId(wizardContextPositionRequestData?.department_id);
      }
    }
  }, [
    wizardContextPositionRequestData,
    positionRequestId,
    setPositionRequestId,
    setWizardData,
    setPositionRequestProfileId,
    setPositionRequestProfileVersion,
    setPositionRequestDepartmentId,
    triggerPositionNeedsReviewQuery,
    isSharedRoute,
  ]);

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

  // get navigate
  const navigate = useNavigate();

  // nav block
  const isBlocking = useRef(true);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    // console.log(
    //   'blocker: currentLocation, nextLocation, currentStep, isBlocking.current: ',
    //   currentLocation,
    //   nextLocation,
    //   currentStep,
    //   isBlocking.current,
    // );
    return (
      currentLocation.pathname !== nextLocation.pathname &&
      currentStep != 5 &&
      isBlocking.current &&
      !positionRequestData
    );
  });

  const disableBlockingAndNavigateHome = () => {
    isBlocking.current = false; // This will disable the blocker
    navigate('/'); // Replace with the path where the user should be redirected
  };

  const isTestUser = useTestUser();

  const handleCopy = (copyData: any) => {
    // Use the Clipboard API to copy the link to the clipboard
    if (!isTestUser) copy(copyData);
    message.success('Link copied to clipboard!');
  };

  const renderStepComponent = () => {
    if (!wizardContextPositionRequestData) return <LoadingSpinnerWithMessage />;

    switch (currentStep) {
      case 0:
        return (
          <WizardOrgChartPage
            setCurrentStep={setCurrentStep}
            onCreateNewPosition={onNext}
            positionRequest={wizardContextPositionRequestData}
          />
        );
      case 1:
        return (
          <WizardConfirmDetailsPage
            setCurrentStep={setCurrentStep}
            onNext={onNext}
            onBack={onBack}
            disableBlockingAndNavigateHome={disableBlockingAndNavigateHome}
            positionRequest={wizardContextPositionRequestData}
          />
        );
      case 2:
        return (
          <WizardPage
            setCurrentStep={setCurrentStep}
            onNext={onNext}
            onBack={onBack}
            disableBlockingAndNavigateHome={disableBlockingAndNavigateHome}
            positionRequest={wizardContextPositionRequestData}
          />
        );

      case 3:
        return (
          <WizardEditPage
            setCurrentStep={setCurrentStep}
            onBack={onBack}
            onNext={onNext}
            disableBlockingAndNavigateHome={disableBlockingAndNavigateHome}
            positionRequest={wizardContextPositionRequestData}
          />
        );

      case 4:
        return (
          <WizardReviewPage
            setCurrentStep={setCurrentStep}
            onNext={onNext}
            onBack={onBack}
            disableBlockingAndNavigateHome={disableBlockingAndNavigateHome}
            positionRequest={wizardContextPositionRequestData}
          />
        );

      case 5:
        return (
          <WizardResultPage
            setCurrentStep={setCurrentStep}
            onBack={onBack}
            setStep={setStep}
            switchParentMode={switchParentMode}
            switchParentReadonlyMode={switchParentReadonlyMode}
            setReadOnlySelectedTab={setReadOnlySelectedTab}
            disableBlockingAndNavigateHome={disableBlockingAndNavigateHome}
            positionRequest={wizardContextPositionRequestData}
          />
        );
      default:
        return <LoadingSpinnerWithMessage />;
    }
  };

  // READONLY MODE

  let snapshotCopy = { edges: [], nodes: [] };
  if (wizardContextPositionRequestData?.orgchart_json)
    snapshotCopy = JSON.parse(JSON.stringify(wizardContextPositionRequestData?.orgchart_json));

  const tabItems = [
    {
      key: '1',
      label: 'Job details',
      children: (
        <ServiceRequestDetails
          positionRequestData={{ positionRequest: wizardContextPositionRequestData } as GetPositionRequestResponse}
        ></ServiceRequestDetails>
      ),
    },
    {
      key: '2',
      label: 'Organization Chart',
      children: (
        <div style={{ height: '100%' }}>
          <OrgChart
            type={OrgChartType.READONLY}
            departmentId={wizardContextPositionRequestData?.department_id ?? ''}
            elements={snapshotCopy}
          />
        </div>
      ),
    },
    ...(!isSharedRoute || (isSharedRoute && wizardContextPositionRequestData?.profile_json)
      ? [
          {
            key: '3',
            label: 'Job Profile',
            children: (
              <JobProfileWithDiff
                positionRequestData={{ positionRequest: wizardContextPositionRequestData }}
                rowProps={{ justify: 'center' }}
                colProps={{ xs: 24, sm: 24, md: 24, lg: 20, xl: 16 }}
              />
            ),
          },
        ]
      : []),
    ...(!isSharedRoute
      ? [
          {
            key: '4',
            label: 'Actions',
            children: (
              <>
                {readonlyMode === 'sentForVerification' && (
                  <>
                    <Result
                      icon={cloneElement(statusIconColorMap['VERIFICATION'].icon, {
                        style: { color: statusIconColorMap['VERIFICATION'].color },
                      })}
                      title="Sent for verification"
                      subTitle={`The profile was submitted for review on: ${dayjs(
                        wizardContextPositionRequestData?.resubmitted_at,
                      ).format('MMM D, YYYY')}`}
                    />

                    <Row justify="center" style={{ padding: '0 1rem' }} data-testid="verification-success-message">
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
                          <Button type="default" onClick={() => navigate('/')}>
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
                      icon={cloneElement(statusIconColorMap['VERIFICATION'].icon, {
                        style: { color: statusIconColorMap['VERIFICATION'].color },
                      })}
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
                          <Button type="default" onClick={() => navigate('/')}>
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
                      icon={statusIconColorMap['REVIEW'].icon}
                      title="Your classification review is in the queue"
                      subTitle="Thank you for your submission. A Classification specialist will reach out to you via email shortly."
                      extra={[
                        <Button type="primary" key="console" onClick={() => navigate('/')}>
                          Go to Dashboard
                        </Button>,
                      ]}
                    />
                    <Row justify="center" style={{ padding: '0 1rem', marginBottom: '5rem' }}>
                      <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                        <Card title="Information" bordered={false}>
                          <Descriptions bordered layout="horizontal" column={1}>
                            {/* <Descriptions.Item label="Position number">
                              <span data-testid="position-number">
                                {wizardContextPositionRequestData?.position_number != null
                                  ? `${wizardContextPositionRequestData?.position_number}`.padStart(8, '0')
                                  : ''}
                              </span>{' '}
                              <Button
                                type="link"
                                onClick={() =>
                                  handleCopy(
                                    wizardContextPositionRequestData?.position_number != null
                                      ? `${wizardContextPositionRequestData?.position_number}`.padStart(8, '0')
                                      : '',
                                  )
                                }
                              >
                                Copy
                              </Button>
                            </Descriptions.Item> */}
                            {/* <Descriptions.Item label="Job Details">
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
                            </Descriptions.Item> */}
                            <Descriptions.Item label="Job profile">
                              <Button type="link">
                                <DownloadJobProfileComponent
                                  positionRequest={wizardContextPositionRequestData}
                                  jobProfile={wizardContextPositionRequestData?.profile_json}
                                >
                                  Download
                                </DownloadJobProfileComponent>
                              </Button>
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
                        <Button type="primary" key="console" onClick={() => navigate('/')}>
                          Go to Dashboard
                        </Button>,
                      ]}
                    />
                    <Row justify="center" style={{ padding: '0 1rem', marginBottom: '2rem' }}>
                      <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                        <Card title="Information" bordered={false}>
                          <Descriptions bordered layout="horizontal" column={1}>
                            <Descriptions.Item label="Position number">
                              <span data-testid="position-number">
                                {wizardContextPositionRequestData?.position_number
                                  ? `${wizardContextPositionRequestData?.position_number}`.padStart(8, '0')
                                  : ''}
                              </span>{' '}
                              <Button
                                type="link"
                                onClick={() =>
                                  handleCopy(
                                    wizardContextPositionRequestData?.position_number
                                      ? `${wizardContextPositionRequestData?.position_number}`.padStart(8, '0')
                                      : '',
                                  )
                                }
                              >
                                Copy
                              </Button>
                            </Descriptions.Item>
                            {/* <Descriptions.Item label="Job Details">
                              <Button type="link">View</Button> | <Button type="link">Download</Button>
                            </Descriptions.Item>
                            <Descriptions.Item label="Organization chart">
                              <Button type="link">View</Button> | <Button type="link">Download</Button>
                            </Descriptions.Item>
                            <Descriptions.Item label="Job store job profile">
                              <Button type="link">View</Button> | <Button type="link">Download</Button>
                            </Descriptions.Item> */}
                            <Descriptions.Item label="Job profile">
                              <DownloadJobProfileComponent
                                positionRequest={wizardContextPositionRequestData}
                                jobProfile={wizardContextPositionRequestData?.profile_json}
                                useModal={true}
                              >
                                <a href="#">Download</a>
                              </DownloadJobProfileComponent>
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      </Col>
                    </Row>

                    <Row justify="center" style={{ padding: '0 1rem', marginBottom: '5rem' }}>
                      <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                        <Card bordered={false}>
                          <Row align="middle" gutter={16}>
                            <Col>
                              <BulbOutlined />
                            </Col>
                            <Col flex="auto">
                              <Row justify="space-between" align="middle">
                                <Col>
                                  <Typography.Text strong>Help us make it better</Typography.Text>
                                  <Typography.Text style={{ marginLeft: '1rem' }}>
                                    How was your experience creating a position number?{' '}
                                    <Typography.Link href="https://forms.office.com/r/R46ALagQzH" target="_blank">
                                      Please share your feedback here
                                    </Typography.Link>
                                  </Typography.Text>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                  </>
                )}
                {readonlyMode === 'cancelled' && (
                  <>
                    <Result
                      status="error"
                      icon={cloneElement(statusIconColorMap['CANCELLED'].icon, {
                        style: { color: statusIconColorMap['CANCELLED'].color },
                      })}
                      title="Your position request has been cancelled."
                      subTitle="Contact classifications for more details"
                      extra={[
                        <Button type="primary" key="console" onClick={() => navigate('/')}>
                          Go to Dashboard
                        </Button>,
                      ]}
                    />
                  </>
                )}
              </>
            ),
          },
        ]
      : []),
  ];

  if (classificationsDataLoading || !classificationsFetched) return <LoadingSpinnerWithMessage />;

  return !wizardContextPositionRequestData ? (
    <NotFoundComponent entity="position request" />
  ) : (
    <>
      {mode === 'readonly' && (
        <>
          {/* <ContentWrapper> */}
          <WizardPageWrapper
            title={
              <div>
                <Link to="/" aria-label="Go to dashboard">
                  <ArrowLeftOutlined aria-hidden style={{ color: 'black', marginRight: '1rem' }} />
                </Link>
                {wizardContextPositionRequestData?.title && wizardContextPositionRequestData?.title != 'Untitled'
                  ? wizardContextPositionRequestData?.title
                  : 'New position'}
              </div>
            }
            subTitle={
              <div>
                <PositionProfile
                  prefix="Reporting to"
                  mode="compact"
                  positionNumber={wizardContextPositionRequestData?.reports_to_position_id}
                  positionProfile={wizardContextPositionRequestData?.reports_to_position}
                  orgChartData={wizardContextPositionRequestData?.orgchart_json}
                ></PositionProfile>
              </div>
            }
            pageHeaderExtra={[
              <div style={{ marginRight: '1rem' }} key="statusIndicator">
                <StatusIndicator status={wizardContextPositionRequestData?.status ?? ''} />
              </div>,
              (readonlyMode === 'completed' || readonlyMode === 'inQueue') && (
                <DownloadJobProfileComponent
                  key="downloadJobProfile"
                  positionRequest={wizardContextPositionRequestData}
                  jobProfile={wizardContextPositionRequestData?.profile_json}
                  useModal={readonlyMode === 'completed'}
                  buttonType="primary"
                >
                  {/* <Button type="primary">Download profile</Button> */}
                </DownloadJobProfileComponent>
              ),
            ]}
            hpad={false}
            additionalBreadcrumb={{
              title:
                wizardContextPositionRequestData?.title && wizardContextPositionRequestData?.title != 'Untitled'
                  ? wizardContextPositionRequestData?.title
                  : 'New position',
            }}
            grayBg={false}
          >
            <div
              style={{
                overflow: 'hidden',
                position: 'relative',
                height: '100%',
                background: '#f5f5f5',
                marginLeft: '-1rem',
                marginRight: '-1rem',
                marginTop: '-1px',
                padding: '0 1rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.15)',
              }}
            >
              {currentStep !== null ? (
                <Tabs
                  defaultActiveKey={readOnlySelectedTab}
                  items={tabItems}
                  tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
                />
              ) : (
                <LoadingSpinnerWithMessage />
              )}
            </div>
          </WizardPageWrapper>
          {/* </ContentWrapper> */}
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
              <p>You can resume the process from "My Position Requests" page</p>
            </Modal>
          )}
          {currentStep !== null ? renderStepComponent() : <LoadingSpinnerWithMessage />}
        </>
      )}
    </>
  );
  // return <div>wizard position request page</div>;
};
