import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Modal, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AcessiblePopoverMenu from '../../components/app/common/components/accessible-popover-menu';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { JobProfileWithDiff } from '../classification-tasks/components/job-profile-with-diff.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';

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
  const { positionRequestId, positionRequestData, setPositionRequestData } = useWizardContext();
  const [isLoading, setIsLoading] = useState(false);

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

  // const collapseRef = useRef<HTMLDivElement>(null);

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
      </Menu>
    );
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
          <div style={{ marginRight: '1rem' }}>
            <StatusIndicator status={positionRequest?.status ?? ''} />
          </div>,
          <AcessiblePopoverMenu
            triggerButton={<Button tabIndex={-1} icon={<EllipsisOutlined />}></Button>}
            content={getMenuContent()}
            ariaLabel="Open position request menu"
          ></AcessiblePopoverMenu>,
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
          <JobProfileWithDiff
            positionRequestData={{ positionRequest: positionRequestData }}
            showBasicInfo={false}
            controlBarStyle={{ background: 'white' }}
            rowProps={{ justify: 'center' }}
            colProps={{ sm: 24, md: 24, lg: 24, xxl: 18 }}
          />
        </div>
      </WizardPageWrapper>
    </div>
  );
};
