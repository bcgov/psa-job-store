import { Collapse } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditControlBar from './components/wizard-edit-control-bar';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';
import './wizard-review.page.css';

export const WizardReviewPage = () => {
  const navigate = useNavigate();

  const onNext = async () => {
    navigate('/wizard/confirm');
  };

  const { wizardData } = useWizardContext();
  const onBack = () => {
    navigate(-1);
  };

  const [showDiff, setShowDiff] = useState(true);

  const handleToggleShowDiff = (checked: boolean) => {
    setShowDiff(checked);
  };

  const diffLegendContent = (
    <>
      <p>
        <b>Changes legend:</b>
      </p>
      <p style={{ marginBottom: '-12px;' }}>
        <span style={{ textDecoration: 'line-through' }}>Strikethrough</span> means removed text.<br></br>
        <span style={{ backgroundColor: 'yellow' }}>Highlighted text</span> means added text.
      </p>
    </>
  );

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

  const collapseRef = useRef<HTMLDivElement>(null);

  return (
    <WizardPageWrapper
      title="Review and submit"
      subTitle="Review the profile before creating a new position"
      xxl={14}
      xl={18}
    >
      <WizardSteps current={2} xl={24}></WizardSteps>
      <WizardEditControlBar
        onNext={onNext}
        onBack={onBack}
        onToggleShowDiff={handleToggleShowDiff}
        showDiffToggle={true}
        showDiff={showDiff}
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
        profileData={wizardData}
        showBackToResults={false}
        showDiff={showDiff}
        id={wizardData?.id.toString()}
      />
    </WizardPageWrapper>
  );
};
