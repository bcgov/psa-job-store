import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Col, Menu, Modal, Popover, Row, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditControlBar from './components/wizard-edit-control-bar';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';
import './wizard-review.page.css';

interface WizardReviewPageProps {
  onNext?: () => void;
  onBack?: () => void;
  disableBlockingAndNavigateHome: () => void;
}

export const WizardReviewPage: React.FC<WizardReviewPageProps> = ({
  onNext,
  onBack,
  disableBlockingAndNavigateHome,
}) => {
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { wizardData, positionRequestId } = useWizardContext();

  const onNextCallback = async () => {
    try {
      if (positionRequestId) {
        await updatePositionRequest({ id: positionRequestId, step: 4 }).unwrap();
        if (onNext) onNext();
        // navigate('/wizard/confirm');
      }
    } catch (error) {
      // Handle the error, possibly showing another modal
      Modal.error({
        title: 'Error updating position request',
        content: 'An unknown error occurred', //error.data?.message ||
      });
    }
  };

  const onBackCallback = async () => {
    if (positionRequestId) {
      await updatePositionRequest({ id: positionRequestId, step: 2 }).unwrap();
      if (onBack) onBack();
    }
    // navigate(-1);
  };

  const [showDiff, setShowDiff] = useState(true);

  const handleToggleShowDiff = (checked: boolean) => {
    setShowDiff(checked);
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

  return (
    <div data-testid="review-changes-page">
      <WizardPageWrapper
        // title="Edit profile" subTitle="You may now edit the profile." xxl={20} xl={20} lg={20}

        title={
          <div>
            <Link to="/">
              <ArrowLeftOutlined style={{ color: 'black', marginRight: '1rem' }} />
            </Link>
            New position
          </div>
        }
        subTitle={
          <div data-testid="review-step-subtitle">
            View the edits you've made to the generic profile. Review to make sure it meets your requirements.
          </div>
        }
        additionalBreadcrumb={{ title: 'New position' }}
        // subTitle="Choose a job profile to modify for the new positions"
        hpad={false}
        grayBg={false}
        pageHeaderExtra={[
          <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
            <Button icon={<EllipsisOutlined />}></Button>
          </Popover>,
          <Button onClick={onBackCallback} key="back">
            Back
          </Button>,
          <Button key="next" type="primary" onClick={onNextCallback} data-testid="next-button">
            Save and next
          </Button>,
        ]}
      >
        <WizardSteps current={3}></WizardSteps>

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
          <Row justify="center" gutter={16}>
            <Col sm={24} md={24} lg={24} xxl={18}>
              <Card bodyStyle={{ padding: '0' }}>
                <WizardEditControlBar
                  style={{ background: 'white' }}
                  onToggleShowDiff={handleToggleShowDiff}
                  showDiffToggle={true}
                  showDiff={showDiff}
                  showNext={false}
                />
              </Card>

              {/* <Collapse
        ref={collapseRef}
        bordered={false}
        ghost
        activeKey={showDiff ? ['1'] : []} // Control the active key based on showDiff
        className={hasScrolledPast ? 'no-animation' : ''}
      >
        <Collapse.Panel key="1" showArrow={false} header="">
          {diffLegendContent}
        </Collapse.Panel>
      </Collapse> */}
              <JobProfile
                style={{ marginTop: '1rem' }}
                profileData={wizardData}
                showBackToResults={false}
                showDiff={showDiff}
                id={wizardData?.id.toString()}
                showBasicInfo={false}
              />
            </Col>
          </Row>
        </div>
      </WizardPageWrapper>
    </div>
  );
};
