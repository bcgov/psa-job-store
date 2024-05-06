/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import WizardTextField from './wizard-edit-profile-text-field';

interface SingleTextFieldProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  formErrors: any;
}

const WizardProgramOverview: React.FC<SingleTextFieldProps> = ({ useFormReturn, formErrors, trigger }) => {
  return (
    <WizardTextField
      name="program_overview"
      label="Program overview"
      placeholder="(Optional) Add more details about the program"
      testId="program-overview"
      trigger={trigger}
      formErrors={formErrors}
      useFormReturn={useFormReturn}
      isTextArea={true}
      maxCharacterCount={320}
      showCharacterCount={true}
    />
  );
};

export default WizardProgramOverview;
