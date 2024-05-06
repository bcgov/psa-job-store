/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
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

interface RelatedExperienceProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
}

const RelatedExperience: React.FC<RelatedExperienceProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  formErrors,
  trigger,
}) => {
  const { relWorkAlertShown, setRelWorkAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset } = useFormFields({
    useFormReturn,
    fieldName: 'job_experience',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    significant: true,
  });

  const handleRemoveModal = (index: number) => {
    WizardModal(
      'Do you want to make changes to related experiences?',
      relWorkAlertShown,
      setRelWorkAlertShown,
      () => handleRemove(index),
      true,
      undefined,
      'experience-warning',
      trigger,
    );
  };

  const handleFocusModal = (field: any) => {
    WizardModal(
      'Do you want to make changes to related experiences?',
      relWorkAlertShown,
      setRelWorkAlertShown,
      () => {},
      true,
      field.is_significant,
      'experience-warning',
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
        fieldName="job_experience"
        testId="job-experience"
        confirmRemoveModal={() => handleRemoveModal(index)}
        onFocus={() => handleFocusModal(field)}
      />
    );
  };

  return (
    <>
      <Form.Item
        label="Related experience"
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
        onClick={() => {
          WizardModal(
            'Do you want to make changes to related experiences?',
            relWorkAlertShown,
            setRelWorkAlertShown,
            () => {
              handleAddNew();
            },
            true,
            undefined,
            'experience-warning',
          );
        }}
      >
        Add a related experience
      </WizardEditAddButton>
    </>
  );
};

export default RelatedExperience;
