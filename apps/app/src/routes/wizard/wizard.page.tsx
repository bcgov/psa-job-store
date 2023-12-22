import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import JobProfiles from '../job-profiles/components/job-profiles.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';

interface IFormInput {
  firstName: string;
  lastName: string;
}

export const WizardPage = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<IFormInput>();
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = () => {
    if (selectedProfileId) {
      navigate(`/wizard/edit/${selectedProfileId}`);
    } else {
      // Here you can display an error message.
      alert('Please select a profile before proceeding.');
    }
  };

  const [searchParams] = useSearchParams();

  // Ensure form alerts get displayed again
  const { setReqAlertShown, setOriginalValuesSet, setMinReqAlertShown, setWizardData } = useWizardContext();

  setMinReqAlertShown(false);
  setReqAlertShown(false);

  setOriginalValuesSet(false); // ensures original values get re-set once user navigates to edit page
  setWizardData(null); // this ensures that any previous edits are cleared

  return (
    <WizardPageWrapper
      title="Choose a job profile"
      subTitle="Choose a job profile to modify for the new positions"
      hpad={false}
    >
      <WizardSteps current={0}></WizardSteps>
      <JobProfiles
        searchParams={searchParams}
        onSelectProfile={setSelectedProfileId}
        onUseProfile={handleSubmit(onSubmit)}
      />

      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <WizardControls submitText={'Next'} showBackButton={false} />
      </form> */}
    </WizardPageWrapper>
  );
};
