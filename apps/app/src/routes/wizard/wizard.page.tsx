import { Button } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import JobProfiles from '../job-profiles/components/job-profiles.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';

interface IFormInput {
  firstName: string;
  lastName: string;
}

export const WizardPage = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = () => {
    navigate('/wizard/edit');
  };

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  return (
    <WizardPageWrapper title="Choose a job profile" subTitle="Choose a job profile to modify for the new positions">
      <WizardSteps current={0}></WizardSteps>
      <JobProfiles searchQuery={searchQuery} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div></div>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </form>
    </WizardPageWrapper>
  );
};
