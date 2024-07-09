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
import WizardPicker from './wizard-picker';

interface ProvisosProps {
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

const Provisos: React.FC<ProvisosProps> = ({
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
  // const { profRegAlertShown, setProfRegAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset, remove, append, update } = useFormFields({
    useFormReturn,
    fieldName: 'willingness_statements',
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
        label="provisos"
        fieldName="willingness_statements"
        testId="provisos"
        confirmRemoveModal={() => handleProfRegRemoveModal(index)}
        // onFocus={() => handleProfRegFocusModal(field)}
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
        label="Provisos"
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>

      {fields.length > 0 && <AccessibleList dataSource={fields} renderItem={renderFields} ariaLabel="Add a proviso" />}
      <WizardValidationError formErrors={formErrors} fieldName="provisos" />

      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col>
            <WizardPicker
              data={pickerData?.requirementsWithoutReadOnly?.willingnessStatements}
              fields={fields}
              addAction={append}
              removeAction={remove}
              triggerValidation={trigger}
              title="Provisos"
              buttonText="Browse and add provisos"
            />
          </Col>
          <Col>
            <WizardEditAddButton
              testId="add-prof-reg-button"
              onClick={() => {
                handleAddNew();
              }}
            >
              Add a custom proviso
            </WizardEditAddButton>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default Provisos;
