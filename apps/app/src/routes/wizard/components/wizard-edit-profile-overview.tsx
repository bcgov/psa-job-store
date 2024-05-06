/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import WizardTextField from './wizard-edit-profile-text-field';

interface SingleTextFieldProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  formErrors: any;
}

const WizardOverview: React.FC<SingleTextFieldProps> = ({ useFormReturn, formErrors, trigger }) => {
  return (
    <WizardTextField
      name="overview"
      label="Overview"
      testId="job-overview"
      trigger={trigger}
      formErrors={formErrors}
      useFormReturn={useFormReturn}
      isTextArea={true}
    />
  );
};

export default WizardOverview;
