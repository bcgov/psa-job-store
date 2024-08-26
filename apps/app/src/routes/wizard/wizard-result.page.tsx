/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  MailOutlined,
  WarningFilled,
} from '@ant-design/icons';
import { Alert, Button, Card, Col, Form, Input, Menu, Modal, Result, Row, Switch, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd/lib';
import { autolayout, updateSupervisorAndAddNewPositionNode } from 'common-kit';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReactFlow } from 'reactflow';
import AcessiblePopoverMenu from '../../components/app/common/components/accessible-popover-menu';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import ContentWrapper from '../../components/content-wrapper.component';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  usePositionNeedsRivewQuery,
  useSubmitPositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { OrgChart } from '../org-chart/components/org-chart';
import { generatePNGBase64 } from '../org-chart/components/org-chart/download-button.component';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import CommentsList from './components/comments-list.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';

interface WizardResultPageProps {
  onBack?: () => void;
  setStep?: (step: number, reason: string) => void;
  switchParentMode?: (mode: string) => void;
  switchParentReadonlyMode?: (mode: string) => void;
  setReadOnlySelectedTab?: (tab: string) => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
}

export const WizardResultPage: React.FC<WizardResultPageProps> = ({
  onBack,
  setStep,
  switchParentMode,
  switchParentReadonlyMode,
  setReadOnlySelectedTab,
  disableBlockingAndNavigateHome,
  positionRequest,
  setCurrentStep,
}) => {
  // let mode = 'readyToCreatePositionNumber';
  // mode = 'verificationRequired_edits'; // verification is needed because user made edits to significant sections
  // mode = 'verificationRequired_retry'; // verification is needed because classifications team requested changes
  // mode = 'classificationReviewRequired'; // classification review is needed

  // mode = 'readyToCreatePositionNumber';

  // use a state for "mode"

  const [mode, setMode] = useState('');
  const [verificationNeededReasons, setVerificationNeededReasons] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [orgChartDataForPng, setOrgChartDataForPng] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { positionRequestId, setCurrentSection, positionRequestData, setPositionRequestData, getClassificationById } =
    useWizardContext();
  const { getNodes } = useReactFlow();

  // const {
  //   data: positionRequestData,
  //   isLoading: positionRequestLoading,
  //   // isError: positionRequestLoadingError,
  //   refetch: refetchPositionRequest,
  //   isFetching: isFetchingPositionRequest,
  // } = useGetPositionRequestQuery({
  //   id: positionRequestId ?? -1,
  // });

  const {
    data: positionNeedsRivew,
    isLoading: positionNeedsRivewLoading,
    // isError: positionNeedsRivewError,
    refetch: refetchPositionNeedsRivew,
    isFetching: isFetchingPositionNeedsRivew,
  } = usePositionNeedsRivewQuery(
    {
      id: positionRequestId ?? -1,
    },
    {
      skip: !positionRequestId,
    },
  );

  useEffect(() => {
    // Fetch position request and needs review data when positionRequestId changes
    if (positionRequestId) {
      // refetchPositionRequest();
      refetchPositionNeedsRivew();
    }
  }, [positionRequestId, refetchPositionNeedsRivew]);

  useEffect(() => {
    // if loading
    if (positionNeedsRivewLoading) return;

    // load comment if prevsiously entered
    if (positionRequestData?.additional_info?.comments) {
      setComment(positionRequestData?.additional_info.comments);
    }

    // if state is draft and position doesn't need review, set mode to readyToCreatePositionNumber
    if (positionRequestData?.status === 'DRAFT' && !positionNeedsRivew?.positionNeedsRivew.result) {
      setMode('readyToCreatePositionNumber');
      return;
    }

    // if state is draft and position needs review, set mode to verificationRequired_edits
    // Will show a warning message and a links that take user to the sections that if changes will not require verification
    if (positionRequestData?.status === 'DRAFT' && positionNeedsRivew?.positionNeedsRivew.result) {
      setVerificationNeededReasons(positionNeedsRivew.positionNeedsRivew.reasons);
      setMode('verificationRequired_edits');
      return;
    }

    // if state is COMPLETE, then set parent to readonly mode
    // Will show "Your position has been created" screen
    if (positionRequestData?.status === 'COMPLETED') {
      switchParentMode && switchParentMode('readonly');
      switchParentReadonlyMode && switchParentReadonlyMode('completed');
      setReadOnlySelectedTab && setReadOnlySelectedTab('4');
      return;
    }

    // if state is CANCELLED, then set parent to readonly mode
    // Will show "Your position has been created" screen
    if (positionRequestData?.status === 'CANCELLED') {
      switchParentMode && switchParentMode('readonly');
      switchParentReadonlyMode && switchParentReadonlyMode('cancelled');
      setReadOnlySelectedTab && setReadOnlySelectedTab('4');
      return;
    }

    // if it's in VERIFICATION;, set mode to sentForVerification
    if (positionRequestData?.status === 'VERIFICATION') {
      switchParentMode && switchParentMode('readonly');
      switchParentReadonlyMode && switchParentReadonlyMode('sentForVerification');
      setReadOnlySelectedTab && setReadOnlySelectedTab('4');
      return;
    }

    // if it's in ACTION_REQUIRED show alternate verification required screen
    if (positionRequestData?.status === 'ACTION_REQUIRED') {
      setMode('verificationRequired_retry');
      return;
    }

    // if it's in REVIEW status, show "classification review required" screen
    if (positionRequestData?.status === 'REVIEW') {
      switchParentMode && switchParentMode('readonly');
      // setMode('classificationReviewRequired');
      switchParentReadonlyMode && switchParentReadonlyMode('inQueue');
      setReadOnlySelectedTab && setReadOnlySelectedTab('4');
      return;
    }
  }, [
    positionNeedsRivew,
    positionRequestData,
    positionNeedsRivewLoading,
    switchParentMode,
    switchParentReadonlyMode,
    setReadOnlySelectedTab,
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerificationModalVisible, setIsVerificationModalVisible] = useState(false);

  // const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const [submitPositionRequest, { isLoading: submitPositionRequestIsLoading }] = useSubmitPositionRequestMutation();

  const showVerificationModal = async () => {
    setIsVerificationModalVisible(true);
  };

  const handleVerificationCancel = () => {
    setIsVerificationModalVisible(false);
  };

  const showModal = async () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    // User pressed next on the review screen
    // A modal appeared with terms
    // User confirmed the terms in the modal by pressing OK

    // Hide the modal
    setIsModalVisible(false);

    if (positionRequestId) {
      // await updatePositionRequest({
      //   id: positionRequestId,
      //   status: 'COMPLETE',
      //   step: 6,
      // }).unwrap();

      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const png = await generatePNGBase64(getNodes);
        const result = await submitPositionRequest({
          id: positionRequestId,
          comment: comment,
          orgchart_png: png,
        }).unwrap();

        // console.log('submitPositionRequest result: ', result);
        // todo - change check for position_number
        if (!result?.submitPositionRequest.id) throw new Error('API failure');

        // if successfull, switch parent to readonly mode and show success message
        // switchParentMode, switchParentReadonlyMode
        if (result?.submitPositionRequest.status === 'COMPLETED') {
          switchParentMode && switchParentMode('readonly');
          switchParentReadonlyMode && switchParentReadonlyMode('completed');
          setReadOnlySelectedTab && setReadOnlySelectedTab('4');
        } else if (result?.submitPositionRequest.status === 'VERIFICATION') {
          switchParentMode && switchParentMode('readonly');
          switchParentReadonlyMode && switchParentReadonlyMode('sentForVerification');
          setReadOnlySelectedTab && setReadOnlySelectedTab('4');
        }

        setPositionRequestData(result?.submitPositionRequest ?? null);
      } catch (error) {
        console.error('Error submitting position request: ', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      throw Error('Position request not found');
    }
  };

  const navigate = useNavigate();

  const back = () => {
    onBack && onBack();
  };

  const handleVerificationClick = (reason: string) => {
    setStep && setStep(3, reason);
    setCurrentSection(reason);
  };

  const [deletePositionRequest] = useDeletePositionRequestMutation();
  const deleteRequest = async () => {
    if (!positionRequestId) return;
    Modal.confirm({
      title: 'Delete Position Request',
      content: 'Do you want to delete the position request?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        await deletePositionRequest({ id: positionRequestId });
        disableBlockingAndNavigateHome();
      },
    });
  };
  const getMenuContent = () => {
    return (
      <Menu className="wizard-menu">
        <Menu.Item key="save" onClick={disableBlockingAndNavigateHome}>
          <div style={{ padding: '5px 0' }}>
            Save and quit
            <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
              Saves your progress. You can access this position request from the 'My Position Requests' page.
            </Typography.Text>
          </div>
        </Menu.Item>
        {positionRequest?.status === 'DRAFT' && (
          <>
            <Menu.Divider />
            <Menu.ItemGroup key="others" title={<b>Others</b>}>
              <Menu.Item key="delete" onClick={deleteRequest}>
                <div style={{ padding: '5px 0' }}>
                  Delete
                  <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                    Removes this position request from 'My Position Requests'. This action is irreversible.
                  </Typography.Text>
                </div>
              </Menu.Item>
            </Menu.ItemGroup>
          </>
        )}
      </Menu>
    );
  };

  const [comment, setComment] = useState('');
  const [updatePositionRequest] = useUpdatePositionRequestMutation();

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const switchStep = async (step: number) => {
    setCurrentStep(step);
    if (positionRequestId)
      await updatePositionRequest({
        id: positionRequestId,
        step: step,
      });
  };

  useEffect(() => {
    if (positionRequest) {
      // console.log(
      //   'positionRequest?.classification_id for getClassificationById : ',
      //   positionRequest?.classification_id,
      //   positionRequest,
      // );
      const classification = getClassificationById(positionRequest?.classification_id ?? '');
      // console.log('classification: ', classification);

      // const { data: departmentData } = useGetDepartmentQuery(positionRequest?.department_id);
      let orgChartDataForPng = JSON.parse(JSON.stringify(positionRequest?.orgchart_json));
      orgChartDataForPng = updateSupervisorAndAddNewPositionNode(
        orgChartDataForPng.edges,
        orgChartDataForPng.nodes,
        positionRequest?.additional_info?.excluded_mgr_position_number ?? '',
        positionRequest?.reports_to_position_id,
        '000000',
        positionRequest?.title,
        classification,
        { id: positionRequest?.department_id, organization_id: '', name: '' },
      );
      setOrgChartDataForPng(autolayout(orgChartDataForPng));
    }
  }, [positionRequest, setOrgChartDataForPng, getClassificationById]);

  // augment data the way it's done upon submission for position creation, e.g.
  // - update supervisor and excluded manager nodes
  // - add node for new position

  if (positionNeedsRivewLoading || isFetchingPositionNeedsRivew || !orgChartDataForPng)
    return <LoadingSpinnerWithMessage />;

  return (
    <>
      <div data-testid="result-page">
        <WizardPageWrapper
          // title="Edit profile" subTitle="You may now edit the profile." xxl={20} xl={20} lg={20}

          title={
            <div>
              <Link to="/" aria-label="Go to dashboard">
                <ArrowLeftOutlined aria-hidden style={{ color: 'black', marginRight: '1rem' }} />
              </Link>
              Result
            </div>
          }
          subTitle={<div>Find out the result of your request</div>}
          additionalBreadcrumb={{
            title:
              positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position',
          }}
          // subTitle="Choose a job profile to modify for the new positions"
          hpad={false}
          grayBg={false}
          pageHeaderExtra={[
            <div style={{ marginRight: '1rem' }}>
              <StatusIndicator status={positionRequest?.status ?? ''} />
            </div>,
            <AcessiblePopoverMenu
              triggerButton={<Button tabIndex={-1} icon={<EllipsisOutlined />}></Button>}
              content={getMenuContent()}
              ariaLabel="Open position request menu"
            ></AcessiblePopoverMenu>,
            <Button onClick={back} key="back" data-testid="back-button">
              Back
            </Button>,
            <>
              {mode === 'readyToCreatePositionNumber' && (
                <Button
                  onClick={showModal}
                  key="back"
                  type="primary"
                  loading={submitPositionRequestIsLoading || isLoading}
                >
                  Generate position number
                </Button>
              )}
              {(mode === 'verificationRequired_edits' || mode === 'verificationRequired_retry') && (
                <Button
                  key="back"
                  type="primary"
                  onClick={handleOk}
                  loading={submitPositionRequestIsLoading || isLoading}
                >
                  Submit for verification
                </Button>
              )}
            </>,
          ]}
        >
          <WizardSteps
            onStepClick={switchStep}
            current={5}
            maxStepCompleted={positionRequest?.max_step_completed}
          ></WizardSteps>
          {/* Invisible org chart so we can generate a png image to attach with the submission to CRM */}
          <div style={{ height: '1px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '400px', width: '100%', position: 'absolute', top: 0, left: 0 }}>
              <OrgChart
                type={OrgChartType.READONLY}
                departmentId={positionRequest?.department_id ?? ''}
                elements={orgChartDataForPng}
                wrapProvider={false}
              />
            </div>
          </div>

          <div
            style={{
              overflow: 'hidden',
              position: 'relative',
              height: '100%',
              background: 'rgb(240, 242, 245)',
              marginLeft: '-1rem',
              marginRight: '-1rem',
              marginTop: '-1px',
              padding: '2rem 1rem',
            }}
          >
            {mode === 'readyToCreatePositionNumber' && (
              <ContentWrapper>
                <Result icon={<CheckCircleOutlined />} title="The job profile is ready!" />

                <Row justify="center" style={{ padding: '0 1rem' }}>
                  <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                    <Alert
                      description="You have completed your profile. At this point, it is saved as draft. You may proceed to generate the position number."
                      type="info"
                      showIcon
                    />

                    <Card title="Get position number" bordered={false} style={{ marginTop: '1rem' }}>
                      <Form layout="vertical">
                        <Form.Item name="jobTitle" labelCol={{ className: 'card-label' }} colon={false}>
                          <div style={{ margin: 0 }}>
                            The job profile meets all the criteria, you can generate a position number (this action is
                            irreversable).
                          </div>
                        </Form.Item>
                        <Button
                          type="primary"
                          onClick={showModal}
                          loading={submitPositionRequestIsLoading || isLoading}
                          data-testid="generate-position-button"
                        >
                          Generate position number
                        </Button>
                      </Form>
                    </Card>

                    <Card
                      title={<h3 style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Other actions</h3>}
                      bordered={false}
                      style={{ marginTop: '1rem' }}
                    >
                      {/* <Typography.Title level={5}>Send for Review</Typography.Title>
              <Typography.Paragraph>
                This Job Profile is not ready to be published yet. There seems to me many changes to the profile, so you
                would first need to send this for a classification review.
              </Typography.Paragraph>
              <Button onClick={handleClick}>Send for Review</Button>
              <Divider /> */}

                      {/* <Title level={5}>Save as Draft</Title>
              <Paragraph>
                Let’s save your progress and come back later to make changes or get a position number.
              </Paragraph>
              <Button onClick={handleSaveAsDraft}>Save as Draft</Button>

              <Divider /> */}

                      {/* <Title level={5}>Allow others to edit</Title>
              <Paragraph>Share the URL with people who you would like to collaborate with (IDIR restricted).</Paragraph>
              <Button onClick={handleCopyURL}>Copy URL</Button>

              <Divider /> */}

                      <Title level={4}>View all Positions</Title>
                      <Paragraph>View all positions that you have created.</Paragraph>
                      <Button type="default" onClick={() => navigate('/')}>
                        Go to Dashboard
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </ContentWrapper>
            )}

            {mode === 'verificationRequired_edits' && (
              <ContentWrapper data-testid="verification-warning">
                <Result icon={<WarningFilled />} title="Verification required" status="warning" />

                <Row justify="center" style={{ padding: '0 1rem' }}>
                  <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                    {/* <Alert
                      data-testid="verification-warning-message"
                      message=""
                      description={
                        <span>
                          Some of your amendments to the generic profile require verification. If you would like to
                          revisit some of your amendments, please click these links:
                          <ul style={{ marginTop: '1rem' }} data-testid="edit-form-link">
                            {verificationNeededReasons.map((reason, index) => (
                              <li key={index}>
                                <a onClick={() => handleVerificationClick(reason)}>{reason}</a>
                              </li>
                            ))}
                          </ul>
                        </span>
                      }
                      type="warning"
                      showIcon
                      icon={<ExclamationCircleFilled />}
                      style={{ marginBottom: '24px' }}
                    /> */}

                    {verificationNeededReasons.includes('Job Profile is denoted as requiring review') && (
                      <Alert
                        message={<b>Will require verification</b>}
                        description="This profile will need to be verified by the classification team before a position number is generated."
                        type="warning"
                        showIcon
                        icon={<ExclamationCircleFilled />}
                        style={{ marginBottom: '24px' }}
                      />
                    )}
                    {verificationNeededReasons.filter(
                      (reason) => reason !== 'Job Profile is denoted as requiring review',
                    ).length > 0 && (
                      <Alert
                        data-testid="verification-warning-message"
                        message=""
                        description={
                          <span>
                            Some of your amendments to the generic profile require verification. If you would like to
                            revisit some of your amendments, please click these links:
                            <ul style={{ marginTop: '1rem' }} data-testid="edit-form-link">
                              {verificationNeededReasons
                                .filter((reason) => reason !== 'Job Profile is denoted as requiring review')
                                .map((reason, index) => (
                                  <li key={index}>
                                    <a onClick={() => handleVerificationClick(reason)}>{reason}</a>
                                  </li>
                                ))}
                            </ul>
                          </span>
                        }
                        type="warning"
                        showIcon
                        icon={<ExclamationCircleFilled />}
                        style={{ marginBottom: '24px' }}
                      />
                    )}
                    <Card
                      title={<h3 style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Send for verification</h3>}
                      bordered={false}
                      style={{ marginBottom: '1rem' }}
                    >
                      <Paragraph>
                        Forward the profile to be verified by the classifications team. We will respond shortly after
                        verification, once submitted. There are no other steps required, just look for our followup
                        response.
                      </Paragraph>
                      <Form.Item name="comments">
                        <label htmlFor="comments" style={{ display: 'block', marginBottom: '0.5rem' }}>
                          <b>Comments</b>
                        </label>
                        <>
                          <Input.TextArea
                            id="comments"
                            data-testid="comments-input"
                            autoSize
                            maxLength={1000}
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add comments"
                          />
                          <Row>
                            <Col span={18}>
                              <Typography.Paragraph type="secondary" style={{ margin: '0' }}>
                                (Optional) Add some context related to changes you made. This will help the reviewer
                                assess your edits.
                              </Typography.Paragraph>
                            </Col>
                            <Col span={6} style={{ textAlign: 'right' }}>
                              <Typography.Paragraph
                                type="secondary"
                                style={{ textAlign: 'right', width: '100%', margin: '0' }}
                              >
                                {comment.length} / 1000
                              </Typography.Paragraph>
                            </Col>
                          </Row>
                        </>
                      </Form.Item>
                      <Button
                        type="primary"
                        onClick={showVerificationModal}
                        loading={submitPositionRequestIsLoading || isLoading}
                        data-testid="submit-for-verification-button"
                      >
                        Submit for verification
                      </Button>
                      <Divider />
                      <h3>Get support</h3>
                      <Typography.Paragraph>
                        Get advice from the classification services team before sending the request for verification.
                        The classification services team will contact you via email after they have reviewed the
                        request.
                      </Typography.Paragraph>
                      <Button
                        type="dashed"
                        icon={<MailOutlined />}
                        onClick={() => {
                          const subject = encodeURIComponent('Support Request');
                          const body = encodeURIComponent(
                            `Hello, \n\n` +
                              `I need assistance with my position request.\n\n` +
                              `Please review the details at this link (do not share this link):\n` +
                              `${window.location.origin}/requests/positions/share/${positionRequest?.shareUUID}`,
                          );
                          window.location.href = `mailto:${
                            import.meta.env.VITE_SUPPORT_EMAIL
                          }?subject=${subject}&body=${body}`;
                        }}
                      >
                        Get support
                      </Button>
                    </Card>
                    <Card
                      title={<h3 style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Other actions</h3>}
                      bordered={false}
                    >
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

                      <Title level={4}>View all Positions</Title>
                      <Paragraph>View all positions that you have created.</Paragraph>
                      <Button type="default" onClick={() => navigate('/')}>
                        Go to Dashboard
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </ContentWrapper>
            )}

            {mode === 'verificationRequired_retry' && (
              <ContentWrapper>
                <Result icon={<WarningFilled />} title="Verification required" status="warning" />

                <Row justify="center" style={{ padding: '0 1rem' }}>
                  <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                    <Alert
                      message=""
                      description="To ensure that the verification goes successfully, make sure that you have made all the changes as suggested by the classification team."
                      type="warning"
                      showIcon
                      icon={<ExclamationCircleFilled />}
                      style={{ marginBottom: '24px' }}
                    />

                    <Card
                      title={<h3 style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Send for verification</h3>}
                      bordered={false}
                      style={{ marginBottom: '1rem' }}
                    >
                      <Paragraph>
                        There are changes to the profile which needs to be verified by the classifications team.
                      </Paragraph>
                      <Form.Item name="comments">
                        <label htmlFor="comments" style={{ display: 'block', marginBottom: '0.5rem' }}>
                          <b>Comments</b>
                        </label>
                        <>
                          <Input.TextArea
                            id="comments"
                            data-testid="comments-input"
                            autoSize
                            maxLength={1000}
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add comments"
                          />
                          <Row>
                            <Col span={18}>
                              <Typography.Paragraph type="secondary" style={{ margin: '0' }}>
                                (Optional) Add some context related to changes you made. This will help the reviewer
                                assess your edits.
                              </Typography.Paragraph>
                            </Col>
                            <Col span={6} style={{ textAlign: 'right' }}>
                              <Typography.Paragraph
                                type="secondary"
                                style={{ textAlign: 'right', width: '100%', margin: '0' }}
                              >
                                {comment.length} / 1000
                              </Typography.Paragraph>
                            </Col>
                          </Row>

                          <CommentsList positionRequestId={positionRequestId ?? -1} />
                        </>
                      </Form.Item>
                      <Button type="primary" onClick={handleOk} loading={submitPositionRequestIsLoading || isLoading}>
                        Re-submit for verification
                      </Button>
                    </Card>

                    <Card
                      title={<h3 style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Other actions</h3>}
                      bordered={false}
                    >
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

                      <Title level={4}>View all Positions</Title>
                      <Paragraph>View all positions that you have created.</Paragraph>
                      <Button type="default" onClick={() => navigate('/')}>
                        Go to Dashboard
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </ContentWrapper>
            )}

            {mode === 'classificationReviewRequired' && (
              <ContentWrapper>
                <Result
                  icon={<WarningFilled />}
                  title="Classification review required"
                  status="warning"
                  subTitle="A member of the classification team will reach out to you via email shortly."
                />

                <Row justify="center" style={{ padding: '0 1rem' }}>
                  <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
                    <Alert
                      message="The initial verification has indicated your request requires a classification review. To send for a classification review click below. A Classification Specialist will then reach out shortly via email."
                      type="warning"
                      showIcon
                      icon={<ExclamationCircleFilled />}
                      style={{ marginBottom: '24px' }}
                    />
                    {/* 
                    <Card
                      title={<h3 style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Send for verification</h3>}
                      bordered={false}
                      style={{ marginBottom: '1rem' }}
                    >
                      <Paragraph>
                        There are changes to the profile which needs to be reviewed by a specialist in the
                        classifications team.
                      </Paragraph>
                      <Button type="primary" onClick={handleOk} loading={submitPositionRequestIsLoading}>
                        Send for classification review
                      </Button>
                    </Card> */}

                    <Card
                      title={<h3 style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Other actions</h3>}
                      bordered={false}
                    >
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

                      <Title level={4}>View all Positions</Title>
                      <Paragraph>View all positions that you have created.</Paragraph>
                      <Button type="default" onClick={() => navigate('/')}>
                        Go to Dashboard
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </ContentWrapper>
            )}

            <Modal
              title={<div style={{ fontWeight: 600, fontSize: '16px' }}>Affirmation</div>}
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleOk}
                  disabled={!confirmation}
                  loading={submitPositionRequestIsLoading || isLoading}
                  data-testid="confirm-modal-ok"
                >
                  Generate position number
                </Button>,
              ]}
            >
              <Divider></Divider>
              <b>Confirmation</b>
              <div style={{ paddingBottom: '10px' }}>
                <Row>
                  <Col span={2}>
                    <Switch
                      size="small"
                      aria-labelledby="confirmation-label-id"
                      data-testid="confirmation-switch"
                      checked={confirmation}
                      onChange={(newValue: boolean | ((prevState: boolean) => boolean)) => {
                        setConfirmation(newValue);
                      }}
                    />
                  </Col>
                  <Col span={22}>
                    <span id="confirmation-label-id">
                      I confirm that I have received executive approval (Deputy Minister or delegate) for this new
                      position.
                    </span>
                  </Col>
                </Row>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div>
                  <b>By clicking “Generate position number” I affirm that:</b>
                  <ul>
                    <li>
                      I confirm this Statement of Job Responsibilities accurately reflects the actual work to be
                      performed of the position(s) as outlined in{' '}
                      <a
                        target="_blank"
                        href="https://www2.gov.bc.ca/assets/gov/careers/managers-supervisors/managing-employee-labour-relations/hr-policy-pdf-documents/06_job_evaluation_policy.pdf"
                      >
                        Human Resources Policy 06 – Job Evaluation
                      </a>
                      , and
                    </li>
                    <li>
                      I confirm the accountabilities are not similar to the supervisor, peer, or management positions
                      within the work unit, and
                    </li>
                    <li>
                      As the excluded manager or delegate, I confirm the job role, accountabilities, and scope of
                      responsibility are true and accurate, and in establishing this position (s), I confirm the content
                      I assume all risks related to this decision.{' '}
                    </li>
                    <li>I will respond to audits in a timely manner.</li>
                    <li>
                      I will abide by the Public Service Act and all Human Resources policies for hiring decisions
                      related to this position.
                    </li>
                  </ul>
                </div>
              </div>
            </Modal>

            <Modal
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px', fontSize: '22px' }} />
                  <span>Submit for verification?</span>
                </div>
              }
              open={isVerificationModalVisible}
              onOk={handleOk}
              onCancel={handleVerificationCancel}
              footer={[
                <Button key="back" onClick={handleVerificationCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => {
                    setIsVerificationModalVisible(false);
                    handleOk();
                  }}
                  loading={submitPositionRequestIsLoading || isLoading}
                  data-testid="confirm-modal-ok"
                >
                  Submit for verification
                </Button>,
              ]}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div>
                  Once submitted, you won’t be able to cancel the request from the job store. Are you sure you wish to
                  proceed?
                </div>
              </div>
            </Modal>
          </div>
        </WizardPageWrapper>
      </div>
    </>
  );
};
