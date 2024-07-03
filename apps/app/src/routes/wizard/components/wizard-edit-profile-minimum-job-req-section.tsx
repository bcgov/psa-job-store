/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Card, Col, Divider, Form, Row, Typography } from 'antd';
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import WizardEditProfileArrayField from './wizard-edit-profile-array-field';
import Education from './wizard-edit-profile-min-req-education';
import ProfessionalRegistrationRequirements from './wizard-edit-profile-professional-reg-req';
import RelatedExperience from './wizard-edit-profile-related-experience';

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
}) => {
  return (
    <Card title="Minimum job requirements" className="custom-card" style={{ marginTop: 16 }}>
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
                label="Education and work experience"
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
              />
            </div>

            <Divider className="hr-reduced-margin" />

            <WizardEditProfileArrayField
              useFormReturn={useFormReturn}
              originalFields={originalPreferencesFields}
              validateVerification={validateVerification}
              label="Preferences"
              tooltip="Use this section to add any preferred education or experience  for the position.  This can be helfpul when screening your pool of candidates. It could be an educational certification, or an experience in a certain type of work."
              fieldName="preferences"
              testId="preferences"
              addButtonText="Add a job preference"
              setEditedFields={setEditedPreferencesFields}
              editedFields={editedPreferencesFields}
            />

            <Divider className="hr-reduced-margin" />

            <WizardEditProfileArrayField
              useFormReturn={useFormReturn}
              originalFields={originalKnowledgeSkillsAbilitiesFields}
              validateVerification={validateVerification}
              label="Knowledge, skills and abilities"
              tooltip="Use this section to add knowledge, skills and abilities required to perform the work successfully."
              fieldName="knowledge_skills_abilities"
              testId="knowledge-skills-abilities"
              addButtonText="Add a knowledge, skill or ability requirement"
              formErrors={formErrors}
              setEditedFields={setEditedKnowledgeSkillsAbilitiesFields}
              editedFields={editedKnowledgeSkillsAbilitiesFields}
            />

            <Divider className="hr-reduced-margin" />

            <WizardEditProfileArrayField
              useFormReturn={useFormReturn}
              originalFields={originalProvisosFields}
              validateVerification={validateVerification}
              label="Willingness statements or provisos"
              tooltip="Use this section to define special requirements of the job to make applicants aware of work environment and other requirements. Examples include requiring travel as part of the job, or willingness to work flexible hours."
              fieldName="willingness_statements"
              testId="proviso"
              addButtonText="Add a proviso"
              setEditedFields={setEditedProvisosFields}
              editedFields={editedProvisosFields}
            />

            <Divider className="hr-reduced-margin" />

            {/* <WizardEditProfileArrayField
              useFormReturn={useFormReturn}
              originalFields={originalProvisosFields}
              validateVerification={validateVerification}
              label=""
              tooltip=""
              fieldName=""
              testId=""
              textField=""
              addButtonText="" */}

            {/* security screenings */}

            <div ref={securityScreeningsSectionRef}>
              <WizardEditProfileArrayField
                useFormReturn={useFormReturn}
                originalFields={originalSecurityScreeningsFields}
                validateVerification={validateVerification}
                label="Security screenings"
                tooltip="Use this section to add any security screenings required for the position. This could include a criminal record check, a security clearance, or a driver's abstract."
                fieldName="security_screenings"
                testId="security-screening"
                addButtonText="Add a security screening requirement"
                setEditedFields={setEditedSecurityScreeningsFields}
                editedFields={editedSecurityScreeningsFields}
                forceSignificant={true} // force significant because security screenings are required, but not marked as significant
                formErrors={formErrors}
              />
            </div>

            <Divider className="hr-reduced-margin" />

            {/* optional requirements */}
            <WizardEditProfileArrayField
              useFormReturn={useFormReturn}
              originalFields={originalOptionalRequirementsFields}
              validateVerification={validateVerification}
              label="Optional requirements"
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
