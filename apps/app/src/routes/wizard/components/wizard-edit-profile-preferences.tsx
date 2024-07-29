/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from 'antd';
import React from 'react';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import WizardEditAddButton from './wizard-edit-profile-add-button';
import WizardEditProfileListItem from './wizard-edit-profile-list-item';
import WizardValidationError from './wizard-edit-profile-validation-error';
import './wizard-edit-profile.css';

interface PreferencesProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  // isAdmin: boolean;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
}

const Preferences: React.FC<PreferencesProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  editedFields,
  setEditedFields,
  // isAdmin,
  formErrors,
  trigger,
}) => {
  // const { profRegAlertShown, setProfRegAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset, remove } = useFormFields({
    useFormReturn,
    fieldName: 'preferences',
    setEditedFields: setEditedFields,
    originalFields: originalFields,
    // professional registrations are not significant when user adds a new item
    // but should still handle removal of significant items
    significant: true,
    significant_add: false,
  });

  const handleProfRegRemoveModal = (index: number) => {
    // WizardModal(
    //   'Do you want to make changes to professional registration and certification requirements?',
    //   profRegAlertShown,
    //   setProfRegAlertShown,
    // () =>
    handleRemove(index);
    //   true,
    //   undefined,
    //   'prof-reg-warning',
    //   trigger,
    // );
  };

  // const handleProfRegFocusModal = (field: any) => {
  //   WizardModal(
  //     'Do you want to make changes to professional registration and certification requirements?',
  //     profRegAlertShown,
  //     setProfRegAlertShown,
  //     () => {},
  //     true,
  //     field.is_significant,
  //     'prof-reg-warning',
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
        label="preferences"
        fieldName="preferences"
        testId="preferences"
        confirmRemoveModal={() => handleProfRegRemoveModal(index)}
        // onFocus={() => handleProfRegFocusModal(field)}
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
        label="Preferences"
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>

      {fields.length > 0 && (
        <AccessibleList dataSource={fields} renderItem={renderFields} ariaLabel="Add a preference" />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="preferences" />

      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col>
            <WizardEditAddButton
              testId="add-prof-reg-button"
              onClick={() => {
                handleAddNew();
              }}
            >
              Add a custom job preference
            </WizardEditAddButton>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default Preferences;
