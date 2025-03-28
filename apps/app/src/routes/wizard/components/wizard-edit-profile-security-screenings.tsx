/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Typography } from 'antd';
import React from 'react';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import AccessibleList from '../../../components/shared/accessible-list/accessible-list';
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

interface SecurityScreeningsProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  pickerData: any;
  sectionSignificant?: boolean;
}

const SecurityScreenings: React.FC<SecurityScreeningsProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  formErrors,
  trigger,
  pickerData,
  sectionSignificant = true,
}) => {
  const { secAlertShown, setSecAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset, update } = useFormFields({
    useFormReturn,
    fieldName: 'security_screenings',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    significant: true,
    sectionSignificant,
  });

  const {
    fields: optional_fields,
    update: optional_update,
    handleRemove: optional_handle_remove,
  } = useFormFields({
    useFormReturn,
    fieldName: 'optional_security_screenings',
    sectionSignificant,
  });

  const { modalProps, closeModal, handleRemoveModal, handleFocusModal, handleAddModal } = useModalActions({
    title: 'Do you want to make changes to security screenings?',
    alertShown: secAlertShown,
    setAlertShown: setSecAlertShown,
    dataTestId: 'security-warning',
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
        label="security screening"
        fieldName="security_screenings"
        testId="security_screenings"
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
        label={
          <span>
            <h4>{'Security screenings'}</h4>{' '}
          </span>
        }
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>
      <Typography.Paragraph type="secondary">
        Use this section to add any security screenings required for the position. This could include a criminal record
        check, a security clearance, or a driver's abstract.
      </Typography.Paragraph>
      {fields.length > 0 && (
        <AccessibleList dataSource={fields} ariaLabel="Security screenings" renderItem={renderFields} />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="security_screenings" />

      <OptionalList
        useFormReturn={useFormReturn}
        fieldName="optional_security_screenings"
        label="Optional security screenings"
        fields={optional_fields}
        handleRemove={optional_handle_remove}
      />

      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col>
            <WizardPickerHM
              data={pickerData?.requirementsWithoutReadOnly?.securityScreenings}
              fields={optional_fields}
              title="Optional security screenings"
              buttonText="Browse and add optional security screenings"
              update={optional_update}
              // log={true}
            />
          </Col>
          <Col>
            <WizardEditAddButton
              testId="add-security-screening-button"
              isSignificant
              sectionSignificant={sectionSignificant}
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

export default SecurityScreenings;
