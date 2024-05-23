/* eslint-disable @typescript-eslint/no-explicit-any */

interface WizardValidationErrorProps {
  fieldName: string;
  formErrors?: any;
}

const WizardValidationError: React.FC<WizardValidationErrorProps> = ({ fieldName, formErrors }) => {
  return (
    <>
      {formErrors?.[fieldName] && (
        <div style={{ color: '#ff4d4f' }}>{formErrors[fieldName].message ?? formErrors[fieldName].root?.message}</div>
      )}
    </>
  );
};

export default WizardValidationError;
