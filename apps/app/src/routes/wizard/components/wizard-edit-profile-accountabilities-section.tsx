/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Card, Col, Form, Row } from 'antd';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import { WizardModalComponent, useModalActions } from './modal.component';
import WizardEditAddButton from './wizard-edit-profile-add-button';
import OptionalList from './wizard-edit-profile-optional-list';
import RequiredAccountabilities from './wizard-edit-profile-required-accountabilities';
import WizardPickerHM from './wizard-picker-hm';
import { useWizardContext } from './wizard.provider';

interface AccountabilitiesSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  sectionRef: React.RefObject<HTMLDivElement>;
  originalAccReqFields: any[];
  validateVerification: () => void;
  editedAccReqFields: { [key: number]: boolean };
  setEditedAccReqFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  pickerData: any;
}

const AccountabilitiesSection: React.FC<AccountabilitiesSectionProps> = ({
  useFormReturn,
  sectionRef,
  originalAccReqFields,
  validateVerification,
  editedAccReqFields,
  setEditedAccReqFields,
  formErrors,
  trigger,
  pickerData,
}) => {
  const { reqAlertShown, setReqAlertShown } = useWizardContext();
  const {
    fields: optionalFields,
    update: optionalUpdate,
    handleRemove: optionalHandleRemove,
  } = useFormFields({
    useFormReturn,
    fieldName: 'optional_accountabilities',
  });

  const { fields, handleRemove, handleAddBack, handleReset, update, remove, handleAddNew } = useFormFields({
    useFormReturn,
    fieldName: 'accountabilities',
    setEditedFields: setEditedAccReqFields,
    originalFields: originalAccReqFields,
    significant: true,
  });

  const { modalProps, closeModal, handleAddModal } = useModalActions({
    title: 'Do you want to make changes to accountabilities?',
    alertShown: reqAlertShown,
    setAlertShown: setReqAlertShown,
    dataTestId: 'accountabilities-warning',
    trigger,
    isSignificant: true,
  });

  return (
    <Card ref={sectionRef} title={<h3>Accountabilities</h3>} className="custom-card" style={{ marginTop: 16 }}>
      <section id="accountabilities" aria-label="Accountabilities" role="region">
        {modalProps && <WizardModalComponent {...modalProps} onClose={closeModal} />}

        <Row justify="start">
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <Alert
              role="note"
              style={{ marginBottom: '10px' }}
              message={
                <>
                  Keep the provided list of accountabilities to avoid the review by the classification team and create
                  your position right away.
                </>
              }
              type="warning"
              showIcon
            />

            <RequiredAccountabilities
              editedFields={editedAccReqFields}
              useFormReturn={useFormReturn}
              originalFields={originalAccReqFields}
              validateVerification={validateVerification}
              setEditedFields={setEditedAccReqFields}
              formErrors={formErrors}
              trigger={trigger}
              fields={fields}
              handleRemove={handleRemove}
              handleAddBack={handleAddBack}
              handleReset={handleReset}
              update={update}
              remove={remove}
            />

            <OptionalList
              useFormReturn={useFormReturn}
              fieldName="optional_accountabilities"
              label="Optional accountabilities"
              fields={optionalFields}
              handleRemove={optionalHandleRemove}
            />

            <Form.Item style={{ marginBottom: 0 }}>
              <Row>
                <Col>
                  <WizardPickerHM
                    data={pickerData?.requirementsWithoutReadOnly?.accountabilities}
                    fields={optionalFields}
                    update={optionalUpdate}
                    title="Optional accountabilities"
                    buttonText="Browse and add optional accountabilities"
                    // log={true}
                  />
                </Col>
                <Col>
                  <WizardEditAddButton testId="add-accountability-button" onClick={() => handleAddModal(handleAddNew)}>
                    Add a custom accountability
                  </WizardEditAddButton>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </section>
    </Card>
  );
};

export default AccountabilitiesSection;
