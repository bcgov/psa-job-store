/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from 'antd';
import React from 'react';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import { WizardModal } from './modal.component';
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

  const { fields: optional_fields, update: optional_update } = useFormFields({
    useFormReturn,
    fieldName: 'optional_professional_registration_requirements',
    // setEditedFields: setEditedFields,
    // originalFields: originalFields,
    significant: true,
  });

  const handleProfRegRemoveModal = (index: number) => {
    WizardModal(
      'Do you want to make changes to professional registration and certification requirements?',
      profRegAlertShown,
      setProfRegAlertShown,
      () => handleRemove(index),
      true,
      undefined,
      'prof-reg-warning',
      trigger,
    );
  };

  const handleProfRegFocusModal = (field: any) => {
    WizardModal(
      'Do you want to make changes to professional registration and certification requirements?',
      profRegAlertShown,
      setProfRegAlertShown,
      () => {},
      true,
      field.is_significant,
      'prof-reg-warning',
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
        label="professional registration and certification requirements"
        fieldName="professional_registration_requirements"
        testId="professional_registration_requirements"
        confirmRemoveModal={() => handleProfRegRemoveModal(index)}
        onFocus={() => handleProfRegFocusModal(field)}
        update={update}
        remove={remove}
        fields={fields}
        trigger={trigger}
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

      <OptionalList
        useFormReturn={useFormReturn}
        fieldName="optional_professional_registration_requirements"
        label="Optional professional registration and certification requirements"
      />

      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col>
            {/* <WizardProfessionalRegistrationPicker
              data={pickerData?.requirementsWithoutReadOnly?.professionalRegistrationRequirements}
              fields={optional_fields}
              addAction={optional_append}
              removeAction={optional_remove}
              triggerValidation={trigger}
              filterForTC={false}
            /> */}
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
              onClick={() => {
                handleAddNew();
              }}
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
