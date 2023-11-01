import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';

export const WizardEditPage = () => {
  const navigate = useNavigate();

  const { setWizardData } = useWizardContext();

  const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
    setWizardData(data);
    navigate('/wizard/review');
  };

  const { profileId } = useParams();

  return (
    <WizardPageWrapper title="Edit profile" subTitle="Make changes to an approved job profile (optional)">
      <WizardSteps current={1}></WizardSteps>
      <JobProfile
        id={profileId}
        config={{ isEditable: true }}
        submitText="Review Profile"
        submitHandler={onSubmit}
        showBackButton={true}
      />
    </WizardPageWrapper>
  );
};
