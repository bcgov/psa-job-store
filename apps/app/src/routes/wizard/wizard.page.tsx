import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { JobProfileModel } from '../../redux/services/graphql-api/job-profile-types';
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

export const WizardPage: React.FC<WizardPageProps> = ({ onNext, onBack }) => {
  // const { id } = useParams();
  const { handleSubmit } = useForm<IFormInput>();
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedClassificationId, setSelectedClassificationId] = useState<string | undefined>();

  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { positionRequestId } = useWizardContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setPositionRequestProfileId } = useWizardContext();

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    // we are on the second step of the process (user already selected a position on org chart and is no selecting a profile)
    if (selectedProfileId) {
      // navigate(`/wizard/edit/${selectedProfileId}`);
      if (positionRequestId)
        await updatePositionRequest({
          id: positionRequestId,
          step: 2,
          profile_json: null,
          parent_job_profile: { connect: { id: parseInt(selectedProfileId) } },
          classification_id: selectedClassificationId,
        }).unwrap();
      setPositionRequestProfileId(parseInt(selectedProfileId));
      if (onNext) onNext();
      setSearchParams({}, { replace: true });
      // navigate(`/org-chart/${reportingPosition}/profiles/edit/${selectedProfileId}`);
    } else {
      // Here you can display an error message.
      alert('Please select a profile before proceeding.');
    }
  };

  // useEffect(() => {
  //   if (id) {
  //     setSelectedProfileId(id);
  //   }
  // }, [id]); // picks up profile id from params

  useEffect(() => {
    const selectedProfile = searchParams.get('selectedProfile');
    if (selectedProfile) {
      setSelectedProfileId(selectedProfile);
    } else {
      setSelectedProfileId(null);
    }
  }, [searchParams]); // picks up profile id from search params

  // Ensure form alerts get displayed again
  const { setReqAlertShown, setOriginalValuesSet, setMinReqAlertShown, setWizardData } = useWizardContext();

  setMinReqAlertShown(false);
  setReqAlertShown(false);

  setOriginalValuesSet(false); // ensures original values get re-set once user navigates to edit page
  setWizardData(null); // this ensures that any previous edits are cleared

  const back = async () => {
    if (positionRequestId)
      await updatePositionRequest({
        id: positionRequestId,
        step: 0,
      }).unwrap();
    if (onBack) onBack();
  };

  const onSelectProfile = (profile: JobProfileModel) => {
    setSelectedProfileId(profile.id.toString());
    if (profile?.classifications != null) setSelectedClassificationId(profile?.classifications[0].classification.id);
  };

  return (
    <WizardPageWrapper
      title="Choose a job profile"
      subTitle="Choose a job profile to modify for the new positions"
      hpad={false}
      pageHeaderExtra={[
        <Button key="back" onClick={back}>
          Back
        </Button>,
        <Button key="next" type="primary" disabled={selectedProfileId == null} onClick={handleSubmit(onSubmit)}>
          Select and next
        </Button>,
      ]}
    >
      <WizardSteps current={1}></WizardSteps>
      <JobProfiles
        searchParams={searchParams}
        onSelectProfile={onSelectProfile}
        onUseProfile={handleSubmit(onSubmit)}
      />
    </WizardPageWrapper>
  );
};
