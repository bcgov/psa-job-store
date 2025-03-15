import { DeleteOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Checkbox, Col, Divider, Form, Row, Tooltip, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import debounce from 'lodash.debounce';
import { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { ContextOptionsReadonly } from '../../wizard/components/context-options-readonly.component';
import BehaviouralComptencyPicker from '../../wizard/components/wizard-behavioural-comptency-picker';
import WizardOverview from '../../wizard/components/wizard-edit-profile-overview';
import WizardProgramOverview from '../../wizard/components/wizard-edit-profile-program-overview';
import WizardValidationError from '../../wizard/components/wizard-edit-profile-validation-error';
import WizardPicker from '../../wizard/components/wizard-picker';
import WizardProfessionalRegistrationPicker from '../../wizard/components/wizard-professional-registration-picker';
import { FormContext } from './form.context';
import ReorderButtons from './reorder-buttons';
import { AccountabilityItem, SecurityScreeningItem } from './total-comp-create-profile.component';
import { useTCContext } from './total-comp-create-profile.provider';

interface TotalCompCreateJobProfileProps {}

export const TotalCompCreateJobProfile: React.FC<TotalCompCreateJobProfileProps> = ({}) => {
  const { isCurrentVersion, jobProfileData, pickerData } = useTCContext();

  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form context must be used within FormContext.Provider');
  }
  const { jobProfileUseFormReturn, professionalRegistrationRequirementsFieldArray } = context;

  const {
    control: profileControl,
    watch: profileWatch,
    setValue: profileSetValue,
    trigger: triggerProfileValidation,
    formState: profileFormState,
  } = jobProfileUseFormReturn;

  const {
    fields: professionalRegistrationRequirementsFields,
    append: appendProfessionalRegistrationRequirement,
    remove: removeProfessionalRegistrationRequirement,
    move: moveProfessionalRegistrationRequirement,
    update: updateProfessionalRegistrationRequirement,
  } = professionalRegistrationRequirementsFieldArray;

  // use ref to hold the flag for auto security settings setup
  const autoSecuritySettingsSetup = useRef(false);
  // automatically add security screenings that don't have family or stream associated with them from the pickdata
  useEffect(() => {
    if (
      pickerData?.requirementsWithoutReadOnly?.securityScreenings &&
      !autoSecuritySettingsSetup.current &&
      location.pathname === '/job-profiles/manage/draft/create'
    ) {
      const securityScreenings = pickerData.requirementsWithoutReadOnly.securityScreenings;
      const securityScreeningsWithoutFamilyStream = securityScreenings.filter(
        (s: any) => s.jobFamilies.length == 0 && !s.classification,
      );
      autoSecuritySettingsSetup.current = true;

      const updated = securityScreeningsWithoutFamilyStream?.map((field: any) => ({
        text: field.text,
        nonEditable: true,
        is_significant: true,
        tc_is_readonly: true,
      }));
      profileSetValue('security_screenings', updated as AccountabilityItem[]);
      triggerProfileValidation();
    }
  }, [pickerData, profileSetValue, triggerProfileValidation]);

  // required accountabilties

  const {
    fields: accountabilitiesFields,
    append: appendAccountability,
    remove: removeAccountability,
    move: moveAccountability,
  } = useFieldArray({
    control: profileControl,
    name: 'accountabilities',
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveAccountability(index, index - 1);
    } else {
      moveAccountability(index, index + 1);
    }
  };

  // Update individual non-editable state based on "Mark all as non-editable" checkbox
  const updateNonEditable = (nonEditable: boolean) => {
    const updatedAccountabilities = accountabilities?.map((field: any) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('accountabilities', updatedAccountabilities as AccountabilityItem[]);
  };

  const updateSignificant = (is_significant: boolean) => {
    const updatedAccountabilities = accountabilities?.map((field: any) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('accountabilities', updatedAccountabilities as AccountabilityItem[]);
  };

  const updateSignificantEdu = (is_significant: boolean) => {
    const updatedExperiences = educations?.map((field: any) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('education', updatedExperiences as AccountabilityItem[]);
  };

  const updateSignificantProReg = (is_significant: boolean) => {
    const updated = professionalRegistrations?.map((field: any) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('professional_registration_requirements', updated as AccountabilityItem[]);
  };

  const updateSignificantSecurityScreenings = (is_significant: boolean) => {
    const updated = securityScreenings?.map((field: any) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('security_screenings', updated as AccountabilityItem[]);
  };

  const updateNonEditableEdu = (nonEditable: boolean) => {
    const updatedExperiences = educations?.map((field: any) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('education', updatedExperiences as AccountabilityItem[]);
  };

  const updateNonEditableProReg = (nonEditable: boolean) => {
    const updated = professionalRegistrations?.map((field: any) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('professional_registration_requirements', updated as AccountabilityItem[]);
  };

  const updateSignificantJob_experience = (is_significant: boolean) => {
    const updatedExperiences = job_experiences?.map((field: any) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('job_experience', updatedExperiences as AccountabilityItem[]);
  };

  const updateNonEditableJob_experience = (nonEditable: boolean) => {
    const updatedExperiences = job_experiences?.map((field: any) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('job_experience', updatedExperiences as AccountabilityItem[]);
  };

  const updateNonEditableSec = (nonEditable: boolean) => {
    const securityScreeningsUpdated = securityScreenings?.map((field: any) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('security_screenings', securityScreeningsUpdated as SecurityScreeningItem[]);
  };

  const markAllNonEditable = profileWatch('markAllNonEditable');
  const markAllNonEditableEdu = profileWatch('markAllNonEditableEdu');
  const markAllSignificantEdu = profileWatch('markAllSignificantEdu');
  const markAllNonEditableProReg = profileWatch('markAllNonEditableProReg');
  const markAllSignificantProReg = profileWatch('markAllSignificantProReg');
  const markAllSignificantSecurityScreenings = profileWatch('markAllSignificantSecurityScreenings');
  const markAllNonEditableJob_experience = profileWatch('markAllNonEditableJob_experience');
  const markAllSignificantJob_experience = profileWatch('markAllSignificantJob_experience');
  const markAllNonEditableSec = profileWatch('markAllNonEditableSec');
  // const markAllNonEditableProfReg = profileWatch('markAllNonEditableProfReg');

  const markAllSignificant = profileWatch('markAllSignificant');
  // New section significance checkboxes
  const isAccountabilitiesSectionSignificant = profileWatch('isAccountabilitiesSectionSignificant');
  const isEducationSectionSignificant = profileWatch('isEducationSectionSignificant');
  const isRelatedExperienceSectionSignificant = profileWatch('isRelatedExperienceSectionSignificant');
  const isProfessionalRegistrationSectionSignificant = profileWatch('isProfessionalRegistrationSectionSignificant');
  const isSecurityScreeningsSectionSignificant = profileWatch('isSecurityScreeningsSectionSignificant');
  
  const accountabilities = profileWatch('accountabilities');
  const securityScreenings = profileWatch('security_screenings');
  const educations = profileWatch('education');
  const professionalRegistrations = profileWatch('professional_registration_requirements');
  const preferences = profileWatch('preferences');
  const knowledgeSkillsAbilities = profileWatch('knowledge_skills_abilities');
  const willingnessStatements = profileWatch('willingness_statements');
  const job_experiences = profileWatch('job_experience');
  // console.log('markAllSignificant: ', markAllSignificant);

  // education
  const {
    fields: educationAndWorkExperienceFields,
    append: appendEducationAndWorkExperience,
    remove: removeEducationAndWorkExperience,
    move: moveEducationAndWorkExperience,
    update: updateEducationAndWorkExperience,
  } = useFieldArray({
    control: profileControl,
    name: 'education',
  });

  const handleEducationAndWorkExperienceMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveEducationAndWorkExperience(index, index - 1);
    } else {
      moveEducationAndWorkExperience(index, index + 1);
    }
  };

  // related experience
  const {
    fields: job_experienceFields,
    append: appendJob_experience,
    remove: removeJob_experience,
    move: moveJob_experience,
  } = useFieldArray({
    control: profileControl,
    name: 'job_experience',
  });

  const handleJob_experienceMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveJob_experience(index, index - 1);
    } else {
      moveJob_experience(index, index + 1);
    }
  };

  // console.log('professionalRegistrationRequirementsFields:', professionalRegistrationRequirementsFields);

  const handleProfessionalRegistrationRequirementsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveProfessionalRegistrationRequirement(index, index - 1);
    } else {
      moveProfessionalRegistrationRequirement(index, index + 1);
    }
  };

  // optional requirements
  const {
    fields: optionalRequirementsFields,
    append: appendOptionalRequirement,
    remove: removeOptionalRequirement,
    move: moveOptionalRequirement,
  } = useFieldArray({
    control: profileControl,
    name: 'optional_requirements',
  });

  const handleOptionalRequirementsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveOptionalRequirement(index, index - 1);
    } else {
      moveOptionalRequirement(index, index + 1);
    }
  };

  // preferences

  const {
    fields: preferencesFields,
    append: appendPreference,
    remove: removePreference,
    move: movePreference,
    update: updatePreference,
  } = useFieldArray({
    control: profileControl,
    name: 'preferences',
  });

  // console.log('preferencesFields: ', preferencesFields);

  const handlePreferencesMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      movePreference(index, index - 1);
    } else {
      movePreference(index, index + 1);
    }
  };

  // knowledge Skills Abilities
  const {
    fields: knowledgeSkillsAbilitiesFields,
    append: appendKnowledgeSkillAbility,
    remove: removeKnowledgeSkillAbility,
    move: moveKnowledgeSkillAbility,
    update: updateKnowledgeSkillAbility,
  } = useFieldArray({
    control: profileControl,
    name: 'knowledge_skills_abilities',
  });

  const handleKnowledgeSkillsAbilitiesMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveKnowledgeSkillAbility(index, index - 1);
    } else {
      moveKnowledgeSkillAbility(index, index + 1);
    }
  };

  // willingness Statements
  const {
    fields: willingnessStatementsFields,
    append: appendWillingnessStatement,
    remove: removeWillingnessStatement,
    move: moveWillingnessStatement,
    update: updateWillingnessStatement,
  } = useFieldArray({
    control: profileControl,
    name: 'willingness_statements',
  });

  const handleWillingnessStatementsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveWillingnessStatement(index, index - 1);
    } else {
      moveWillingnessStatement(index, index + 1);
    }
  };

  //  security Screenings
  const {
    fields: securityScreeningsFields,
    append: appendSecurityScreening,
    remove: removeSecurityScreening,
    move: moveSecurityScreening,
    update: updateSecurityScreeining,
  } = useFieldArray({
    control: profileControl,
    name: 'security_screenings',
  });

  const handleSecurityScreeningsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveSecurityScreening(index, index - 1);
    } else {
      moveSecurityScreening(index, index + 1);
    }
  };

  // behavioural competencies
  const {
    fields: behavioural_competencies_fields,
    append: behavioural_competencies_append,
    remove: behavioural_competencies_remove,
    move: behavioural_competencies_move,
  } = useFieldArray({
    control: profileControl,
    name: 'behavioural_competencies',
  });

  const [profileFormErrors, setProfileFormErrors] = useState<any>({});

  useEffect(() => {
    setProfileFormErrors(profileFormState.errors);
  }, [profileFormState.errors]);

  const itemInPickerData = (text: string, category: string) => {
    return pickerData?.requirementsWithoutReadOnly[category].some((r: any) => r.text === text);
  };

  return (
    <>
      <Row justify="center" style={{ margin: '1rem 0' }}>
        <Col xs={24} sm={24} md={24} lg={20} xl={16}>
          <Form layout="vertical">
            <WizardOverview
              trigger={triggerProfileValidation}
              formErrors={profileFormErrors}
              useFormReturn={jobProfileUseFormReturn}
              readOnly={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
            />
            <WizardProgramOverview
              trigger={triggerProfileValidation}
              formErrors={profileFormErrors}
              useFormReturn={jobProfileUseFormReturn}
              readOnly={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
            />

            <Card title="Accountabilities" style={{ marginTop: 16 }} bordered={false}>
              {/* Required accountabilities */}
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      isCurrentVersion &&
                      !jobProfileData?.jobProfile.is_archived && (
                        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                          <Col>
                            <Form.Item style={{ margin: 0 }}>
                              <Row>
                              <Col>
                                  <Controller
                                    control={profileControl}
                                    name="isAccountabilitiesSectionSignificant"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={isAccountabilitiesSectionSignificant}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          triggerProfileValidation();
                                        }}
                                      >
                                        Is a significant section
                                        <Tooltip title="If selected, all custom fields that users create in this section will trigger classification verification or review.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllNonEditable"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllNonEditable}
                                        disabled={accountabilitiesFields.length === 0}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateNonEditable(e.target.checked);
                                          triggerProfileValidation();
                                        }}
                                      >
                                        Mark all as non-editable
                                        <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllSignificant"
                                    // disable if markAllNonEditable checkbox is on

                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllSignificant || markAllNonEditable}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateSignificant(e.target.checked);
                                          triggerProfileValidation();
                                        }}
                                        disabled={markAllNonEditable || accountabilitiesFields.length === 0}
                                      >
                                        Mark all as significant
                                        <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                
                              </Row>
                            </Form.Item>
                          </Col>
                        </Row>
                      )
                    }
                  >
                    {accountabilitiesFields.map((field, index) => (
                      <Row align="top" key={field.id} gutter={16}>
                        {/* up/down controls */}
                        {isCurrentVersion && !jobProfileData?.jobProfile.is_archived && (
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === accountabilitiesFields.length - 1}
                            />
                          </Col>
                        )}
                        <Col flex="auto">
                          <Row>
                            {/* Non-editable checkbox */}
                            <div style={{ marginBottom: '5px' }}>
                              <Controller
                                name={`accountabilities.${index}.nonEditable`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => {
                                  return (
                                    <Checkbox
                                      onChange={(args) => {
                                        // set this item as significant as well
                                        // console.log('non-editable toggle: ', args);
                                        if (args.target.checked) {
                                          profileSetValue(`accountabilities.${index}.is_significant`, true);
                                        }
                                        if (!args.target.checked) {
                                          // console.log('setting markAllNonEditable to false');
                                          profileSetValue('markAllNonEditable', false);
                                        }
                                        onChange(args);
                                        triggerProfileValidation();
                                      }}
                                      checked={value}
                                      disabled={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
                                    >
                                      Non-editable
                                    </Checkbox>
                                  );
                                }}
                              />
                              <Controller
                                name={`accountabilities.${index}.is_significant`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => {
                                  return (
                                    <Checkbox
                                      onChange={(args) => {
                                        if (!args.target.checked) {
                                          profileSetValue('markAllSignificant', false);
                                        }
                                        onChange(args);
                                        triggerProfileValidation();
                                      }} // send value to hook form
                                      // disable if this item is non-editable
                                      disabled={
                                        accountabilities?.[index].nonEditable ||
                                        !isCurrentVersion ||
                                        jobProfileData?.jobProfile.is_archived
                                      }
                                      checked={value || accountabilities?.[index].nonEditable}
                                    >
                                      Significant
                                    </Checkbox>
                                  );
                                }}
                              />
                            </div>
                          </Row>
                          {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                            <Row gutter={10}>
                              <Col flex="auto">
                                <Form.Item>
                                  <Controller
                                    control={profileControl}
                                    name={`accountabilities.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add an accountability"
                                        onChange={(event) => {
                                          onChange(event);
                                          debounce(triggerProfileValidation, 300)();
                                        }}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <Button
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    removeAccountability(index);
                                    triggerProfileValidation();
                                  }}
                                />
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {accountabilities?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    ))}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <Form.Item>
                        <WizardValidationError formErrors={profileFormErrors} fieldName="accountabilities" />
                        <Button
                          type="link"
                          onClick={() =>
                            appendAccountability({
                              text: '',
                              nonEditable: markAllNonEditable,
                              is_significant: markAllSignificant || markAllNonEditable,
                            })
                          }
                          icon={<PlusOutlined />}
                        >
                          Add an accountability
                        </Button>
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card
              title="Minimum job requirements"
              style={{ marginTop: 16 }}
              bordered={false}
              bodyStyle={{ paddingTop: 0 }}
            >
              {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                <Alert
                  className="custom-alert"
                  role="note"
                  style={{ margin: '0 -24px 24px', borderRadius: '0', paddingBottom: '10px', paddingTop: '10px' }}
                  message=""
                  description="Some information may have been added based on the details you have already provided."
                  type="info"
                  showIcon
                />
              ) : (
                <></>
              )}

              {/* Eduction */}

              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row
                        justify="space-between"
                        align="middle"
                        style={{
                          width: '100%',
                          marginTop: !isCurrentVersion || jobProfileData?.jobProfile.is_archived ? '1rem' : undefined,
                        }}
                      >
                        <Col>Education and work experience</Col>
                        <Col>
                          <Form.Item style={{ margin: 0 }}>
                            {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                              <Row>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="isEducationSectionSignificant"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={isEducationSectionSignificant}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          triggerProfileValidation();
                                        }}
                                      >
                                        Is a significant section
                                        <Tooltip title="If selected, all custom fields that users create in this section will trigger classification verification or review.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllNonEditableEdu"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllNonEditableEdu}
                                        disabled={educationAndWorkExperienceFields.length === 0}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateNonEditableEdu(e.target.checked);
                                        }}
                                      >
                                        Mark all as non-editable
                                        <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllSignificantEdu"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllSignificantEdu || markAllNonEditableEdu}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateSignificantEdu(e.target.checked);
                                        }}
                                        disabled={
                                          markAllNonEditableEdu || educationAndWorkExperienceFields.length === 0
                                        }
                                      >
                                        Mark all as significant
                                        <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                
                              </Row>
                            ) : (
                              <></>
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                    }
                  >
                    {educationAndWorkExperienceFields.map((field, index) => (
                      <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                        {/* up/down controls */}
                        {isCurrentVersion && !jobProfileData?.jobProfile.is_archived && (
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleEducationAndWorkExperienceMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === educationAndWorkExperienceFields.length - 1}
                            />
                          </Col>
                        )}
                        <Col flex="auto">
                          <Row>
                            {/* Non-editable checkbox */}
                            <div style={{ marginBottom: '5px' }}>
                              <Controller
                                name={`education.${index}.nonEditable`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      // set this item as significant as well
                                      if (args.target.checked) {
                                        profileSetValue(`education.${index}.is_significant`, true);
                                      }
                                      if (!args.target.checked) {
                                        profileSetValue('markAllNonEditableEdu', false);
                                      }
                                      onChange(args);
                                    }}
                                    checked={value}
                                    disabled={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
                                  >
                                    Non-editable
                                  </Checkbox>
                                )}
                              />
                              <Controller
                                name={`education.${index}.is_significant`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      if (!args.target.checked) {
                                        profileSetValue('markAllSignificantEdu', false);
                                      }
                                      onChange(args);
                                    }}
                                    disabled={
                                      educations?.[index].nonEditable ||
                                      !isCurrentVersion ||
                                      jobProfileData?.jobProfile.is_archived
                                    }
                                    checked={value || educations?.[index].nonEditable}
                                  >
                                    Significant
                                  </Checkbox>
                                )}
                              />
                            </div>
                          </Row>
                          {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                            <Row gutter={10}>
                              <Col flex="auto">
                                {field.tc_is_readonly &&
                                  itemInPickerData(field.text?.toString() ?? '', 'jobProfileMinimumRequirements') && (
                                    <div style={{ display: 'flex' }}>
                                      <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                        {field.text?.toString()}
                                      </Typography.Text>
                                    </div>
                                  )}

                                <Form.Item
                                  style={{
                                    display:
                                      field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'jobProfileMinimumRequirements')
                                        ? 'none'
                                        : 'block',
                                  }}
                                >
                                  <Controller
                                    control={profileControl}
                                    name={`education.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add education"
                                        onChange={(event) => {
                                          onChange(event);
                                          debounce(triggerProfileValidation, 300)();
                                        }}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <ContextOptionsReadonly
                                  isReadonly={
                                    (field.tc_is_readonly &&
                                      itemInPickerData(
                                        field.text?.toString() ?? '',
                                        'jobProfileMinimumRequirements',
                                      )) ??
                                    false
                                  }
                                  onEdit={() => {
                                    updateEducationAndWorkExperience(index, {
                                      ...educationAndWorkExperienceFields[index],
                                      tc_is_readonly: false,
                                    });
                                    // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                  }}
                                  onRemove={() => {
                                    removeEducationAndWorkExperience(index);
                                    triggerProfileValidation();
                                  }}
                                />
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {educationAndWorkExperienceFields?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    ))}

                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <>
                        <WizardValidationError formErrors={profileFormErrors} fieldName="education" />

                        <Form.Item>
                          <Row>
                            <Col>
                              <WizardPicker
                                data={pickerData?.requirementsWithoutReadOnly?.jobProfileMinimumRequirements}
                                fields={educations}
                                addAction={appendEducationAndWorkExperience}
                                removeAction={removeEducationAndWorkExperience}
                                triggerValidation={triggerProfileValidation}
                                title="Education and work experiences"
                                buttonText="Browse and add education"
                                tc_is_readonly={true}
                              />
                            </Col>
                            <Col>
                              <Button
                                type="link"
                                onClick={() =>
                                  appendEducationAndWorkExperience({
                                    text: '',
                                    nonEditable: markAllNonEditableEdu,
                                    is_significant: markAllSignificantEdu || markAllNonEditableEdu,
                                  })
                                }
                                icon={<PlusOutlined />}
                              >
                                Add custom education
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>

                        {/* <Form.Item>
                      <Button
                        type="link"
                        onClick={() =>
                          appendEducationAndWorkExperience({
                            text: '',
                            nonEditable: markAllNonEditableEdu,
                            is_significant: markAllSignificantEdu,
                          })
                        }
                        icon={<PlusOutlined />}
                      >
                        Add education
                      </Button>
                    </Form.Item> */}
                      </>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="hr-reduced-margin" />

              {/* Related experience */}
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                        <Col>Related experience</Col>
                        <Col>
                          {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                            <Form.Item style={{ margin: 0 }}>
                              <Row>
                              <Col>
                                  <Controller
                                    control={profileControl}
                                    name="isRelatedExperienceSectionSignificant"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={isRelatedExperienceSectionSignificant}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          triggerProfileValidation();
                                        }}
                                        disabled={!isCurrentVersion}
                                      >
                                        Is a significant section
                                        <Tooltip title="If selected, all custom fields that users create in this section will trigger classification verification or review.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllNonEditableJob_experience"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllNonEditableJob_experience}
                                        disabled={
                                          job_experienceFields.length === 0 ||
                                          (!isCurrentVersion && !jobProfileData?.jobProfile.is_archived)
                                        }
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateNonEditableJob_experience(e.target.checked);
                                        }}
                                      >
                                        Mark all as non-editable
                                        <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllSignificantJob_experience"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllSignificantJob_experience || markAllNonEditableJob_experience}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateSignificantJob_experience(e.target.checked);
                                        }}
                                        disabled={
                                          markAllNonEditableJob_experience ||
                                          job_experienceFields.length === 0 ||
                                          (!isCurrentVersion && !jobProfileData?.jobProfile.is_archived)
                                        }
                                      >
                                        Mark all as significant
                                        <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                              </Row>
                            </Form.Item>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    }
                  >
                    {job_experienceFields.map((field, index) => (
                      <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                        {/* up/down controls */}
                        {isCurrentVersion && !jobProfileData?.jobProfile.is_archived && (
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleJob_experienceMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === job_experienceFields.length - 1}
                            />
                          </Col>
                        )}
                        <Col flex="auto">
                          <Row>
                            {/* Non-editable checkbox */}
                            <div style={{ marginBottom: '5px' }}>
                              <Controller
                                name={`job_experience.${index}.nonEditable`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      // set this item as significant as well
                                      if (args.target.checked) {
                                        profileSetValue(`job_experience.${index}.is_significant`, true);
                                      }
                                      if (!args.target.checked) {
                                        profileSetValue('markAllNonEditableJob_experience', false);
                                      }
                                      onChange(args);
                                    }}
                                    checked={value}
                                    disabled={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
                                  >
                                    Non-editable
                                  </Checkbox>
                                )}
                              />
                              <Controller
                                name={`job_experience.${index}.is_significant`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      if (!args.target.checked) {
                                        profileSetValue('markAllSignificantJob_experience', false);
                                      }
                                      onChange(args);
                                    }}
                                    disabled={
                                      job_experiences?.[index].nonEditable ||
                                      !isCurrentVersion ||
                                      jobProfileData?.jobProfile.is_archived
                                    }
                                    checked={value || job_experiences?.[index].nonEditable}
                                  >
                                    Significant
                                  </Checkbox>
                                )}
                              />
                            </div>
                          </Row>
                          {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                            <Row gutter={10}>
                              <Col flex="auto">
                                <Form.Item>
                                  <Controller
                                    control={profileControl}
                                    name={`job_experience.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add related experience"
                                        onChange={(event) => {
                                          onChange(event);
                                          debounce(triggerProfileValidation, 300)();
                                        }}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <Button
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    removeJob_experience(index);
                                    triggerProfileValidation();
                                  }}
                                />
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {job_experiences?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    ))}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <>
                        <WizardValidationError formErrors={profileFormErrors} fieldName="job_experience" />
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() =>
                              appendJob_experience({
                                text: '',
                                nonEditable: markAllNonEditableJob_experience,
                                is_significant: markAllSignificantJob_experience || markAllNonEditableJob_experience,
                              })
                            }
                            icon={<PlusOutlined />}
                          >
                            Add an experience requirement
                          </Button>
                        </Form.Item>
                      </>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="hr-reduced-margin"></Divider>

              {/* Professional registration requirement */}
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                        <Col>Professional registration and certification requirements</Col>
                        {/* NEW */}

                        <Col>
                          {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                            <Form.Item style={{ margin: 0 }}>
                              <Row>
                              <Col>
                                  <Controller
                                    control={profileControl}
                                    name="isProfessionalRegistrationSectionSignificant"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={isProfessionalRegistrationSectionSignificant}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          triggerProfileValidation();
                                        }}
                                        disabled={!isCurrentVersion}
                                      >
                                        Is a significant section
                                        <Tooltip title="If selected, all custom fields that users create in this section will trigger classification verification or review.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllNonEditableProReg"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllNonEditableProReg}
                                        disabled={
                                          professionalRegistrationRequirementsFields.length === 0 ||
                                          (!isCurrentVersion && !jobProfileData?.jobProfile.is_archived)
                                        }
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateNonEditableProReg(e.target.checked);
                                        }}
                                      >
                                        Mark all as non-editable
                                        <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllSignificantProReg"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllSignificantProReg || markAllNonEditableProReg}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateSignificantProReg(e.target.checked);
                                        }}
                                        disabled={
                                          markAllNonEditableProReg ||
                                          professionalRegistrationRequirementsFields.length === 0 ||
                                          (!isCurrentVersion && !jobProfileData?.jobProfile.is_archived)
                                        }
                                      >
                                        Mark all as significant
                                        <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                              </Row>
                            </Form.Item>
                          ) : (
                            <></>
                          )}
                        </Col>

                        {/* END NEW */}
                      </Row>
                    }
                  >
                    {professionalRegistrationRequirementsFields.map((field: any, index: any) => (
                      <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                        {/* up/down controls */}
                        {isCurrentVersion && !jobProfileData?.jobProfile.is_archived && (
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleProfessionalRegistrationRequirementsMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === professionalRegistrationRequirementsFields.length - 1}
                            />
                          </Col>
                        )}
                        <Col flex="auto">
                          <Row>
                            {/* NEW Non-editable checkbox */}
                            <div style={{ marginBottom: '5px' }}>
                              <Controller
                                name={`professional_registration_requirements.${index}.nonEditable`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      // set this item as significant as well
                                      if (args.target.checked) {
                                        profileSetValue(
                                          `professional_registration_requirements.${index}.is_significant`,
                                          true,
                                        );
                                      }
                                      if (!args.target.checked) {
                                        profileSetValue('markAllNonEditableProReg', false);
                                      }
                                      onChange(args);
                                    }}
                                    checked={value}
                                    disabled={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
                                  >
                                    Non-editable
                                  </Checkbox>
                                )}
                              />
                              <Controller
                                name={`professional_registration_requirements.${index}.is_significant`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      if (!args.target.checked) {
                                        profileSetValue('markAllSignificantProReg', false);
                                      }
                                      onChange(args);
                                    }}
                                    disabled={
                                      professionalRegistrations?.[index].nonEditable ||
                                      !isCurrentVersion ||
                                      jobProfileData?.jobProfile.is_archived
                                    }
                                    checked={value || professionalRegistrations?.[index].nonEditable}
                                  >
                                    Significant
                                  </Checkbox>
                                )}
                              />
                            </div>
                            {/* END NEW Non-editable checkbox */}
                          </Row>
                          {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                            <Row gutter={10}>
                              <Col flex="auto">
                                {/* Needs to be tc_is_readonly AND exist in the picklist to appear as read only */}
                                {field.tc_is_readonly &&
                                  itemInPickerData(
                                    field.text?.toString() ?? '',
                                    'professionalRegistrationRequirements',
                                  ) && (
                                    <div style={{ display: 'flex' }}>
                                      <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                        {field.text?.toString()}
                                      </Typography.Text>
                                    </div>
                                  )}
                                <Form.Item
                                  style={{
                                    display:
                                      field.tc_is_readonly &&
                                      itemInPickerData(
                                        field.text?.toString() ?? '',
                                        'professionalRegistrationRequirements',
                                      )
                                        ? 'none'
                                        : 'block',
                                  }}
                                >
                                  <Controller
                                    control={profileControl}
                                    name={`professional_registration_requirements.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => {
                                      return (
                                        <>
                                          <TextArea
                                            autoSize
                                            placeholder="Add a professional registration or certification requirement"
                                            onChange={(event) => {
                                              onChange(event);
                                              debounce(triggerProfileValidation, 300)();
                                            }}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        </>
                                      );
                                    }}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <ContextOptionsReadonly
                                  isReadonly={
                                    (field.tc_is_readonly &&
                                      itemInPickerData(
                                        field.text?.toString() ?? '',
                                        'professionalRegistrationRequirements',
                                      )) ??
                                    false
                                  }
                                  onEdit={() => {
                                    updateProfessionalRegistrationRequirement(index, {
                                      ...professionalRegistrationRequirementsFields[index],
                                      tc_is_readonly: false,
                                    });
                                  }}
                                  onRemove={() => {
                                    removeProfessionalRegistrationRequirement(index);
                                    triggerProfileValidation();
                                  }}
                                />
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {professionalRegistrationRequirementsFields?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    ))}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <>
                        <WizardValidationError
                          formErrors={profileFormErrors}
                          fieldName="professional_registration_requirements"
                        />
                        <Form.Item>
                          <Row>
                            <Col>
                              <WizardProfessionalRegistrationPicker
                                data={pickerData?.requirementsWithoutReadOnly?.professionalRegistrationRequirements}
                                fields={professionalRegistrations}
                                addAction={appendProfessionalRegistrationRequirement}
                                removeAction={removeProfessionalRegistrationRequirement}
                                triggerValidation={triggerProfileValidation}
                              />
                            </Col>
                            <Col>
                              <Button
                                type="link"
                                onClick={() =>
                                  appendProfessionalRegistrationRequirement({
                                    text: '',
                                    nonEditable: markAllNonEditableProReg,
                                    is_significant: markAllSignificantProReg || markAllNonEditableProReg,
                                  })
                                }
                                icon={<PlusOutlined />}
                              >
                                Add a custom requirement
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                      </>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="hr-reduced-margin" />

              {/* Preferences */}
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row justify="space-between" align="middle">
                        <Col>Preferences</Col>
                      </Row>
                    }
                  >
                    {preferencesFields.map((field, index) =>
                      isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                        <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                          {/* up/down controls */}
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handlePreferencesMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === preferencesFields.length - 1}
                            />
                          </Col>
                          <Col flex="auto">
                            <Row gutter={10}>
                              <Col flex="auto">
                                {field.tc_is_readonly &&
                                  itemInPickerData(field.text?.toString() ?? '', 'preferences') && (
                                    <div style={{ display: 'flex' }}>
                                      <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                        {field.text?.toString()}
                                      </Typography.Text>
                                    </div>
                                  )}
                                <Form.Item
                                  style={{
                                    display:
                                      field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'preferences')
                                        ? 'none'
                                        : 'block',
                                  }}
                                >
                                  <Controller
                                    control={profileControl}
                                    name={`preferences.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add a preference"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <ContextOptionsReadonly
                                  isReadonly={
                                    (field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'preferences')) ??
                                    false
                                  }
                                  onEdit={() => {
                                    updatePreference(index, {
                                      ...preferencesFields[index],
                                      tc_is_readonly: false,
                                    });
                                    // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                  }}
                                  onRemove={() => {
                                    removePreference(index);
                                    triggerProfileValidation();
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ) : (
                        <Row gutter={10}>
                          <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                            {preferencesFields?.[index].text?.toString()}
                          </Typography.Text>
                        </Row>
                      ),
                    )}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <Form.Item>
                        <Row>
                          <Col>
                            <WizardPicker
                              data={pickerData?.requirementsWithoutReadOnly?.preferences}
                              fields={preferences}
                              addAction={appendPreference}
                              removeAction={removePreference}
                              triggerValidation={triggerProfileValidation}
                              title="Preferences"
                              buttonText="Browse and add preferences"
                              tc_is_readonly={true}
                            />
                          </Col>
                          <Col>
                            <Button type="link" onClick={() => appendPreference({ text: '' })} icon={<PlusOutlined />}>
                              Add a custom job preference
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="hr-reduced-margin" />

              {/* Knowledge skills and abilities */}
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row justify="space-between" align="middle">
                        <Col>Knowledge, Skills, and Abilities</Col>
                      </Row>
                    }
                  >
                    {knowledgeSkillsAbilitiesFields.map((field, index) =>
                      isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                        <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                          {/* up/down controls */}
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleKnowledgeSkillsAbilitiesMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === knowledgeSkillsAbilitiesFields.length - 1}
                            />
                          </Col>
                          <Col flex="auto">
                            <Row gutter={10}>
                              <Col flex="auto">
                                {field.tc_is_readonly &&
                                  itemInPickerData(field.text?.toString() ?? '', 'knowledgeSkillsAbilities') && (
                                    <div style={{ display: 'flex' }}>
                                      <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                        {field.text?.toString()}
                                      </Typography.Text>
                                    </div>
                                  )}
                                <Form.Item
                                  style={{
                                    display:
                                      field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'knowledgeSkillsAbilities')
                                        ? 'none'
                                        : 'block',
                                  }}
                                >
                                  <Controller
                                    control={profileControl}
                                    name={`knowledge_skills_abilities.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add a knowledge, skill, or ability"
                                        onChange={(event) => {
                                          onChange(event);
                                          debounce(triggerProfileValidation, 300)();
                                        }}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <ContextOptionsReadonly
                                  isReadonly={
                                    (field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'knowledgeSkillsAbilities')) ??
                                    false
                                  }
                                  onEdit={() => {
                                    updateKnowledgeSkillAbility(index, {
                                      ...knowledgeSkillsAbilitiesFields[index],
                                      tc_is_readonly: false,
                                    });
                                    // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                  }}
                                  onRemove={() => {
                                    removeKnowledgeSkillAbility(index);
                                    triggerProfileValidation();
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ) : (
                        <Row gutter={10}>
                          <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                            {knowledgeSkillsAbilitiesFields?.[index].text?.toString()}
                          </Typography.Text>
                        </Row>
                      ),
                    )}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <>
                        <WizardValidationError formErrors={profileFormErrors} fieldName="knowledge_skills_abilities" />
                        <Form.Item>
                          <Row>
                            <Col>
                              <WizardPicker
                                data={pickerData?.requirementsWithoutReadOnly?.knowledgeSkillsAbilities}
                                fields={knowledgeSkillsAbilities}
                                addAction={appendKnowledgeSkillAbility}
                                removeAction={removeKnowledgeSkillAbility}
                                triggerValidation={triggerProfileValidation}
                                title="Knowledge, skill and ability requirements"
                                buttonText="Browse and add knowledge, skill and abilities"
                                tc_is_readonly={true}
                              />
                            </Col>
                            <Col>
                              <Button
                                type="link"
                                onClick={() => appendKnowledgeSkillAbility({ text: '' })}
                                icon={<PlusOutlined />}
                              >
                                Add a custom requirement
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                      </>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="hr-reduced-margin" />
              {/* Provisios */}

              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row justify="space-between" align="middle">
                        <Col>Willingness Statements or Provisos</Col>
                      </Row>
                    }
                  >
                    {willingnessStatementsFields.map((field, index) =>
                      isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                        <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                          {/* up/down controls */}
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleWillingnessStatementsMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === willingnessStatementsFields.length - 1}
                            />
                          </Col>
                          <Col flex="auto">
                            <Row>{/* Non-editable checkbox */}</Row>
                            <Row gutter={10}>
                              <Col flex="auto">
                                {field.tc_is_readonly && (
                                  <div style={{ display: 'flex' }}>
                                    <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                      {field.text?.toString()}
                                    </Typography.Text>
                                  </div>
                                )}
                                <Form.Item style={{ display: field.tc_is_readonly ? 'none' : 'block' }}>
                                  <Controller
                                    control={profileControl}
                                    name={`willingness_statements.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add a willingness statement or proviso"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                {/* <Button icon={<DeleteOutlined />} onClick={() => removeWillingnessStatement(index)} /> */}
                                <ContextOptionsReadonly
                                  isReadonly={field.tc_is_readonly ?? false}
                                  onEdit={() => {
                                    updateWillingnessStatement(index, {
                                      ...willingnessStatementsFields[index],
                                      tc_is_readonly: false,
                                    });
                                    // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                  }}
                                  onRemove={() => {
                                    removeWillingnessStatement(index);
                                    triggerProfileValidation();
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ) : (
                        <Row gutter={10}>
                          <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                            {willingnessStatementsFields?.[index].text?.toString()}
                          </Typography.Text>
                        </Row>
                      ),
                    )}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <Form.Item>
                        <Row>
                          <Col>
                            <WizardPicker
                              data={pickerData?.requirementsWithoutReadOnly?.willingnessStatements}
                              fields={willingnessStatements}
                              addAction={appendWillingnessStatement}
                              removeAction={removeWillingnessStatement}
                              triggerValidation={triggerProfileValidation}
                              title="Willingness statements or provisos"
                              buttonText="Browse and add provisos"
                              tc_is_readonly={true}
                            />
                          </Col>
                          <Col>
                            <Button
                              type="link"
                              onClick={() => appendWillingnessStatement({ text: '' })}
                              icon={<PlusOutlined />}
                            >
                              Add a custom proviso
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="hr-reduced-margin" />
              {/* Security screenings */}
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                        <Col>Security Screenings</Col>
                        {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                          <Col>
                            <Form.Item style={{ margin: 0 }}>
                              <Row>
                              <Col>
                                  <Controller
                                    control={profileControl}
                                    name="isSecurityScreeningsSectionSignificant"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={isSecurityScreeningsSectionSignificant}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          triggerProfileValidation();
                                        }}
                                        disabled={!isCurrentVersion}
                                      >
                                        Is a significant section
                                        <Tooltip title="If selected, all custom fields that users create in this section will trigger classification verification or review.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllNonEditableSec"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllNonEditableSec}
                                        disabled={professionalRegistrationRequirementsFields.length === 0}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateNonEditableSec(e.target.checked);
                                        }}
                                      >
                                        Mark all as non-editable
                                        <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                <Col>
                                  <Controller
                                    control={profileControl}
                                    name="markAllSignificantSecurityScreenings"
                                    render={({ field }) => (
                                      <Checkbox
                                        {...field}
                                        checked={markAllSignificantSecurityScreenings || markAllNonEditableSec}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked);
                                          updateSignificantSecurityScreenings(e.target.checked);
                                        }}
                                        disabled={
                                          markAllNonEditableSec ||
                                          securityScreeningsFields.length === 0 ||
                                          (!isCurrentVersion && !jobProfileData?.jobProfile.is_archived)
                                        }
                                      >
                                        Mark all as significant
                                        <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                          <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                        </Tooltip>
                                      </Checkbox>
                                    )}
                                  ></Controller>
                                </Col>
                                
                              </Row>
                            </Form.Item>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </Row>
                    }
                  >
                    {securityScreeningsFields.map((field, index) => (
                      <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                        {/* up/down controls */}
                        {isCurrentVersion && !jobProfileData?.jobProfile.is_archived && (
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleSecurityScreeningsMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === securityScreeningsFields.length - 1}
                            />
                          </Col>
                        )}
                        <Col flex="auto">
                          <Row>
                            {/* Non-editable checkbox */}
                            <div style={{ marginBottom: '5px' }}>
                              <Controller
                                name={`security_screenings.${index}.nonEditable`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      // set this item as significant as well
                                      if (args.target.checked) {
                                        profileSetValue(`security_screenings.${index}.is_significant`, true);
                                      }
                                      if (!args.target.checked) {
                                        profileSetValue('markAllNonEditableSec', false);
                                      }
                                      onChange(args);
                                    }}
                                    checked={value}
                                    disabled={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
                                  >
                                    Non-editable
                                  </Checkbox>
                                )}
                              />

                              <Controller
                                name={`security_screenings.${index}.is_significant`}
                                control={profileControl}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    onChange={(args) => {
                                      if (!args.target.checked) {
                                        profileSetValue('markAllSignificantSecurityScreenings', false);
                                      }
                                      onChange(args);
                                    }}
                                    disabled={
                                      securityScreenings?.[index].nonEditable ||
                                      !isCurrentVersion ||
                                      jobProfileData?.jobProfile.is_archived
                                    }
                                    checked={value || securityScreenings?.[index].nonEditable}
                                  >
                                    Significant
                                  </Checkbox>
                                )}
                              />
                            </div>
                          </Row>
                          {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                            <Row gutter={10}>
                              <Col flex="auto">
                                {field.tc_is_readonly &&
                                  itemInPickerData(field.text?.toString() ?? '', 'securityScreenings') && (
                                    <div style={{ display: 'flex' }}>
                                      <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                        {field.text?.toString()}
                                      </Typography.Text>
                                    </div>
                                  )}
                                <Form.Item
                                  style={{
                                    display:
                                      field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'securityScreenings')
                                        ? 'none'
                                        : 'block',
                                  }}
                                >
                                  <Controller
                                    control={profileControl}
                                    name={`security_screenings.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add a security screenings requirement"
                                        onChange={(event) => {
                                          onChange(event);
                                          debounce(triggerProfileValidation, 300)();
                                        }}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <ContextOptionsReadonly
                                  isReadonly={
                                    (field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'securityScreenings')) ??
                                    false
                                  }
                                  onEdit={() => {
                                    updateSecurityScreeining(index, {
                                      ...securityScreeningsFields[index],
                                      tc_is_readonly: false,
                                    });
                                    // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                  }}
                                  onRemove={() => {
                                    removeSecurityScreening(index);
                                    triggerProfileValidation();
                                  }}
                                />
                                {/* <Button
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              removeSecurityScreening(index);
                              triggerProfileValidation();
                            }}
                          /> */}
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {securityScreeningsFields?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    ))}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <>
                        <WizardValidationError formErrors={profileFormErrors} fieldName="security_screenings" />
                        <Form.Item>
                          <Row>
                            <Col>
                              <WizardPicker
                                data={pickerData?.requirementsWithoutReadOnly?.securityScreenings}
                                fields={securityScreenings}
                                addAction={appendSecurityScreening}
                                removeAction={removeSecurityScreening}
                                triggerValidation={triggerProfileValidation}
                                title="Security screenings"
                                buttonText="Browse and add security screenings"
                                addAsSignificantAndReadonly={true}
                                tc_is_readonly={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
                              />
                            </Col>
                            <Col>
                              <Button
                                type="link"
                                onClick={() =>
                                  appendSecurityScreening({
                                    text: '',
                                    nonEditable: markAllNonEditableSec,
                                    is_significant: markAllSignificantSecurityScreenings || markAllNonEditableSec,
                                  })
                                }
                                icon={<PlusOutlined />}
                              >
                                Add a custom requirement
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                      </>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="hr-reduced-margin" />
              {/* other requirements */}
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    labelCol={{ className: 'full-width-label card-label' }}
                    label={
                      <Row justify="space-between" align="middle">
                        <Col>Other requirements</Col>
                      </Row>
                    }
                  >
                    {optionalRequirementsFields.map((field, index) =>
                      isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                        <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                          {/* up/down controls */}
                          <Col flex="none" className="reorder-controls">
                            <ReorderButtons
                              index={index}
                              moveItem={handleOptionalRequirementsMove}
                              upperDisabled={index === 0}
                              lowerDisabled={index === optionalRequirementsFields.length - 1}
                            />
                          </Col>
                          <Col flex="auto">
                            <Row>{/* Non-editable checkbox */}</Row>
                            <Row gutter={10}>
                              <Col flex="auto">
                                <Form.Item>
                                  <Controller
                                    control={profileControl}
                                    name={`optional_requirements.${index}.text`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextArea
                                        autoSize
                                        placeholder="Add an optional requirement"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <Button icon={<DeleteOutlined />} onClick={() => removeOptionalRequirement(index)} />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ) : (
                        <Row gutter={10}>
                          <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                            {optionalRequirementsFields?.[index].text?.toString()}
                          </Typography.Text>
                        </Row>
                      ),
                    )}
                    {isCurrentVersion && !jobProfileData?.jobProfile.is_archived ? (
                      <Form.Item>
                        <Button
                          type="link"
                          onClick={() => appendOptionalRequirement({ text: '' })}
                          icon={<PlusOutlined />}
                        >
                          Add an optional requirement
                        </Button>
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                  </Form.Item>
                  {/* Todo: if refactoring, need to also add the re-arrange buttons */}
                  {/* <WizardEditProfileArrayField
                useFormReturn={jobProfileUseFormReturn}
                label="Optional requirements"
                fieldName="optional_requirements"
                testId="optional-requirement"
                addButtonText="Add an optional requirement"
              /> */}
                </Col>
              </Row>
            </Card>

            <Card title="Behavioural competencies" style={{ marginTop: 16 }} bordered={false}>
              <BehaviouralComptencyPicker
                behavioural_competencies_fields={behavioural_competencies_fields}
                addAction={behavioural_competencies_append}
                removeAction={behavioural_competencies_remove}
                moveAction={behavioural_competencies_move}
                validateFunction={triggerProfileValidation}
                formErrors={profileFormErrors}
                useFormReturn={jobProfileUseFormReturn}
                readOnly={!isCurrentVersion || jobProfileData?.jobProfile.is_archived}
              ></BehaviouralComptencyPicker>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
};
