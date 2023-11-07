import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import JobProfiles from '../job-profiles/components/job-profiles.component';
import WizardControls from './components/wizard-controls.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';

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

  return (
    <WizardPageWrapper title="Choose a job profile" subTitle="Choose a job profile to modify for the new positions">
      <WizardSteps current={0}></WizardSteps>
      <JobProfiles searchParams={searchParams} onSelectProfile={setSelectedProfileId} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <WizardControls submitText={'Next'} showBackButton={false} />
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div></div>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div> */}
      </form>
    </WizardPageWrapper>
  );
};
