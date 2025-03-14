/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { BasicDetailsValidationModel } from '../../total-comp-create-profile/components/total-comp-create-profile-validation';
import WizardTextField from './wizard-edit-profile-text-field';

interface SingleTextFieldProps {
  useFormReturn:
    | UseFormReturn<JobProfileValidationModel, any, undefined>
    | UseFormReturn<BasicDetailsValidationModel, any, undefined>;
  trigger: UseFormTrigger<JobProfileValidationModel> | UseFormTrigger<BasicDetailsValidationModel>;
  formErrors: any;
  readOnly?: boolean;
}

const WizardTitle: React.FC<SingleTextFieldProps> = ({ useFormReturn, formErrors, trigger, readOnly }) => {
  return (
    <WizardTextField
      name="title"
      label="Job title"
      placeholder="Ex.: Program Assistant"
      testId="job-title"
      trigger={trigger}
      formErrors={formErrors}
      useFormReturn={useFormReturn}
      jobTitleWarning={true}
      readOnly={readOnly}
    />
  );
};

export default WizardTitle;
