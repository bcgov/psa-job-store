/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Card, Col, Divider, Row } from 'antd';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import OptionalAccountabilities from './wizard-edit-profile-optional-accountabilities';
import RequiredAccountabilities from './wizard-edit-profile-required-accountabilities';

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
}) => {
  return (
    <Card ref={sectionRef} title="Accountabilities" className="custom-card" style={{ marginTop: 16 }}>
      <section id="accountabilties" aria-label="Accountabilities" role="region">
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
            />

            <Divider className="hr-reduced-margin" />

            <OptionalAccountabilities useFormReturn={useFormReturn} validateVerification={validateVerification} />
          </Col>
        </Row>
      </section>
    </Card>
  );
};

export default AccountabilitiesSection;
