import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditControlBar from './components/wizard-edit-control-bar';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';

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
        style={{ marginBottom: '1rem' }}
      />
      <JobProfile
        profileData={wizardData}
        showBackToResults={false}
        showDiff={showDiff}
        id={wizardData?.id.toString()}
      />
    </WizardPageWrapper>
  );
};
