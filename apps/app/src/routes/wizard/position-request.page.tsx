import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useBlocker, useParams } from 'react-router-dom';
import { useGetPositionRequestQuery } from '../../redux/services/graphql-api/position-request.api';
import { useWizardContext } from './components/wizard.provider';
import { WizardConfirmDetailsPage } from './wizard-confirm-details.page';
import { WizardEditPage } from './wizard-edit.page';
import { WizardOrgChartPage } from './wizard-org-chart.page';
import { WizardResultPage } from './wizard-result.page';
import { WizardReviewPage } from './wizard-review.page';
import { WizardPage } from './wizard.page';

export const PositionRequestPage = () => {
  const { setWizardData, setPositionRequestId, setPositionRequestProfileId, setPositionRequestDepartmentId } =
    useWizardContext();
  // console.log('wizardData: ', wizardData);
  const { positionRequestId } = useParams();

  if (!positionRequestId) throw 'No position request provided';

  const { data } = useGetPositionRequestQuery({
    id: parseInt(positionRequestId),
  });

  const [currentStep, setCurrentStep] = useState<number | null>(null);

  useEffect(() => {
    const step = data?.positionRequest?.step;

    if (step != null) setCurrentStep(step);

    if (data?.positionRequest?.id) {
      setPositionRequestId(data?.positionRequest?.id);
    }

    if (data?.positionRequest?.profile_json) setWizardData(data?.positionRequest?.profile_json);

    if (data?.positionRequest?.parent_job_profile_id)
      setPositionRequestProfileId(data?.positionRequest?.parent_job_profile_id);

    if (data?.positionRequest?.department_id) {
      setPositionRequestDepartmentId(data?.positionRequest?.department_id);
    }
  }, [data, setPositionRequestId, setWizardData, setPositionRequestProfileId, setPositionRequestDepartmentId]);

  const onNext = async () => {
    setCurrentStep(currentStep ? currentStep + 1 : 1);
  };

  const onBack = async () => {
    setCurrentStep(currentStep ? currentStep - 1 : 1);
  };

  // nav block
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname && currentStep != 5,
  );

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <WizardOrgChartPage onCreateNewPosition={onNext} />;
      case 1:
        return <WizardPage onNext={onNext} onBack={onBack} />;
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

  return (
    <>
      {blocker.state === 'blocked' && (
        <Modal
          title="Are you sure you want to leave?"
          open={true}
          onOk={async () => {
            blocker.proceed();
          }}
          onCancel={() => blocker.reset()}
        >
          <p>You can resume the process from "My Positions" page</p>
        </Modal>
      )}
      {currentStep !== null ? renderStepComponent() : <div>Loading position request information...</div>}
    </>
  );
  // return <div>wizard position request page</div>;
};
