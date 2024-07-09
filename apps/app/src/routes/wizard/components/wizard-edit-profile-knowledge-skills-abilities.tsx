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

interface KnowledgeSkillsAbilitiesProps {
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

const KnowledgeSkillsAbilities: React.FC<KnowledgeSkillsAbilitiesProps> = ({
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
    fieldName: 'knowledge_skills_abilities',
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
        label="knowledge skills and abilities"
        fieldName="knowledge_skills_abilities"
        testId="knowledge_skills_abilities"
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
        label="Knowledge, skills and abilities"
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>

      {fields.length > 0 && (
        <AccessibleList
          dataSource={fields}
          renderItem={renderFields}
          ariaLabel="Add a Add a knowledge, skill or ability requirement"
        />
      )}
      <WizardValidationError formErrors={formErrors} fieldName="knowledge_skills_abilities" />

      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col>
            <WizardPicker
              data={pickerData?.requirementsWithoutReadOnly?.knowledgeSkillsAbilities}
              fields={fields}
              addAction={append}
              removeAction={remove}
              triggerValidation={trigger}
              title="Knowledge, skills and abilities"
              buttonText="Browse and add knowledge, skill and abilities"
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

export default KnowledgeSkillsAbilities;
