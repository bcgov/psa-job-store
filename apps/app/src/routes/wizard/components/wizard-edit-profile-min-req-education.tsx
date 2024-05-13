/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import { WizardModal } from './modal.component';
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
  isAdmin: boolean;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
}

const Education: React.FC<EducationProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  isAdmin,
  formErrors,
  trigger,
}) => {
  const { minReqAlertShown, setMinReqAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset } = useFormFields({
    useFormReturn,
    fieldName: 'education',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    significant: true,
  });

  const handleEducationRemoveModal = (index: number) => {
    if (!isAdmin) {
      WizardModal(
        'Do you want to make changes to education and work experiences?',
        minReqAlertShown,
        setMinReqAlertShown,
        () => handleRemove(index),
        true,
        undefined,
        'education-warning',
        trigger,
      );
    } else {
      handleRemove(index);
    }
  };

  const handleEducationFocusModal = (field: any) => {
    WizardModal(
      'Do you want to make changes to education and work experiences?',
      minReqAlertShown,
      setMinReqAlertShown,
      () => {},
      true,
      field.is_significant,
      'education-warning',
    );
  };

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
    };

    return (
      <WizardEditProfileListItem
        {...commonProps}
        label="education and work experience"
        fieldName="education"
        testId="education"
        confirmRemoveModal={() => handleEducationRemoveModal(index)}
        onFocus={() => handleEducationFocusModal(field)}
        isAdmin={isAdmin}
      />
    );
  };

  return (
    <>
      {fields.length > 0 && (
        <AccessibleList dataSource={fields} renderItem={renderFields} ariaLabel="Education and work experience" />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="education" />

      <WizardEditAddButton
        testId="add-education-button"
        onClick={() => {
          WizardModal(
            'Do you want to make changes to education and work experiences?',
            minReqAlertShown,
            setMinReqAlertShown,
            () => {
              handleAddNew();
            },
            true,
            undefined,
            'education-warning',
          );
        }}
      >
        Add an education or work requirement
      </WizardEditAddButton>
    </>
  );
};

export default Education;
