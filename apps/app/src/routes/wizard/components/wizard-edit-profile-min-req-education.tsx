/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import AccessibleList from '../../../components/shared/accessible-list/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import { WizardModalComponent, useModalActions } from './modal.component';
import WizardEditAddButton from './wizard-edit-profile-add-button';
import WizardEditProfileListItem from './wizard-edit-profile-list-item';
import WizardValidationError from './wizard-edit-profile-validation-error';
import './wizard-edit-profile.css';
import { useWizardContext } from './wizard.provider';

interface EducationProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  sectionSignificant?: boolean;
}

const Education: React.FC<EducationProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  formErrors,
  trigger,
  sectionSignificant = true,
}) => {
  const { minReqAlertShown, setMinReqAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset, update } = useFormFields({
    useFormReturn,
    fieldName: 'education',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    significant: true,
    sectionSignificant,
  });

  const { modalProps, closeModal, handleRemoveModal, handleFocusModal, handleAddModal } = useModalActions({
    title: 'Do you want to make changes to education and work experiences?',
    alertShown: minReqAlertShown,
    setAlertShown: setMinReqAlertShown,
    dataTestId: 'education-warning',
    trigger,
    isSignificant: sectionSignificant,
  });

  const renderFields = (field: any, index: number) => {
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
      sectionSignificant,
    };

    return (
      <WizardEditProfileListItem
        {...commonProps}
        label="education and work experience"
        fieldName="education"
        testId="education"
        confirmRemoveModal={() => handleRemoveModal({ index, handleRemove, field })}
        onFocus={(inputRef) => {
          handleFocusModal({ inputRef, field });
        }}
      />
    );
  };

  return (
    <>
      {modalProps && <WizardModalComponent {...modalProps} onClose={closeModal} />}
      {fields.length > 0 && (
        <AccessibleList dataSource={fields} renderItem={renderFields} ariaLabel="Education and work experience" />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="education" />

      <WizardEditAddButton
        testId="add-education-button"
        isSignificant
        sectionSignificant={sectionSignificant}
        onClick={() => handleAddModal(handleAddNew)}
      >
        Add an education or work requirement
      </WizardEditAddButton>
    </>
  );
};

export default Education;
