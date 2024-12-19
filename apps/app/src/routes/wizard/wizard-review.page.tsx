import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyGetJobProfileQuery } from '../../redux/services/graphql-api/job-profile.api';
import {
  GetPositionRequestResponseContent,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { JobProfileWithDiff } from '../classification-tasks/components/job-profile-with-diff.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import OtherDetails from './components/other-details.component';
import WizardContentWrapper from './components/wizard-content-wrapper';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';
import { WizardContextMenu } from './wizard-context-menu';

interface WizardReviewPageProps {
  onNext?: () => void;
  onBack?: () => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
}

export const WizardReviewPage: React.FC<WizardReviewPageProps> = ({
  onNext,
  onBack,
  disableBlockingAndNavigateHome,
  positionRequest,
  setCurrentStep,
}) => {
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  // todo: move this to a context
  const [triggerGetJobProfile, { data: originalProfileData }] = useLazyGetJobProfileQuery();
  const { positionRequestId, wizardData, positionRequestData, setPositionRequestData } = useWizardContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!positionRequestData?.parent_job_profile_id && !positionRequestData?.parent_job_profile_version) return;
    triggerGetJobProfile({
      id: positionRequestData?.parent_job_profile_id,
      version: positionRequestData?.parent_job_profile_version,
    });
  }, [triggerGetJobProfile, positionRequestData]);

  const onNextCallback = async () => {
    setIsLoading(true);
    try {
      if (positionRequestId) {
        const resp = await updatePositionRequest({
          id: positionRequestId,
          step: 5,

          // increment max step only if it's not incremented
          ...(positionRequest?.max_step_completed != 5 ? { max_step_completed: 5 } : {}),
          returnFullObject: true,
        }).unwrap();
        setPositionRequestData(resp.updatePositionRequest ?? null);
        if (onNext) onNext();
        // navigate('/wizard/confirm');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onBackCallback = async () => {
    if (positionRequestId) {
      await updatePositionRequest({ id: positionRequestId, step: 3 }).unwrap();
      if (onBack) onBack();
    }
    // navigate(-1);
  };

  const switchStep = async (step: number) => {
    setCurrentStep(step);
    if (positionRequestId)
      await updatePositionRequest({
        id: positionRequestId,
        step: step,
      });
  };

  return (
    <div data-testid="review-changes-page">
      <WizardPageWrapper
        // title="Edit profile" subTitle="You may now edit the profile." xxl={20} xl={20} lg={20}

        title={
          <div>
            <Link to="/" aria-label="Go to dashboard">
              <ArrowLeftOutlined aria-hidden style={{ color: 'black', marginRight: '1rem' }} />
            </Link>
            {positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position'}
          </div>
        }
        subTitle={
          <div data-testid="review-step-subtitle">
            View the edits you've made to the generic profile. Review to make sure it meets your requirements.
          </div>
        }
        additionalBreadcrumb={{
          title:
            positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position',
        }}
        hpad={false}
        grayBg={false}
        pageHeaderExtra={[
          <div style={{ marginRight: '1rem' }} key="statusIndicator">
            <StatusIndicator status={positionRequest?.status ?? ''} />
          </div>,
          <WizardContextMenu
            positionRequestId={positionRequestId}
            onSaveAndQuit={disableBlockingAndNavigateHome}
            onNavigateHome={disableBlockingAndNavigateHome}
            shareableLink={positionRequest?.shareUUID}
            positionRequestStatus={positionRequest?.status}
          />,
          <Button onClick={onBackCallback} key="back" data-testid="back-button">
            Back
          </Button>,
          <Button key="next" type="primary" onClick={onNextCallback} data-testid="next-button" loading={isLoading}>
            Save and next
          </Button>,
        ]}
      >
        <WizardSteps
          onStepClick={switchStep}
          current={4}
          maxStepCompleted={positionRequest?.max_step_completed}
        ></WizardSteps>

        <WizardContentWrapper>
          <div style={{ paddingTop: '24px' }}>
            <JobProfileWithDiff
              positionRequestData={{ positionRequest: positionRequestData }}
              showBasicInfo={false}
              controlBarStyle={{ background: 'white' }}
              rowProps={{ justify: 'center' }}
              colProps={{ sm: 24, md: 24, lg: 24, xxl: 18 }}
            />
          </div>
          <Row {...{ justify: 'center' }}>
            <Col {...{ sm: 24, md: 24, lg: 24, xxl: 18 }}>
              <OtherDetails
                wizardData={wizardData}
                positionRequestData={positionRequestData}
                originalProfileData={originalProfileData}
              ></OtherDetails>
            </Col>
          </Row>
        </WizardContentWrapper>
      </WizardPageWrapper>
    </div>
  );
};
