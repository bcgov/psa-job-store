import { CheckCircleOutlined, ExclamationCircleFilled, WarningFilled } from '@ant-design/icons';
import { Alert, Button, Card, Col, Form, Modal, Result, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import { useUpdatePositionRequestMutation } from '../../redux/services/graphql-api/position-request.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';

export const WizardResultPage = () => {
  let mode = 'readyToCreatePositionNumber';
  mode = 'verificationRequired_edits'; // verification is needed because user made edits to significant sections
  mode = 'verificationRequired_retry'; // verification is needed because classifications team requested changes
  mode = 'classificationReviewRequired'; // classification review is needed

  mode = 'readyToCreatePositionNumber';

  const { positionRequestId } = useWizardContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatePositionRequest] = useUpdatePositionRequestMutation();

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
        await updatePositionRequest({
          id: positionRequestId,
          status: 'COMPLETE',
          step: 6,
        }).unwrap();
      } else {
        throw Error('Position request not found');
      }
    } catch (error) {
      // Handle the error, possibly showing another modal
      Modal.error({
        title: 'Error Creating Position',
        content: 'An unknown error occurred', //error.data?.message ||
      });
    }
  };

  const navigate = useNavigate();

  const handleSendForReview = async () => {};

  return (
    <>
      <PageHeader title="Result" subTitle="Find out the result of your request" />

      <Row justify="center" style={{ padding: '0 1rem' }}>
        <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
          <div style={{ background: 'white' }}>
            <WizardSteps current={5} xl={24}></WizardSteps>
          </div>
        </Col>
      </Row>

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
                  <Button type="primary" onClick={showModal}>
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
        <ContentWrapper>
          <Result icon={<WarningFilled />} title="Verification required" status="warning" />

          <Row justify="center" style={{ padding: '0 1rem' }}>
            <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
              <Alert
                message=""
                description="Some of your amendments to the generic profile require verification. If you would like to revisit some of your amendments, please click these links: Accountabilities, Job requirements."
                type="warning"
                showIcon
                icon={<ExclamationCircleFilled />}
                style={{ marginBottom: '24px' }}
              />

              <Card title="Send for verification" bordered={false} style={{ marginBottom: '1rem' }}>
                <Paragraph>
                  Forward the profile to be verified by the classifications team. We will respond shortly after
                  verification, once submitted. There are no other steps required, just look for our followup response.
                </Paragraph>
                <Button type="primary" onClick={handleSendForReview}>
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
                <Button type="primary" onClick={handleSendForReview}>
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
                  There are changes to the profile which needs to be reviewed by a specialist in the classifications
                  team.
                </Paragraph>
                <Button type="primary" onClick={handleSendForReview}>
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
          <Button key="submit" type="primary" onClick={handleOk}>
            Generate position number
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <b>By clicking “Generate position number” I affirm that:</b>
            <ul>
              <li>
                I confirm this Statement of Job Responsibilities accurately reflects the actual work to be performed of
                the position(s) as outlined in{' '}
                <a
                  target="_blank"
                  href="https://www2.gov.bc.ca/assets/gov/careers/managers-supervisors/managing-employee-labour-relations/hr-policy-pdf-documents/06_job_evaluation_policy.pdf"
                >
                  Human Resources Policy 06 – Job Evaluation
                </a>
                , and
              </li>
              <li>
                I confirm the accountabilities are not similar to the supervisor, peer, or management positions within
                the work unit, and
              </li>
              <li>
                As the excluded manager or delegate, I confirm the job role, accountabilities, and scope of
                responsibility are true and accurate, and in establishing this position (s), I confirm the content I
                assume all risks related to this decision.{' '}
              </li>
              <li>I will respond to audits in a timely manner.</li>
              <li>
                I will abide by the Public Service Act and all Human Resources policies for hiring decisions related to
                this position.
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};
