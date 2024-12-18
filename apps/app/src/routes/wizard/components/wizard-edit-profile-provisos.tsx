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

interface ProvisosProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  editedFields: { [key: number]: boolean };
  setEditedFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  // isAdmin: boolean;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
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
}) => {
  // const { profRegAlertShown, setProfRegAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset, remove, update } = useFormFields({
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
    handleRemove(index);
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
      update,
    };

    return (
      <WizardEditProfileListItem
        {...commonProps}
        label="provisos"
        fieldName="willingness_statements"
        testId="provisos"
        confirmRemoveModal={() => handleProfRegRemoveModal(index)}
        remove={remove}
        fields={fields}
        trigger={trigger}
      />
    );
  };

  return (
    <>
      <Form.Item
        label={<h4>Provisos</h4>}
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>

      {fields.length > 0 && <AccessibleList dataSource={fields} renderItem={renderFields} ariaLabel="Add a proviso" />}
      <WizardValidationError formErrors={formErrors} fieldName="provisos" />

      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col>
            <WizardEditAddButton
              testId="add-proviso-button"
              isSignificant={false}
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
