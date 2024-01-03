import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import { OrgChartPage } from '../org-chart/org-chart.page';
import { useWizardContext } from './components/wizard.provider';
import { WizardConfirmDetailsPage } from './wizard-confirm-details.page';
import { WizardEditPage } from './wizard-edit.page';
import { WizardResultPage } from './wizard-result.page';
import { WizardReviewPage } from './wizard-review.page';
import { WizardPage } from './wizard.page';

export const PositionRequestPage = () => {
  const { setWizardData, setPositionRequestId, setPositionRequestProfileId } = useWizardContext();
  // console.log('wizardData: ', wizardData);
  const { positionRequestId } = useParams();

  if (!positionRequestId) throw 'No position request provided';

  const { data } = useGetPositionRequestQuery({ id: parseInt(positionRequestId) });
  // console.log('position request data: ', data);

  const [currentStep, setCurrentStep] = useState<number | null>(null);

  useEffect(() => {
    const step = data?.positionRequest?.step;
    if (step) setCurrentStep(step);

    if (data?.positionRequest?.id) setPositionRequestId(data?.positionRequest?.id);

    if (data?.positionRequest?.profile_json) setWizardData(data?.positionRequest?.profile_json);

    if (data?.positionRequest?.parent_job_profile_id)
      setPositionRequestProfileId(data?.positionRequest?.parent_job_profile_id);
  }, [data, setPositionRequestId, setWizardData, setPositionRequestProfileId]);

  const onNext = async () => {
    setCurrentStep(currentStep ? currentStep + 1 : 1);
  };

  const onBack = async () => {
    setCurrentStep(currentStep ? currentStep - 1 : 1);
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <OrgChartPage />;
      case 1:
        return <WizardPage onNext={onNext} />;
      case 2:
        return <WizardEditPage onBack={onBack} onNext={onNext} />;

      case 3:
        return <WizardReviewPage onNext={onNext} onBack={onBack} />;
      case 4:
        return <WizardConfirmDetailsPage onNext={onNext} onBack={onBack} />;
      case 5:
        return <WizardResultPage />;
      default:
        return <div>Loading or invalid step...</div>;
    }
  };

  return <>{currentStep !== null ? renderStepComponent() : <div>Loading position request information...</div>}</>;
  // return <div>wizard position request page</div>;
};
