import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';

export const WizardEditPage = () => {
  const navigate = useNavigate();
  // const { handleSubmit } = useForm();

  const { setWizardData } = useWizardContext();

  const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
    console.log('edit on submit: ', data);
    setWizardData(data);
    navigate('/wizard/review');
  };

  // const handleBackClick = () => {
  //   navigate(-1);
  // };

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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button onClick={handleBackClick}>Go Back</Button>
          <Button type="primary" htmlType="submit">
            Review Profile
          </Button>
        </div>
      </form> */}
    </WizardPageWrapper>
  );
};
