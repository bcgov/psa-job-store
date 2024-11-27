/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UseFieldArrayRemove, UseFieldArrayUpdate, UseFormReturn, UseFormTrigger } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { WizardModalComponent, useModalActions } from './modal.component';
import WizardEditProfileListItem from './wizard-edit-profile-list-item';
import WizardValidationError from './wizard-edit-profile-validation-error';
import './wizard-edit-profile.css';
import { useWizardContext } from './wizard.provider';

interface RequiredAccountabilitiesProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;

  fields: Record<'id', string>[];
  handleRemove: (index: number) => void;
  handleAddBack: (index: number) => void;
  handleReset: (index: number) => void;
  update: UseFieldArrayUpdate<any, string>;
  remove: UseFieldArrayRemove;
}

const RequiredAccountabilities: React.FC<RequiredAccountabilitiesProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  formErrors,
  trigger,
  fields,
  handleRemove,
  handleAddBack,
  handleReset,
  update,
  remove,
}) => {
  const { reqAlertShown, setReqAlertShown } = useWizardContext();

  const { modalProps, closeModal, handleRemoveModal, handleFocusModal } = useModalActions({
    title: 'Do you want to make changes to accountabilities?',
    alertShown: reqAlertShown,
    setAlertShown: setReqAlertShown,
    dataTestId: 'accountabilities-warning',
    trigger,
    isSignificant: true,
  });

  const renderAccReqFields = (field: any, index: number) => {
    const commonProps = {
      field,
      index,
      useFormReturn,
      editedFields,
      setEditedFields,
      validateVerification,
      handleReset,
      handleAddBack,
      handleRemove,
      originalFields,
      update,
      remove,
    };

    // console.log('field: ', field);
    return (
      <>
        <WizardEditProfileListItem
          {...commonProps}
          label={'accountability'}
          fieldName="accountabilities"
          testId="accountability"
          confirmRemoveModal={() => handleRemoveModal({ index, handleRemove, field })}
          onFocus={(inputRef) => {
            handleFocusModal({ inputRef, field });
          }}
        />
      </>
    );
  };

  return (
    <>
      {modalProps && <WizardModalComponent {...modalProps} onClose={closeModal} />}
      {fields.length > 0 && (
        <AccessibleList dataSource={fields} ariaLabel="Accountabilities" renderItem={renderAccReqFields} />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="accountabilities" />
    </>
  );
};

export default RequiredAccountabilities;
