/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import WizardEditAddButton from './wizard-edit-profile-add-button';
import WizardEditProfileListItem from './wizard-edit-profile-list-item';
import WizardValidationError from './wizard-edit-profile-validation-error';
import './wizard-edit-profile.css';

interface ProfessionalRegistrationRequirementsProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  // isAdmin: boolean;
  formErrors: any;
  // trigger: UseFormTrigger<JobProfileValidationModel>;
}

const ProfessionalRegistrationRequirements: React.FC<ProfessionalRegistrationRequirementsProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  // isAdmin,
  formErrors,
  // trigger,
}) => {
  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset } = useFormFields({
    useFormReturn,
    fieldName: 'professional_registration_requirements',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    significant: true,
  });

  const handleProfRegRemoveModal = (index: number) => {
    // if (!isAdmin) {
    //   WizardModal(
    //     'Do you want to make changes to professional registration requirements?',
    //     minReqAlertShown,
    //     setMinReqAlertShown,
    //     () => handleRemove(index),
    //     true,
    //     undefined,
    //     'prof-reg-warning',
    //     trigger,
    //   );
    // } else {
    handleRemove(index);
    // }
  };

  // const handleEducationFocusModal = (field: any) => {
  //   WizardModal(
  //     'Do you want to make changes to education and work experiences?',
  //     minReqAlertShown,
  //     setMinReqAlertShown,
  //     () => {},
  //     true,
  //     field.is_significant,
  //     'education-warning',
  //   );
  // };

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
        label="professional registration and certification requirements"
        fieldName="professional_registration_requirements"
        testId="professional_registration_requirements"
        confirmRemoveModal={() => handleProfRegRemoveModal(index)}
        // onFocus={() => handleEducationFocusModal(field)}
        // isAdmin={isAdmin}
      />
    );
  };

  return (
    <>
      <Form.Item
        label="Professional registration and certification requirements"
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>

      {fields.length > 0 && (
        <AccessibleList
          dataSource={fields}
          renderItem={renderFields}
          ariaLabel="Add a professional registration or certification requirement"
        />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="professional_registration_requirements" />

      <WizardEditAddButton
        testId="add-prof-reg-button"
        onClick={() => {
          // WizardModal(
          //   'Do you want to make changes to education and work experiences?',
          //   minReqAlertShown,
          //   setMinReqAlertShown,
          //   () => {
          handleAddNew();
          //   },
          //   true,
          //   undefined,
          //   'education-warning',
          // );
        }}
      >
        Add a professional registration or certification requirement
      </WizardEditAddButton>
    </>
  );
};

export default ProfessionalRegistrationRequirements;
