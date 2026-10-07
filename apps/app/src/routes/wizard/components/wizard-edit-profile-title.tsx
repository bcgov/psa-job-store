/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { BasicDetailsValidationModel } from '../../total-comp-create-profile/components/total-comp-create-profile-validation';
import WizardTextField from './wizard-edit-profile-text-field';
import { Alert } from 'antd';

interface SingleTextFieldProps {
  useFormReturn:
    | UseFormReturn<JobProfileValidationModel, any, undefined>
    | UseFormReturn<BasicDetailsValidationModel, any, undefined>;
  trigger: UseFormTrigger<JobProfileValidationModel> | UseFormTrigger<BasicDetailsValidationModel>;
  formErrors: any;
  readOnly?: boolean;
  editingProfile?: boolean;
}

const WizardTitle: React.FC<SingleTextFieldProps> = ({
  useFormReturn,
  formErrors,
  trigger,
  readOnly,
  editingProfile,
}) => {
  // 2297 - Force more descriptive title for Work-able job positions
  const { getValues, formState } = useFormReturn;
  const { title } = getValues();
  let showTitleWarning = false;
  if (!editingProfile) {
    if (typeof title === 'object' && 'text' in title) {
      showTitleWarning = /^work(?:\-|\s)?able/.test(title.text.toLocaleLowerCase());
      if (showTitleWarning) {
        formState.errors['title'] = {
          root: {
            message: 'Default title "Work-able Intern" must be updated to reflect the duties of the position.',
            type: 'value',
          },
          type: 'value',
        };
      } else {
        delete formState.errors['title'];
      }
    }
  }

  return (
    <>
      {showTitleWarning && (
        <Alert
          type="info"
          role="note"
          style={{ marginBottom: '24px' }}
          message="Manager Reminder: Please update the default title to reflect the duties of the position. 
            Using a role-specific title supports accurate representation of the work and aligns with inclusive workplace practices."
          showIcon
        />
      )}
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
    </>
  );
};

export default WizardTitle;
