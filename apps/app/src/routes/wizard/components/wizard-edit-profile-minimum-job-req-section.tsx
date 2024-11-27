/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Card, Col, Divider, Form, Row, Typography } from 'antd';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import WizardEditProfileArrayField from './wizard-edit-profile-array-field';
import KnowledgeSkillsAbilities from './wizard-edit-profile-knowledge-skills-abilities';
import Education from './wizard-edit-profile-min-req-education';
import Preferences from './wizard-edit-profile-preferences';
import ProfessionalRegistrationRequirements from './wizard-edit-profile-professional-reg-req';
import Provisos from './wizard-edit-profile-provisos';
import RelatedExperience from './wizard-edit-profile-related-experience';
import SecurityScreenings from './wizard-edit-profile-security-screenings';

interface MinimumRequirementsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  validateVerification: () => void;

  educationSectionRef: React.RefObject<HTMLDivElement>;
  securityScreeningsSectionRef: React.RefObject<HTMLDivElement>;
  relatedExperienceSectionRef: React.RefObject<HTMLDivElement>;
  professionalRegSectionRef: React.RefObject<HTMLDivElement>;

  editedEducationFields: { [key: number]: boolean };
  editedSecurityScreeningsFields: { [key: number]: boolean };
  editedRelatedExperienceFields: { [key: number]: boolean };
  editedProfessionalRegistrationFields: { [key: number]: boolean };
  editedPreferencesFields: { [key: number]: boolean };
  editedKnowledgeSkillsAbilitiesFields: { [key: number]: boolean };
  editedProvisosFields: { [key: number]: boolean };
  editedOptionalRequirementsFields: { [key: number]: boolean };

  setEditedEducationFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setEditedRelatedExperienceFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setEditedSecurityScreeningsFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setEditedProfessionalRegistrationFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setEditedPreferencesFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setEditedKnowledgeSkillsAbilitiesFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setEditedProvisosFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setEditedOptionalRequirementsFields: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;

  originalRelatedExperienceFields: any[];
  originalEducationFields: any[];
  originalProfessionalRegistrationFields: any[];
  originalPreferencesFields: any[];
  originalKnowledgeSkillsAbilitiesFields: any[];
  originalProvisosFields: any[];
  originalSecurityScreeningsFields: any[];
  originalOptionalRequirementsFields: any[];

  isAdmin: boolean;
  formErrors: any;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  pickerData: any;
}

const MinimumRequirementsSection: React.FC<MinimumRequirementsSectionProps> = ({
  useFormReturn,

  educationSectionRef,
  originalEducationFields,
  validateVerification,
  editedEducationFields,
  setEditedEducationFields,

  relatedExperienceSectionRef,
  professionalRegSectionRef,
  securityScreeningsSectionRef,
  editedRelatedExperienceFields,
  originalRelatedExperienceFields,
  setEditedRelatedExperienceFields,

  editedSecurityScreeningsFields,
  setEditedSecurityScreeningsFields,

  originalProfessionalRegistrationFields,
  setEditedProfessionalRegistrationFields,
  editedProfessionalRegistrationFields,

  originalPreferencesFields,
  setEditedPreferencesFields,
  editedPreferencesFields,

  originalKnowledgeSkillsAbilitiesFields,
  setEditedKnowledgeSkillsAbilitiesFields,
  editedKnowledgeSkillsAbilitiesFields,

  originalProvisosFields,
  setEditedProvisosFields,
  editedProvisosFields,

  originalOptionalRequirementsFields,
  setEditedOptionalRequirementsFields,
  editedOptionalRequirementsFields,

  originalSecurityScreeningsFields,

  isAdmin,
  formErrors,
  trigger,
  pickerData,
}) => {
  return (
    <Card title={<h3>Minimum job requirements</h3>} className="custom-card" style={{ marginTop: 16 }}>
      <section aria-label="Minimum job requirements" role="region">
        <Row justify="start">
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <Alert
              role="note"
              style={{ marginBottom: '10px' }}
              message={
                <>
                  Keep the minimum job requirements to avoid the review by the classification team and create your
                  position right away
                </>
              }
              type="warning"
              showIcon
            />
            <div ref={educationSectionRef}>
              <Form.Item
                label={<h4>Education and work experience</h4>}
                labelCol={{ className: 'card-label' }}
                className="label-only"
                colon={false}
              ></Form.Item>

              <Typography.Paragraph type="secondary">
                Minimum years of experience are required, and you may add or refine the education requirements (add a
                degree or diploma program). These equivalencies are designed to be inclusive of different backgrounds.
              </Typography.Paragraph>

              <Education
                editedFields={editedEducationFields}
                useFormReturn={useFormReturn}
                originalFields={originalEducationFields}
                validateVerification={validateVerification}
                setEditedFields={setEditedEducationFields}
                isAdmin={isAdmin}
                formErrors={formErrors}
                trigger={trigger}
              />
            </div>

            <Divider className="hr-reduced-margin" />

            <div ref={relatedExperienceSectionRef}>
              <RelatedExperience
                useFormReturn={useFormReturn}
                originalFields={originalRelatedExperienceFields}
                validateVerification={validateVerification}
                setEditedFields={setEditedRelatedExperienceFields}
                editedFields={editedRelatedExperienceFields}
                formErrors={formErrors}
                trigger={trigger}
              />
            </div>

            <Divider className="hr-reduced-margin" />

            <div ref={professionalRegSectionRef}>
              <ProfessionalRegistrationRequirements
                useFormReturn={useFormReturn}
                originalFields={originalProfessionalRegistrationFields}
                validateVerification={validateVerification}
                setEditedFields={setEditedProfessionalRegistrationFields}
                editedFields={editedProfessionalRegistrationFields}
                formErrors={formErrors}
                trigger={trigger}
                pickerData={pickerData}
              />
            </div>

            <Divider className="hr-reduced-margin" />

            <Preferences
              useFormReturn={useFormReturn}
              originalFields={originalPreferencesFields}
              validateVerification={validateVerification}
              setEditedFields={setEditedPreferencesFields}
              editedFields={editedPreferencesFields}
              formErrors={formErrors}
              trigger={trigger}
            />

            <Divider className="hr-reduced-margin" />

            <KnowledgeSkillsAbilities
              useFormReturn={useFormReturn}
              originalFields={originalKnowledgeSkillsAbilitiesFields}
              validateVerification={validateVerification}
              setEditedFields={setEditedKnowledgeSkillsAbilitiesFields}
              editedFields={editedKnowledgeSkillsAbilitiesFields}
              formErrors={formErrors}
              trigger={trigger}
            />

            <Divider className="hr-reduced-margin" />

            <Provisos
              useFormReturn={useFormReturn}
              originalFields={originalProvisosFields}
              validateVerification={validateVerification}
              setEditedFields={setEditedProvisosFields}
              editedFields={editedProvisosFields}
              formErrors={formErrors}
              trigger={trigger}
            />

            <Divider className="hr-reduced-margin" />

            <div ref={securityScreeningsSectionRef}>
              <SecurityScreenings
                useFormReturn={useFormReturn}
                originalFields={originalSecurityScreeningsFields}
                validateVerification={validateVerification}
                setEditedFields={setEditedSecurityScreeningsFields}
                editedFields={editedSecurityScreeningsFields}
                formErrors={formErrors}
                trigger={trigger}
                pickerData={pickerData}
              />
            </div>

            <Divider className="hr-reduced-margin" />

            <WizardEditProfileArrayField
              useFormReturn={useFormReturn}
              originalFields={originalOptionalRequirementsFields}
              validateVerification={validateVerification}
              label="Other requirements"
              fieldName="optional_requirements"
              testId="optional-requirement"
              addButtonText="Add an optional requirement"
              setEditedFields={setEditedOptionalRequirementsFields}
              editedFields={editedOptionalRequirementsFields}
            />
          </Col>
        </Row>
      </section>
    </Card>
  );
};

export default MinimumRequirementsSection;
