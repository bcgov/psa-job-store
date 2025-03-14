/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
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

interface RelatedExperienceProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  sectionSignificant?: boolean;
}

const RelatedExperience: React.FC<RelatedExperienceProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  formErrors,
  trigger,
  sectionSignificant = true,
}) => {
  const { relWorkAlertShown, setRelWorkAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset, update } = useFormFields({
    useFormReturn,
    fieldName: 'job_experience',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    significant: true,
    sectionSignificant,
  });

  const { modalProps, closeModal, handleRemoveModal, handleFocusModal, handleAddModal } = useModalActions({
    title: 'Do you want to make changes to related experiences?',
    alertShown: relWorkAlertShown,
    setAlertShown: setRelWorkAlertShown,
    dataTestId: 'experience-warning',
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
        fieldName="job_experience"
        label="job experience"
        testId="job-experience"
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
      <Form.Item
        label={<h4>Related experience</h4>}
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>
      {fields.length > 0 && (
        <AccessibleList dataSource={fields} ariaLabel="Related experience" renderItem={renderFields} />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="job_experience" />

      <WizardEditAddButton
        testId="add-job-experience-button"
        isSignificant
        sectionSignificant={sectionSignificant}
        onClick={() => handleAddModal(handleAddNew)}
      >
        Add a related experience
      </WizardEditAddButton>
    </>
  );
};

export default RelatedExperience;
