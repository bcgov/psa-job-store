/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExclamationCircleFilled, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Alert, Col, Descriptions, Form, Input, List, Row, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { MutableRefObject, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import DOMPurify from 'dompurify';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import PositionProfile from '../../../components/app/common/components/positionProfile';
import '../../../components/app/common/css/custom-descriptions.css';
import '../../../components/app/common/css/custom-form.css';
import {
  AccountabilitiesModel,
  JobProfileModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import { useGetJobProfileQuery, useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import AccountabilitiesSection from './wizard-edit-profile-accountabilities-section';
import WizardBehaviouralCompetencies from './wizard-edit-profile-behavioural-competencies';
import MinimumRequirementsSection from './wizard-edit-profile-minimum-job-req-section';
import WizardOverview from './wizard-edit-profile-overview';
import WizardProgramOverview from './wizard-edit-profile-program-overview';
import WizardTitle from './wizard-edit-profile-title';
import './wizard-edit-profile.css';
import { useWizardContext } from './wizard.provider';

interface ConfigProps {
  contextEditable?: boolean;
}

interface WizardEditProfileProps {
  id?: string;
  profileData?: JobProfileModel | null;
  config?: ConfigProps;
  submitText?: string;
  showBackButton?: boolean;
  onVerificationRequiredChange?: (verificationRequired: boolean) => void;
  handleFormChange: (state: boolean) => void;
}

enum reasons {
  ACCOUNTABILITIES = 'Changes in Accountabilities',
  EDUCATION = 'Changes in Education',
  JOB_EXPERIENCE = 'Changes in Job Experience',
  SECURITY_SCREENINGS = 'Changes in Security Screenings',
  PROFESSIONAL_REGISTRATIONS = 'Changes in Professional Registration and Certification Requirements',
}

type sectionMap = {
  [reason in reasons]: MutableRefObject<null | HTMLDivElement>;
};

const WizardEditProfile = forwardRef(
  ({ id, profileData, config, onVerificationRequiredChange, handleFormChange }: WizardEditProfileProps, ref) => {
    const {
      originalValuesSet,
      setOriginalValuesSet,
      originalOverview,
      setOriginalOverview,
      // originalProgramOverview,
      setOriginalProgramOverview,
      originalTitle,
      setOriginalTitle,
      originalMinReqFields,
      setOriginalMinReqFields,
      originalRelWorkFields,
      setOriginalRelWorkFields,
      originalSecurityScreeningsFields,
      setOriginalSecurityScreeningsFields,
      originalAccReqFields,
      setOriginalAccReqFields,
      originalOptReqFields,
      setOriginalOptReqFields,

      originalProfessionalRegistrationFields,
      setOriginalProfessionalRegistrationFields,

      originalOptionalRequirementsFields,
      setOriginalOptionalRequirementsFields,

      originalPreferencesFields,
      setOriginalPreferencesFields,
      originalKnowledgeSkillsAbilitiesFields,
      setOriginalKnowledgeSkillsAbilitiesFields,
      originalProvisosFields,
      setOriginalProvisosFields,
      originalBehaviouralCompetenciesFields,
      setOriginalBehaviouralCompetenciesFields,
      positionRequestProfileId,
      // errors,
      currentSection,
      setCurrentSection,
    } = useWizardContext();

    const acctSection = useRef<null | HTMLDivElement>(null);
    const educationSection = useRef<null | HTMLDivElement>(null);
    const workExperienceSection = useRef<null | HTMLDivElement>(null);
    const professionalRegSection = useRef<null | HTMLDivElement>(null);
    const securitySection = useRef<null | HTMLDivElement>(null);
    const sections: sectionMap = {
      [reasons.ACCOUNTABILITIES]: acctSection,
      [reasons.EDUCATION]: educationSection,
      [reasons.JOB_EXPERIENCE]: workExperienceSection,
      [reasons.SECURITY_SCREENINGS]: securitySection,
      [reasons.PROFESSIONAL_REGISTRATIONS]: professionalRegSection,
    };
    const [verificationNeededReasons, setVerificationNeededReasons] = useState<string[]>([]);

    const [editedProvisosFields, setEditedProvisosFields] = useState<{ [key: number]: boolean }>({});
    const [editedProfessionalRegistrationFields, setEditedProfessionalRegistrationFields] = useState<{
      [key: number]: boolean;
    }>({});
    const [editedOptionalRequirementsFields, setEditedOptionalRequirementsFields] = useState<{
      [key: number]: boolean;
    }>({});
    const [editedPreferencesFields, setEditedPreferencesFields] = useState<{ [key: number]: boolean }>({});
    const [editedKnowledgeSkillsAbilitiesFields, setEditedKnowledgeSkillsAbilitiesFields] = useState<{
      [key: number]: boolean;
    }>({});

    const handleSectionScroll = (reason: string) => {
      for (const key in sections) {
        if (key === reason) {
          const section = sections[key as keyof typeof sections];
          if (section && section.current) {
            setTimeout(() => {
              section.current && section.current.scrollIntoView({ behavior: 'smooth' });
            }, 300);
            break;
          }
        }
      }
    };
    useEffect(() => {
      // only checking securitySection is set, to ensure those sections have loaded
      if (effectiveData && currentSection && securitySection.current) {
        handleSectionScroll(currentSection);
        setCurrentSection(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acctSection.current]);
    // get original profile data for comparison to the edited state
    const { data: originalProfileData } = useGetJobProfileQuery({ id: positionRequestProfileId ?? -1 });
    const initialData = profileData ?? null;
    const [effectiveData, setEffectiveData] = useState<JobProfileModel | null>(initialData);
    const [requiresVerification, setRequiresVerification] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);
    const [triggerGetJobProfile, { data, isLoading }] = useLazyGetJobProfileQuery();

    const [pickerData, setPickerData] = useState<any>({});

    const [editedAccReqFields, setEditedAccReqFields] = useState<{ [key: number]: boolean }>({});
    const [editedMinReqFields, setEditedMinReqFields] = useState<{ [key: number]: boolean }>({});
    const [editedRelWorkFields, setEditedRelWorkFields] = useState<{ [key: number]: boolean }>({});
    const [editedSecurityScreeningsFields, setEditedSecurityScreeningsFields] = useState<{ [key: number]: boolean }>(
      {},
    );

    // AL-619 this is a temporary measure to disable education requirements for admin family
    const [isAdmin, setisAdmin] = useState<boolean>(false);

    useEffect(() => {
      // If profileData exists, use it to set the form state
      if (profileData) {
        setEffectiveData(profileData);
      } else if (!profileData && id) {
        // If no profileData is provided and an id exists, fetch the data
        triggerGetJobProfile({ id: +id });
      }
    }, [id, profileData, triggerGetJobProfile]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const useFormReturn = useForm<JobProfileValidationModel>({
      // resolver: classValidatorResolver(JobProfileValidationModel), // todo: re-enable once profiles have proper fields
      mode: 'onChange',
    });

    const { control, reset, handleSubmit, getValues, formState, trigger } = useFormReturn;
    const { isDirty } = formState;

    useEffect(() => {
      handleFormChange(isDirty);
    }, [isDirty, handleFormChange]);

    useEffect(() => {
      if (!profileData && data && !isLoading) {
        // Only set effectiveData from fetched data if profileData is not provided
        setEffectiveData(data.jobProfile);
        trigger();
      }
    }, [data, isLoading, profileData, trigger]);

    const [form] = Form.useForm();

    useEffect(() => {
      if (!effectiveData) return;

      const useProfile = effectiveData?.original_profile_json ?? effectiveData;

      // construct picklist data by looking at fields that are marked as editable + non-significant

      console.log('useProfile: ', useProfile);
      const pickListData = {
        requirementsWithoutReadOnly: {
          professionalRegistrationRequirements: [] as { text: string }[],
          accountabilities: [] as { text: string }[],
          securityScreenings: [] as { text: string }[],
        },
      };

      // professional registrations
      const profRegs = useProfile.professional_registration_requirements;

      profRegs.forEach((profReg) => {
        const isSignificant = profReg.is_significant;
        const isReadonly = profReg.is_readonly;

        if (!isSignificant && !isReadonly) {
          pickListData.requirementsWithoutReadOnly.professionalRegistrationRequirements.push({
            text: profReg.text,
          });
        }
      });

      // accountabilities
      const accs = useProfile.accountabilities;

      accs.forEach((acc) => {
        const isSignificant = acc.is_significant;
        const isReadonly = acc.is_readonly;

        if (!isSignificant && !isReadonly) {
          pickListData.requirementsWithoutReadOnly.accountabilities.push({
            text: acc.text.toString(),
          });
        }
      });

      // security screenings
      const secs = useProfile.security_screenings;

      secs.forEach((acc) => {
        const isSignificant = acc.is_significant;
        const isReadonly = acc.is_readonly;

        if (!isSignificant && !isReadonly) {
          pickListData.requirementsWithoutReadOnly.securityScreenings.push({
            text: acc.text.toString(),
          });
        }
      });

      setPickerData(pickListData);
    }, [effectiveData]);

    // // // parameters for picklist query
    // const useProfile = effectiveData?.original_profile_json ?? effectiveData;
    // const allOrganizations = useProfile?.organizations?.length === 0;
    // const selectedMinistry = useProfile?.organizations?.map((org) => org.organization.id);
    // const jobFamilyIds = useProfile?.jobFamilies?.map((fam) => fam.jobFamily.id) ?? [];
    // const selectedClassificationId = useProfile?.classifications?.[0]?.classification?.id;
    // const employeeGroup = useProfile?.classifications?.[0]?.classification?.employee_group_id;
    // const jobFamilyStreamIds = useProfile?.streams?.map((stream) => stream.stream.id) ?? [];
    // const streamFamilies = useProfile?.streams?.map((stream) => stream.stream.job_family_id);
    // const jobFamilyWithNoStream = useProfile?.jobFamilies
    //   ?.filter((fam) => streamFamilies?.indexOf(fam.jobFamily.id) === -1)
    //   .map((fam) => fam.jobFamily.id);

    // // todo - check profile with a specific ministries
    // const { data: pickerDataa } = useGetRequirementsWithoutReadOnlyQuery(
    //   {
    //     jobFamilyIds: jobFamilyIds,
    //     jobFamilyStreamIds: jobFamilyStreamIds,
    //     classificationId: selectedClassificationId && selectedClassificationId.split('.')[0],
    //     classificationEmployeeGroupId: employeeGroup,
    //     ministryIds: !allOrganizations ? selectedMinistry : undefined,
    //     jobFamilyWithNoStream: jobFamilyWithNoStream,
    //     excludeProfileId: useProfile?.id,
    //   },
    //   {
    //     skip: !selectedClassificationId || !employeeGroup,
    //   },
    // );

    const validateVerification = useCallback(() => {
      if (!resetComplete) return;

      // console.log(
      //   'checking: ',
      //   editedAccReqFields,
      //   editedMinReqFields,
      //   editedRelWorkFields,
      //   editedSecurityScreeningsFields,
      //   originalMinReqFields,
      //   originalRelWorkFields,
      // );
      // console.log('resetComplete:', resetComplete);
      // check if the form in its current state would require verification

      // check if any flags are true in editedAccReqFieldsArray
      const anyReqAccsTrue = Object.values(editedAccReqFields).some((item) => item === true);

      // AL-619 this is a temporary measure to disable education requirements for admin family

      const anyEducationTrue = Object.entries(editedMinReqFields).some(([index, item]) => {
        const originalItem = originalMinReqFields[Number(index)];
        if (!originalItem) return item === true && !isAdmin;

        return item === true && originalItem && originalItem.is_significant && !isAdmin;
      });

      const anyRelWorkTrue = Object.entries(editedRelWorkFields).some(([index, item]) => {
        const originalItem = originalRelWorkFields[Number(index)];
        if (!originalItem) return item === true;
        return item === true && originalItem && originalItem.is_significant;
      });

      const anyProfRegTrue = Object.entries(editedProfessionalRegistrationFields).some(([index, item]) => {
        const originalItem = originalProfessionalRegistrationFields?.[Number(index)];
        if (!originalItem) return item === true;
        return item === true && originalItem && originalItem.is_significant;
      });

      const anySsecurityScreeningsTrue = Object.entries(editedSecurityScreeningsFields).some(([index, item]) => {
        const originalItem = originalSecurityScreeningsFields?.[Number(index)];
        // check for undefined and treat it as significant, since significant flag was added later
        // initially all security screenings were treated as significant

        return item === true && originalItem && originalItem.is_significant;
      });

      const verificationReasons = [];
      anyReqAccsTrue && verificationReasons.push(reasons.ACCOUNTABILITIES);
      anyEducationTrue && verificationReasons.push(reasons.EDUCATION);
      anyRelWorkTrue && verificationReasons.push(reasons.JOB_EXPERIENCE);
      anySsecurityScreeningsTrue && verificationReasons.push(reasons.SECURITY_SCREENINGS);
      anyProfRegTrue && verificationReasons.push(reasons.PROFESSIONAL_REGISTRATIONS);
      const verificationRequired = verificationReasons.length > 0;
      setVerificationNeededReasons(verificationReasons);
      setRequiresVerification(verificationRequired);
      onVerificationRequiredChange?.(verificationRequired); // call parent
    }, [
      editedAccReqFields,
      editedMinReqFields,
      editedRelWorkFields,
      editedSecurityScreeningsFields,
      onVerificationRequiredChange,
      isAdmin,
      originalMinReqFields,
      originalRelWorkFields,
      resetComplete,
      editedProfessionalRegistrationFields,
      originalProfessionalRegistrationFields,
      originalSecurityScreeningsFields,
    ]);

    useEffect(() => {
      validateVerification();
    }, [
      editedAccReqFields,
      editedMinReqFields,
      editedRelWorkFields,
      editedSecurityScreeningsFields,
      validateVerification,
    ]);

    // console.log('effectiveData: ', effectiveData);
    useEffect(() => {
      if (effectiveData && !isLoading && originalProfileData) {
        // AL-619 this is a temporary measure to disable education requirements for admin family
        originalProfileData?.jobProfile?.jobFamilies.some((jf) => jf.jobFamily.name === 'Administrative Services') &&
          setisAdmin(true);

        // console.log('effectiveData?.classifications: ', effectiveData?.classifications);

        const classificationIds =
          effectiveData?.classifications?.map((c) => ({ classification: c.classification?.id })) ?? [];

        const fieldMappings = [
          {
            field: 'accountabilities',
            originalField: 'accountabilities',
            setOriginal: setOriginalAccReqFields,
            setEdited: setEditedAccReqFields,
            isSignificant: true,
          },
          {
            field: 'accountabilities',
            originalField: 'accountabilities',
            setOriginal: setOriginalOptReqFields,
            setEdited: () => {},
            isSignificant: false,
          },
          {
            field: 'education',
            originalField: 'education',
            setOriginal: setOriginalMinReqFields,
            setEdited: setEditedMinReqFields,
          },
          {
            field: 'job_experience',
            originalField: 'job_experience',
            setOriginal: setOriginalRelWorkFields,
            setEdited: setEditedRelWorkFields,
          },
          {
            field: 'security_screenings',
            originalField: 'security_screenings',
            setOriginal: setOriginalSecurityScreeningsFields,
            setEdited: setEditedSecurityScreeningsFields,
            isSignificant: true,
          },
          {
            field: 'professional_registration_requirements',
            originalField: 'professional_registration_requirements',
            setOriginal: setOriginalProfessionalRegistrationFields,
            setEdited: setEditedProfessionalRegistrationFields,
            isSignificant: true,
          },
          {
            field: 'optional_requirements',
            originalField: 'optional_requirements',
            setOriginal: setOriginalOptionalRequirementsFields,
            setEdited: setEditedOptionalRequirementsFields,
          },
          {
            field: 'preferences',
            originalField: 'preferences',
            setOriginal: setOriginalPreferencesFields,
            setEdited: setEditedPreferencesFields,
          },
          {
            field: 'knowledge_skills_abilities',
            originalField: 'knowledge_skills_abilities',
            setOriginal: setOriginalKnowledgeSkillsAbilitiesFields,
            setEdited: setEditedKnowledgeSkillsAbilitiesFields,
          },
          {
            field: 'willingness_statements',
            originalField: 'willingness_statements',
            setOriginal: setOriginalProvisosFields,
            setEdited: setEditedProvisosFields,
          },
        ];

        // console.log('originalProfileData: ', originalProfileData);
        // console.log('effectiveData: ', effectiveData);

        fieldMappings.forEach(({ field, originalField, setOriginal, setEdited, isSignificant }) => {
          // console.log('KEY: ', field, originalField, isSignificant);

          // for accountabilities, make sure we only look at those with significant == true,
          // since false means it's an optional accountability
          const originalFieldValue = (
            originalProfileData.jobProfile[originalField as keyof JobProfileModel] as Array<any>
          )
            ?.map((item) => {
              if (typeof item === 'string') {
                return { text: item, isCustom: false, disabled: false };
              } else {
                return {
                  text: item.text,
                  isCustom: item.isCustom,
                  disabled: item.disabled,
                  is_readonly: item.is_readonly,
                  is_significant: item.is_significant,
                };
              }
            })
            .filter((item) => {
              // console.log('filter item: ', item);
              // if (field != 'accountabilities') return true;
              // else
              return item.is_significant === isSignificant;
            });

          // console.log('originalFieldValue: ', originalFieldValue);

          const initialFieldValue = (effectiveData[field as keyof JobProfileModel] as Array<any>)
            ?.map((item) => {
              if (typeof item === 'string') {
                return { text: item, isCustom: false, disabled: false };
              } else {
                return {
                  text: item.text,
                  isCustom: item.isCustom,
                  disabled: item.disabled,
                  is_readonly: item.is_readonly,
                  is_significant: item.is_significant,
                };
              }
            })
            .filter((item) => {
              // if (field != 'accountabilities') return true;
              // else

              return item.is_significant === isSignificant;
            });

          if (!originalValuesSet) setOriginal(originalFieldValue);

          // console.log('initialFieldValue: ', field, initialFieldValue);
          // console.log('isSignificant: ', isSignificant);

          const initialEditStatus: { [key: number]: boolean } = {};
          initialFieldValue?.forEach((item, index) => {
            // console.log('initial item/original: ', item, originalFieldValue[index]);
            const isEdited =
              isSignificant !== undefined
                ? (item.text !== originalFieldValue[index]?.text && item.is_significant === isSignificant) ||
                  (item.disabled === true && item.is_significant === isSignificant)
                : item.text !== originalFieldValue?.[index]?.text || item.disabled === true;
            initialEditStatus[index] = isEdited;
          });

          // console.log('initialEditStatus: ', initialEditStatus);
          setEdited(initialEditStatus);
        });

        if (!originalValuesSet) {
          setOriginalBehaviouralCompetenciesFields(originalProfileData.jobProfile.behavioural_competencies);
        }

        const setOriginalField = (field: string, setOriginal: React.Dispatch<any>) => {
          const fieldKey = field as keyof JobProfileModel;
          const originalValue =
            typeof originalProfileData.jobProfile[fieldKey] === 'string'
              ? { text: originalProfileData.jobProfile[fieldKey], isCustom: false, disabled: false }
              : {
                  text: (originalProfileData.jobProfile[fieldKey] as TrackedFieldArrayItem)?.text,
                  isCustom: (originalProfileData.jobProfile[fieldKey] as TrackedFieldArrayItem)?.isCustom,
                  disabled: (originalProfileData.jobProfile[fieldKey] as TrackedFieldArrayItem)?.disabled,
                };

          // console.log('setOriginalField: ', field, originalValue);
          if (!originalValuesSet) setOriginal(originalValue);
        };

        setOriginalField('title', setOriginalTitle);
        setOriginalField('overview', setOriginalOverview);
        setOriginalField('program_overview', setOriginalProgramOverview);

        if (!originalValuesSet) setOriginalValuesSet(true);

        validateVerification();

        const security_screenings = getInitialFieldValue(effectiveData.security_screenings, true);
        const preferences = getInitialFieldValue(effectiveData.preferences);

        reset({
          id: effectiveData?.id,
          number: effectiveData?.number,
          title: getInitialValue(effectiveData.title),
          context:
            typeof effectiveData?.context === 'string' ? effectiveData?.context : effectiveData?.context.description,
          overview: getInitialValue(effectiveData.overview),
          program_overview: getInitialValue(effectiveData.program_overview),
          classifications: classificationIds,
          accountabilities: getInitialFieldValue(effectiveData.accountabilities, true),
          optional_accountabilities: getInitialFieldValue(effectiveData.accountabilities, false),
          education: getInitialFieldValue(effectiveData.education),
          job_experience: getInitialFieldValue(effectiveData.job_experience),
          security_screenings: security_screenings,
          optional_security_screenings: getInitialFieldValue(effectiveData.security_screenings, false),
          behavioural_competencies: effectiveData?.behavioural_competencies || [],
          professional_registration_requirements: getInitialFieldValue(
            effectiveData.professional_registration_requirements,
            true,
          ),
          optional_professional_registration_requirements: getInitialFieldValue(
            effectiveData.professional_registration_requirements,
            false,
          ),
          // professional_registration_requirements: getInitialFieldValue(
          //   effectiveData.professional_registration_requirements,
          // ).map((item) => ({professional_registration_requirement:item})),
          preferences: preferences,
          knowledge_skills_abilities: getInitialFieldValue(effectiveData.knowledge_skills_abilities),
          willingness_statements: getInitialFieldValue(effectiveData.willingness_statements),
          optional_requirements: getInitialFieldValue(effectiveData.optional_requirements),
        });
        setResetComplete(true);

        trigger();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      effectiveData,
      isLoading,
      reset,
      originalValuesSet,
      setOriginalAccReqFields,
      setOriginalMinReqFields,
      setOriginalOptReqFields,
      setOriginalOverview,
      setOriginalTitle,
      setOriginalValuesSet,
      originalOverview,
      originalTitle,
      originalAccReqFields,
      originalMinReqFields,
      originalOptReqFields,
      originalRelWorkFields,
      setOriginalRelWorkFields,
      originalSecurityScreeningsFields,
      setOriginalSecurityScreeningsFields,
      setOriginalProgramOverview,
      originalKnowledgeSkillsAbilitiesFields,
      originalPreferencesFields,
      originalProfessionalRegistrationFields,
      originalProvisosFields,
      setOriginalKnowledgeSkillsAbilitiesFields,
      setOriginalPreferencesFields,
      setOriginalProfessionalRegistrationFields,
      setOriginalProvisosFields,
      originalOptionalRequirementsFields,
      setOriginalOptionalRequirementsFields,
      originalProfileData,
    ]);

    const getInitialValue = (value: string | TrackedFieldArrayItem) => {
      const ret =
        typeof value === 'string'
          ? { text: value, isCustom: false, disabled: false }
          : { text: value.text, isCustom: value.isCustom, disabled: value.disabled };
      // console.log('getInitialValue: ', value, ret);
      return ret;
    };

    const getInitialFieldValue = (
      field: AccountabilitiesModel[] | TrackedFieldArrayItem[],
      isSignificant?: boolean | undefined,
    ): Array<{
      text: string | TrackedFieldArrayItem;
      isCustom: boolean | undefined;
      disabled: boolean;
      is_readonly?: boolean;
      is_significant?: boolean;
    }> => {
      // console.log('getInitialFieldValue: ', field, isSignificant);
      const ret = field
        ?.map((item) => {
          if (typeof item === 'string') {
            return { text: item, isCustom: false, disabled: false };
          } else {
            if (
              (isSignificant === true && item.is_significant === false) ||
              (isSignificant === false && item.is_significant === true)
            )
              return null;

            return {
              text: item.text,
              isCustom: item.isCustom,
              // for optional items, disable by default (isSignificant is false)
              disabled: item.disabled === undefined ? (isSignificant === false ? true : false) : item.disabled,
              // disabled: item.disabled === undefined ? false : item.disabled,
              is_readonly: item.is_readonly,
              tc_is_readonly: item.tc_is_readonly,
              is_significant: item.is_significant,
            };
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      // console.log('getInitialFieldValue: ', field, ret);
      return ret ?? [];
    };

    const { fields: classifications_fields } = useFieldArray({
      control,
      name: 'classifications',
    });

    // useImperativeHandle to expose the submitForm function
    useImperativeHandle(ref, () => ({
      // You can expose any method you need from the form instance here
      submit: () => {
        form.submit();
      },
      getFormData: () => {
        // This function could be used to get the current form data
        return getValues();
      },
      getFormErrors: () => {
        return formErrors;
      },
    }));

    // useState to hold errors
    const [formErrors, setFormErrors] = useState<any>({});

    useEffect(() => {
      setFormErrors(formState.errors);
    }, [formState.errors]);

    const { positionRequestData } = useWizardContext();

    if (isLoading || !resetComplete) {
      return <LoadingSpinnerWithMessage />;
    }

    const titleStyle = {
      fontSize: '24px', // Adjust the font size as needed
      color: 'rgba(0, 0, 0, 0.85)', // This is the default color for antd titles
      marginBottom: '0px', // Adjust spacing as needed
      fontWeight: '500', // Default font weight for antd titles
    };

    return (
      <>
        <Row data-testid="profile-editing-form" gutter={[24, 24]}>
          <Col xs={24} sm={24} lg={8} aria-label="Context and job details" role="region">
            {requiresVerification && (
              <Alert
                data-testid="verification-warning-message"
                message=""
                description={
                  <span>
                    Some of your amendments to the generic profile require verification. If you would like to revisit
                    some of your amendments, please click these links:
                    <ul style={{ marginTop: '1rem' }} data-testid="edit-form-link">
                      {verificationNeededReasons.map((reason, index) => (
                        <li key={index}>
                          <a onClick={() => handleSectionScroll(reason)}>{reason}</a>
                        </li>
                      ))}
                    </ul>
                  </span>
                }
                type="warning"
                showIcon
                icon={<ExclamationCircleFilled />}
                style={{ marginBottom: '24px' }}
              />
            )}

            <Alert
              role="note"
              type="info"
              showIcon
              message={
                <span>
                  Job context{' '}
                  <Tooltip title="The job context is important to understand as you proceed to create the position. You will be asked prior to approving that you understand the context of the job.">
                    <InfoCircleOutlined style={{ cursor: 'pointer', fontSize: '0.9rem' }} />
                  </Tooltip>
                </span>
              }
              description={
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof effectiveData?.context === 'string'
                        ? effectiveData?.context
                        : effectiveData?.context?.description ?? '',
                    ),
                  }}
                ></p>
              }
            ></Alert>

            <Descriptions
              className="customDescriptions"
              style={{ marginTop: '1rem' }}
              title={
                <div>
                  Job Details
                  <div style={{ float: 'right', fontSize: '90%' }}>
                    <Tooltip title="Information shown here is dependent on the values that you selected in the previous steps.">
                      <a href="#" style={{ marginLeft: 8 }}>
                        Why can't I make changes?
                        <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                      </a>
                    </Tooltip>
                  </div>
                </div>
              }
              bordered
              column={1}
            >
              <Descriptions.Item label="Expected classification">
                {effectiveData?.classifications?.[0]?.classification?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Reporting manager">
                <PositionProfile
                  positionNumber={positionRequestData?.reports_to_position_id?.toString()}
                  orgChartData={positionRequestData?.orgchart_json}
                ></PositionProfile>
              </Descriptions.Item>
              <Descriptions.Item label="Job Store #">{effectiveData?.number}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} sm={24} lg={16}>
            <Form form={form} onFinish={handleSubmit((_data) => {})}>
              <FormItem name="id" control={control} hidden>
                <Input />
              </FormItem>

              <FormItem name="number" control={control} hidden>
                <Input />
              </FormItem>

              <List
                style={{ display: 'none' }}
                dataSource={classifications_fields}
                renderItem={(field, index) => (
                  <List.Item
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start', // Align items to the top
                      marginBottom: '0px',
                      borderBottom: 'none',

                      padding: '5px 0',
                    }}
                    key={field.id} // Ensure this is a unique value
                  >
                    {/* Hidden fields to submit actual data */}
                    <FormItem name={`classifications.${index}.classification`} control={control} hidden>
                      <Input />
                    </FormItem>
                  </List.Item>
                )}
              />

              <FormItem name="context" control={control} hidden>
                <Input />
              </FormItem>

              {!config?.contextEditable ? (
                <Alert
                  type="info"
                  role="note"
                  style={{ marginBottom: '24px' }}
                  message="Some fields are standard and cannot be edited, others are marked as significant and may result in a classification review.  Those not marked as significant or shaded, may be edited without a classification impact."
                  showIcon
                />
              ) : (
                <></>
              )}

              <WizardTitle trigger={trigger} formErrors={formErrors} useFormReturn={useFormReturn} />

              <WizardProgramOverview trigger={trigger} formErrors={formErrors} useFormReturn={useFormReturn} />

              {config?.contextEditable ? (
                <FormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="context"
                  control={control}
                  colon={false}
                  label={<span style={titleStyle}>Context</span>}
                >
                  <TextArea autoSize />
                </FormItem>
              ) : (
                <></>
              )}

              <WizardOverview trigger={trigger} formErrors={formErrors} useFormReturn={useFormReturn} />

              <AccountabilitiesSection
                useFormReturn={useFormReturn}
                originalAccReqFields={originalAccReqFields}
                sectionRef={acctSection}
                validateVerification={validateVerification}
                editedAccReqFields={editedAccReqFields}
                setEditedAccReqFields={setEditedAccReqFields}
                formErrors={formErrors}
                trigger={trigger}
                pickerData={pickerData}
              />

              <MinimumRequirementsSection
                useFormReturn={useFormReturn}
                validateVerification={validateVerification}
                originalEducationFields={originalMinReqFields}
                educationSectionRef={educationSection}
                securityScreeningsSectionRef={securitySection}
                editedEducationFields={editedMinReqFields}
                setEditedEducationFields={setEditedMinReqFields}
                originalRelatedExperienceFields={originalRelWorkFields}
                professionalRegSectionRef={professionalRegSection}
                relatedExperienceSectionRef={workExperienceSection}
                editedRelatedExperienceFields={editedRelWorkFields}
                setEditedRelatedExperienceFields={setEditedRelWorkFields}
                originalProfessionalRegistrationFields={originalProfessionalRegistrationFields}
                editedProfessionalRegistrationFields={editedProfessionalRegistrationFields}
                setEditedProfessionalRegistrationFields={setEditedProfessionalRegistrationFields}
                originalPreferencesFields={originalPreferencesFields}
                editedPreferencesFields={editedPreferencesFields}
                setEditedPreferencesFields={setEditedPreferencesFields}
                originalKnowledgeSkillsAbilitiesFields={originalKnowledgeSkillsAbilitiesFields}
                editedKnowledgeSkillsAbilitiesFields={editedKnowledgeSkillsAbilitiesFields}
                setEditedKnowledgeSkillsAbilitiesFields={setEditedKnowledgeSkillsAbilitiesFields}
                originalProvisosFields={originalProvisosFields}
                editedProvisosFields={editedProvisosFields}
                setEditedProvisosFields={setEditedProvisosFields}
                originalOptionalRequirementsFields={originalOptionalRequirementsFields}
                editedOptionalRequirementsFields={editedOptionalRequirementsFields}
                setEditedOptionalRequirementsFields={setEditedOptionalRequirementsFields}
                originalSecurityScreeningsFields={originalSecurityScreeningsFields}
                setEditedSecurityScreeningsFields={setEditedSecurityScreeningsFields}
                editedSecurityScreeningsFields={editedSecurityScreeningsFields}
                isAdmin={isAdmin}
                formErrors={formErrors}
                trigger={trigger}
                pickerData={pickerData}
              />

              <WizardBehaviouralCompetencies
                formErrors={formErrors}
                originalBehaviouralCompetenciesFields={originalBehaviouralCompetenciesFields}
                useFormReturn={useFormReturn}
              />
            </Form>
          </Col>
        </Row>
      </>
    );
  },
);

export default WizardEditProfile;
