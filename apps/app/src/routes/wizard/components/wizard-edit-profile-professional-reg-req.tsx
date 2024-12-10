/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from 'antd';
import React from 'react';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import { WizardModalComponent, useModalActions } from './modal.component';
import WizardEditAddButton from './wizard-edit-profile-add-button';
import WizardEditProfileListItem from './wizard-edit-profile-list-item';
import OptionalList from './wizard-edit-profile-optional-list';
import WizardValidationError from './wizard-edit-profile-validation-error';
import './wizard-edit-profile.css';
import WizardPickerHM from './wizard-picker-hm';
import { useWizardContext } from './wizard.provider';

interface ProfessionalRegistrationRequirementsProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  // isAdmin: boolean;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  pickerData: any;
}

const ProfessionalRegistrationRequirements: React.FC<ProfessionalRegistrationRequirementsProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  // isAdmin,
  formErrors,
  trigger,
  pickerData,
}) => {
  const { profRegAlertShown, setProfRegAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset, remove, update } = useFormFields({
    useFormReturn,
    fieldName: 'professional_registration_requirements',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    significant: true,
  });

  const {
    fields: optional_fields,
    update: optional_update,
    handleRemove: optional_handleRemove,
  } = useFormFields({
    useFormReturn,
    fieldName: 'optional_professional_registration_requirements',
    // setEditedFields: setEditedFields,
    // originalFields: originalFields,
    significant: true,
  });

  const { modalProps, closeModal, handleRemoveModal, handleFocusModal, handleAddModal } = useModalActions({
    title: 'Do you want to make changes to professional registration and certification requirements?',
    alertShown: profRegAlertShown,
    setAlertShown: setProfRegAlertShown,
    dataTestId: 'prof-reg-warning',
    trigger,
    isSignificant: true,
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
    };

    return (
      <WizardEditProfileListItem
        {...commonProps}
        label="professional registration and certification requirements"
        fieldName="professional_registration_requirements"
        testId="professional_registration_requirements"
        confirmRemoveModal={() => handleRemoveModal({ index, handleRemove, field })}
        onFocus={(inputRef) => {
          handleFocusModal({ inputRef, field });
        }}
        remove={remove}
        fields={fields}
        trigger={trigger}
        // isAdmin={isAdmin}
      />
    );
  };

  return (
    <>
      {modalProps && <WizardModalComponent {...modalProps} onClose={closeModal} />}
      <Form.Item
        label={<h4>Professional registration and certification requirements</h4>}
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

      <OptionalList
        useFormReturn={useFormReturn}
        fieldName="optional_professional_registration_requirements"
        label="Optional professional registration and certification requirements"
        fields={optional_fields}
        handleRemove={optional_handleRemove}
      />

      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col>
            <WizardPickerHM
              data={pickerData?.requirementsWithoutReadOnly?.professionalRegistrationRequirements}
              fields={optional_fields}
              update={optional_update}
              title="Optional professional registration and certification requirements"
              buttonText="Browse and add optional professional registration requirements"
              // log={true}
            />
          </Col>
          <Col>
            <WizardEditAddButton
              testId="add-prof-reg-button"
              isSignificant
              onClick={() => handleAddModal(handleAddNew)}
            >
              Add a custom requirement
            </WizardEditAddButton>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default ProfessionalRegistrationRequirements;
