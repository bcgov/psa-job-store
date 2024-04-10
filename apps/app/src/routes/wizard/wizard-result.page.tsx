/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  WarningFilled,
} from '@ant-design/icons';
import { Alert, Button, Card, Col, Form, Input, Menu, Modal, Popover, Result, Row, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useGetPositionRequestQuery,
  usePositionNeedsRivewQuery,
  useSubmitPositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';

interface WizardResultPageProps {
  onBack?: () => void;
  setStep?: (step: number) => void;
  switchParentMode?: (mode: string) => void;
  switchParentReadonlyMode?: (mode: string) => void;
  setReadOnlySelectedTab?: (tab: string) => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
}

export const WizardResultPage: React.FC<WizardResultPageProps> = ({
  onBack,
  setStep,
  switchParentMode,
  switchParentReadonlyMode,
  setReadOnlySelectedTab,
  disableBlockingAndNavigateHome,
  positionRequest,
}) => {
  // let mode = 'readyToCreatePositionNumber';
  // mode = 'verificationRequired_edits'; // verification is needed because user made edits to significant sections
  // mode = 'verificationRequired_retry'; // verification is needed because classifications team requested changes
  // mode = 'classificationReviewRequired'; // classification review is needed

  // mode = 'readyToCreatePositionNumber';

  // use a state for "mode"

  const [mode, setMode] = useState('');
  const [verificationNeededReasons, setVerificationNeededReasons] = useState<string[]>([]);
  const { positionRequestId } = useWizardContext();

  const {
    data: positionRequestData,
    isLoading: positionRequestLoading,
    // isError: positionRequestLoadingError,
    refetch: refetchPositionRequest,
    isFetching: isFetchingPositionRequest,
  } = useGetPositionRequestQuery({
    id: positionRequestId ?? -1,
  });

  const {
    data: positionNeedsRivew,
    isLoading: positionNeedsRivewLoading,
    // isError: positionNeedsRivewError,
    refetch: refetchPositionNeedsRivew,
    isFetching: isFetchingPositionNeedsRivew,
  } = usePositionNeedsRivewQuery({
    id: positionRequestId ?? -1,
  });

  useEffect(() => {
    // Fetch position request and needs review data when positionRequestId changes
    if (positionRequestId) {
      refetchPositionRequest();
      refetchPositionNeedsRivew();
    }
  }, [positionRequestId, refetchPositionRequest, refetchPositionNeedsRivew]);

  useEffect(() => {
    // if loading
    if (positionRequestLoading || positionNeedsRivewLoading) return;

    // load comment if prevsiously entered
    if (positionRequestData?.positionRequest?.additional_info_comments) {
      setComment(positionRequestData.positionRequest.additional_info_comments);
    }

    // if state is draft and position doesn't need review, set mode to readyToCreatePositionNumber
    if (positionRequestData?.positionRequest?.status === 'DRAFT' && !positionNeedsRivew?.positionNeedsRivew.result) {
      setMode('readyToCreatePositionNumber');
      return;
    }

    // if state is draft and position needs review, set mode to verificationRequired_edits
    // Will show a warning message and a links that take user to the sections that if changes will not require verification
    if (positionRequestData?.positionRequest?.status === 'DRAFT' && positionNeedsRivew?.positionNeedsRivew.result) {
      setVerificationNeededReasons(positionNeedsRivew.positionNeedsRivew.reasons);
      setMode('verificationRequired_edits');
      return;
    }

    // if state is COMPLETE, then set parent to readonly mode
    // Will show "Your position has been created" screen
    if (positionRequestData?.positionRequest?.status === 'COMPLETED') {
      switchParentMode && switchParentMode('readonly');
      switchParentReadonlyMode && switchParentReadonlyMode('completed');
      setReadOnlySelectedTab && setReadOnlySelectedTab('4');
      return;
    }

    // if it's in IN_REVIEW;, set mode to sentForVerification
    if (positionRequestData?.positionRequest?.status === 'IN_REVIEW') {
      switchParentMode && switchParentMode('readonly');
      switchParentReadonlyMode && switchParentReadonlyMode('sentForVerification');
      setReadOnlySelectedTab && setReadOnlySelectedTab('4');
      return;
    }

    // if it's in ACTION_REQUIRED show alternate verification required screen
    if (positionRequestData?.positionRequest?.status === 'ACTION_REQUIRED') {
      setMode('verificationRequired_retry');
      return;
    }

    // if it's in ESCALATED status, show "classification review required" screen
    if (positionRequestData?.positionRequest?.status === 'ESCALATED') {
      setMode('classificationReviewRequired');
      return;
    }
  }, [
    positionNeedsRivew,
    positionRequestData,
    positionRequestLoading,
    positionNeedsRivewLoading,
    switchParentMode,
    switchParentReadonlyMode,
    setReadOnlySelectedTab,
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const [submitPositionRequest, { isLoading: submitPositionRequestIsLoading }] = useSubmitPositionRequestMutation();

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

    try {
      if (positionRequestId) {
        // await updatePositionRequest({
        //   id: positionRequestId,
        //   status: 'COMPLETE',
        //   step: 6,
        // }).unwrap();

        const result = await submitPositionRequest({
          id: positionRequestId,
          comment: comment,
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
        } else if (result?.submitPositionRequest.status === 'IN_REVIEW') {
          switchParentMode && switchParentMode('readonly');
          switchParentReadonlyMode && switchParentReadonlyMode('sentForVerification');
          setReadOnlySelectedTab && setReadOnlySelectedTab('4');
        }
      } else {
        throw Error('Position request not found');
      }
    } catch (error) {
      console.log('submitPositionRequest error: ', error);
      // Handle the error, possibly showing another modal
      // Modal.error({
      //   title: 'Error Creating Position',
      //   content: 'An unknown error occurred', //error.data?.message ||
      // });
    }
  };

  const navigate = useNavigate();

  const back = () => {
    onBack && onBack();
  };

  const handleVerificationClick = () => {
    setStep && setStep(2);
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
      <Menu>
        <Menu.Item key="save" onClick={disableBlockingAndNavigateHome}>
          <div style={{ padding: '5px 0' }}>
            Save and quit
            <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
              Saves your progress. You can access this position request from the 'My Positions' page.
            </Typography.Text>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.ItemGroup key="others" title={<b>Others</b>}>
          <Menu.Item key="delete" onClick={deleteRequest}>
            <div style={{ padding: '5px 0' }}>
              Delete
              <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                Removes this position request from 'My Positions'. This action is irreversible.
              </Typography.Text>
            </div>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  };

  const [comment, setComment] = useState('');

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  if (positionRequestLoading || positionNeedsRivewLoading || isFetchingPositionNeedsRivew || isFetchingPositionRequest)
    return <LoadingSpinnerWithMessage />;

  return (
    <>
      {/* <WizardPageWrapper
        title="Result"
        subTitle="Find out the result of your request"
        pageHeaderExtra={[
          <Button key="back" onClick={back}>
            Back
          </Button>,
        ]}
        grayBg={true}
      >
        <div style={{ background: 'white', margin: '0 -16px', padding: '10px 24px' }}>
          <Row justify="center" style={{ padding: '0 1rem' }}>
            <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
              <div style={{ background: 'white' }}>
                <WizardSteps current={5} xl={24}></WizardSteps>
              </div>
            </Col>
          </Row>
        </div> */}

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
            <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
              <Button icon={<EllipsisOutlined />}></Button>
            </Popover>,
            <Button onClick={back} key="back" data-testid="back-button">
              Back
            </Button>,
          ]}
        >
          <WizardSteps current={5}></WizardSteps>

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
                      description="You have completed your profile. At this point, it is saved as draft. You may ask others to review by sending them a link, or you may proceed to generating a position number. If there have been changes to significant accountabilities, we will seamlessly create a position review for classification and exclusion services."
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
                          loading={submitPositionRequestIsLoading}
                          data-testid="generate-position-button"
                        >
                          Generate position number
                        </Button>
                      </Form>
                    </Card>

                    <Card title="Other actions" bordered={false} style={{ marginTop: '1rem' }}>
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

                      <Title level={5}>View all Positions</Title>
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
                    <Alert
                      data-testid="verification-warning-message"
                      message=""
                      description={
                        <span>
                          Some of your amendments to the generic profile require verification. If you would like to
                          revisit some of your amendments, please click these links:
                          {/* loop over reasons */}
                          <ul style={{ marginTop: '1rem' }} data-testid="edit-form-link">
                            {verificationNeededReasons.map((reason, index) => (
                              <li key={index}>
                                <a onClick={() => handleVerificationClick()}>{reason}</a>
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

                    <Card title="Send for verification" bordered={false} style={{ marginBottom: '1rem' }}>
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
                        onClick={handleOk}
                        loading={submitPositionRequestIsLoading}
                        data-testid="submit-for-verification-button"
                      >
                        Submit for verification
                      </Button>
                    </Card>

                    <Card title="Other Actions" bordered={false}>
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

                    <Card title="Send for verification" bordered={false} style={{ marginBottom: '1rem' }}>
                      <Paragraph>
                        There are changes to the profile which needs to be verified by the classifications team.
                      </Paragraph>
                      <Button type="primary" onClick={handleOk} loading={submitPositionRequestIsLoading}>
                        Submit for verification
                      </Button>
                    </Card>

                    <Card title="Other Actions" bordered={false}>
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

                    <Card title="Send for verification" bordered={false} style={{ marginBottom: '1rem' }}>
                      <Paragraph>
                        There are changes to the profile which needs to be reviewed by a specialist in the
                        classifications team.
                      </Paragraph>
                      <Button type="primary" onClick={handleOk} loading={submitPositionRequestIsLoading}>
                        Send for classification review
                      </Button>
                    </Card>

                    <Card title="Other Actions" bordered={false}>
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
              </ContentWrapper>
            )}

            <Modal
              title="Affirmation"
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
                  loading={submitPositionRequestIsLoading}
                  data-testid="confirm-modal-ok"
                >
                  Generate position number
                </Button>,
              ]}
            >
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
          </div>
        </WizardPageWrapper>
      </div>
    </>
  );
};
