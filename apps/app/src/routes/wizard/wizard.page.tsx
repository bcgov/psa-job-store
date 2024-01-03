import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { useUpdatePositionRequestMutation } from '../../redux/services/graphql-api/position-request.api';
import JobProfiles from '../job-profiles/components/job-profiles.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';

interface IFormInput {
  firstName: string;
  lastName: string;
}

interface WizardPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const WizardPage: React.FC<WizardPageProps> = ({ onNext }) => {
  const { id } = useParams();
  const { handleSubmit } = useForm<IFormInput>();
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { positionRequestId } = useWizardContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setPositionRequestProfileId } = useWizardContext();

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    if (selectedProfileId) {
      // navigate(`/wizard/edit/${selectedProfileId}`);
      if (positionRequestId)
        await updatePositionRequest({
          id: positionRequestId,
          step: 2,
          profile_json: null,
          parent_job_profile: { connect: { id: parseInt(selectedProfileId) } },
        }).unwrap();
      setPositionRequestProfileId(parseInt(selectedProfileId));
      if (onNext) onNext();
      setSearchParams({});
      // navigate(`/org-chart/${reportingPosition}/profiles/edit/${selectedProfileId}`);
    } else {
      // Here you can display an error message.
      alert('Please select a profile before proceeding.');
    }
  };

  useEffect(() => {
    if (id) {
      setSelectedProfileId(id);
    }
  }, [id]);

  useEffect(() => {
    const selectedProfile = searchParams.get('selectedProfile');
    if (selectedProfile) {
      setSelectedProfileId(selectedProfile);
    }
  }, [searchParams]);

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
      <WizardSteps current={1}></WizardSteps>
      <JobProfiles
        searchParams={searchParams}
        onSelectProfile={setSelectedProfileId}
        onUseProfile={handleSubmit(onSubmit)}
      />
    </WizardPageWrapper>
  );
};
